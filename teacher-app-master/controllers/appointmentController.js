const appointmentModel = require('./../models/appointment');
const teacherModel = require('./../models/teacher');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createAppointment = async (req, res) => {
    try {
        let data = await appointmentModel.create(req.body);
        if (data) {
            res.status(201).json({
                data: data,
                success: true,
                message: "Appointment created successfully."
            });
        }
        else {
            res.status(400).json({
                data: null,
                success: false,
                message: "Appointment couldn't be created!"
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

const viewTeachersAppointment = async (req, res) => {
    try {
        const data = await appointmentModel.find({ teacherId: req.params.teacherId })
        if (data) {
            res.status(200).json({
                data: data,
                success: true,
                message: "Teacher's appointment view was successfully."
            })
        } else {
            res.status(400).json({
                data: null,
                success: false,
                message: "Teacher's appointment view could not be fetched."
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        })
    }
}

const viewStudentAppointment = async (req, res) => {
    try {
        let deleteData = await appointmentModel.deleteMany({ slot: { "$lt": new Date().getTime() } })
        console.log('delete -> ', deleteData);
        let data = await appointmentModel.find({ studentId: req.params.studentId })
        let newData = [];
        if (data) {
            data?.map(async (item) => {
                const data2 = await teacherModel.findOne({ _id: item?.teacherId });
                const newReason = {
                    reason: item?.reason,
                    isApprovedByTeacher: item?.isApprovedByTeacher,
                    isRejectedByTeacher: item?.isRejectedByTeacher,
                    _id: item?._id,
                    studentId: item?.studentId,
                    teacherId: item?.teacherId,
                    teacherName: data2?.name,
                    teacherDepartmentName: data2?.department,
                    slot: item?.slot,
                };
                newData?.push(newReason);
            });
        }

        console.log('new...', newData);
        if (data) {
            res.status(200).json({
                data: data,
                success: true,
                message: "Student's appointment view was successfully."
            })
        } else {
            res.status(400).json({
                data: null,
                success: false,
                message: "Student's appointment view could not be fetched."
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            data: null,
            success: false,
            message: "Internal Server Error Occurred."
        })
    }
}

const approvedByTeacher = async (req, res) => {
    try {
        let data = await appointmentModel.findOneAndUpdate({ _id: req.params.appointmentId }, { isApprovedByTeacher: true, isRejectedByTeacher: false }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.status(200).json({
                    success: true,
                    message: "Appointment Approved successfully."
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error Occurred."
        })
    }
}

const rejectedByTeacher = async (req, res) => {
    try {
        let data = await appointmentModel.findOneAndUpdate({ _id: req.params.appointmentId }, { isApprovedByTeacher: false, isRejectedByTeacher: true }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            } else {
                res.status(200).json({
                    success: true,
                    message: "Appointment rejected successfully."
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error Occurred."
        })
    }
}

module.exports = {
    createAppointment,
    viewTeachersAppointment,
    viewStudentAppointment,
    approvedByTeacher,
    rejectedByTeacher
};