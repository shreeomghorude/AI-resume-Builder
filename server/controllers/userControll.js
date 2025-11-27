import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.js"
const generateToken = (userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"})
    return token;
}
    // controller for user registration
    //POST: /api/user/register
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        //check if required fields are present

        if(!name, !email, !password){
            return res.status(400).json({massage:"missing required fields"})
        }
        // check if user already exists

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({massage:"user already exists"})
        }
        // create new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({name, email, password:hashedPassword})
    // return sucess message
        const token = generateToken(newUser._id)
        newUser.password = undefined

        return res.status(201).json({message: "user created sucessfully", token , user:newUser})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

 // controller for user login
    //POST: /api/user/login

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        // check if user exists

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({massage:"Invalid email or password"})
        }
         // check if user exists
         if(!user.comparePassword(password)){
            return res.status(400).json({massage:"Invalid email or password"})
         }
    // return sucess message
        const token = generateToken(user._id)
        user.password = undefined

        return res.status(200).json({message: "Login sucessfully", token , user})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

// controoler for getting user from id
// GET: api/users/data

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        // check if user exists
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        user.password = undefined
        return res.status(200).json({user})
        }
    catch (error) {
        return res.status(400).json({message:error.message})
    }
}

// conroller for geting user resumes
// GET: /api/users/resume

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId

        // return user resumes
        const resumes = await Resume.find({userId})
        return res.status(200). json({resumes})
        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}