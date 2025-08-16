import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
    return (
        <div 
            className="flex h-screen bg-dark-bg text-dark-text overflow-hidden"
            style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #2D2D2D 1px, transparent 0)',
                backgroundSize: '20px 20px',
            }}
        >
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    {/* The Outlet now renders the Dashboard, which contains the Sidebar and content grid */}
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
}