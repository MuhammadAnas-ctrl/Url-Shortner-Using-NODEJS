const User = require('../models/user.js')
const {v4:uuidv4} = require('uuid')
const {setUser} = require('../service/auth.js')

async function handleUserSignup(req,res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/login')
}


async function handleUserlogin(req,res){
    const {name, email, password} = req.body;
    const user = await User.findOne({email,password})
    if(!user) res.render('login',{
        error:"Invaid Username or Password"
    })
    const sessionId = uuidv4()
    setUser(sessionId,user)
    res.cookie('uid', sessionId)
    return res.redirect('/')
}

module.exports = {
    handleUserSignup,
    handleUserlogin
}