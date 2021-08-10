import React from 'react';
import './App.css';
import RemoveBG from './components/RemoveBG/RemoveBG';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Image Background Removal Tool</p>
      </header>
      <RemoveBG />

    </div>
  );
}

export default App;
