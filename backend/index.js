 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const cookieParser = require("cookie-parser");
 const cors = require('cors');
 const userRoutes = require("./routes/user");
 const postRoutes = require("./routes/post");
 const app = express();
 require('dotenv').config();

 app.use(cors());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(cookieParser());

 const port = process.env.PORT;

 const connectToDatabase = async() => {
     try {
         await mongoose.connect(process.env.ATLAS_URI);
         console.log("connected to database")
     } catch (error) {
         console.log(error)
     }
 }

 connectToDatabase();

 //user routes
 app.use("/", userRoutes);
 app.use("/",postRoutes);

 //home page
 app.get("/", (req, res) => {
     res.send("it's working!!!")
 })

 app.listen(port, (err) => {
     if (err) console.log(err)
     console.log(`server started at port ${ port }`)
 })