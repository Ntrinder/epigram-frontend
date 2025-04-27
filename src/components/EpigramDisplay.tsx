import { motion, AnimatePresence } from 'framer-motion';

interface EpigramDisplayProps {
    epigram: string;
}

export const EpigramDisplay = ({ epigram }: EpigramDisplayProps) => {
    return (
        <div className="flex justify-center items-center h-40 mt-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={epigram}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    {epigram}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};


export default EpigramDisplay;