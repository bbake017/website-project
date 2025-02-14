//console.log("Hello World!");

import express from 'express';
import user from './routes/user.js';
const app=express();
const port=8080;

const myLogger=function (req,res,next) {
    console.log("Logged");
    next();
}

app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
});

app.use(myLogger);

app.get('/',(req,res)=>{
    //res.send("Hello World!");
    res.json({'message':'Get API Response!'})
})

app.use('/user',user);

app.get('/:id',(req,res)=>{
    //res.send("Hello World!");
    res.json({'message':'Get API Response! ' + req.params.id})
})

app.put('/user',(req,res)=>{

    res.json({'message':'PUT API Response!'})
})

app.get('/example/a', (req,res)=>{
    res.send('Hello from A!')
})

app.get('/example/b', (req, res, next)=>{
    console.log('the response will be sent by the next function...')
    next()
}, (req, res) => {
    res.send('Hello from B!')
})








export default app;