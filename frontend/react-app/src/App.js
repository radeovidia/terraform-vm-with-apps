import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('form'); // 'form' atau 'show'
  const [form, setForm] = useState({ name: '', message: '' });
  const [latest, setLatest] = useState(null);

  // Variabel API agar otomatis deteksi IP VM
  const API_BASE_URL = `http://${window.location.hostname}:8080/api/feedback`;

  // Fungsi ambil data terbaru
  const fetchLatest = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/latest`); // Mengarah ke port 8080
      const data = await res.json();
      setLatest(data);
      setPage('show');
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      alert("Backend belum siap atau Port 8080 belum dibuka di Azure!");
    }
  };

  const send = async (e) => {
    e.preventDefault();
    try {
        // CUKUP PAKAI '/api/feedback', Nginx bakal otomatis nembak ke backend
        await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        alert("Feedback Sent!");
        fetchLatest(); 
    } catch (err) {
        console.error("Gagal kirim:", err);
    }
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