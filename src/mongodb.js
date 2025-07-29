const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/loginsignup")
.then(()=>{
    console.log("MongoDB Connected")
})
.catch(()=>{
    console.log("Failed to connect")
})


const loginsign = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const collection=new mongoose.model("Collections",loginsign)

module.exports=collection