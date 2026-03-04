const express=require("express")
const cors = require("cors");

const app=express();
app.use(cors());
app.use(express.json());

app.post("/webhook",async(req,res)=>{
try{
 const {data}=req.body;
 if(!data)
 {
   return res.status(400).json({success:false,message:"string data is not available"})
 }
 
  const charArray=data.split('').sort((a,b)=>a.localeCompare(b))
  return res.status(200).json({success:true,word:charArray})
}catch(err)
{
  console.log(err)
  return res.status(500).json({success:false,message:"internal server error"})
}
})

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
