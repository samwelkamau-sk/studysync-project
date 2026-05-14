import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome({ setUserName }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setUserName(input);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="bg-indigo-50 p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Welcome to StudySync</h2>
        <p className="text-gray-600 mb-8">What should we call you?</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your name..."
            className="w-full p-4 rounded-xl border-2 border-indigo-200 outline-none focus:border-indigo-500 transition"
            required
          />
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export default Welcome;