const  response = require('./../library/responselib')

let errorHandler=(err, req, res, next)=>{
    console.log('application error handler')
    console.log(err)
    let apiResponse = response.generate(true, 'error occured', 500,null)
    res.send(apiResponse)


}

let notFoundHandler=(req, res, next)=>{

    console.log("global not found hanler called")
    let apiResponse = response.generate(true, 'route not found in the application', 404,null)
    res.status(404).send(apiResponse)

}

 module.exports = {
    globalErrorHandler :errorHandler,
    globalNotFoundHandler:notFoundHandler
}