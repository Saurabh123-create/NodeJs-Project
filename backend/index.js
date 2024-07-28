const express = require('express')
require('./db/config')
const users = require('./db/Users')
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/",async(req,res)=>{
    const result = await users.find();
    res.send(result)
})

app.post("/signup", async(req, res)=>{
    try{
        const senddata = new users(req.body);
        const data =  await senddata.save();
        res.send(JSON.stringify({status : 'success',msg:'data added successfully'}))
    }catch(error){
        res.send(JSON.stringify({status : 'failed',msg:'unknown error'}))
    }
})

app.post('/login', async (req, res)=>{
    try{
        let result = await users.findOne(req.body).select('-password');
        if(result){
            res.send(JSON.stringify({data : result, status : 'success'}))
    }else{
        res.send(JSON.stringify({status : 'failed', msg : "Incorrect Password or Username"}))
    }
    }catch(error){
        res.send(JSON.stringify(error))
    }
})

app.listen(3000)