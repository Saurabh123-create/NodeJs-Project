const express = require("express");
require("./db/config");
const users = require("./db/Users");
const products = require("./db/Products");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

const jwtKey = "firstKey";

app.use(cors());
app.use(express.json());

const middleWare = (req,res,next)=>{
  let token = req.headers['authorization']
  if(!token){
    res.status(401).send('Please Provide token')
  }else{
    jwt.verify(token , jwtKey , (err, success)=>{
      if(err){
        res.status(401).send('Please provide valid token');
      }else{
        next()
      }
    })
  }
}

app.get("/", async (req, res) => {
  const result = await users.find();
  res.send(result);
});

app.post("/signup", async (req, res) => {
  try {
    const senddata = new users(req.body);
    let data = await senddata.save();
    data = data.toObject();
    delete data.password;
    if (data) {
      jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          JSON.stringify({ status: "failed", msg: "Something went wrong" });
        }
        res.send(
          JSON.stringify({
            data,
            auth : token,
            status: "success",
            msg: "data added successfully",
          })
        );
      });
    } else {
      JSON.stringify({ status: "failed", msg: "Something went wrong" });
    }
  } catch (error) {
    res.send(JSON.stringify({ status: "failed", msg: "unknown error" }));
  }
});

app.post("/login", async (req, res) => {
  try {
    let result = await users.findOne(req.body).select("-password");
    if (result) {
      jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if(err){
          if (err) {
            JSON.stringify({ status: "failed", msg: "Something went wrong" });
          }
        }
        res.send(
          JSON.stringify({ data: result, auth: token, status: "success" })
        );
      });
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

app.post("/addProducts", middleWare,async (req, res) => {
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

app.delete("/deleteProducts/:_id", middleWare,async (req, res) => {
  try {
    let result = await products.deleteOne(req.params);

    console.log(result);
    if (result.deletedCount > 0) {
      res.send(
        JSON.stringify({
          status: "success",
          data: result,
        })
      );
    } else {
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

app.get("/getProducts", middleWare ,async (req, res) => {
  let result = await products.find();
  res.send(JSON.stringify(result));
});
app.get("/getUpdateProducts:_id", middleWare,async (req, res) => {
  let result = await products.findOne(req.params);
  if (result) {
    res.send(JSON.stringify({ status: "success", data: result }));
  } else {
    res.send(JSON.stringify({ status: "false", msg: "Updation Failed" }));
  }
});

app.put("/updateProduct/:_id", middleWare,async (req, res) => {
  try {
    let result = await products.updateOne(req.params, { $set: req.body });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

app.get("/getProducts/:key",middleWare, async (req, res) => {
  let result = await products.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(JSON.stringify(result));
});

app.listen(3000);
