require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true},));
// app.use(session({secret : process.env.TokenSecret, resave : false, saveUninitialized : true}));
// app.use('/public',[express.static('public')])

let server = http.createServer(app);
// io = io(server);
// io.origins('*:*')

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.use(cors());
app.use(helmet());
// app.use(function(req, res, next) {
//     req.io = io;
//     next();
// });

// routes require
const teacherApp = require('./routes/allRoutes');
teacherApp(app);

app.use(errors());
const port = process.env.PORT ? process.env.PORT : 4024;
server.listen(port, () => console.log('Server running on port : ' + port));
