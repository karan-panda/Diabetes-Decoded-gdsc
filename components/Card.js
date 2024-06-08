import { useState } from 'react';
import Modal from './Modal';

const Card = ({ item }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Function to truncate text to a certain number of characters
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="border border-gray-200 rounded-md cursor-pointer" onClick={toggleModal}>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-emerald-700">{item.title}</h3>
                    <p className="mb-2"><strong>Ingredients:</strong> {truncateText(item.ingredients, 72)}</p>
                    <p className="mb-2"><strong>Servings:</strong> {item.servings}</p>
                    <p className="mb-2"><strong>Instructions:</strong></p>
                    <p className="mb-2">{truncateText(item.instructions, 84)}</p>
                    <button className="text-emerald-500 hover:underline" onClick={toggleModal}>Read More...</button>
                </div>
            </div>
            {showModal && <Modal item={item} onClose={toggleModal} />}
        </div>
    );
};

export default Card;