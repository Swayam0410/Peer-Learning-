import express from "express";
import cors from "cors";
import User from "./models/user.js";
import dbConnect from "./db.js";
import mongoose from "mongoose";
const app=express();
const port=3000;
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","OPTIONS","DELETE"],
  allowedHeaders: ["Content-Type"]
}));
dbConnect();
app.get("/",(req,res)=>{
  res.send("HELL");
});

app.post("/form",async (req,res)=>{
  try{
    const data=req.body;
    console.log(data);
    const newEntry = new User(data);
    await newEntry.save();
    res.status(201).send("Data saved to MongoDB");
  }catch(err){
    console.error(err);
  }
});

app.get("/form",async (req,res)=>{
  try{
    const data=await User.find({});
    res.send(JSON.stringify(data));
    console.log(JSON.stringify(data));

  }catch(err){
    console.log(error);
  }
})

app.delete('/form', async (req, res) => {
  const { _id } = req.body;
  console.log(typeof _id);
  console.log(mongoose.Types.ObjectId.isValid(_id));  // Should return true

  try {
    const deleted = await User.findByIdAndDelete({_id:_id});
    if (!deleted) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});


app.listen(port,()=>{
  console.log(`App running on port ${port}`)
});