// import { ReactElement } from "react";

// interface ButtonProps {
//     variant: "primary" | "secondary";
//     text: string;
//     startIcon?: ReactElement;
//     onClick?: () => void;
//     fullWidth?: boolean;
//     loading?: boolean;
// }

// const variantClasses = {
//     "primary": "bg-purple-600 text-white",
//     "secondary": "bg-purple-200 text-purple-600",
// };

// const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";


// export function Button({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps) {
//     return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45	" : ""}`} disabled={loading}>
//         <div className="pr-2">
//             {startIcon}
//         </div>
//         {text}
//     </button>
// }


import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    startIcon?: ReactElement;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    startIcon,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

    const variantStyles = {
        primary: 'bg-purple-600 text-white border-transparent hover:bg-purple-700 focus:ring-purple-500',
        secondary: 'bg-purple-100 text-purple-700 border-transparent hover:bg-purple-200 focus:ring-purple-500',
        danger: 'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const iconSizeStyles = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-5 h-5',
    };
    
    const className = clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (loading || props.disabled) && 'opacity-60 cursor-not-allowed',
    );

    return (
        <button className={className} disabled={loading || props.disabled} {...props}>
            {loading && <Spinner className={clsx('mr-2', iconSizeStyles[size])} />}
            {!loading && startIcon && <span className={clsx('mr-2', iconSizeStyles[size])}>{startIcon}</span>}
            {children}
        </button>
    );
}