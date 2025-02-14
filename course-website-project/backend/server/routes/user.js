import { Router } from "express";
const user=Router();

user.get('/',(req,res)=>{
    //res.send("Hello World!");
    res.json({'message':'User Get API Response!'})
})

//get user by id
user.get('/:id',(req,res)=>{
    //res.send("Hello World!");
    res.json({'message':'Get user by API Response! ' + req.params.id})
})




export default user;