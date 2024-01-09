// initial message
const initialMessage = async (req, res) => {
  try {
      res.status(200).json({
          message: 'Welcome to Hospital Management System!',
          success: true
      });
  } catch (err) {
      res.status(500).json({
          data: null,
          success: false,
          message: "Internal Server Error Occurred."
      });
  }
}

module.exports = {
  initialMessage
};
