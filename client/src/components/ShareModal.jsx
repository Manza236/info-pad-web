import React, { useState } from 'react';
import { X, Send, User } from 'lucide-react';
import './ShareModal.css';

const ShareModal = ({ note, onClose, onShare }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await onShare(note.id, email);
      setMessage(`Successfully shared with ${email}`);
      setEmail('');
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <div className="modal-header">
          <h3>Share "{note.title}"</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="share-form">
          <div className="input-group glass">
            <User size={18} />
            <input 
              type="email" 
              placeholder="Enter user email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="share-submit-btn">
            {loading ? 'Sharing...' : 'Share Note'}
            <Send size={18} />
          </button>
        </form>

        {message && <p className={`modal-message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}

        <div className="shared-users">
          <h4>Already shared with:</h4>
          {note.sharedWith && note.sharedWith.length > 0 ? (
            <ul>
              {note.sharedWith.map((userEmail, idx) => (
                <li key={idx} className="glass">{userEmail}</li>
              ))}
            </ul>
          ) : (
            <p className="no-users">Not shared with anyone yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
