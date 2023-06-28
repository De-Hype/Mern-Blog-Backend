const UserModel = require('../Models/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config()

//Register Controller
module.exports.Register = async (req, res) =>{
    try {
        const {firstName, lastName, userName, email, password} = req.body;
        const user = await UserModel.findOne({email})
        if (user) {
           return res.status(401).json({message:'User Already Exist'})
        //    .redirect('/login')
        }
        // console.log('Working Routes');
        // console.log(password);
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt)
        // console.log(hashedPassword)
        //Console.log the password
        //  hashedPassword = bcrypt.hash(password, 16);
        const newUser = new UserModel({firstName, lastName, userName, email, password:hashedPassword, Blog:[]})
        await newUser.save()
       return res.json({newUser})
    } catch (error) {
        console.log(error)
    }
}

//Get ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers =await UserModel.find()
        
        if(!allUsers){
            res.json({message:"No Users Found"})
        }
        res.status('200').json({allUsers})
    } catch (error) {
        console.error('Error Occured')
    }
}
exports.singleUser =  async (req, res) => {
    try {
        const id = req.params.id;
        const singleUser =await UserModel.findById(id).populate('blogs')
        if(!singleUser){
            console.log(singleUser)
            res.json({message:"No User Found"})
        }
        res.status('200').json({singleUser})
    } catch (error) {
        console.error('Error Occured')
    }
}

//Login 

module.exports.Login = async (req, res) =>{
    try {
        const {email, password} = req.body
        const user = await UserModel.findOne({email})
        if (!user) {
            return res.status(401).json({message:'User Does Not Exist'}).redirect('/register')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid){
            return  res.status(404).json({message:'Username Or Password Is Incorrect'})
        }
        const token = jwt.sign({id:user._id}, process.env.jwt_KEY)
        res.json({token, userID:user._id})
    } catch (error) {
        console.log(error)
    }
}

//Change UserName

module.exports.changeUserName = async (req, res) =>{
    
    try{
        const {userName, email, password, user} = req.body
        console.log(userName, email, password, user)
        const userExist = await UserModel.findOne({email})
        if (!userExist){
            return res.status(404).json({message:'User Does Not Exist'})
        }
        const isUserPasswordValid = await bcrypt.compare(password, userExist.password)
        if (!isUserPasswordValid){
            return  res.status(404).json({message:'Username Or Password Is Incorrect'})
        }
        const newDetails = await UserModel.findByIdAndUpdate(user, {
            userName
        })
               console.log('Succesful')
               await newDetails.save()
               res.json({newDetails})

        }catch(err){
            console.log(err)
        }
}