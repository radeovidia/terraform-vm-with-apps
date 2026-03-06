
import { useState } from "react";

function App(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")

const submit = async () =>{

await fetch("/api/submit",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name,email})
})

}

return (

<div>

<h1>Submit Form</h1>

<input placeholder="name"
onChange={e=>setName(e.target.value)}/>

<input placeholder="email"
onChange={e=>setEmail(e.target.value)}/>

<button onClick={submit}>Submit</button>

</div>

);

}

export default App;
