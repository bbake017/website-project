import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate hook for redirection
import "./Login.css";

export default function UpdateInfo() {
    const [enteredFirstName, setEnteredFirstName] = useState("");
    const [enteredLastName, setEnteredLastName] = useState("");
    const [submitted, setSubmitted] = useState(false);  
    const navigate = useNavigate(); // Hook for programmatic navigation

    function handleInputChange(identifier, value) {
        if (identifier === "firstName") {
            setEnteredFirstName(value);
        } else {
            setEnteredLastName(value);
        }
    }

    const updateFirst =  async() => {
        
        setSubmitted(true);
        const formBody = JSON.stringify({
            FirstName:enteredFirstName,
        }) 

        const response = await fetch('http://Localhost:8080/user/update/FirstName',{
            method:'PUT',
            body:formBody,
            headers:{
                "content-type":"application/json"
            }

        })

        if(response.ok) {
            const result = await response.json();
            console.log(response.ok);
            console.log(result);
            navigate('/dashboard');
        } else {
            const result = await response.json();
            console.log(response.ok);
        }
        

    };

    const updateLast =  async() => {
        
        setSubmitted(true);
        const formBody = JSON.stringify({
            LastName:enteredLastName,
        }) 

        const response = await fetch('http://Localhost:8080/user/update/LastName',{
            method:'PUT',
            body:formBody,
            headers:{
                "content-type":"application/json"
            }

        })

        if(response.ok) {
            const result = await response.json();
            console.log(response.ok);
            console.log(result);
            navigate('/dashboard');
        } else {
            const result = await response.json();
            console.log(response.ok);
        }
        

    };

    const firstNameNotValid = submitted && enteredFirstName.includes('1','2','3','4','5','6','7','8','9','0'); 
    const lastNameNotValid = submitted && enteredLastName.includes('1','2','3','4','5','6','7','8','9','0'); 

    return (
        <div id= "page">
            <head>
                <title>Update Information</title>
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
            <h1>Update Information</h1> 



            <div id="login">                    
                <div className="controls">
                    <p>
                        <label>First Name</label>
                        <input
                            type="firstName"
                            className={firstNameNotValid ? "invalid" : undefined}
                            onChange={(event) => handleInputChange("firstName", event.target.value)}
                        />
                    </p>
                </div>
                <div className="actions">
                    <button className="loginbutton" onClick={updateFirst}>
                        Update First Name
                    </button>
                </div>
                <div className="controls">
                    <p>
                        <label>Last Name</label>
                        <input
                            type="lastName"
                            className={lastNameNotValid ? "invalid" : undefined}
                            onChange={(event) =>
                                handleInputChange("lastName", event.target.value)
                            }
                        />
                    </p>
                </div>
                <div className="actions">
                    <button className="loginbutton" onClick={updateLast}>
                        Update Last NAme
                    </button>
                </div>
            </div>
        </div>
    );
}