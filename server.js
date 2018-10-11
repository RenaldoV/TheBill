const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
const userRoutes = require('./routes/user.route');
const fileRoutes = require('./routes/file.route');

const app = express();
app.use(bodyParser.json({limit: '5mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const port = process.env.PORT || 4000;
app.use(errorHandler);

app.use('/user', userRoutes);
app.use('/file', fileRoutes);

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});

function errorHandler (err, req, res, next) {
  res.status(500);
  res.status(err.statusCode).json({ error: err });
}
