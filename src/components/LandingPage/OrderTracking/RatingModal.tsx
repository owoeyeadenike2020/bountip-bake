import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRateOrder: () => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    if (!isOpen) return null;

    const handleSubmit = () => {
        console.log('Rating:', rating, 'Review:', review);
        setTimeout(() => {
            toast.success('Thank you for your review!');
        }, 1000);
        
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
                {/* Content */}
                <div className="relative z-10">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Rate your Order!
                    </h2>

                    {/* Star Rating */}
                    <div className="flex justify-center gap-3 mb-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="transition-transform hover:scale-110"
                            >
                                <Star
                                    className={`w-14 h-14 ${
                                        star <= (hoverRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-gray-300 text-gray-300'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Review Text Area */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-900 mb-3">
                            Tell us about your order
                        </label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="enter details here"
                            className="w-full h-40 px-4 py-3 bg-[#F2F4F5] rounded-xl border-none resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl mb-3"
                    >
                        Leave a Review
                    </button>

                    {/* Back Button */}
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-4 rounded-xl transition-colors"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RatingModal;