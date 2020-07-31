const express = require('express')
const http = require('http')
const appConfig = require('./appconfig/appconfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const globalError = require('./app/middlewares/errorHandler')
const routeLogger = require('./app/middlewares/routeLogger')
var helmet = require('helmet')
const logger = require('./app/library/loggerlib')


 const app = express()

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(cookieParser())

 app.use(globalError.globalErrorHandler)
 app.use(routeLogger.logIp)
 app.use(helmet())

 let modelsPath ='./models'
  fs.readdirSync(modelsPath).forEach(function (file) {
       if(~file.indexOf('.js')){
           console.log(file)
           console.log(modelsPath + '/' +file)
           require(modelsPath + '/' +file)
       }
      
  });


  let routesPath = './routes'
  fs.readdirSync(routesPath).forEach(function (file) {
      if (~file.indexOf('.js')) {
          console.log("including the following file");
         console.log(routesPath + '/' + file)
          let route = require(routesPath + '/' + file);
          route.setRouter(app);
      }
  });

 app.use(globalError.globalNotFoundHandler)

 

 const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri)
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})


// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler