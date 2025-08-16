// import { Signin } from "./pages/Signin"
// import { Signup } from "./pages/Signup"
// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { Dashboard } from "./pages/dashboard"
// function App() {
//   return <BrowserRouter>
//     <Routes>
//       <Route path="api/v1/signup" element={<Signup />} />
//       <Route path="/signin" element={<Signin />} />
//       <Route path="dashboard" element={<Dashboard />} />
//     </Routes>
//   </BrowserRouter>
// }

// export default App
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './pages/LandingPage';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { SharePage } from './pages/SharePage';
import { AppLayout } from './components/AppLayout';

// Component to protect routes that require authentication
function PrivateRoute() {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? <AppLayout /> : <Navigate to="/signin" replace />;
}

function App() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/share/:hash" element={<SharePage />} />
                    
                    {/* Protected Application Routes */}
                    <Route path="/app/*" element={<PrivateRoute />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        {/* Fallback for any other /app routes */}
                        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                    </Route>

                    {/* Redirect root authenticated path to dashboard */}
                    <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;