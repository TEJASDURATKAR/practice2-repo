
const User = require('../model/user-model');
const bcrypt = require('bcrypt');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'NOTESAPI';



const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new user
    const result = await User.create({
      email: email,
      password: hashedPassword,
      username: username
    });
    console.log(result);
     // Generate a JWT token
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    // Send the response
    res.status(201).json({ user: result, token: token });
    console.log(token);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Something went wrong' });
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Generate a JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
    // Send the response
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Something went wrong' });
  }
}



module.exports={signup,signin};