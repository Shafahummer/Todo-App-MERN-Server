const User = require('../models/user');
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')


exports.signup = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).json({ error: "All fileds are mandatory!" })
    }

    User.findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: "Email id already registered!" })
            } else {

                bcrypt.hash(password, 12, (err, hash) => {
                    if (hash) {
                        const user = new User({
                            email,
                            password:hash,
                            name
                        })

                        user.save((err, user) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Not able to save user in DB"
                                })
                            }
                            res.json({
                                message: "Successfully created...",
                                data: {
                                    name: user.name,
                                    email: user.email,
                                    id: user._id
                                }

                            })
                        })
                    }
                    else{
                        return res.status(400).json({
                            error: "Not able to save user in DB"
                        })
                    }
                });


            }
        })
}

exports.signin = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ error: "All fileds are mandatory!" })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email does not exist!"
            })
        }
        bcrypt.compare(password, user.password, (err, result)=> {
            // result == true
            if(result){
                return res.json({message:"Successfully signed in..."})
            }
            else{
                return res.json({error:"Invalid email or password!"})
            }
        });
    })
}