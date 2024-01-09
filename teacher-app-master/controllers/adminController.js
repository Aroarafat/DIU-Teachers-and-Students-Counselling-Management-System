const adminModel = require('./../models/admin');
const teacherModel = require('./../models/teacher');
const studentModel = require('./../models/student');
const departmentModel = require('./../models/department');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const moment = require('moment-timezone');
// const _ = require('lodash');
// const nanoid = require('nanoid').nanoid

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}

const createAdmin = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        let data = await adminModel.create(req.body);
        if(data){
            res.status(201).json({
                data : data,
                success: true,
                message : "Admin created successfully."
            });
        }
            else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Admin couldn't be created!"
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
        let data1 = await adminModel.findOne({email:email});
        if(data1) {
            bcrypt.compare(password, data1.password, async (err,valid) => {
                if(valid) {
                    let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
                        data: {
                            _id : data1._id,
                            email: data1.email,
                            name : data1.name,
                            role : data1.role
                        }
                    },process.env.TokenSecret);
                    return res.status(200).json({
                        data : {
                            _id : data1._id,
                            name : data1.name,
                            email : data1.email,
                            role : data1.role,
                            isBlocked : data1.isBlocked,
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
        }
        else {
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

const adminUpdatePassword = async (req,res) => {
    try {
        let data = await adminModel.findOne({});
        const match = await bcrypt.compare(req.body.oldPassword, data.password);
        if(match){
            if(req.body.newPassword === req.body.newConfirmPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.newPassword, salt);
                let pass = { password : hash };
                let updated = await adminModel.findOneAndUpdate({}, { $set: pass });
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
        console.log("ERROR:",err);
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const viewAllAdmin = async (req, res) => {
    try {
        let data = await adminModel.find({ role: 'admin' }, projection);
        if (data) {
            res.status(200).json({
                data: data,
                success: true,
                message: 'All Admin View.'
            });
        } else {
            res.status(402).json({
                data: null,
                success: false
            });
        }
    } catch (err) {
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        });
    }
}

const removeAdmin = async (req, res) => {
    try{
        let data = await adminModel.findOne({ _id: req.params.id }, projection);
        let data1 = await adminModel.deleteOne({ _id: req.params.id }, projection);
        if(data && data1) {
            res.status(200).json({
                success: true,
                message : "Admin deleted successfully."
            });
        } else {
            res.status(400).json({
                success: false,
                message : "Admin couldn't be deleted!"
            });
        }
    } catch (err) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error Occurred."
        })
    }
}

const approveTeacherByAdmin = async (req, res) => {
    try{
        let data = await teacherModel.findOneAndUpdate({ _id: req.params.teacherId }, { isApproved: true }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.status(200).json({
                    success: true,
                    message : "Teacher Approved successfully."
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error Occurred."
        })
    }
}

const rejectTeacherByAdmin = async (req, res) => {
    try{
        let data = await teacherModel.findOneAndUpdate({ _id: req.params.teacherId }, { isApproved: false, isRejected: true }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.status(200).json({
                    success: true,
                    message : "Teacher rejected successfully."
                });
            }
        });
        // if(data) {
        //     res.status(200).json({
        //         success: true,
        //         message : "Admin deleted successfully."
        //     });
        // } else {
        //     res.status(400).json({
        //         success: false,
        //         message : "Admin couldn't be deleted!"
        //     });
        // }
    } catch (err) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error Occurred."
        })
    }
}

const dashboardView = async (req, res) => {
    try {
        let teacherNo = await teacherModel.find({});
        let studentNo = await studentModel.find({});
        let totalDepartments = await departmentModel.find({});
        let approvedTeacherNo = await teacherModel.find({ isApproved: true });
        let rejectedTeacherNo = await teacherModel.find({ isRejected: true });
        let pendingTeacherNo = await teacherModel.find({ isApproved: false, isRejected: false });

        if(teacherNo && studentNo && totalDepartments && approvedTeacherNo && rejectedTeacherNo && pendingTeacherNo) {
            res.status(200).json({
                data: {
                    teacherNo: teacherNo?.length,
                    studentNo: studentNo?.length,
                    totalDepartments: totalDepartments?.length,
                    approvedTeacherNo: approvedTeacherNo?.length,
                    rejectedTeacherNo: rejectedTeacherNo?.length,
                    pendingTeacherNo: pendingTeacherNo?.length,
                },
                success: true,
                message: 'successful'
            });
        } else {
            res.status(402).json({
                data: null,
                success: false
            });
        }
    } catch (err) {
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        });
    }
}

module.exports =  {
  signIn,
  adminUpdatePassword,
  createAdmin,
  viewAllAdmin,
  removeAdmin,
  approveTeacherByAdmin,
  rejectTeacherByAdmin,
  dashboardView
};