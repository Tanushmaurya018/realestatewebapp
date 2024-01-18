const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser=require("cookie-parser")
const userRouter=require("./routes/userRoute")
const authRouter=require("./routes/authRouter")
const listingRouter=require("./routes/listingRouter")
dotenv.config();
const cors=require("cors");
const { verifyToken } = require("./services/verifyToken");
const app = express();
const path=require('path')
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connected"));

// const __dirname = path.resolve();


app.use(express.json())
app.use(cors())
app.use(cookieParser())
// app.use(verifyToken())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter)


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode || 500;
    const message=err.message || `Internal Server Error`;

    return res.json({
        success:false,
        statuscode,
        message
    })
})
app.get("/", (req, res) => {});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
