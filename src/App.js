import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //room
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  console.log(message);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Room number"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>join Room</button>
      <input
        placeholder="Message"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />

      <button onClick={sendMessage}>send message</button>
      <h1>MESSAGE:</h1>

      {messageRecieved}
    </div>
  );
}

export default App;
