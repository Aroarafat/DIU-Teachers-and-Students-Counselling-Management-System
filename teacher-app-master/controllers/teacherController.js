const teacherModel = require('./../models/teacher');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}

const registerTeacher = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        let data = await teacherModel.create(req.body);
        if(data){
            res.status(201).json({
                data : data,
                success: true,
                message : "Teacher created successfully."
            });
        }
            else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Teacher couldn't be created!"
            });
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const signIn = async (req, res) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        let data = await teacherModel.findOne({email:email});
        if(!data?.isApproved){
            res.status(200).json({
                data: null,
                success: true,
                message: 'Your account is not approved yet!'
            })
        } else if(data) {
            bcrypt.compare(password, data.password, async (err,valid) => {
                if(valid) {
                    let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
                        data: {
                            _id : data._id,
                            email: data.email,
                            name : data.name,
                            role : data.role
                        }
                    },process.env.TokenSecret);
                    return res.status(200).json({
                        data : {
                            _id : data._id,
                            name : data.name,
                            email : data.email,
                            role : data.role,
                            isBlocked : data.isBlocked,
                            token : token
                        },
                        success : true,
                        message : 'Logged in Successful',
                    });
                }
                else {
                    return res.status(400).json({
                        data : null,
                        success: false,
                        message: "Password Mismatch!"
                    });
                }
            })
        } else {
            res.status(400).json({
                data : null,
                success: false,
                message: 'Incorrect Email or Password!'
            });
        }
    }catch(err){
        console.log("ERROR:",err);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred!"
        });
    }
}

const teacherUpdatePassword = async (req,res)=>{
    try {
        let data = await teacherModel.findOne({ _id: req.body.id });
        const match = await bcrypt.compare(req.body.oldPassword, data.password);

        if(match){
            if(req.body.newPassword === req.body.newConfirmPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.newPassword, salt);
                let pass = { password : hash };
                let updated = await teacherModel.findOneAndUpdate({}, { $set: pass });
                if(updated){
                    res.status(202).json({
                        success: true,
                        message: "Password updated successfully.",
                    });
                }else{
                    res.status(400).json({
                        success: false,
                        message: "Password could not be updated"
                    });
                }
            }
            else {
                res.status(400).json({
                    success: false,
                    message: `Confirm Password didn't match!`
                });
            }
        }else{
            res.status(400).json({
                success: false,
                message: `Old password didn't match!.`
            });
        }
    }catch (e) {
        console.log("ERROR:",e);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const approvedTeacherList = async (req, res) => {
    try {
        const data = await teacherModel.find({ isApproved: true })
        if(data){
            res.status(200).json({
                data : data,
                success: true,
                message : "Approved teacher list successfully."
            });
        } else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Approved teacher list couldn't be fetched."
            });
        }
    } catch (err) {
        console.log("ERROR:",err);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const pendingTeacherList = async (req, res) => {
    try {
        const data = await teacherModel.find({ isApproved: false, isRejected: false })
        if(data){
            res.status(200).json({
                data : data,
                success: true,
                message : "Pending teacher list successfully."
            });
        } else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Pending teacher list couldn't be fetched."
            });
        }
    } catch (err) {
        console.log("ERROR:",err);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const rejectedTeacherList = async (req, res) => {
    try {
        const data = await teacherModel.find({ isRejected: true })
        if(data){
            res.status(200).json({
                data : data,
                success: true,
                message : "Rejected teacher list successfully."
            });
        } else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Rejected teacher list couldn't be fetched."
            });
        }
    } catch (err) {
        console.log("ERROR:",err);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const departmentWiseTeacherList = async (req, res) => {
    try {
        const data = await teacherModel.find({ department: req.params.department, isApproved: true })
        if(data){
            res.status(200).json({
                data : data,
                success: true,
                message : "Department teacher list successfully."
            });
        } else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Department teacher list couldn't be fetched."
            });
        }
    } catch (err) {
        console.log("ERROR:",err);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const teacherUpdateProfile = async (req,res)=>{
    try {
        let data = await teacherModel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc)=>{
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.status(200).json({
                    success: true,
                    message : "Teacher Profile updated successfully."
                });
            }
        });

        console.log(data);

        // if(data){
        //     res.staus(200).json({
        //         success: true,
        //         message: "Updated successfully"
        //     })
        // } else {
        //     res.status(400).json({
        //         success: false,
        //         message: 'Bad request'
        //     })
        // }
        
        // if(match){
        //     if(req.body.newPassword === req.body.newConfirmPassword) {
        //         const salt = bcrypt.genSaltSync(10);
        //         const hash = bcrypt.hashSync(req.body.newPassword, salt);
        //         let pass = { password : hash };
        //         let updated = await doctorModel.findOneAndUpdate({}, { $set: pass });
        //         if(updated){
        //             res.status(202).json({
        //                 success: true,
        //                 message: "Password updated successfully.",
        //             });
        //         }else{
        //             res.status(400).json({
        //                 success: false,
        //                 message: "Password could not be updated"
        //             });
        //         }
        //     }
        //     else {
        //         res.status(400).json({
        //             success: false,
        //             message: `Confirm Password didn't match!`
        //         });
        //     }
        // }else{
        //     res.status(400).json({
        //         success: false,
        //         message: `Old password didn't match!.`
        //     });
        // }
    }catch (e) {
        console.log("ERROR:",e);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const teacherViewProfile = async (req, res) => {
    try {
        const data = await teacherModel.findOne({ _id: req.params.teacherId })
        if(data){
            res.status(200).json({
                data : data,
                success: true,
                message : "Teacher profile view successful."
            });
        } else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Teacher profile couldn't be fetched."
            });
        }
    } catch (err) {
        console.log("ERROR:",err);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

module.exports =  {
  signIn,
  teacherUpdatePassword,
  registerTeacher,
  approvedTeacherList,
  pendingTeacherList,
  rejectedTeacherList,
  departmentWiseTeacherList,
  teacherUpdateProfile,
  teacherViewProfile
};