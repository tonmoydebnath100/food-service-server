const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app= express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port= process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpylzkg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    const serviceCollecton = client.db('foodservice').collection('foods');
    const reviewCollecton = client.db('foodservice').collection('reviews');
    const orderCollecton = client.db('foodservice').collection('order');
    app.get('/service',async(req,res)=>{
      const query={};
      const cursor=serviceCollecton.find(query);
      const service= await cursor.toArray();
      res.send(service);
    })
    app.get('/service/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const service=await serviceCollecton.findOne(query);
      res.send(service);
    })
    app.post('/review',async(req,res)=>{
      const review=req.body;
      const result=await reviewCollecton.insertOne(review);
      res.send(result);
    })
    app.get('/review/:id',async(req,res)=>{
      const id=req.params.id;
      const query={foodid:id};
      const cursor=reviewCollecton.find(query);
      const review= await cursor.toArray();
      res.send(review);
    })
    app.post('/order',async(req,res)=>{
      const order=req.body;
      const result=await orderCollecton.insertOne(order);
      res.send(result);
    })
    app.get('/order/:email',async(req,res)=>{
      const id=req.params.email;
      const query={email:id};
      const cursor=orderCollecton.find(query);
      const order= await cursor.toArray();
      res.send(order);
    })
    app.post('/foods',async(req,res)=>{
      const food=req.body;
      const result=await serviceCollecton.insertOne(food);
      res.send(result);
    })
  }
  finally{

  }
}
run().catch(err=>console.error(err));

app.get('/', (req,res)=>{
  res.send('server is running')
})

app.listen(port, ()=>{
  console.log('server is running');
})