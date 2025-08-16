import React from 'react';
// Assuming IContent is defined in hooks/useContent or a types file
import { IContent } from '../hooks/useContent'; 
// Import all necessary icons
import { TrashIcon} from '../icons/TrashIcon';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { LinkIcon } from '../icons/LinkIcon';
import {  ArticleIcon } from '../icons/ArticleIcon';
import { TwitterIcon} from '../icons/TwitterIcon';
import {  InstagramIcon } from '../icons/InstagramIcon';

interface CardProps {
    content: IContent;
    onDelete?: () => void;
    isReadOnly?: boolean; // Determines if delete button is shown and influences styling
}

// Configuration for each content type, including icon and a suggested color
const typeConfig: Record<IContent['type'], { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string; }> = {
    youtube: { icon: YoutubeIcon, color: "text-red-500" },
    twitter: { icon: TwitterIcon, color: "text-blue-400" },
    reddit: { icon: LinkIcon, color: "text-orange-500" }, // Using LinkIcon as fallback
    instagram: { icon: InstagramIcon, color: "text-pink-500" },
    article: { icon: ArticleIcon, color: "text-gray-400" },
    facebook: { icon: LinkIcon, color: "text-blue-600" }, // Using LinkIcon as fallback
    link: { icon: LinkIcon, color: "text-gray-500" },
};

export function ContentCard({ content, onDelete, isReadOnly = false }: CardProps) {
    const { title, link, type } = content;
    // Fallback to 'link' config if type is unknown or config is missing
    const config = typeConfig[type] || typeConfig.link; 
    const IconComponent = config.icon;

    // Helper function to render the link content if no specific embed is available
    const renderFallbackLink = () => (
        // Styling for the fallback link div inside the card
        // Uses zinc-800 background consistent with the card's main background
        <div className="block p-4 rounded-md h-full bg-zinc-800">
            {/* Title text color */}
            <p className="font-semibold truncate text-white">{title}</p>
            {/* Link text color */}
            <p className="text-sm truncate text-zinc-400">{link}</p>
        </div>
    );

    // Function to render the embedded content (currently only YouTube)
    const renderEmbed = () => {
        if (type === 'youtube' && link.includes('youtube.com/watch?v=')) {
            // Extract video ID from YouTube URL
            const videoId = link.split('v=')[1]?.split('&')[0];
            // If no valid video ID is found, render the fallback link
            if (!videoId) return renderFallbackLink();
            // Construct the embed URL
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            
            // Render the YouTube iframe
            return <iframe className="w-full aspect-video rounded-md bg-black" src={embedUrl} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
        }
        // For all other types or invalid YouTube links, render the fallback link
        return renderFallbackLink();
    };

    return (
        // Main card container styling
        // Uses zinc-800 background and border in dark mode
        // Adds hover effects ONLY when not read-only
        <div className={`rounded-lg border bg-zinc-800 border-zinc-700 flex flex-col justify-between transition-all duration-300 
             ${!isReadOnly ? 'hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20' : ''} `}
        >
            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    {/* Icon and type label section */}
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${config.color}`}>
                        <IconComponent className="w-4 h-4" />
                        <span className="capitalize">{type}</span>
                    </div>
                    {/* Delete button is only shown if the card is NOT read-only */}
                    {!isReadOnly && onDelete && (
                        <button onClick={onDelete} className="p-1 text-zinc-400 rounded-full hover:bg-red-500/10 hover:text-red-500">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
                {/* Area for the embed or fallback link */}
                <div className="min-h-[100px] mt-2">
                    {renderEmbed()}
                </div>
            </div>
            {/* Section below the embed/link, often for title and link text */}
            {/* Uses a consistent border-top in dark mode */}
            <div className={`p-4 border-t border-zinc-700`}>
                 {/* Title text, always white in dark mode */}
                 <h3 className="font-bold truncate text-white" title={title}>{title}</h3>
                 {/* Link text, uses zinc-400 and changes to purple on hover */}
                 <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-purple-400 transition-colors truncate block">
                    {link}
                 </a>
            </div>
        </div>
    );
}