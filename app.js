require('dotenv').config();
const express = require("express");
const { connectToMongoDB } = require("./connect.js");
const urlRoute = require("./routes/url.js");
const URL = require("./models/url.js");
const cookieParser = require('cookie-parser')
const staticRoute = require('./routes/staticRouter.js')
const path = require("path")
const userRoute = require('./routes/user.js')
const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth.js")
const app = express();
const PORT = process.env.PORT;

connectToMongoDB(process.env.MONGO_URL).then(() => {
  console.log("MongoDb Connected!");
});
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());
app.use(cookieParser())

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use('/',checkAuth,staticRoute)
app.use('/user',userRoute)




app.get('/delete/:id',async(req,res)=>{
  let user =await URL.findOneAndDelete({_id:req.params.id})

  res.redirect('/')
})


app.listen(process.env.PORT || 8080, () => {
  console.log(`Server Started : ${process.env.PORT}`);
});
