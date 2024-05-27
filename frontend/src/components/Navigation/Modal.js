import React, { useState } from "react";
import "./Modal.css"; 

const Modal = ({ className, description, startYear, endYear, onClose, onSave }) => {
  const [editedClassName, setEditedClassName] = useState(className);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStartYear, setEditedStartYear] = useState(startYear);
  const [editedEndYear, setEditedEndYear] = useState(endYear);

  const handleSave = () => {
    onSave({
      className: editedClassName,
      description: editedDescription,
      startYear: editedStartYear,
      endYear: editedEndYear
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>Edit Class Details</h2>
        <div className="input-group">
          <label>Class Name:</label>
          <input type="text" value={editedClassName} onChange={(e) => setEditedClassName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Start Year:</label>
          <input type="text" value={editedStartYear} onChange={(e) => setEditedStartYear(e.target.value)} />
        </div>
        <div className="input-group">
          <label>End Year:</label>
          <input type="text" value={editedEndYear} onChange={(e) => setEditedEndYear(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Modal;
