require('dotenv').config()
const express=require('express')
const auth=require('./routes/auth')
const profile=require('./routes/profile')
require('./config/passport-setup')
const mongoose =require('mongoose')
const cookie=require('cookie-session')
const app=express()
const passport=require('passport')
app.set('view engine','ejs')

app.use(cookie({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session());



mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
},(err)=>{err?console.log(err):console.log('connected to the DB')})

app.get('/',(req,res)=>{

    res.render('home', { user: req.user })
})

app.use('/auth',auth)

app.use('/profile',profile)

app.listen(3000,()=>{
    console.log(`listinig in port 3000`)
})