const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const employeesData = require("./modelEmployes");

const app = express();
app.use(express.json());

const url = process.env.url

app.listen(5000,() => {
    console.log("Server Running at ravi's  5000")
})

const initializeDatabase = async() => {
    try{
        await mongoose.connect(url);
        console.log("Database Connnected")
    }
    catch(e){
       console.log( e.message);

    }
}
initializeDatabase();

//GET METHOD
app.get('/', async (req,res) => {
    try{
    const data = await employeesData.find().sort({_id:1});
     
    res.json(data)
    }
    catch(e){
        res.status(500);
        res.status({error:e.message});
    }
});

//GET SINGLE EMPLOYEE
app.get("/:id", async (req,res )=> {
    try{
        
        const {id} = req.params
        const data =  await employeesData.findOne({_id: id});
        res.json(data);
        console.log(data);
    }
    catch(e){
        res.status(500);
        res.status({error:e.message})
    }

});

//POST METHOD

app.post("/addEmployee/", async(req,res) => {
    const {_id, name, age, salary} = req.body
  try {
    const newEmp = new employeesData({_id, name, age, salary})
    await newEmp.save()
    const emp = await employeesData.find()
    res.json(emp)
    console.log(name);
    // response.send("Hello");

  }
  catch(e){
    res.status(500);
    res.send({error:"User is  already exists"})
  }   

})

app.put("/updateUser/:id", async(req,res) => {
    try{
         
        const {id} = req.params;
        const {name} = req.body
        console.log(name);
        const newData = await employeesData.findByIdAndUpdate(
            {_id:id},
            {name:name},
            {new:true}
        )
        
        res.send(newData);
         

    }
    catch(e){
        console.log(e.message);
    }
})


// DELETE USER

app.delete("/deleteUser/:id",async(request,response) => {
    try{
        const {id} = request.params;
        const deleteData = await employeesData.findByIdAndDelete(id);
        const updatedData = await employeesData.find();
        const message = `user with id:${id} has been deleted`;
        response.send({message,updatedData});
    }
    catch(e){
        response.status(400);
        response.send({error:"Operation failed"})
    }
})



 