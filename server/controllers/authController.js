const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body
    // console.log(name,email,password)

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists'});
        }
        const saltRounds = 10;
         const hashedPassword = await bcrypt.hash(password, saltRounds);

        user = new User({
            username:name,
            email,
            password:hashedPassword,
        });
        await user.save();
        res.status(200).json({msg: 'User registered successfully'});
    }
    catch(err){
        // console.error(err);
        res.status(500).send('Server Error');
    }
}


exports.loginUser = async (req, res) => {

        const { email, password } = req.body;
try{    
    let user = await User.findOne({ email });
if (!user) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid Credentials' });
}

const payload = {
    user: {
        id: user.id,
        username: user.username,
        email: user.email,
    }
};

jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
    if (err) {
        // console.error('Error generating token:', err);
        return res.status(500).send('Server Error');
    } else {
        // console.log('Token generated successfully:', token);
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    }
});

}catch (error) {
        
    }
}