const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

const app = express();
app.use(express.json()); 
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true
}));

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'; // Temporary

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.get('/' , (req,res) => {
    res.json({msg: "This is example"});
})

app.listen(PORT,() => {
    console.log("Server is running on port number " + `${PORT}`);   
})

//Routes
app.use('/user', require('./routes/userRouter')); 
app.use('/api', require('./routes/categoryRouter'));
app.use('/api',require('./routes/upload')) 
app.use('/api',require('./routes/productRouter'))




const URI = process.env.MONGODB_URL;

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDB Connected")
}).catch(err => {
    console.log(err)
})