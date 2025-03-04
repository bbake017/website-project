import { useNavigate } from "react-router-dom"


export default function Profile() {
    const navigate = useNavigate();
    return (
        <>
        <head>
            <title>Profile</title>
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
        

        <h1>Future Profile Page</h1>

        <button onClick={() => navigate('../updateinfo')}>
            Update Information
        </button>
        <button onClick={() => navigate('../resetpassword')}>
            Change Password
        </button>
        </>
    )
}