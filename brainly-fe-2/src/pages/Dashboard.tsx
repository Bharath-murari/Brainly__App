// import { useEffect, useState } from "react"
// import { Button } from "../components/Button"
// import { Card } from "../components/Card"
// import { CreateContentModal } from "../components/CreateContentModal"
// import { PlusIcon } from "../icons/PlusIcon"
// import { ShareIcon } from "../icons/ShareIcon"
// import { Sidebar } from "../components/Sidebar"
// import { useContent } from "../hooks/useContent"
// import { BACKEND_URL } from "../config"
// import axios from "axios"

// export function Dashboard() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const {contents, refresh} = useContent();

//   useEffect(() => {
//     refresh();
//   }, [modalOpen])

//   return <div>
//     <Sidebar />
//     <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
//       <CreateContentModal open={modalOpen} onClose={() => {
//         setModalOpen(false);
//       }} />
//       <div className="flex justify-end gap-4">
//         <Button onClick={() => {
//           setModalOpen(true)
//         }} variant="primary" text="Add content" startIcon={<PlusIcon />}></Button>
//         <Button onClick={async () => {
//             const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
//                 share: true
//             }, {
//                 headers: {
//                     "Authorization": localStorage.getItem("token")
//                 }
//             });
//             const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
//             alert(shareUrl);
//         }} variant="secondary" text="Share brain" startIcon={<ShareIcon />}></Button>
//       </div>

//       <div className="flex gap-4 flex-wrap">
//         {/* {JSON.stringify(contents)} */}
//         {contents.map(({type, link, title}) => <Card 
//             type={type}
//             link={link}
//             title={title}
//         />)}
//       </div>
//     </div>
//   </div>
// }

// import { useEffect, useState } from "react";
// import { Button } from "../components/ui/Button";
// import { CreateContentModal } from "../components/CreateContentModal";
// import { useContent } from "../hooks/useContent";
// import { ContentCard } from "../components/ContentCard";
// import { PlusIcon, ShareIcon } from "../icons"; // Assuming you create these
// import api from "../lib/api";
// import toast from "react-hot-toast";
// import { Spinner } from "../components/ui/Spinner";

// export function Dashboard() {
//     const [modalOpen, setModalOpen] = useState(false);
//     const { contents, loading, refresh, removeContent } = useContent();

//     useEffect(() => {
//         refresh();
//     }, []);

//     const handleShare = async () => {
//         const toastId = toast.loading("Generating share link...");
//         try {
//             const response = await api.post(`/api/v1/brain/share`, { share: true });
//             const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
            
//             await navigator.clipboard.writeText(shareUrl);
//             toast.success("Share link copied to clipboard!", { id: toastId });
//         } catch (error) {
//             toast.error("Failed to generate share link.", { id: toastId });
//         }
//     };
    
//     const handleDelete = async (contentId: string) => {
//         if (!window.confirm("Are you sure you want to delete this content?")) return;
        
//         try {
//             await api.delete(`/api/v1/content/${contentId}`);
//             removeContent(contentId); // Optimistically update UI
//             toast.success("Content deleted.");
//         } catch (error) {
//             toast.error("Failed to delete content.");
//             refresh(); // Refresh to get correct state from server
//         }
//     }

//     return (
//         <>
//             <CreateContentModal
//                 isOpen={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 onSuccess={() => {
//                     setModalOpen(false);
//                     refresh();
//                 }}
//             />
//             <div className="flex justify-between items-center mb-8">
//                  <h1 className="text-3xl font-bold text-gray-800">My Brain</h1>
//                 <div className="flex gap-4">
//                     <Button onClick={() => setModalOpen(true)} variant="primary" startIcon={<PlusIcon />}>
//                         Add Content
//                     </Button>
//                     <Button onClick={handleShare} variant="secondary" startIcon={<ShareIcon />}>
//                         Share Brain
//                     </Button>
//                 </div>
//             </div>

//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <Spinner className="w-8 h-8"/>
//                 </div>
//             ) : contents.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {contents.map((content) => (
//                         <ContentCard 
//                             key={content._id}
//                             content={content}
//                             onDelete={() => handleDelete(content._id)}
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-20 px-6 bg-white rounded-lg border border-dashed">
//                     <h3 className="text-xl font-medium text-gray-900">Your brain is empty!</h3>
//                     <p className="mt-2 text-sm text-gray-500">Click "Add Content" to start collecting.</p>
//                 </div>
//             )}
//         </>
//     );
// }

