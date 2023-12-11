import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Book } from './domain/book';


import { NationalDiteLibrary } from './service/nationalDietLibrary';

function App() {
  const nationalDiteLibrary = new NationalDiteLibrary(
    axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      responseType: 'json',
    })
  );
  nationalDiteLibrary.fromISBN('978-4418163212').then((book: Book) => {
    console.log(book);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
