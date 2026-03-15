import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, NotebookPen, ShieldCheck, Share2 } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import './Login.css';

const Login = () => {
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="login-card glass"
      >
        <div className="login-header">
          <div className="logo-icon glass">
            <NotebookPen size={32} className="primary-color" />
          </div>
          <h1 className="font-heading">Info Pad</h1>
          <p className="subtitle">Capture your thoughts, share your wisdom.</p>
        </div>

        <div className="login-features">
          <div className="feature">
            <ShieldCheck size={20} />
            <span>Secure Google Auth</span>
          </div>
          <div className="feature">
            <Share2 size={20} />
            <span>Seamless Sharing</span>
          </div>
        </div>

        <button onClick={handleLogin} className="google-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Continue with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