import { useEffect, useState } from "react";
import { useContent, IContent } from "../hooks/useContent";
import api from "../lib/api";
import toast from "react-hot-toast";

import { Sidebar } from "../components/Sidebar";
import {  Spinner } from "../components/ui/Spinner"; 
import { Button } from "../components/ui/Button";// Assuming ui barrel file
import { CreateContentModal } from "../components/CreateContentModal";
// Assuming components barrel file or direct import if you don't use one
import { ContentCard } from "../components/ContentCard"; 
import { PlusIcon } from "../icons/PlusIcon"; // Assuming icons barrel file
import {  ShareIcon } from "../icons/ShareIcon"; // Assuming icons barrel file


export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, loading, refresh, removeContent } = useContent();
    
    // State to manage the active filter. 'all' is the default.
    const [activeFilter, setActiveFilter] = useState<IContent['type'] | 'all'>('all');

    useEffect(() => {
        // Fetch content when the component mounts or the modal is successfully closed
        refresh();
    }, []);

    // Filter the contents based on the active filter state
    const filteredContents = activeFilter === 'all' 
        ? contents 
        : contents.filter(c => c.type === activeFilter);

    const handleShare = async () => {
        const toastId = toast.loading("Generating share link...");
        try {
            const response = await api.post(`/api/v1/brain/share`, { share: true });
            const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Share link copied to clipboard!", { id: toastId });
        } catch (error) {
            toast.error("Failed to generate share link.", { id: toastId });
        }
    };
    
    const handleDelete = async (contentId: string) => {
        if (!window.confirm("Are you sure you want to delete this content? This action cannot be undone.")) return;
        
        const toastId = toast.loading("Deleting content...");
        try {
            await api.delete(`/api/v1/content/${contentId}`);
            // Optimistically remove from state, then refresh to be sure
            removeContent(contentId); 
            toast.success("Content deleted.", { id: toastId });
            // Optional: If you want to be 100% sure state is correct, uncomment refresh()
            // refresh();
        } catch (error) {
            toast.error("Failed to delete content.", { id: toastId });
            // Always refresh on failure to resync state
            refresh(); 
        }
    };

    // Helper to format the filter name for display
    const formatFilterName = (filter: IContent['type'] | 'all') => {
        if (filter === 'all') return 'All Content';
         // Capitalize the first letter (except for 'link' if you prefer lowercase)
        return filter.charAt(0).toUpperCase() + filter.slice(1);
    };

    return (
        // This flex container is inside AppLayout's main area
        <div className="flex h-full">
            {/* Sidebar is rendered here and controls the active filter */}
            <Sidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {/* Main content area - this is where the dotted background from AppLayout shows */}
            <div className="flex-1 p-8 overflow-y-auto">
                <CreateContentModal
                    isOpen={modalOpen}
                    onClose={() => { setModalOpen(false); refresh(); }} // Refresh when modal closes
                    onSuccess={() => { setModalOpen(false); refresh(); }}
                />
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white capitalize">
                        {formatFilterName(activeFilter)}
                    </h1>
                    <div className="flex gap-4">
                        <Button onClick={() => setModalOpen(true)} variant="primary" startIcon={<PlusIcon className="w-5 h-5"/>}>
                            Add Content
                        </Button>
                        <Button onClick={handleShare} variant="secondary" startIcon={<ShareIcon className="w-5 h-5"/>}>
                            Share Brain
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64"><Spinner className="w-8 h-8 text-purple-500"/></div>
                ) : filteredContents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredContents.map((content) => (
                            <ContentCard key={content._id} content={content} onDelete={() => handleDelete(content._id)} />
                        ))}
                    </div>
                ) : (
                    // Dark theme empty state message
                    <div className="text-center py-20 px-6 bg-zinc-800 rounded-lg border border-dashed border-zinc-700">
                        <h3 className="text-xl font-medium text-white">
                            {activeFilter === 'all' ? 'Your brain is empty!' : `No ${formatFilterName(activeFilter)} content yet.`}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-400">
                            {activeFilter === 'all' ? 'Click "Add Content" to start collecting.' : `Add some ${formatFilterName(activeFilter)} content to see it here.`}
                        </p>
                    </div>
                )}
                 {/* This div ensures padding at the bottom for scrolling */}
                 <div className="pb-12"></div> 
            </div>
        </div>
    );
}