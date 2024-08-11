import {Schema, model} from 'mongoose';

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price: {
        type:Number,
        required: true
    },
    image: {
        type:String,
        required:true
    },
    category:{
        type:String
    },
    band:{
        type:String
    }
});

const Product = model('Product', productSchema);

export default Product;