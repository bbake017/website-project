import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./ResetPassword.css"


export default function ResetPassword() {
    const [enteredOldPassword, setEnteredOldPassword] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);  
    const navigate = useNavigate(); // Hook for programmatic navigation

    function handleInputChange(identifier, value) {
        if (identifier === "oldpassword") {
            setEnteredOldPassword(value);
        } else {
            setEnteredPassword(value);
        }
    }


    const handleReset =  async() => {
        
        setSubmitted(true);
        const formBody = JSON.stringify({
            Password:enteredPassword
        })
        

        const response = await fetch('http://Localhost:8080/user/login',{
            method:'POST',
            body:formBody,
            headers:{
                "content-type":"application/json"
            }

        })

        console.log("info")
        
        if(response.ok) {
            const result = await response.json();
            console.log(response.ok);
            console.log(result);
            navigate('/dashboard');
        } else {
            const result = await response.json();
            console.log(response.ok);
            //navigate('/dashboard');

        }
        

          
        //if(enteredEmail!="") {}

        
    };


    const oldPasswordNotValid = submitted && enteredOldPassword.trim().length < 8;
    const passwordNotValid = submitted && enteredPassword.trim().length < 8;
    return (
        <div id="page">
        <head>
            <title>Password Reset</title>
        </head>

        <button onClick={() => navigate('../dashboard')}>
            Dashboard
        </button>
        <button onClick={() => navigate('../login')}>
            Login
        </button>
        <button onClick={() => navigate('../profile')}>
            Profile
        </button>
        

        <h1>Reset password</h1>


        <div id="login">                    
                <div className="controls">
                    <p>
                        <label>Old Password</label>
                        <input
                            type="oldPassword"
                            className={oldPasswordNotValid ? "invalid" : undefined}
                            onChange={(event) => handleInputChange("oldPassword", event.target.value)}
                        />
                    </p>
                    <p>
                        <label>New Password</label>
                        <input
                            type="password"
                            className={passwordNotValid ? "invalid" : undefined}
                            onChange={(event) => handleInputChange("password", event.target.value)}
                        />
                    </p>
                </div>
                <div className="actions">
                    <button className="loginbutton" onClick={handleReset}>
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    )
}