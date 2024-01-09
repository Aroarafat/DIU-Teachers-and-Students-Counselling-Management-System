const studentModel = require('./../models/student');
const appointmentModel = require('./../models/appointment');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}

const registerStudent = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        let data = await studentModel.create(req.body);
        // console.log('body', data);
        if (data) {
            res.status(201).json({
                data: data,
                success: true,
                message: "Student created successfully."
            });
        }
        else {
            res.status(400).json({
                data: null,
                success: false,
                message: "Student couldn't be created!"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        });
    }
}

const signIn = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let data = await studentModel.findOne({ email: email });
        let deleteData = await appointmentModel.deleteMany({ slot: { "$lt": new Date().getTime() } })
        console.log('delete -> ', deleteData);
        if (data) {
            bcrypt.compare(password, data.password, async (err, valid) => {
                if (valid) {
                    let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
                        data: {
                            _id: data._id,
                            email: data.email,
                            name: data.name,
                            role: data.role
                        }
                    }, process.env.TokenSecret);
                    return res.status(200).json({
                        data: {
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            isBlocked: data.isBlocked,
                            token: token
                        },
                        success: true,
                        message: 'Logged in Successful',
                    });
                }
                else {
                    return res.status(400).json({
                        data: null,
                        success: false,
                        message: "Password Mismatch!"
                    });
                }
            })
        }
        else {
            res.status(400).json({
                data: null,
                success: false,
                message: 'Incorrect Email or Password!'
            });
        }
    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred!"
        });
    }
}

const studentUpdatePassword = async (req, res) => {
    try {
        let data = await studentModel.findOne({});
        const match = await bcrypt.compare(req.body.oldPassword, data.password);
        if (match) {
            if (req.body.newPassword === req.body.newConfirmPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.newPassword, salt);
                let pass = { password: hash };
                let updated = await studentModel.findOneAndUpdate({}, { $set: pass });
                if (updated) {
                    res.status(202).json({
                        success: true,
                        message: "Password updated successfully.",
                    });
                } else {
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
        } else {
            res.status(400).json({
                success: false,
                message: `Old password didn't match!.`
            });
        }
    } catch (e) {
        console.log("ERROR:", err);
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        });
    }
}

const studentUpdateProfile = async (req, res) => {
    try {
        let data = await studentModel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.status(200).json({
                    success: true,
                    message: "Student Profile updated successfully."
                });
            }
        });
        console.log(data);
    } catch (e) {
        console.log("ERROR:", e);
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        });
    }
}

const studentViewProfile = async (req, res) => {
    try {
        const data = await studentModel.findOne({ _id: req.params.studentId })
        if (data) {
            res.status(200).json({
                data: data,
                success: true,
                message: "Student profile view successful."
            });
        } else {
            res.status(400).json({
                data: null,
                success: false,
                message: "Student profile couldn't be fetched."
            });
        }
    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        });
    }
}

module.exports = {
    signIn,
    studentUpdatePassword,
    registerStudent,
    studentUpdateProfile,
    studentViewProfile
};