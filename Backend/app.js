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
  methods: ["GET","POST","OPTIONS","DELETE","PATCH","PUT"],
  allowedHeaders: ["Content-Type"]
}));
dbConnect();

app.post("/form",async (req,res)=>{
  try{
    const data=req.body;
    console.log(data.email);
    const newEntry = new User(data);
    await newEntry.save();
    res.status(201).send("Data saved to MongoDB");
  }catch(err){
    console.error(err);
  }
});

// app.get("/",async (req,res)=>{
//   try{
//     const data=await User.find({});
//     res.send(JSON.stringify(data));
//     console.log(JSON.stringify(data));

//   }catch(err){
//     console.log(error);
//   }
// })
// routes/items.js or in your main route file
app.get(`/`, async (req, res) => {
  try {
    const { semester } = req.query;

    // Build query object dynamically
    let query = {};
    if (semester) query.sem = Number(semester)  ;
    const data = await User.find(query);
      res.send(JSON.stringify(data));
  } catch (err) {
    console.log("error fetching data from server/mongo",err);
  }
});


app.get('/performance/:email', async (req, res) => {
  const { email } = req.params;
  console.log("Fetching performance for:", email);

  try {
    const posts = await User.find({ email });

    if (!posts || posts.length === 0) {
      return res.status(200).json({ message: "No postings from your side." });
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching performance data:", err);
    res.status(500).json({ error: "Server error" });
  }
});



app.get('/edit/:id',async (req,res)=>{
  const {id}=req.params;
  console.log(id);
  console.log(1);
  try{
    const data=await User.findById(id);
    if(!data)return res.status(404).json({ error: "Session not found" });
    res.send(JSON.stringify(data));
  }catch(err){
    console.log("error fetching data for the edit",err);
  }
});

app.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedSession = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      overwrite: false, // ← use false to update fields without replacing whole document
    });

    if (!updatedSession)
      return res.status(404).json({ error: "Session not found" });

    res.json(updatedSession);
  } catch (err) {
    res.status(500).json({ error: "Error updating session" });
  }
});

app.patch("/", async (req, res) => {
  const { userEmail } = req.body; // Email of the logged-in user
  const { id } = req.body;

  try {
    const post = await User.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const alreadyUpvoted = post.upvotes.includes(userEmail);

    if (alreadyUpvoted) {
      // ❌ Remove upvote
      post.upvotes = post.upvotes.filter((email) => email !== userEmail);
    } else {
      // ✅ Add upvote
      post.upvotes.push(userEmail);
    }

    await post.save();

    return res.status(200).json({
      upvotes: post.upvotes,
      count: post.upvotes.length,
      upvoted: !alreadyUpvoted,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});


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