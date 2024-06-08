import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ item, onClose }) => {
    // Close the modal when the Escape key is pressed
    const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    // Close the modal when clicking outside of it
    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscapeKey);
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto" onClick={handleClickOutside}>
            <div className="bg-white rounded-lg w-full md:max-w-lg mx-4 shadow-lg max-h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="bg-emerald-500 p-4 rounded-t-lg flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 bg-rose-500 rounded-full text-white hover:bg-rose-700 focus:outline-none"
                        aria-label="Close"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="p-8">
                    <p className="mb-2"><strong>Ingredients:</strong> {item.ingredients}</p>
                    <p className="mb-2"><strong>Servings:</strong> {item.servings}</p>
                    <p className="mb-2"><strong>Instructions:</strong> {item.instructions}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;