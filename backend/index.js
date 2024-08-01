const express = require("express");
require("./db/config");
const users = require("./db/Users");
const products = require("./db/Products");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  const result = await users.find();
  res.send(result);
});

app.post("/signup", async (req, res) => {
  try {
    const senddata = new users(req.body);
    const data = await senddata.save();
    res.send(
      JSON.stringify({ status: "success", msg: "data added successfully" })
    );
  } catch (error) {
    res.send(JSON.stringify({ status: "failed", msg: "unknown error" }));
  }
});

app.post("/login", async (req, res) => {
  try {
    let result = await users.findOne(req.body).select("-password");
    if (result) {
      res.send(JSON.stringify({ data: result, status: "success" }));
    } else {
      res.send(
        JSON.stringify({
          status: "failed",
          msg: "Incorrect Password or Username",
        })
      );
    }
  } catch (error) {
    res.send(JSON.stringify(error));
  }
});

//products=============================

app.post("/addProducts", async (req, res) => {
  try {
    let result = new products(req.body);
    let data = await result.save();
    if (data) {
      res.send(
        JSON.stringify({ status: "success", msg: "data added successfully" })
      );
    } else {
      res.send(
        JSON.stringify({
          status: "failed",
          msg: "Error Occured",
        })
      );
    }
  } catch (err) {
    res.send(JSON.stringify({ status: "failed", msg: err }));
  }
});

app.delete("/deleteProducts/:_id", async (req, res) => {
  try {
    let result = await products.deleteOne(req.params);
    
    console.log(result)
    if (result.deletedCount>0) {
      res.send(
        JSON.stringify({
          status: "success",
          data: result,
        })
      );
    }
    else {
        res.send(
          JSON.stringify({
            status: "failed",
            msg: "Deletion Failed",
          })
        );
      }
  } catch (err) {
    res.send(JSON.stringify({ status: "failed", msg: err }));
  }
});

app.get('/getProducts', async (req , res)=>{
    let result = await products.find();
    res.send(JSON.stringify(result))
})
app.get('/getUpdateProducts:_id', async (req , res)=>{
    let result = await products.findOne(req.params);
    if(result){
      res.send(JSON.stringify({status : 'success',data :result}))
    }else{
      res.send(JSON.stringify({status : 'false',msg : 'Updation Failed'}))
    }
})

app.put('/updateProduct/:_id',async (req, res)=>{
  try{
    let result = await products.updateOne(req.params, {$set : req.body})
    res.send(result);
  }catch(err){
    res.send(err)
  }
})

app.listen(3000);
