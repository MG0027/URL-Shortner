const express = require('express');
const { connectmongoo } = require('./connenct');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const cookieParser = require("cookie-parser");
const path= require('path');
const staticRoute = require('./routes/staticRouter');
const shortid = require('shortid');
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
connectmongoo("mongodb://127.0.0.1:27017/shorturl").then(()=> console.log('mongoo connected'));

const app = express();
const PORT= 6969;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuth);

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));



app.use('/url', restrictToLoggedinUserOnly(["NORMAL","ADMIN"]),urlRoute)
app.use('/',  staticRoute);
app.use("/user", userRoute);
app.get('/url/:shortID', async(req,res)=>{
  const shortID = req.params.shortID;
 const entry=  await URL.findOneAndUpdate({
   shortID
 },
{ $push:{ visitedHistory: {timestamp: Date.now(),},},});
res.redirect(entry.redirectURL);

})
app.listen(PORT, ()=> console.log('server started'));
