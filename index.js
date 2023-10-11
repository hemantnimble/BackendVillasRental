// gw4gPrVGNCTWVF9m
const express = require('express');
const mongoose = require('mongoose');
const server = express();
const villaRouter = require('./routes/villaRoutes')

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://nimblehemant:gw4gPrVGNCTWVF9m@cluster0.kekmg0k.mongodb.net/');
    console.log("Db connected")
};

//MiddleWares

server.use('/api',villaRouter.router);



server.listen(3000, () => {
    console.log("server started");

});