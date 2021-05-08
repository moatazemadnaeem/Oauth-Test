const router=require('express').Router()

const check=(req,res,next)=>{
    if(!req.user){
        res.redirect('auth/login')
    }else{
        next()
    }
}
router.get('/',check,(req,res)=>{

    res.render('profile',{user:req.user})
})
module.exports=router;