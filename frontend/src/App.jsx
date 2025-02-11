import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from "./components/Events";
import { MyForm } from './components/MyForm';
import './App.css'

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatEvents, setChatEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatEvent(value) {
      setChatEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat', onChatEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat', onChatEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionManager />
      <ConnectionState isConnected={ isConnected } />
      <Events events={ chatEvents } />
      <MyForm setChatEvents={setChatEvents}/>
    </div>
  );
}

export default App;