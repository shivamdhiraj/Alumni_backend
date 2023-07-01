const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // for securing response/request headers
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // for logging requests
const dotenv = require('dotenv');
const app = express();
const cloudinary = require("cloudinary");
dotenv.config();

// MongoDB connect
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then((res) => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    })

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

// Auth
app.use('/api/auth', authRoute);

// User
app.use('/api/user', userRoute);

app.listen(8000, () => {
    console.log('Server running at port 8000');
})

app.use(errorMiddleware);