import { useNavigate } from "react-router-dom"


export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <>
        

        <button onClick={() => navigate('../dashboard')}>
            Dashboard
        </button>
        <button onClick={() => navigate('../login')}>
            Login
        </button>

        <h1>Future Login Page</h1>
        </>
    )
}