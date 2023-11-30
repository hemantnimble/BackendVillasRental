require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const villaRouter = require('./routes/villaRoutes');
const userRouter = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');




main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(`mongodb+srv://nimblehemant:${process.env.DB_PASSWORD}@cluster0.kekmg0k.mongodb.net/villasrental`);
    console.log("Db connected")
};

//MiddleWares
server.use(express.static(path.join(__dirname, 'dist')));
server.use(cors({
    credentials: true,
}));
// server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/uploads', express.static('uploads'));
server.use(cookieParser());
server.use('/villas', villaRouter.router);
server.use('/users', userRouter.router);



server.listen(process.env.PORT, () => {
    console.log("server started");

});