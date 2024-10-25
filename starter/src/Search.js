import { useState, useEffect } from "react";
import {Link } from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"
import Book from './Book'
const Search = ({shelvedBooks, onUpdateBook }) => {
    const [searchedBooks, setSearchedBooks] = useState([])

    useEffect(() => {
        const updatedSearchedBooks = searchedBooks.map((searchedBook) => {
        const shelvedBook = shelvedBooks.find((book) => book.id === searchedBook.id);
        return shelvedBook ? { ...searchedBook, shelf: shelvedBook.shelf } : searchedBook;
        })
        setSearchedBooks(updatedSearchedBooks)

    }, [shelvedBooks])
    
    const searchBooks = (query, maxResults) => {
        const search = async () => {
          const res = await BooksAPI.search(query, maxResults)
          setSearchedBooks(res)
        }
        search();
      }
    
      const findSearchedBooks = (event) => {
          if (event.target.value !== ''){
              searchBooks(event.target.value, 10)
          } else {
            setSearchedBooks([])
          }
    }
    
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                    <div className="search-books-input-wrapper">
                        <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={findSearchedBooks}
                        />
                    </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {Object.keys(searchedBooks).map( bookId =>{ 
                        const book = searchedBooks[bookId]
                        return (
                            <Book book={book} onUpdateBook={onUpdateBook}/>
                        )})}
                </ol>
            </div>
        </div>
    )
}

export default Search