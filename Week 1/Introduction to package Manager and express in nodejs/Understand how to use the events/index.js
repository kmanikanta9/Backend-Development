
const express=require('express')
const logger = require('./eventLogger')
const delayedMessage=require('./delay')
const app=express()

app.get("/test",(req,res)=>{
    res.send("Test route is working!")
})
app.get('/emit',(req,res)=>{
    const message="/emit?message=Server%20started"
    if(!message){
        return res.json({error:"Message query is required."})
    }
    const timestamp=new Date().toISOString();
    logger.emit('log',message)
    res.json({
        status:'Event Logged',
        message:timestamp
    })
})
app.get('/delay', async (req, res) => {
  const { message, time } = req.query

  if (!message || !time) {
    return res.status(400).json({ error: 'Both message and time query parameters are required' });
  }

  try {
    const result = await delayMessage(message, parseInt(time));
    res.json({ delayedMessage: result });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong with the delay' });
  }
});
app.listen(5000,()=>{
    console.log("Port started at 5000")
})