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

// const cookieExtractor = function (req) {
//     var token = null;
//     if (req && req.cookies) {
//         token = req.cookies['token'];
//     }
//     return token;
// }

//MiddleWares
server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/uploads', express.static('uploads'));
server.use(cookieParser());
server.use('/villas', villaRouter.router);
server.use('/users', userRouter.router);


server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(process.env.PORT, () => {
    console.log("server started");

});