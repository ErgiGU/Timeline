const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
const history = require('connect-history-api-fallback');
const entryController = require("./controllers/entryController");
const uploadedEntitiesController = require("./controllers/uploadedEntitiesController");
const userAccountController = require("./controllers/userAccountController");
const userPasswordController = require("./controllers/userPasswordController");
const loginAuthController = require("./controllers/loginAuth");

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://user:uls54LlsldiEPiMT@cluster0.y6dnvxt.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
const port = process.env.PORT || 3000;
const version = 'v1'

// Connect to MongoDB
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});


// Create Express app
let app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());
app.use(methodOverride('_method'))

// Import routes
app.get('/api/' + version, function (req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});

app.use(entryController);
app.use(uploadedEntitiesController);
app.use(userAccountController);
app.use(userPasswordController);
app.use(loginAuthController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/' + version + '/*', function (req, res) {
    res.status(404).json({'message': 'Not Found'});
});

app.use('/api/*', function (req, res) {
    res.status(404).json({'message': 'Not Found'});
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
let root = path.normalize(__dirname + '/..');
let client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
let env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.error(err.stack);
    let err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});


app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/` + version);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
