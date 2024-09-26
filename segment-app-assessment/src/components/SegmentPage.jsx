import React, { useState } from 'react';
import SegmentPopup from './SegmentPopup';
import '../components/SegmentPopup.css'




const SegmentPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSaveSegment = () => {
        setIsPopupOpen(true);
    };

    return (
        <div className="segment-page">
            <h2>Saving Segment</h2>
            <button className="save-button" onClick={handleSaveSegment}>
                Save Segment
            </button>
            <SegmentPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    );
};

export default SegmentPage;
