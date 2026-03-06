import React, { useState } from "react";
import "./App.css";

function App() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")
  const [result,setResult] = useState("")

  const submitFeedback = async (e) => {
    e.preventDefault()

    const res = await fetch("/api/feedback",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        message
      })
    })

    const data = await res.json()
    setResult(data.message)
  }

  return (
    <div className="container">

      <header>
        <h1>DevOps Demo Company</h1>
        <p>Building scalable cloud solutions</p>
      </header>

      <section className="about">
        <h2>About Us</h2>
        <p>
        We are a technology company focused on DevOps,
        cloud infrastructure, and scalable application deployment.
        </p>
      </section>

      <section className="feedback">

        <h2>Send Feedback</h2>

        <form onSubmit={submitFeedback}>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            required
          />

          <button type="submit">
            Submit Feedback
          </button>

        </form>

        <p className="result">{result}</p>

      </section>

    </div>
  )
}

export default App