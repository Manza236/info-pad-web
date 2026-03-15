import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import './NoteEditor.css';

const NoteEditor = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...note, title, content });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass note-editor-modal">
        <div className="modal-header">
          <h3>Edit Note</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="editor-form">
          <input 
            type="text" 
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="editor-title"
          />
          <textarea 
            placeholder="Start writing..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="editor-content"
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
