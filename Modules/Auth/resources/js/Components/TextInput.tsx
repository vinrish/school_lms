import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    type InputHTMLAttributes,
} from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput(
        { type = 'text', className = '', isFocused = false, ...props },
        ref,
    ) {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => localRef.current!);

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                type={type}
                ref={localRef}
                className={
                    'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-xs transition-colors duration-150 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ' +
                    className
                }
            />
        );
    },
);

export default TextInput;
