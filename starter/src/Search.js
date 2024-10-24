import { useState, useEffect } from "react";
import {Link } from 'react-router-dom'
const Search = (searchedBooks) => {
    const findSearchedBooks = (event) => {
        console.log(event.target.value)

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
                <ol className="books-grid"></ol>
            </div>
        </div>
    )
}

export default Search