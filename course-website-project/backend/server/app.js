//console.log("Hello World!");
import cors from 'cors';
import express from 'express';
import user from './routes/user.js';
import bodyParser from 'body-parser';


const app=express();
const port=8080;

const myLogger=function (req,res,next) {
    console.log("Logged");
    next();
}

app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
});

app.use(cors({
    origin:'http://localhost:5173', // *
    allowedHeaders:["Content-Type"]
}))
app.use(myLogger);
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    //res.send("Hello World!");
    res.json({'message':'Get API Response!'})
})

app.use('/user',user);

app.get('/:id',(req,res)=>{
    //res.send("Hello World!");
    res.json({'message':'Get API Response! ' + req.params.id})
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

app.all('/secret', (req,res,next) => {
    console.log('Accessing the secret section....')
    res.json({'message':'Should you be here?'})
    next()
})

export default app;

