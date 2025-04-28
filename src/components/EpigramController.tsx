interface EpigramControllerProps {
    onToggleRefresh: () => void;
    onBack: () => void;
    onNext: () => void;
}

export const EpigramController = ({onToggleRefresh, onBack, onNext}: EpigramControllerProps) => {
    return (
        <>
            <button onClick={onToggleRefresh}>Toggle</button>
            <button onClick={onBack}>Back</button>
            <button onClick={onNext}>Next</button>
        </>
    );
};


export default EpigramController;