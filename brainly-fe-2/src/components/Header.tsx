import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from './ui/Button';

export function Header() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        toast.success("You have been logged out.");
        navigate('/signin');
    };

    return (
        <header className="flex items-center justify-end h-16 px-6 bg-dark-card border-b border-dark-border shrink-0">
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-dark-text">
                    Welcome, {username || 'User'}
                </span>
                <Button onClick={handleLogout} variant="secondary" size="sm">
                    Logout
                </Button>
            </div>
        </header>
    );
}