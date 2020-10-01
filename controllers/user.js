const User = require('../models/user')
const multer = require('multer')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = require('../config/keys');


exports.getUser = (req, res) => {
    User.findOne({ email: req.user.email })
        .then(user => {
            if (!user) {
                return res.json({ error: "User not found!" })
            }
            res.json({ user })
        })
}


// if image uploaded to any other resource and only saving the url of image,the use this way
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})
//middleware
exports.upload = multer({ storage }).single('photo')

exports.updateUser = (req, res) => {
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    // console.log("file--->", req.file);

    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    })

    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: uuidv4() + "." + fileType,
        Body: req.file.buffer
    }

    s3.upload(params, (err, data) => {
        if (err) {
            return res.json({ error: err })
        }
        res.json({ data })
    })




    // TodoDetails.findOne({ title: title, createdBy: req.user._id })
    //     .then((savedTodoDetails) => {
    //         if (savedTodoDetails) {
    //             return res.json({ error: "Todo title already exists!" });
    //         } else {
    //             const todoDetails = new TodoDetails({
    //                 createdBy: req.user,
    //                 title,
    //                 education,
    //                 todos,
    //                 todo_date,
    //                 photo
    //             })
    //             todoDetails.save((err, todoDetails) => {
    //                 if (err) {
    //                     return res.json({
    //                         error: "Not able to save todo!"
    //                     })
    //                 }
    //                 todoDetails.createdBy.password = undefined
    //                 todoDetails.createdBy.role = undefined
    //                 res.json({
    //                     message: "Todo created successfully...",
    //                     todo: todoDetails
    //                 })
    //             })
    //         }
    //     })
    // }
}