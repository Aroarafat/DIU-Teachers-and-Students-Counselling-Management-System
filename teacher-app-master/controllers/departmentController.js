const departmentModel = require('./../models/department');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createDepartment = async (req, res) => {
    try {
        let data = await departmentModel.create(req.body);
        if(data){
            res.status(200).json({
                data : data,
                success: true,
                message : "Department created successfully."
            });
        } else {
            res.status(400).json({
                data : null,
                success: false,
                message : "Department couldn't be created!"
            });
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({
          data : null,
          success : false,
          message : "Internal Server Error Occurred."
        });
    }
}

const viewTeachersDepartment = async (req, res) => {
    try{
        const data = await departmentModel.find()
        if(data){
            res.status(200).json({
                data: data,
                success: true,
                message: "Department view was successfully."
            })
        } else {
            res.status(400).json({
                data: null,
                success: false,
                message: "Department view could not be fetched."
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

module.exports =  {
  viewTeachersDepartment,
  createDepartment
};