import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await fetch('/api/feedback', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, message: msg })
    });
    alert("Feedback Terkirim!");
    setName(''); setMsg('');
  };

  return (
    <div className="App">
      <nav><h1>🚀 DevCorp</h1></nav>
      <header>
        <h2>Modern Solutions for Modern Problems</h2>
        <p>We build robust systems with Go and React.</p>
      </header>
      <form onSubmit={submit} className="card">
        <h3>Drop a Feedback</h3>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama" required />
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Pesan" required />
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
}
export default App;