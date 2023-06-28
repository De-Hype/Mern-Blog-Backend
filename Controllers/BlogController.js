const BlogModel = require('../Models/BlogModel')
const UserModel = require('../Models/UserModel');
const cloudinary = require('../Cloudinary')
const mongoose= require('mongoose')

//addPost, updatePost, deletePost, getPostById, getAllPost

//For ADDING OR PUBLISHING BLOGS
exports.addPost = async  (req, res) =>  {
    
    try {
        const {title, image, content, user} = req.body
        const result  = await cloudinary.uploader.upload(image, {
            folder : "Users",
            transformation:[
                {width:500,
                quality:'auto'}
            ]
        })
        const existing = await UserModel.findById(user)
        if (!existing){
            return res.json({message:"Unable To Find User"})
        }
        const checkTitle = await BlogModel.findOne({title});
        if (checkTitle ){
            res.status(400).json({message:'This Title And Permalink Already Exist'})
        }
       
        const newPost= new BlogModel({
            title, 
            image : {
                public_id:result.public_id,
                url : result.secure_url
            },
            content, 
            user})
        

        let existingUser;
  
        existingUser = await UserModel.findById(user);
                if (!existingUser) {
                return res.status(400).json({ message: "Unable TO FInd User By This ID" });
            }
           
            const session = await mongoose.startSession();
            session.startTransaction();
            await newPost.save({ session });
            existingUser.blogs.push(newPost);
            await existingUser.save({ session });
            await session.commitTransaction();
            res.status(200).json({newPost})
            console.log('Done')
           
    } catch (error) {
        console.error(error)
    }
}

//FOR UPDATING BLOG POST
exports.updatePost = async (req, res) =>{
    try {
        const {title, content} = req.body
        const postId = req.params.id
        const blog = await BlogModel.findByIdAndUpdate(postId, {
            title,
            content
        })
        if (!blog){
            res.json({message:'Unable'})
        }
       await blog.save()
       res.json({blog})
    } catch (error) {
        console.error(error)
    }
}

//For Deleting Blog Post
exports.deletePost = async (req, res) =>{

    const id = req.params.id;

  let blog;
  try {
    blog = await BlogModel.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });


    // try {
    //     const {postId} = req.params
    //     const deletedBlog = await BlogModel.findByIdAndDelete(postId)
    //     // populate("user")
    //     // const deletedPost = await UserModel.Blog.pull(postId)
    //     // await deletedBlog.pull()
    //     await deletedBlog.save()
    //       res.json({message:'Post Succesfully Deleted'})
    //     // AndRemove(postId).populate("user")
    //     // await deletedBlog.user.Blog.pull(deletedBlog)
    //     // await deletedBlog.user.save()
    //     // await deletedBlog.save()
    // } catch (error) {
    //     console.log('Unsuccesful')
    //     console.error(error)
    // }
}

//Get A Particular Post
exports.getSinglePost = async (req, res) => {
    try{
        const PostId = req.params.id
        const post = await BlogModel.findById(PostId)
        if (!post){
            res.json({message:"Post Not Found"})
        }
        res.json({post})
        
    } catch(error){
        console.error(error)
    }
}
//FOR GETTING ALL BLOG POST
exports.getAllPost = async (req, res) =>{
    try {
        const allPost =await BlogModel.find().populate('user')
        // .populate('user')
        if(!allPost){
            res.json({message:"No Posts Found"})
        }
        
        res.status(200).json({allPost})
    } catch (error) {
        console.error('Error Occured')
    }
}
