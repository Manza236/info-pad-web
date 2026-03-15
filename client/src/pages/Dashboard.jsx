import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, auth } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { Plus, Search, LogOut, User, Folder, LayoutGrid, Share2 } from 'lucide-react';
import NoteCard from '../components/NoteCard';
import ShareModal from '../components/ShareModal';
import NoteEditor from '../components/NoteEditor';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [sharingNote, setSharingNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [view, setView] = useState('all'); // 'all' or 'shared'

  useEffect(() => {
    if (!user) return;

    let q;
    if (view === 'all') {
      q = query(
        collection(db, "notes"),
        where("userId", "==", user.uid)
      );
    } else {
      q = query(
        collection(db, "notes"),
        where("sharedWith", "array-contains", user.email)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesData.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0)));
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim() && !newNote.content.trim()) return;

    try {
      await addDoc(collection(db, "notes"), {
        ...newNote,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        shared: false
      });
      setNewNote({ title: '', content: '' });
      setIsAdding(false);
    } catch (err) {
      console.error("Error adding note", err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteDoc(doc(db, "notes", id));
      } catch (err) {
        console.error("Error deleting note", err);
      }
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    try {
      const noteRef = doc(db, "notes", updatedNote.id);
      await updateDoc(noteRef, {
        title: updatedNote.title,
        content: updatedNote.content,
        updatedAt: serverTimestamp()
      });
      setEditingNote(null);
    } catch (err) {
      console.error("Error updating note", err);
    }
  };

  const handleShareNote = async (noteId, email) => {
    const noteRef = doc(db, "notes", noteId);
    const note = notes.find(n => n.id === noteId);
    const sharedWith = note.sharedWith || [];
    
    if (sharedWith.includes(email)) throw new Error("Already shared with this user");
    
    await updateDoc(noteRef, {
      sharedWith: [...sharedWith, email],
      shared: true
    });
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar glass">
        <div className="sidebar-header">
          <div className="user-profile">
            <img src={user.photoURL} alt={user.displayName} />
            <div className="user-info">
              <h4>{user.displayName}</h4>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${view === 'all' ? 'active' : ''}`}
            onClick={() => setView('all')}
          >
            <LayoutGrid size={20} /> All Notes
          </button>
          <button 
            className={`nav-item ${view === 'shared' ? 'active' : ''}`}
            onClick={() => setView('shared')}
          >
            <Share2 size={20} /> Shared with me
          </button>
          <button className="nav-item"><Folder size={20} /> Archive</button>
        </nav>

        <button className="logout-btn" onClick={() => auth.signOut()}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="search-box glass">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search your notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={() => setIsAdding(true)}>
            <Plus size={20} /> New Note
          </button>
        </header>

        <div className="notes-grid">
          {isAdding && (
            <form className="note-card glass is-editing" onSubmit={handleAddNote}>
              <input 
                type="text" 
                placeholder="Title" 
                autoFocus
                value={newNote.title}
                onChange={e => setNewNote({...newNote, title: e.target.value})}
              />
              <textarea 
                placeholder="Start writing..."
                value={newNote.content}
                onChange={e => setNewNote({...newNote, content: e.target.value})}
              />
              <div className="form-actions">
                <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Note</button>
              </div>
            </form>
          )}

          {filteredNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={handleDeleteNote}
              onEdit={(n) => setEditingNote(n)}
              onShare={(n) => setSharingNote(n)}
            />
          ))}
        </div>

        {sharingNote && (
          <ShareModal 
            note={sharingNote} 
            onClose={() => setSharingNote(null)} 
            onShare={handleShareNote}
          />
        )}

        {editingNote && (
          <NoteEditor 
            note={editingNote} 
            onClose={() => setEditingNote(null)} 
            onSave={handleUpdateNote}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
