// IMPORTING MODULES
const express = require("express");
const app =express();
const cors = require("cors"); // deals with cors policy
const cookieParser = require("cookie-parser"); // passing cookie between both end


const dotenv = require("dotenv"); // stores confidential information 
dotenv.config({path:"./config.env"}); // importing .env file

require("./dbconnection/connection"); // coonection to database
const corsOptions = {
    // origin: "http://localhost:3000", // Frontend URL
    origin: process.env.URL, // Frontend URL
    credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions)); // cors policy
app.use(cookieParser());
app.use(express.json()); // convert response into json format


app.use(require("./routes/route")); // importing routes

const PORT = process.env.PORT;
app.listen(PORT, ()=>{console.log(`Server started at port no: ${PORT}`)}) // starting server