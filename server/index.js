 import express from "express"

 const app=express();

 app.get("/",(req,res)=>{

 })
const PORT =process.env.PORT || 8000
 app.listen(PORT,()=>console.log(`Server running on PORT : ${PORT}`))
