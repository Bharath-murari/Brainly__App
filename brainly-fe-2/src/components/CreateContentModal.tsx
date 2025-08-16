// import { useRef, useState } from "react";
// import { CrossIcon } from "../icons/CrossIcon";
// import { Button } from "./ui/Button";
// import { Input } from "./ui/Input";
// import { BACKEND_URL } from "../config";
// import axios from "axios";

// enum ContentType {
//     Youtube = "youtube",
//     Twitter = "twitter"
// }

// // controlled component
// export function CreateContentModal({open, onClose}) {
//     const titleRef = useRef<HTMLInputElement>();
//     const linkRef = useRef<HTMLInputElement>();
//     const [type, setType] = useState(ContentType.Youtube);

//     async function addContent() {
//         const title = titleRef.current?.value;
//         const link = linkRef.current?.value;

//         await axios.post(`${BACKEND_URL}/api/v1/content`, {
//             link,
//             title,
//             type
//         }, {
//             headers: {
//                 "Authorization": localStorage.getItem("token")
//             }
//         })

//         onClose();

//     }

//     return <div>
//         {open && <div> 
//             <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
               
//             </div>
//             <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
//                 <div className="flex flex-col justify-center">
//                     <span className="bg-white opacity-100 p-4 rounded fixed">
//                         <div className="flex justify-end">
//                             <div onClick={onClose} className="cursor-pointer">
//                                 <CrossIcon />
//                             </div>
//                         </div>
//                         <div>
//                             <Input reference={titleRef} placeholder={"Title"} />
//                             <Input reference={linkRef} placeholder={"Link"} />
//                         </div>
//                         <div>
//                             <h1>Type</h1>
//                             <div className="flex gap-1 justify-center pb-2">
//                                 <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
//                                     setType(ContentType.Youtube)
//                                 }}></Button>
//                                 <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
//                                     setType(ContentType.Twitter)
//                                 }}></Button>
//                             </div>
//                         </div>
//                         <div className="flex justify-center">
//                             <Button onClick={addContent} variant="primary" text="Submit" />
//                         </div>
//                     </span>
//                 </div>     
//             </div>
            
//         </div>}
//     </div>

// }
import { useState, FormEvent } from 'react';
import {  Input } from './ui/Input';
import { Modal} from './ui/Modal';

import {  Button } from './ui/Button';

import api from '../lib/api';
import toast from 'react-hot-toast';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const contentTypes = ['youtube', 'article', 'twitter', 'reddit', 'instagram', 'facebook', 'link'] as const;
type ContentType = typeof contentTypes[number];

export function CreateContentModal({ isOpen, onClose, onSuccess }: Props) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState<ContentType>("youtube");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setTitle("");
        setLink("");
        setType("youtube");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title || !link) {
            toast.error("Please provide a title and a link.");
            return;
        }
        let correctedLink = link.trim();
        if (!correctedLink.startsWith('http://') && !correctedLink.startsWith('https://')) {
            correctedLink = `https://${correctedLink}`;
        }

        setLoading(true);
        try {
            await api.post('/api/v1/content', { title, link: correctedLink, type });
            toast.success("Content added successfully!");
            resetForm();
            onSuccess();
        } catch (error: any) {
            const errorMessage = error.response?.data?.errors?.link?.[0] || "Failed to add content. Please check the URL.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Content">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Awesome Dev Tool"
                    disabled={loading}
                    required
                />
                <Input
                    label="Link"
                    id="link"
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="www.youtube.com/watch?v=..."
                    disabled={loading}
                    required
                />
                <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">Type</label>
                    <div className="grid grid-cols-3 gap-2">
                        {contentTypes.map((contentType) => (
                            <Button
                                key={contentType}
                                type="button"
                                variant={type === contentType ? 'primary' : 'secondary'}
                                onClick={() => setType(contentType)}
                                size="sm"
                            >
                                <span className="capitalize">{contentType}</span>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
                    <Button type="submit" variant="primary" loading={loading}>
                        {loading ? 'Adding...' : 'Add Content'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}