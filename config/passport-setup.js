const passport=require('passport')

const googleSt=require('passport-google-oauth20')
const user=require('../models/userSchema')
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    user.findById(id).then((user)=>{
        done(null,user)
    })
})
passport.use(new googleSt({
    //options 
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL: '/auth/google/redirect'
}
,(accessToken,refreshToken,profile,done)=>{
    //call back function
    console.log(profile)
    user.findOne({googleID:profile.id}).then((currentuser)=>{
        if(currentuser){
            console.log(`user already exists ${currentuser}`)
            done(null,currentuser)
        }else{
            user.create({username:profile.displayName,googleID:profile.id},(err,data)=>{
                if(err){
                    console.log(err)
                }
                console.log(data)
                done(null,data)
            })
        }
    })
   
})
)