import { Router } from "express";
import { sendEmail } from "../utils/mailer.js";
import connection from "../database/database.js";
import { ComparePassword, HashedPassword, getRandomIntInclusive } from "../utils/helper.js";

const user=Router();


//User get operation
user.get('/',(req,res)=>{
    //res.send("Hello World!");
    //res.json({'message':'User Get API Response!'})

    connection.execute('select * from user_information', function(err, result){
        if(err) {
            res.send(err);   
        } else {
            res.json({
                'status':200,
                'message':'User fetched successfully',
                'data':result               
            })
        }
    })
})



//user post api
user.post('/create', (req, res) => {

    const hashedPassword = HashedPassword(req.body.Password);

    connection.execute("insert into user_information (u_email, u_first_name, u_last_name, u_password) values (?,?,?,?)",
        [
            req.body.Email,
            req.body.FirstName,
            req.body.LastName,
            hashedPassword, //req.body.Password
        ],function(err, result){
            if(err) {
                res.send(err);   
            } else {
                res.json({
                    'status':200,
                    'message':'User created successfully',
                    'data':result               
                })
            }
        }
    )
})
// Used for creating admin accounts
user.post('/createAdmin', (req, res) => {

    const hashedPassword = HashedPassword(req.body.Password);

    connection.execute("insert into user_information (u_email, u_first_name, u_last_name, u_password, u_is_admin, u_verified) values (?,?,?,?,?,?)",
        [
            req.body.Email,
            req.body.FirstName,
            req.body.LastName,
            hashedPassword, //req.body.Password
            req.body.IsAdmin,
            req.body.Verified
        ],function(err, result){
            if(err) {
                res.send(err);   
            } else {
                if(result.length==1) {
                    res.json({
                        'status':200,
                        'message':'User created successfully',
                        'data':result               
                    })
                } else {
                    console.log("Duplicate Email not allowed");
                    res.json({
                        'status':400,
                        'message':'User creation failed, duplicate emails not allowed',
                        'data':result               
                    })
                }
                
            }
        }
    )
})

// Put operation
user.put('/update', (req, res) => {
    connection.execute('update user_information set u_first_name=?, u_last_name=? where u_email=?',
        [
            req.body.FirstName,
            req.body.LastName,
            req.body.Email
        ],function(err,result) {
            if(err) {
                res.send(err);   
            } else {
                res.json({
                    'status':200,
                    'message':'User updated successfully',
                    'data':result               
                })
            }
        })
})

// Update First Name
user.put('/update/FirstName', (req, res) => {
    connection.execute('update user_information set u_first_name=? where u_email=?',
        [
            req.body.FirstName,
            req.body.Email
        ],function(err,result) {
            if(err) {
                res.send(err);   
            } else {
                res.json({
                    'status':200,
                    'message':'User updated successfully',
                    'data':result               
                })
            }
        })
})

//Update Last Name

user.put('/update/LastName', (req, res) => {
    connection.execute('update user_information set u_last_name=? where u_email=?',
        [
            req.body.LastName,
            req.body.Email
        ],function(err,result) {
            if(err) {
                res.send(err);   
            } else {
                res.json({
                    'status':200,
                    'message':'User updated successfully',
                    'data':result               
                })
            }
        })
})

//Update Password

user.put('/update/Password', (req, res) => {
    const hashedPassword = HashedPassword(req.body.Password);

    connection.execute('update user_information set u_password=? where u_email=?',
        [
            hashedPassword,
            req.body.Email
        ],function(err,result) {
            if(err) {
                res.send(err);   
            } else {
                res.json({
                    'status':200,
                    'message':'User updated successfully',
                    'data':result               
                })
            }
        })
})


// Delete Operation
user.delete('/delete', (req, res) => {
    connection.execute("delete from user_information where u_email=?", [
        req.body.Email
    ], function(err,result) {
        if(err) {
            res.send(err);   
        } else {
            res.json({
                'status':200,
                'message':'User deleted successfully',
                'data':result               
            })
        }
    })
})


//User login operation
user.post("/login", (req, res) => {
    

    connection.execute(
        "select * from user_information where u_email=?",
        [ 
            req.body.Email,
        ],
        function(err,result) {
            if(err) {
                res.send(err);   
            } else {
                if(result.length==1) {
                    const randomOTP = getRandomIntInclusive(1000, 9999);
                    const verified = result[0].u_verified;
                    
                    console.log(`Random OTP is ${randomOTP}`);
                    const hashedPassword = result[0].u_password;
                    
                    if(ComparePassword(req.body.Password, hashedPassword)) {
                        if(verified === 1) {
                            sendEmail(req.body.Email, "Login OTP Verification",`Your OTP is ${randomOTP}`);
                            res.json({   
                                status:200,
                                "message":'Logged in successfully!',
                                "data":result               
                                })
                        } else {
                            sendEmail(req.body.Email, "Login OTP Verification",`Your OTP is ${randomOTP}`);
                            res.json({   
                                status:200,
                                "message":'Logged in successfully! But be sure to verify!',
                                "data":result               
                                })
                        }
                    } else {
                        res.json({
                            status: 403,
                            "message":'Password is not correct!',             
                        })
                    }

                } else {
                    res.json({
                    status: 403,
                    "message":'Email is not correct!',             
                    })
                }
            }
        }
    )
})

export default user;