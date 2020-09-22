const User = require('../models/user');

exports.signup = (req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400).json({error:"All fileds are mandatory!"})
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error:"Email id already registered!"})
        }else{
            const user = new User(req.body)

            user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Not able to save user in DB"
                    })
                }
                res.json({
                    message:"Successfully created...",
                    name: user.name,
                    email: user.email,
                    id: user._id
                })
            })
        }
    })
}