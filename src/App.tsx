import {useEffect, useState} from 'react'
import './App.css'
import EpigramDisplay from "./components/EpigramDisplay.tsx";
import AddEpigram from "./components/AddEpigram.tsx";

function App() {
  const [epigramIndex, setEpigramIndex] = useState(0);
const [epigrams, setEpigrams] = useState([
    "epigram one",
    "epigram two",
    "epigram three",
]);

  const refreshEpigramSecond = 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setEpigramIndex(prevIndex => (prevIndex + 1) % epigrams.length);
        }, refreshEpigramSecond * 1000);

        return () => clearInterval(interval);
    }, [epigrams.length]);

    const handleAddEpigram = (newEpigram: string) => {
        setEpigrams(prev => [...prev, newEpigram]);
    };

    return (
        <div>
            <h1>Epigram Web App</h1>
            <EpigramDisplay epigram={epigrams[epigramIndex]} />
            <AddEpigram onAdd={handleAddEpigram} />
        </div>
    );
}

export default App
