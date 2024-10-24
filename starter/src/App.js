import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI"
import Shelves from "./Shelves.js"
import {Route, Routes, useNavigate, Link } from 'react-router-dom'
import Search from "./Search.js"

function App() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([])
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [searchedBooks, setSearchedBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res)
    }
    getBooks();
  }, [books])

  const updateBook = (book, shelf) => {
    const update = async () => {
      const res = await BooksAPI.update(book, shelf)
      console.log(res, "hey response")
      setBooks(books.concat(res))
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
                books={books} 
                onUpdateBook={ (book, shelf) => {updateBook(book, shelf)}}
              />
            }
          />
          <Route 
            exact path="/search"
            element={
              <Search/>
            }
          />
        </Routes>
        <Link className="open-search" to="/search" searchedBooks={searchedBooks}>
          <a>Add a book</a>
        </Link>
      </div>
  );
}


export default App;
