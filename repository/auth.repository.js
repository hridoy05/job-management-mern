import User from "../models/User.js";
import  BadRequestError  from "../errors/bad-request.js";


async function findUserUsingEmail(email){
    return await await User.findOne({ email }).select('+password')
}


async function updateUser(req){
    console.log("request body" , req.body);
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values')
    }
    
    const user = await User.findOne({ _id: req.user.userId })
    if(!user){
        throw new BadRequestError('no user found') 
    }
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location
  
    const savedUser = await user.save()
  
    const token = user.createJWT()
    return {savedUser, token}

}

async function createUser (name, email, password){
  const userAlreadyExists = findUserUsingEmail(email)
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }
    const user = await User.create({ name, email, password })
    return user
}

export {createUser, findUserUsingEmail, updateUser }