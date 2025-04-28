import {useCallback, useEffect, useState} from 'react'
import './App.css'
import EpigramCard from "./components/EpigramCard.tsx";
import AddEpigram from "./components/AddEpigram.tsx";
import {createEpigram, getAllEpigrams} from "./services/apiService.ts";
import {Epigram} from "./types/Epigram.ts";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EpigramController from "./components/EpigramController.tsx";

const REFRESH_EPIGRAM_SECONDS = 5;

function App() {
    const [epigramIndex, setEpigramIndex] = useState(0);
    const [epigrams, setEpigrams] = useState<Epigram[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCycling, setIsCycling] = useState(true);
    const [refresh, setRefresh] = useState(REFRESH_EPIGRAM_SECONDS);

    const fetchEpigrams = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getAllEpigrams();
            setEpigrams(res);
            toast.success("Epigrams loaded!");
        } catch (error) {
            toast.error("Failed to fetch epigrams.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveEpigram = useCallback(async (newEpigram: Epigram) => {
        try {
            const createdEpigram = await createEpigram(newEpigram);
            setEpigrams(prev => [...prev, createdEpigram]);
            console.log(epigrams);
            toast.success("Epigram created!");
        } catch (error) {
            toast.error("Failed to create epigram.");
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchEpigrams();
    }, [fetchEpigrams]);

    useEffect(() => {
        if (epigrams.length === 0 || !isCycling) return;

        const interval = setInterval(() => {
            setEpigramIndex(prevIndex => (prevIndex + 1) % epigrams.length);
        }, refresh * 1000);

        return () => clearInterval(interval);
    }, [epigrams.length, isCycling, refresh]);

    const handleAddEpigram = (epigram: Epigram) => {
        if (!epigram.content) {
            toast.error("Please enter a epigram before adding.");
            return;
        }

        saveEpigram(epigram);
    };

    const handleOnToggleRefresh = () => {
        setIsCycling(prev => !prev);
    }

    const currentEpigram = epigrams[epigramIndex];

    return (
        <div>
            <h1>Epigram Web App</h1>

            {isLoading && <p>Loading epigrams...</p>}

            {!isLoading && currentEpigram &&
                <EpigramCard epigram={currentEpigram} isCycling={isCycling} />
            }
            <EpigramController
                onToggleRefresh={handleOnToggleRefresh}
                onBack={() => setEpigramIndex(prevIndex => (prevIndex - 1 + epigrams.length) % epigrams.length)}
                onNext={() => setEpigramIndex(prevIndex => (prevIndex + 1) % epigrams.length)}
            />
            <AddEpigram onAdd={handleAddEpigram}/>
            <ToastContainer/>
        </div>
    );
}

export default App
