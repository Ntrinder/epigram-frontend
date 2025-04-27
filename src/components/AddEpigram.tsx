import { useState } from 'react';

interface AddEpigramProps {
    onAdd: (epigram: string) => void;
}

export const AddEpigram = ({ onAdd } : AddEpigramProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (trimmed) {
            onAdd(trimmed);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a new epigram..."
            />
            <button type="submit">
                Add
            </button>
        </form>
    );
};



export default AddEpigram;