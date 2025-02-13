//console.log("Hello World!");

import express from 'express';
const app=express();
const port=8080;

app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
});

app.get('/',(req,res)=>{
    //res.send("Hello World!");
    res.json({'message':'Hello World!'})
})

export default app;