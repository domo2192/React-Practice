import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI"
import Shelves from "./Shelves.js"
import {Route, Routes } from 'react-router-dom'
import Search from "./Search.js"

function App() {
  const [shelvedBooks, setShelevedBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setShelevedBooks(res)
    }
    getBooks();
  }, [])

  const updateBook = (book, shelf) => {
    const update = async () => {
      const res = await BooksAPI.update(book, shelf)
      setShelevedBooks(shelvedBooks.concat(res))
    }
    update();
  }


  return (
      <div className="app">
        <Routes>
          <Route 
            exact path="/" 
            element={
              <Shelves 
                books={shelvedBooks} 
                onUpdateBook={ (book, shelf) => {updateBook(book, shelf)}}
              />
            }
          />
          <Route 
            exact path="/search"
            element={
              <Search 
                shelvedBooks={shelvedBooks}
                onUpdateBook={ (book, shelf) => {updateBook(book, shelf)}}
              />
            }
          />
        </Routes>
      </div>
  );
}


export default App;
