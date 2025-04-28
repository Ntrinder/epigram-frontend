import { motion, AnimatePresence } from 'framer-motion';
import {Epigram} from "../types/Epigram.ts";

interface EpigramDisplayProps {
    epigram: Epigram;
    isCycling: boolean;
}

export const EpigramCard = ({ epigram, isCycling }: EpigramDisplayProps) => {
    return (
        <div className="epigram-card">
            {isCycling ? (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={epigram?.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <div>
                                "{epigram?.content}"
                            </div>
                            <div className="author">
                                - {epigram?.author}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            ) : (
                <div>
                    <div>
                        "{epigram?.content}"
                    </div>
                    <div className="author">
                        - {epigram?.author}
                    </div>
                </div>
            )}
        </div>
    );
};


export default EpigramCard;