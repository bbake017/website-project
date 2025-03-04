import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";


export default function SignUp() {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredFirstName, setEnteredFirstName] = useState("");
    const [enteredLastName, setEnteredLastName] = useState("");
    const [submitted, setSubmitted] = useState(false);  
    const navigate = useNavigate(); // Hook for programmatic navigation
    
    function handleInputChange(identifier, value) {
        if (identifier === "email") {
            setEnteredEmail(value);
        } else if (identifier === "password") {
            setEnteredPassword(value);
        } else if (identifier === "firstName") {
            setEnteredFirstName(value);
        } else if (identifier === "lastName") {
            setEnteredLastName(value);
        }

    }



const handleSignIn =  async() => {
        
    setSubmitted(true);
    const formBody = JSON.stringify({
        Email:enteredEmail,
        FirstName:enteredFirstName,
        LastName:enteredLastName,
        Password:enteredPassword
    })
    

    const response = await fetch('http://Localhost:8080/user/create',{
        method:'POST',
        body:formBody,
        headers:{
            "content-type":"application/json"
        }

    })

    console.log("info")
    
    if(response.ok) {
        const result = await response.json();
        console.log(result);
        navigate('/dashboard');
    } else {
        const result = await response.json();
        //navigate('/dashboard');

    }
    //if(enteredEmail!="") {}
   
};
    const emailNotValid = submitted && !enteredEmail.includes("@");
    const passwordNotValid = submitted && enteredPassword.trim().length < 8;
    const firstNameNotValid = submitted && enteredFirstName.includes('1','2','3','4','5','6','7','8','9','0'); 
    const lastNameNotValid = submitted && enteredLastName.includes('1','2','3','4','5','6','7','8','9','0'); 

    return (
        <div id="page">
        <head>
            <title>Account Creation</title>
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
        

        <h1>Make your account here!</h1>

        <div id="login">                    
                <div className="controls">
                    <p>
                        <label>Email</label>
                        <input
                            type="email"
                            className={emailNotValid ? "invalid" : undefined}
                            onChange={(event) => handleInputChange("email", event.target.value)}
                        />
                    </p>
                    <p>
                        <label>First Name</label>
                        <input
                            type="firstName"
                            className={firstNameNotValid ? "invalid" : undefined}
                            onChange={(event) => handleInputChange("firstName", event.target.value)}
                        />
                    </p>
                    <p>
                        <label>Last Name</label>
                        <input
                            type="lastName"
                            className={lastNameNotValid ? "invalid" : undefined}
                            onChange={(event) => handleInputChange("lastName", event.target.value)}
                        />
                    </p>
                    <p>
                        <label>Password</label>
                        <input
                            type="password"
                            className={passwordNotValid ? "invalid" : undefined}
                            onChange={(event) =>
                                handleInputChange("password", event.target.value)
                            }
                        />
                    </p>
                </div>
                <div className="actions">
                    <button className="loginbutton" onClick={handleSignIn}>
                        Create Account
                    </button>
                </div>
            </div>

        </div>
    )
}