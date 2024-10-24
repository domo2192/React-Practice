import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI"
import Shelves from "./Shelves.js"

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([])

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
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Shelves books={books} onUpdateBook={ (book, shelf) => {updateBook(book, shelf)}}/>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
