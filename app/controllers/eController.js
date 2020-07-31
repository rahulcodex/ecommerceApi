const mongoose =  require('mongoose');
const shortid = require('shortid')
const  response = require('./../library/responselib')
const logger = require('./../library/loggerlib')
const check = require('./../library/checklib')
const ecommerceSchema  =  require('./../models/eCommerce')




const ecommerceModel = mongoose.model('ecommerce');
const ecartModel = mongoose.model('ecart');


let getAllProducts=(req, res)=>{
    ecommerceModel.find()
    .select('-_v -_id')
    .lean()
    .exec((err,result)=>{
        if(err)
        {
            console.log(err);
            logger.error(err.message , "eController : getAllProducts", 10)
            let apiResponse = response.generate(true, " failed to find product details", 500, null)
             res.send(apiResponse)
        }
        else if(check.isEmpty(result)){
            console.log('no blog found')
           logger.info("no product found", "eController:getallProducts")
           let apiResponse = response.generate(true, "no product found", 404,null)
           res.send(apiResponse)
        }
        else{
             let apiResponse = response.generate(false , "product available", 200, result)
             res.send(apiResponse)
        }
    })

}//end of getAll products


let createProduct =(req, res)=>{
    
       

              if(check.isEmpty(req.body.name)|| check.isEmpty(req.body.price)||check.isEmpty(req.body.brand)|| check.isEmpty(req.body.seller)|| check.isEmpty(req.body.quantity)||check.isEmpty(req.body.category)|| check.isEmpty(req.body.size)||check.isEmpty(req.body.color)||check.isEmpty(req.body.styleCode)){
                  console.log("403 forbidden request")
                  let apiResponse = response.generate(true, "required parameters are missing", 403, null)
                  res.send(apiResponse)
              }
              else{
                  //var today = Date.now()
                  let productId = shortid.generate();

                  let newProduct = new ecommerceModel({
                      productId:productId,
                      name:req.body.name,
                      price:req.body.price,
                      brand:req.body.brand,
                      seller:req.body.seller,
                      quantity:req.body.quantity,
                      category:req.body.category,
                      size:req.body.size,
                      color:req.body.color,
                      styleCode:req.body.styleCode


                  })
                  let specifications =(req.body.specifications!=undefined && req.body.specifications!=null && req.body.specifications!='')?req.body.specifications.spli(','):[]
                  newProduct .specifications = specifications
                  newProduct.save((err, result)=>{
                      if(err)
                      {
                          console.log("error occured")
                          logger.error(`error cooured ${err}`, Database, 10)
                          let apiResponse = response.generate(true, 'error occured' , 500,null)
                           res.send(apiResponse)
                      }
                      else{
                         console.log(" product created succesfully ")
                         res.send(result)
                      }
                  })
              }
}//end of createProduct function


let getSingleProduct=(req, res)=>{
     if(check.isEmpty( req.params.productId))
     {
          let apiResponse  = response.generate(true, 'productId is missing', 403, null)
          res.send(apiResponse) 
     }
     else{
         ecommerceModel.findOne({'productId':req.params.productId} , (err, result)=>{
              if(err)
              {
                  logger.error(`error  occured ${err}` , 'Database', 10)
                  let apiResponse = response.generate(true, 'error occured', 500,null)
                  res.send(apiResponse)
              }
              else if(check.isEmpty(result)){
                  let apiResponse = response.generate(true, ' product not found',404,null)
                  res.send(apiResponse)
              }
              else{
                  let apiResponse = response.generate(false , 'product found', 200, result)
                  res.send(apiResponse)
              }
         })
     }

}//end of getSingleProduct function



