const express = require('express')
const router =  express.Router();
const appConfig = require('./../../appconfig/appconfig')
const eController  = require('./../controllers/eController')
const auth = require('./../middleware/auth')

module.exports.setRouter = function(app) {

  let baseurl = appConfig.apiVersion+'/products';
  let baseurl1 = appConfig.apiVersion + '/cart';
 

   app.get(baseurl +'/listAll',  eController.getAllProducts);
   /**
	 * @api {get} /api/v1/products/listAll Get all Products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "products  available",
    "status": 200,
    "data": [
        {
            "name": "FastTrack watch",
            "price": 3000,
            "brand": "FastTrack",
            "seller": "advc",
            "quantity": 2,
            "category": "Watch",
            "size": "12",
            "color": "silver",
            "specifications": [],
            "styleCode": "def",
            "productId": "ryByu7YkQ",
            "__v": 0
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "no produxt Available",
	    "status": 500,
	    "data": null
	   }
	 */
   app.post(baseurl + '/create',  eController.createProduct);
   
    /**
	 * @api {post} /api/v1/blogs/create Create blog
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	
	 * @apiParam {String}  name  name of the product passed as a body parameter
	 * @apiParam {String} price    price of the  product passed as a body parameter
	 * @apiParam {String}  brand   brand of the blog passed as a body parameter
	 * @apiParam {String} category category of the  productpassed as a body parameter
   * @apiParam {String}  size     size  of the  product passed as a body parameter
   * @apiParam {String}  styleCode  styleCode  of the  productpassed as a body parameter
   * @apiParam {String}  seller  seller of the  productpassed as a body parameter
   * @apiParam {String}  color   color  of the  product passed as a body parameter
   * @apiParam {String}  quantity   quantity of the  product passed as a body parameter
   
	 *  @apiSuccessExample {json} Success-Response:
	 *   {
    "error": false,
    "message": "product created Succesfully",
    "status": 200,
    "data": [
        {
            "name": "FastTrack watch",
            "price": 3000,
            "brand": "FastTrack",
            "seller": "advc",
            "quantity": 2,
            "category": "Watch",
            "size": "12",
            "color": "silver",
            "specifications": [],
            "styleCode": "def",
            "productId": "ryByu7YkQ",
            "__v": 0
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

   app.get(baseurl + '/view/:productId',  eController.getSingleProduct);
   /**
	 * @api {get} /api/v1/products/view/:productId Get a single  product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 
	 * @apiParam {String} productId The productI should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "product found",
    "status": 200,
    "data": {
        "name": "FastTrack watch",
        "price": 3000,
        "brand": "FastTrack",
        "seller": "advc",
        "quantity": 2,
        "category": "Watch",
        "size": "12",
        "color": "silver",
        "specifications": [],
        "styleCode": "def",
        "_id": "5b0ba7ddb0adb80c34663a21",
        "productId": "ryByu7YkQ",
        "__v": 0
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

   app.post(baseurl + '/delete/:productId' , eController.deleteProduct );
    /**
	 * @api {post} /api/v1/products/delete/:productId Delete  product
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	
	 * @apiParam {String}  ProductId of the  product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Removed Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
   app.put(baseurl + '/edit/:productId',  eController.editProduct );
         /**
	 * @api {put} /api/v1/products/edit/:productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	
	 * @apiParam {String} productId  productId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": " product edited succesfully",
    "status": 200,
    "data": {
        "name": "FastTrack watch",
        "price": 3000,
        "brand": "FastTrack",
        "seller": "advc",
        "quantity": 2,
        "category": "Watch",
        "size": "12",
        "color": "silver",
        "specifications": [],
        "styleCode": "def",
        "_id": "5b0ba7ddb0adb80c34663a21",
        "productId": "ryByu7YkQ",
        "__v": 0
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseurl1 +'/add/:productId',   eController.addToCart);
    /**
	 * @api {get} /api/v1/cart/add/:productId  add product to cart
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	
	 * @apiParam {String} productId The productI should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "product  added to cart",
    "status": 200,
    "data": {
        "name": "FastTrack watch",
        "price": 3000,
        "brand": "FastTrack",
        "seller": "advc",
        "quantity": 2,
        "category": "Watch",
        "size": "12",
        "color": "silver",
        "specifications": [],
        "styleCode": "def",
        "_id": "5b0ba7ddb0adb80c34663a21",
        "productId": "ryByu7YkQ",
        "__v": 0
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

        

   app.post(baseurl1 + '/remove/:productId',  eController.removeFromCart);
    /**
	 * @api {post} /api/v1/cart/delete/:productId Delete  product
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 
	 * @apiParam {String}  ProductId of the  product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Removed Successfully from cart",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
   app.get(baseurl1 +'/listAll', eController.getAllCartProducts);
/**
	 * @api {get} /api/v1/cart/listAll Get all Products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": " al products from the  cart",
    "status": 200,
    "data": [
        {
            "name": "FastTrack watch",
            "price": 3000,
            "brand": "FastTrack",
            "seller": "advc",
            "quantity": 2,
            "category": "Watch",
            "size": "12",
            "color": "silver",
            "specifications": [],
            "styleCode": "def",
            "productId": "ryByu7YkQ",
            "__v": 0
        }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "no produxt Available",
	    "status": 500,
	    "data": null
	   }
	 */
    
}