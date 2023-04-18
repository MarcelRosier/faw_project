import React from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
    <header className='index-header'>
      <h1 className="display-2 index-header-h1"><em>Chapter One</em></h1>
      <p className="lead" style={{fontSize:"4vh", fontStyle:"italic"}}>
        Explore endless worlds, <br />
        one <strong>book</strong> at a time.
      </p>
      <a className="btn btn-light btn-lg m-3" href="/src/shop.html"
        >Start exploring</a
      >
    </header>
    </div>
  )
}

export default App;
