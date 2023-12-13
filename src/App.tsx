import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


import { NationalDiteLibrary } from './service/nationalDietLibrary';
import Bookshelf from './domain/bookshelf';

function App() {

  const [isbnList, setIsbnList] = useState<string[]>([]);
  const [bookshelf, setBookshelf] = useState<Bookshelf>();
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
      setBookshelf(bookshelf);
    });
  }

  const onShereUrl = () => {
    const text = `私は今年本を${bookshelf?.books.length}冊読みました。\n総ページ数は${bookshelf?.totalPages()}ページです。\n積み上げると約${bookshelf?.totalThickness()}cmでした!\n`
    // 本棚を共有する
    return `https://twitter.com/intent/tweet?hashtags=今年の読書ログ&text=${text}`;
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
        {bookshelf && <a href={onShereUrl()} target="_blank" rel="noopener noreferrer">共有する</a>}
        { bookshelf && 
          <>
            <h3>本棚</h3>
            <h4>トータル冊数: {bookshelf.books.length}</h4>
            <h4>総ページ数: {bookshelf.totalPages()}</h4>
            {/* グリッド状に本とタイトルを表示する */}
            <div className="grid-container">
              {bookshelf.books.map((book, idx) => {
                return(
                  <div key={idx} className="grid-item">
                    <img src={book.thumbnailUrl()} alt={book.title} onError={(e: any) => {
                        e.target.onError = null; // 下記画像が取得できない場合の無限ループを防ぐため、nullを代入
                        e.target.src = 'https://placehold.jp/180x300.png';
                      }}
                    />
                    <p>{book.title}</p>
                  </div>
                )
              })}
            </div>
          </>
        }
      </header>
    </div>
  );
}

export default App;
