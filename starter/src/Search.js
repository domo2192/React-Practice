import { useState, useEffect, useCallback } from "react";
import {Link } from 'react-router-dom'
import * as BooksAPI from "./BooksAPI"
import Shelf from './Shelf'
const Search = ({shelvedBooks, onUpdateBook }) => {

    const [query, setQuery] = useState('');
    const [queriedBooks, setQueriedBooks] = useState([]);
  
    const updateQuery = (v) => {
      setQuery(v);
    };
  
    const orderBookByTitle = (a, b) =>  {
      return a.title.localeCompare(b.title);
    };
  
    const updateQueriedBooks = useCallback((results) => {
      const resultIDs = results.map((result) => result.id);
      const shelvedBooksInQuery = shelvedBooks.filter((book) =>
        resultIDs.includes(book.id)
      );
  
      const shelvedIDs = shelvedBooksInQuery.map((book) => book.id);
      const newBooksInQuery = results.filter(
        (result) => !shelvedIDs.includes(result.id)
      );
  
      const allBooks = [...shelvedBooksInQuery, ...newBooksInQuery];
      const sortedBooks = [...allBooks].sort(orderBookByTitle);
  
      setQueriedBooks(sortedBooks);
    }, [shelvedBooks]);
  
  
    useEffect(() => {
      const searchBooks = async () => {
        if (query) {
          try {
            const res = await BooksAPI.search(query.trim());
            if (res && !res.error) {
              updateQueriedBooks(res);
            } else {
              setQueriedBooks([]);
            }
          } catch (error) {
            console.error('Error searching books:', error);
            setQueriedBooks([]);
          }
        } else {
          setQueriedBooks([]);
        }
      };
  
      searchBooks();
    },[query, updateQueriedBooks]);
  
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queriedBooks && queriedBooks.length > 0 && (
                
              <Shelf shelvedBooks={queriedBooks} onUpdateBook={onUpdateBook}/>
            )}
          </ol>
        </div>
      </div>
    );
  };

export default Search