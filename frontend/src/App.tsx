import React from 'react';
import './App.scss';
import electron from "electron";
import { auth } from 'google-auth-library';
const { ipcRenderer } = window.require('electron');

function App() {
  function testSend() {
    ipcRenderer.send("CheckAuth");
  }

  let authStatus: string = "Starting";

  ipcRenderer.on('CheckAuth', (event, data) => {
    if (data) {
      authStatus = "File found"
    } else {
      authStatus = "File not found"
    }
  });

  ipcRenderer.on('response-to-renderer', (event, data) => {
    console.log('Response from main process:', data);
  });
  return (
    <div className="App">
      <header className="App-header">
        Test123
        <button onClick={testSend}>Test</button>
        <p>{authStatus}</p>
      </header>
    </div>
  );
}

export default App;
