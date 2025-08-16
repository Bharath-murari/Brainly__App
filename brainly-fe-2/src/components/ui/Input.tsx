// interface InputProps { 
//     placeholder: string; 
//     reference?: any
// }

// export function Input({placeholder, reference}: InputProps) {
//     return <div>
//         <input ref={reference} placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2" ></input>
//     </div>
// }

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

export function Input({ label, id, ...props }: InputProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-dark-text-secondary">
                {label}
            </label>
            <div className="mt-1">
                <input
                    id={id}
                    className="block w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-md shadow-sm text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    {...props}
                />
            </div>
        </div>
    );
}