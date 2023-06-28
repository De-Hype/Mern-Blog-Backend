const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    
    image:{
       
       public_id :{
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true
       }
    },
    content:{
        type:String,
        required:true
    },
    user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

module.exports = mongoose.model('Blog', BlogSchema)