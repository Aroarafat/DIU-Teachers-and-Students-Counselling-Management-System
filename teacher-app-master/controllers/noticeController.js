const noticeModel = require('./../models/notice');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createNotice = async (req, res) => {
  try {
    let data = await noticeModel.create(req.body);
    if (data) {
      res.status(200).json({
        data: data,
        success: true,
        message: "Notice created successfully."
      });
    } else {
      res.status(400).json({
        data: null,
        success: false,
        message: "Notice couldn't be created!"
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

const viewNotice = async (req, res) => {
  try {
    let deleteData = await noticeModel.deleteMany({ deactivateTime: { "$lt": new Date().getTime() } })
    console.log('delete -> ', deleteData)
    const data = await noticeModel.find()
    if (data) {
      res.status(200).json({
        data: data,
        success: true,
        message: "Notice view was successfully."
      })
    } else {
      res.status(400).json({
        data: null,
        success: false,
        message: "Notice view could not be fetched."
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

module.exports = {
  viewNotice,
  createNotice
};