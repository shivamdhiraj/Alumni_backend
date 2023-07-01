const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        role : {
            type : String,
            required : true,
        },
        name : {
            type : String,
            required: true,
            min: 4,
            max: 20
        },
        avatar: {
            public_id: {
              type: String,
            },
            url: {
              type: String,
              default: "https://res.cloudinary.com/dyjrkaa4n/image/upload/v1687263844/blank-profile-picture-973460_1280_eq15zs.png"
            }
        },
        email : {
            type : String,
            required : true,
            unique: true,
            max: 50
        },
        altEmail : {
            type : String,
            default : ""
        },
        password : {
            type : String,
            required : true,
            min : 4,
            max: 20
        },
        rollNumber : {
            type : String,
            unique: true,
            required : true
        },
        degree : {
            type : String, 
            required : true
        },
        batch : {
            type : String,
            required :true,
        },
        dob : {
            type : Date,
            required : true
        },
        address : {
            type : String,
            default : "",
            max : 150
        },
        phoneNo : {
            type : Number,
            default : null,
        },
        altPhoneNo : {
            type : Number,
            default : null
        },
        title : {
            type : String,
            default : ""
        },
        location : {
            type : String,
            default : ""
        },
        skills : [{
            type: String,
            default : ""
        }],
        about : {
            type : String,
            default : ""
        },
        company : {
            type : String,
            default : ""
        },
        experience : [{
            company : {
                type : String,
            },
            position : {
                type : String,
            },
            startDate : {
                type : Date,
            },
            endDate : {
                type : Date,
            }
        }],
        education : [{
            institution : {
                type : String,
            },
            degree : {
                type : String,
            },
            startDate : {
                type : Date,
            },
            endDate : {
                type : Date,
            }
        }],
        socialHandles : [{
            socialmedianame : {
                type : String,
            }, 
            profilelink : {
                type : String,
            }
        }], 
        achievements : [{
            type : String,
        }]
    },
    {timestamps : true}
)

module.exports = mongoose.model('User', UserSchema);
