import mongoose from "mongoose";

const prd_schema = mongoose.Schema({
    name : {type : String, required : true},
    price : {type: Number, requried : true},
    description : {type : String, required : false},
    image : {type : String, required : true},
    category : {
        type : String,
        required : true,
        enum : ["course", "template"],
    },
});

export const Product = mongoose.model("Product",prd_schema);