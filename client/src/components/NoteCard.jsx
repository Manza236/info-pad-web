import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Share2, Edit3, Calendar } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, onShare }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="note-card glass glass-hover"
    >
      <div className="note-card-header">
        <h3>{note.title || 'Untitled Note'}</h3>
        <div className="note-card-actions">
          <button onClick={() => onShare(note)} title="Share"><Share2 size={16} /></button>
          <button onClick={() => onEdit(note)} title="Edit"><Edit3 size={16} /></button>
          <button onClick={() => onDelete(note.id)} title="Delete" className="delete-btn"><Trash2 size={16} /></button>
        </div>
      </div>
      <p className="note-preview">{note.content}</p>
      <div className="note-card-footer">
        <span className="note-date">
          <Calendar size={12} />
          {new Date(note.createdAt?.seconds * 1000).toLocaleDateString()}
        </span>
        {note.shared && <span className="shared-badge">Shared</span>}
      </div>
    </motion.div>
  );
};

export default NoteCard;
