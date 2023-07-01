const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { getDataUri } = require("../utils/dataUri");
const cloudinary = require("cloudinary");

exports.getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.query.userID);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json(user);
})

exports.getAlumni = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({ role: 'alumni' }).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

exports.getCurrStudents = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({ role: 'current_students' }).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

exports.getOutgoingStudents = catchAsyncError(async (req, res) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find({ role: 'outgoing_students' }).sort({ name : "asc" }).limit(perPage).skip(skipPages);
    res.status(200).json(users);
})

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const perPage = 10; // 50
    const pageNumber = req.query.page;
    const skipPages = perPage * (pageNumber-1);
    const users = await User.find().sort({ name : "asc" }).limit(perPage).skip(skipPages);

    res.status(200).json(users);
})

exports.deleteUser = catchAsyncError(async (req, res) => {
    if (req.data.userID === req.params.userID) {
        await User.findByIdAndDelete(req.params.userID);
        res.status(200).json("User Deleted !");
    } else {
      res.status(403).json("You are not allowed to delete this user");
    }
})

// update basic details
exports.updateUser = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;

    const currUser = await User.findById(userID);
    const profilePicID = currUser.avatar.public_id
    if (profilePicID) {
        await cloudinary.v2.uploader.destroy(profilePicID);
    }

    const updateFields = {};
    
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.location) updateFields.location = req.body.location;
    if (req.body.about) updateFields.about = req.body.about;
    if (req.body.skills) updateFields.skills = req.body.skills;
    if (req.file) {
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // console.log(cloud);
        updateFields.avatar = {
            public_id : cloud.public_id,
            url : cloud.secure_url
        }
    }

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

// update education details
exports.updateEducation = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const updateFields = {
        education : req.body
    };

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

// update experience details
exports.updateExperience = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const currCompany = req.body.filter((exp) => exp.endDate === null);
    const updateFields = {
        experience : req.body
    };
    if (currCompany.length > 0) updateFields.company = currCompany[0].company;

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

// update contact details
exports.updateContact = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const updateFields = {};
    
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.altEmail) updateFields.altEmail = req.body.altEmail;
    if (req.body.phoneNo) updateFields.phoneNo = req.body.phoneNo;
    if (req.body.altPhoneNo) updateFields.altPhoneNo = req.body.altPhoneNo;
    if (req.body.socialHandles) updateFields.socialHandles = req.body.socialHandles;

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})

// update achievements details
exports.updateAchievements = catchAsyncError(async (req, res) => {
    const userID = req.data.userID;
    const updateFields = {
        achievements : req.body
    };

    await User.updateOne({ _id :userID }, { $set : updateFields });
    const user = await User.findById(userID);
    res.status(200).json(user);
})