import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import { IContent } from "../hooks/useContent"; // Ensure IContent type is accessible
import { Spinner } from "../components/ui/Spinner";
import { Logo } from "../icons/Logo";
import { ContentCard } from "../components/ContentCard"; // Assuming direct import

export function SharePage() {
    const { hash } = useParams<{ hash: string }>();
    const [username, setUsername] = useState<string>("");
    const [content, setContent] = useState<IContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!hash) {
             setError("Invalid share link format.");
             setLoading(false);
             return; // This return exits the useEffect callback
        };

        const fetchSharedContent = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/api/v1/brain/share/${hash}`);
                setUsername(response.data.username);
                setContent(response.data.content);
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || "Could not load this shared brain.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchSharedContent();
    }, [hash]); // Depend on hash to refetch if the URL parameter changes

     const darkBackgroundStyle = {
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(113, 113, 122, 0.2) 1px, transparent 0)',
        backgroundSize: '20px 20px',
    };

    return (
        <div className="min-h-screen bg-zinc-900 text-gray-200" style={darkBackgroundStyle}>
            <header className="py-4 bg-zinc-800 shadow-sm border-b border-zinc-700">
                <div className="container mx-auto px-6 flex items-center gap-3">
                    <Logo className="h-8 w-8 text-purple-500" />
                    <h1 className="text-2xl font-bold text-white">
                        {username ? `${username}'s Brain` : 'Shared Brain'}
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {loading && (
                    <div className="flex justify-center pt-20">
                        <Spinner className="w-10 h-10 text-purple-500" />
                    </div>
                )}
                {error && (
                    <div className="text-center py-20 px-6 bg-red-900/30 text-red-300 rounded-lg border border-dashed border-red-700">
                        <h2 className="text-xl font-semibold">Oops! Could not load brain.</h2>
                        <p className="mt-2 text-sm">{error}</p>
                    </div>
                )}
                {!loading && !error && content.length > 0 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {content.map((item) => (
                             <ContentCard key={item._id} content={item} isReadOnly /> 
                        ))}
                    </div>
                )}
                {!loading && !error && content.length === 0 && (
                    <div className="text-center py-20 px-6 bg-zinc-800 rounded-lg border border-dashed border-zinc-700">
                        <h3 className="text-xl font-medium text-white">This brain is empty.</h3>
                        <p className="mt-2 text-sm text-zinc-400">There is no content to display here yet.</p>
                    </div>
                )}
                 {/* This div ensures padding at the bottom for scrolling */}
                 <div className="pb-12"></div>
            </main>
        </div>
    );
}