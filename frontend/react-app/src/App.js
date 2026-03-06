import { useState } from "react";

function App() {

  const [name,setName] = useState("")
  const [message,setMessage] = useState("")

  const submit = async () => {

    const res = await fetch("/api/submit",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name})
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div style={{padding:"40px"}}>

      <h2>Submit Form</h2>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <button onClick={submit}>
        Submit
      </button>

      <p>{message}</p>

    </div>
  )
}

export default App