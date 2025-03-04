import { useNavigate } from "react-router-dom"


export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
        <head>
            <title>Dashboard</title>
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

        <h1>Future Dashboard Page</h1>
        </>
    )
}