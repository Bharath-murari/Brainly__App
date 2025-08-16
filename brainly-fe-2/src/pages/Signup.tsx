// import { useRef } from "react";
// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import { useNavigate } from "react-router-dom";

// export function Signup() {
//     const usernameRef = useRef<HTMLInputElement>();
//     const passwordRef = useRef<HTMLInputElement>();
//     const navigate = useNavigate();

//     async function signup() {
//         const username = usernameRef.current?.value;
//         console.log(usernameRef.current)
//         const password = passwordRef.current?.value;
//         await axios.post(BACKEND_URL + "/api/v1/signup", {
//             username,
//             password
//         })
//         navigate("/signin")
//         alert("You have signed up!")
//     }

//     return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
//         <div className="bg-white rounded-xl border min-w-48 p-8">
//             <Input reference={usernameRef} placeholder="Username" />
//             <Input reference={passwordRef} placeholder="Password" />
//             <div className="flex justify-center pt-4">
//                 <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
//             </div>
//         </div>
//     </div>
// }
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import toast from "react-hot-toast";
import { Logo } from "../icons/Logo";

export function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSignup(e: FormEvent) {
        e.preventDefault();
        if (!username || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post("/api/v1/signup", { username, password });
            toast.success(response.data.message);
            navigate("/signin");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const darkBackgroundStyle = {
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(113, 113, 122, 0.2) 1px, transparent 0)',
        backgroundSize: '20px 20px',
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900" style={darkBackgroundStyle}>
             {/* Add animation class if you have it in your CSS */}
            <div className="w-full max-w-md p-8 space-y-6 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 animate-scale-in">
                <div className="text-center">
                    <Logo className="mx-auto h-12 w-auto text-purple-500" />
                    <h1 className="mt-6 text-3xl font-bold text-white">Create an Account</h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link to="/signin" className="font-medium text-purple-500 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSignup} className="space-y-6">
                    <Input
                        label="Username"
                        id="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <Button type="submit" variant="primary" fullWidth loading={loading}>
                        {loading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>
            </div>
        </div>
    );
}