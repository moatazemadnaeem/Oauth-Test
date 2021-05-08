const mongoose=require('mongoose')


const schema=mongoose.Schema;


const userSchema=new schema({
    username:String,
    googleID:String
})


module.exports=mongoose.model('users',userSchema)