let deleteProduct =(req, res)=>{

    if(check.isEmpty(req.params.productId)){
        console.log('productId sholud be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403,null)
        res.send(apiResponse)
    }

    ecommerceModel.remove({'productId': req.params.productId}, (err, result)=>{
        if(err){
             logger.error(`error occured  ${err}`, 'Database', 10)
             let apiResponse = response.generate(true, 'error occured', 500, null)
             res.send(apiResponse)
        }
        else if(check.isEmpty(result))
        {
            let apiResponse = response.generate(true, 'product not found', 404,null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false, 'product  removed succesfully', 200 , result)
            res.send(apiResponse)
        }
    })
}// end of deleteProduct Function

let editProduct=(req, res)=>{
    if(check.isEmpty(req.params.productId))
    {
        console.log('productId should be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    }
    else{
        let options = req.body;
        ecommerceModel.update({'productId':req.params.productId}, options,{multi:true}, (err, result)=>{
             if(err)
             {
                 logger.error(`error occured ${err}`, 'Database', 10)
                  let apiResponse = response.generate(true, 'error occured', 500,null)
             }
             else if (check.isEmpty(result))
             {
                 let apiResponse = response.generate(true, 'product not found', 404,null)
                 res.send(apiResponse)
             }
             else{
                 let apiResponse = response.generate(false, 'product edited succesfully', 200, result)
                 res.send(apiResponse)
             }
        })
    }

}//end of editproduct function

let addToCart=(req, res)=>{
    if(check.isEmpty(req.params.productId))
    {
        let apiResponse=  response.generate(true, 'ProductId missing', 500, null);
        res.send(apiResponse)

    }
    else{
        let options = req.body;
        ecommerceModel.findOne( { 'productId':req.params.productId},(err, result) =>{
                 if(err){
                     logger.error(`error occured: ${err}`, 'Database', 10)
                     let apiResponse = response.generate(true, 'error occured' , 403, null)
                 }
                 else if(check.isEmpty(result)){
                     let apiResponse = response.generate(true, 'product not added to cart' , 404,null)
                     res.send(apiResponse)
                 }
                 else{
                    
                      let cartProduct = new ecartModel({
                          name:result.name,
                          productId:result.productId,
                          price:result.price,
                          brand:result.brand,
                          color:result.color,
                          size:result.size,
                          seller:result.seller,
                          quantity:result.quantity,
                          category:result.category,
                          styleCode:result.styleCode

                      })
                      let specifications =(req.body.specifications!=undefined && req.body.specifications!=null && req.body.specifications!='')?req.body.specifications.spli(','):[]
                      cartProduct .specifications = result.specifications

                      cartProduct.save((err, result)=>{
                          if(err)
                          {
                              let apiResponse = response.generate(true, 'error occured', 403,null)
                              res.send(apiResponse)
                          }
                          else{
                              console.log('product added to cart')
                              res.send(result)
                          }
                      })


                 }
        } )
    }

}//end of addToCart function

let getAllCartProducts=(req, res)=>{
    ecartModel.find()
    .select('-_v -_id')
    .lean()
    .exec((err,result)=>{
        if(err)
        {
            console.log(err);
            logger.error(err.message , "eController : getAllProducts", 10)
            let apiResponse = response.generate(true, " failed to find product details", 500, null)
             res.send(apiResponse)
        }
        else if(check.isEmpty(result)){
            console.log('no blog found')
           logger.info("no product found", "eController:getallProducts")
           let apiResponse = response.generate(true, "no product found", 404,null)
           res.send(apiResponse)
        }
        else{
             let apiResponse = response.generate(false , "product available", 200, result)
             res.send(apiResponse)
        }
    })
} // end of getAllCartProduct  functions

let removeFromCart=(req, res)=>{

    if(check.isEmpty(req.params.productId)){
        console.log('productId sholud be passed')
        let apiResponse = response.generate(true, 'productId is missing', 403,null)
        res.send(apiResponse)
    }

    ecartModel.remove({'productId': req.params.productId}, (err, result)=>{
        if(err){
             logger.error(`error occured  ${err}`, 'Database', 10)
             let apiResponse = response.generate(true, 'error occured', 500, null)
             res.send(apiResponse)
        }
        else if(check.isEmpty(result))
        {
            let apiResponse = response.generate(true, 'product not found', 404,null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false, 'product  removed succesfully', 200 , result)
            res.send(apiResponse)
        }
    })
}//end of remove fromm cart function



module.exports={
    getAllProducts:getAllProducts,
    createProduct:createProduct,
    editProduct:editProduct,
    deleteProduct:deleteProduct,
    getSingleProduct:getSingleProduct,
    addToCart:addToCart,
    removeFromCart:removeFromCart,
    getAllCartProducts:getAllCartProducts
}





