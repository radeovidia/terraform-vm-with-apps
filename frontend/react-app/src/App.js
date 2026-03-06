import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', message: '' });
  const send = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if(res.ok) alert("Sent!");
  };
  return (
    <div className="App">
      <nav><h1>TechCorp</h1></nav>
      <div className="hero"><h2>Digital Solutions</h2></div>
      <form onSubmit={send} className="form-card">
        <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} required />
        <textarea placeholder="Message" onChange={e => setForm({...form, message: e.target.value})} required />
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
}
export default App;