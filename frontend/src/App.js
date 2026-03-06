
import React, { useState } from "react";

export default function App() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");

  const submit = async (e)=>{
    e.preventDefault();

    const res = await fetch("/api/submit",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,email})
    });

    const data = await res.json();
    setMsg("Hello " + data.name + " form submitted!");
  }

  return (
    <div style={{padding:"40px"}}>
      <h1>Demo Form</h1>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e=>setName(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        /><br/><br/>

        <button type="submit">Submit</button>
      </form>

      <p>{msg}</p>
    </div>
  )
}
