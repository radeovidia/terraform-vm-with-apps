import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('form'); // 'form' atau 'show'
  const [form, setForm] = useState({ name: '', message: '' });
  const [latest, setLatest] = useState(null);

  // Fungsi ambil data terbaru
  const fetchLatest = async () => {
    const res = await fetch('/api/feedback/latest');
    const data = await res.json();
    setLatest(data);
    setPage('show');
  };

  const send = async (e) => {
    e.preventDefault();
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert("Feedback Sent!");
    fetchLatest(); // Pindah ke halaman response setelah kirim
  };

  return (
    <div className="App">
      <nav>
        <h1 onClick={() => setPage('form')} style={{cursor:'pointer'}}>TechCorp</h1>
        <button onClick={fetchLatest} className="btn-nav">View Last Response</button>
      </nav>

      {page === 'form' ? (
        <div className="content">
          <div className="hero"><h2>Contact Us</h2></div>
          <form onSubmit={send} className="form-card">
            <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <textarea placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      ) : (
        <div className="content">
          <div className="hero"><h2>Latest Response</h2></div>
          <div className="form-card">
            {latest && latest.name ? (
              <>
                <p><strong>From:</strong> {latest.name}</p>
                <p><strong>Message:</strong> {latest.message}</p>
              </>
            ) : <p>No feedback yet.</p>}
            <button onClick={() => setPage('form')}>Back to Form</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;