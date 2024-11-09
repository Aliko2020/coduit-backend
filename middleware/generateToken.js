const jwt = require('jsonwebtoken')

const genToken = (res, userId) =>{
    const token = jwt.sign({ userId },process.env.JWT_SECRET,{expiresIn: "1hr"})
    res.status(200).json({token, message: "Login successful"})
}

module.exports = genToken;