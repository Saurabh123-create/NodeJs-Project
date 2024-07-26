const express = require('express')
const app = express();

app.get("/",(req,res)=>{
    res.send('Runningg')
})

app.listen(3000)