const express=require("express")
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Lavanya")
})
app.post("/",(req,res)=>{
    const {data}=req.body;
    res.status()
    res.send("Data send")
})
app.listen(5000,()=>{
    console.log("Database is connected")
})



app.post("/", (req, res) => {
    const { data } = req.body; // Extract 'data' from the request body
    res.status(200).json({ message: "Data received", receivedData: data }); // Send a structured JSON response
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000"); // Log a message when the server starts
});
