const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter=require("./routes/userRoute")
const authRouter=require("./routes/authRouter")
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connected"));
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)

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
