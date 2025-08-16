import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Logo } from "../icons/Logo";

export function LandingPage() {
     const darkBackgroundStyle = {
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(113, 113, 122, 0.2) 1px, transparent 0)',
        backgroundSize: '20px 20px',
    };

    return (
        <div className="flex flex-col min-h-screen bg-zinc-900 text-gray-200" style={darkBackgroundStyle}>
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 shadow-sm">
                <Link to="/" className="flex items-center justify-center">
                    <Logo className="h-8 w-8 text-purple-500" />
                    <span className="ml-3 text-xl font-semibold text-white">Brainly</span>
                </Link>
                <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                    <Link to="/signin" className="text-sm font-medium text-zinc-400 hover:text-purple-400 transition-colors">
                        Login
                    </Link>
                    <Link to="/signup">
                        <Button variant="primary">Get Started</Button>
                    </Link>
                </nav>
            </header>
            <main className="flex-1 flex items-center justify-center p-4"> 
                <section className="w-full py-20 md:py-24 lg:py-32 max-w-4xl text-center"> 
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-6">
                            {/* Add animation classes if you have them in your CSS */}
                            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl/none animate-fade-in-up">
                                The Second Brain for Your Digital Life
                            </h1>
                             {/* Add animation classes if you have them in your CSS */}
                            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl animate-fade-in-up animation-delay-200">
                                Collect, organize, and share your favorite content from across the web.
                                From YouTube videos to Twitter threads, keep it all in one place, forever.
                            </p>
                            <div className="space-x-4 pt-4 animate-fade-in-up animation-delay-400">
                                {/* Add animation classes if you have them in your CSS */}
                                <Link to="/signup">
                                    <Button variant="primary" size="lg">Sign Up for Free</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex items-center justify-center w-full h-16 border-t border-zinc-800 bg-zinc-900 text-zinc-500 text-sm">
                <p>© {new Date().getFullYear()} Brainly. All rights reserved.</p>
            </footer>
        </div>
    );
}