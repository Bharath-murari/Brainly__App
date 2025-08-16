import React from 'react';
import { CrossIcon } from '../../icons/CrossIcon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true">
            <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
            <div className="relative bg-dark-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full border border-dark-border">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                                {title}
                            </h3>
                            <button onClick={onClose} className="p-1 rounded-full text-dark-text-secondary hover:bg-dark-border hover:text-white">
                                <CrossIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}