const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { sendToken } = require("../utils/sendToken")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.registerUser = catchAsyncError(async (req, res, next) => {    
    const findUser = await User.findOne({ email : req.body.email });
    if (findUser) { 
        return next(new ErrorHandler("User already exists", 409));
    }

    const rollNumber = req.body.rollNumber;
    let degree = "", batch="20";
    [...rollNumber].forEach(e => {
        if (e >= 'A' && e <= 'Z') degree += e;
    });
    batch += rollNumber.slice(-2);

    const startYear = Number(batch);
    let endYear;
    if (degree === "BTECH") endYear = startYear+4;
    else if (degree === "MTECH") endYear = startYear+2; 

    let role = "alumni";
    const currentYear = new Date().getFullYear();
    
    if (currentYear >= endYear-1 && currentYear <= endYear) role = "outgoing_student";
    else if (currentYear >= startYear && currentYear < endYear-1) role = "current_student";

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    
    const newUser = await new User({
        role : role,
        name : req.body.name,
        email: req.body.email,
        password : hashPassword,
        rollNumber : rollNumber,
        degree : degree,
        batch : batch,
        dob : req.body.dob,
        address : req.body.address,
        phoneNumber : req.body.phoneNumber,
    });

    const user = await newUser.save();
    sendToken(user, 200, res); 
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // Find user in MongoDB
    const user = await User.findOne({email : email});
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    // Validate Password
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
        return next(new ErrorHandler("Incorrect Password", 400));
    }
    
    sendToken(user, 200, res);
})

exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json('User has been logged out !');
}