
import './App.css';
import io from 'socket.io-client'
import {useEffect,useState} from  'react'


const socket =io.connect("http://localhost:3001");


function App() {
  const [message,setMessage]=useState("");
  const [messageRecieved,setMessageRecieved]=useState("");

  const sendMessage =() =>{
    socket.emit("send_message",{message})
};
console.log(message)

useEffect(()=>{
   socket.on("receive_message",(data)=>{
     setMessageRecieved(data.message)
   });
},[]);

  return (
    <div className="App">
      <input placeholder="Message" onChange={(event)=>{setMessage(event.target.value)}}></input>
      <button onClick={sendMessage}>send message</button>
      <h1>MESSAGE:</h1>
    
      {messageRecieved}
    </div>
  );
}

export default App;
