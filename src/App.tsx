import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


import { NationalDiteLibrary } from './service/nationalDietLibrary';
import Bookshelf from './domain/bookshelf';

function App() {

  const [isbnList, setIsbnList] = useState<string[]>([]);
  const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json',
  });
  const libraryService = new NationalDiteLibrary(http);

  const onPressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsbnList([...isbnList, e.currentTarget.value]);
      e.currentTarget.value = '';
    }
    // もし改行があるなら改行で区切って追加
    if (e.currentTarget.value.includes('\n')) {
      const _isbnList = e.currentTarget.value.split('\n');
      setIsbnList([...isbnList, ..._isbnList]);
      e.currentTarget.value = '';
    }
    else if(e.currentTarget.value.includes(' ')) {
      const _isbnList = e.currentTarget.value.split(' ');
      setIsbnList([...isbnList, ..._isbnList]);
      e.currentTarget.value = '';
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    console.log(e.currentTarget.dataset.key);
    // 変更をISBN LISTに反映
    const _isbnList = isbnList.map((isbn, idx) => {
      if (idx === Number(e.currentTarget.dataset.key)) {
        return e.currentTarget.value;
      }
      return isbn;
    });
    setIsbnList([..._isbnList]);
  }


  const onCheck = () => {

    Bookshelf.fromISBNList(isbnList, libraryService).then((bookshelf: Bookshelf) => {
      console.log(bookshelf.books);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        {isbnList.map((isbn, idx) => {
            return(
            <div key={idx}>
              <input type="text" data-key={idx} value={isbn} onChange={onChange}  />
            </div>
            )
          })
        }
        {/* ISBN入力欄 enterを押したらisbnListに追加してクリアする */}
        <input type="text" onKeyDown={onPressKey} />
        <input type="button" value="check" onClick={onCheck}/>
      </header>
    </div>
  );
}

export default App;
