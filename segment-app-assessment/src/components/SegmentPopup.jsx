import React, { useState } from 'react';
import './SegmentPopup.css'

const SegmentPopup = ({ isOpen, onClose }) => {
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [schemaOptions, setSchemaOptions] = useState([
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ]);
    const [newSchema, setNewSchema] = useState('');

    const handleAddSchema = (selectedValue) => {

        // Removing the selected option from the schemaOptions
        const updatedOptions = schemaOptions.filter(option => option.value !== selectedValue);

        // Updating the options
        setSchemaOptions(updatedOptions); 

        // Add the selected schema
        setSelectedSchemas([...selectedSchemas, selectedValue]);
    };
    

    const handleSaveSegment = () => {
        const data = {
            segment_name: segmentName,
            schema: selectedSchemas.map(schema => ({
                [schema]: schemaOptions.find(option => option.value === schema)?.label,
            })),
        };
    
        // console to verify the structure
        // console.log(JSON.stringify(data, null, 2)); 

        // Sending Data to Server 
    
        fetch('https://webhook.site/85139f20-c090-4cb0-91fc-ddc036f28aea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            onClose(); // Close Btn to Close the popup after saving
        })
        .catch(error => console.error('Error:', error));
    };
    

    return (
        isOpen && (
            <div className="popup-overlay">
                <div className="popup">
                    <h2>Add Segment</h2>
                    <label>
                        Segment Name:
                        <input
                            placeholder='Name of the Segment'
                            type="text"
                            value={segmentName}
                            onChange={(e) => setSegmentName(e.target.value)}
                        />
                    </label>
                    <label>
                        Add schema to segment:
                        <select
                            value={newSchema}
                            onChange={(e) => setNewSchema(e.target.value)}
                        >
                            <option value="">Select schema</option>
                            
                            {schemaOptions
                                .filter(option => !selectedSchemas.includes(option.value)) 
                                .map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                        </select>
                        <button onClick={handleAddSchema}>+ Add new schema</button>
                    </label>
                    <div className="schema-container">
                        {selectedSchemas.map((schema, index) => (
                            <div key={index}>
                                <select
                                    value={schema}
                                    onChange={(e) => {
                                        const updatedSchemas = [...selectedSchemas];
                                        updatedSchemas[index] = e.target.value; 
                                        setSelectedSchemas(updatedSchemas);
                                    }}
                                >
                                    <option value="">Select schema</option>
                                    {schemaOptions
                                        .filter(option => !selectedSchemas.includes(option.value) || option.value === schema)
                                        .map((option, idx) => (
                                            <option key={idx} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                </select>
                                <button className="remove-button" onClick={() => {
                                    const updatedSchemas = selectedSchemas.filter((_, i) => i !== index);
                                    setSelectedSchemas(updatedSchemas);
                                }}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSaveSegment}>Save the segment</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        )
    );
};

export default SegmentPopup;
