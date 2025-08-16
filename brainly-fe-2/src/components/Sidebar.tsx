// import { Logo } from "../icons/Logo";
// import { TwitterIcon } from "../icons/TwitterIcon";
// import { YoutubeIcon } from "../icons/YoutubeIcon";
// import { SidebarItem } from "./SidebarItem";

// export function Sidebar() {
//     return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
//         <div className="flex text-2xl pt-8 items-center">
//             <div className="pr-2 text-purple-600">
//                 <Logo />
//             </div>
//             Brainly
//         </div>
//         <div className="pt-8 pl-4">
//             <SidebarItem text="Twitter" icon={<TwitterIcon />} />
//             <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
//         </div>
//     </div>
// }
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { IContent } from "../hooks/useContent";
// FIX: Import the specific icons
import { Logo } from "../icons/Logo";
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { LinkIcon } from '../icons/LinkIcon';
import {  ArticleIcon } from '../icons/ArticleIcon';
import { TwitterIcon} from '../icons/TwitterIcon';
import {  InstagramIcon } from '../icons/InstagramIcon';

interface SidebarProps {
    activeFilter: IContent['type'] | 'all';
    onFilterChange: (filter: IContent['type'] | 'all') => void;
}

// UPDATED: Use the specific icons where available
const filterItems: Array<{ name: IContent['type'] | 'all', icon: React.FC<any>}> = [
    { name: 'all', icon: ArticleIcon }, // Using ArticleIcon as a generic "all" icon
    { name: 'youtube', icon: YoutubeIcon },
    { name: 'article', icon: ArticleIcon },
    { name: 'twitter', icon: TwitterIcon },   // Now using TwitterIcon
    { name: 'reddit', icon: LinkIcon },      // Still using LinkIcon (if no dedicated icon exists)
    { name: 'instagram', icon: InstagramIcon }, // Now using InstagramIcon
    { name: 'facebook', icon: LinkIcon },    // Still using LinkIcon (if no dedicated icon exists)
    { name: 'link', icon: LinkIcon },
];

export function Sidebar({ activeFilter, onFilterChange }: SidebarProps) {
    return (
        // Assuming you are using the "No-Config" dark theme version (using zinc classes)
        // If you have tailwind.config.js, revert bg/border classes to dark-card/dark-border
        <div className="hidden md:flex flex-col w-64 bg-zinc-800 border-r border-zinc-700">
            <div className="flex items-center h-16 px-6 shrink-0">
                <Link to="/app/dashboard" className="flex items-center gap-3">
                    <Logo className="h-8 w-8 text-purple-500" />
                    <span className="text-xl font-bold text-white">Brainly</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
                <nav className="px-4 py-4">
                    <h3 className="px-4 mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">Filters</h3>
                    {filterItems.map(item => (
                        <button
                            key={item.name}
                            onClick={() => onFilterChange(item.name)}
                            className={clsx(
                                'w-full flex items-center px-4 py-2 mt-1 text-sm font-medium rounded-md transition-colors duration-200',
                                activeFilter === item.name
                                    ? 'bg-purple-600 text-white'
                                    : 'text-zinc-400 hover:bg-zinc-700 hover:text-white'
                            )}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span className="capitalize">{item.name === 'all' ? 'All Content' : item.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}