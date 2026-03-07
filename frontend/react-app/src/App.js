
import React, { useState } from "react";
import "./App.css";

export default function App() {

    const [form, setForm] = useState({ name: "", email: "", city: "" });
    const [resp, setResp] = useState(null);

    const change = e => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async e => {
        e.preventDefault();
        const r = await fetch("http://40.65.149.148:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        const d = await r.json();
        setResp(d);
    }

    return (
        <div className="container">
            <h1>🚀 Online Registration</h1>

            <form onSubmit={submit} className="card">
                <input name="name" placeholder="Full Name" onChange={change} />
                <input name="email" placeholder="Email" onChange={change} />
                <input name="city" placeholder="City" onChange={change} />
                <button type="submit">Submit</button>
            </form>

            {resp && (
                <div className="result">
                    <h2>Backend Response</h2>
                    <p>Name: {resp.data.name}</p>
                    <p>Email: {resp.data.email}</p>
                    <p>City: {resp.data.city}</p>
                    <p>Processed: {resp.time}</p>
                </div>
            )}
        </div>
    )
}
