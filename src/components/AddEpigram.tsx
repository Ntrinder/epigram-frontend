import { useState } from 'react';
import {Epigram} from "../types/Epigram.ts";

interface AddEpigramProps {
    onAdd: (epigram: Epigram) => void;
}


export const AddEpigram = ({ onAdd } : AddEpigramProps) => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedContent = content.trim();
        const trimmedAuthor = author.trim();
        const trimmedTitle = title.trim();

        if (trimmedContent) {
            const newEpigram: Epigram = {
                title: trimmedTitle || undefined,
                content: trimmedContent,
                author: trimmedAuthor || undefined,
            }

            onAdd(newEpigram);
            setContent('');
            setAuthor('');
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/*<input*/}
            {/*    type="text"*/}
            {/*    value={title}*/}
            {/*    onChange={(e) => setTitle(e.target.value)}*/}
            {/*    placeholder="Enter a title."*/}
            {/*/>*/}
            <div>
                <div>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter a new epigram..."
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter a author..."
                    />
                </div>
                <div>
                    <button type="submit">
                        Add
                    </button>
                </div>
            </div>

        </form>
    );
};



export default AddEpigram;