const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let ecommerceSchema = new Schema(
    {
         productId:{
                type:String,
                unique:true
         },
         name:{
             type:String,
               default:''
         },
         price:{
           type:Number,
           default:0

         },
         brand:{
             type:String,
             default:''
         },
         seller:{
               type:String,
               default:''
         },
         quantity:{
             type:Number,
             default:0
         },
         category:{
             type:String,
             default:''
         },
         size:{
             type:String,
             default:''
         },
         color:{
              type:String,
              default:''
         },
      specifications:[],
       styleCode:{
            type:String,
            default:''
       }

    }
)


mongoose.model('ecommerce' , ecommerceSchema);

