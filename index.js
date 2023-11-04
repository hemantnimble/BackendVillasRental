require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const villaRouter = require('./routes/villaRoutes');
const userRouter = require('./routes/userRoutes');
const bodyParser = require('body-parser');


main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(`mongodb+srv://nimblehemant:${process.env.DB_PASSWORD}@cluster0.kekmg0k.mongodb.net/villasrental`);
    console.log("Db connected")
};

//MiddleWares
server.use(cors());
server.use(bodyParser.json());
server.use('/villas', villaRouter.router);
server.use('/users', userRouter.router);



server.listen(process.env.PORT, () => {
    console.log("server started");

});