import Book from "./Book.js"

const Shelf = (({shelvedBooks, title, onUpdateBook}) => {
    return (
        <div className="bookshelf">
            {title && (
                <h2 className="bookshelf-title">{title}</h2>
            )}
            <div className="bookshelf-books">
                <ol className="books-grid">
                {Object.keys(shelvedBooks).map( bookId =>{ 
                    const book = shelvedBooks[bookId]
                    return (
                        <li key={book.id}>
                            <Book book={book} onUpdateBook={onUpdateBook}/>
                        </li>
                    )})}
                </ol>
            </div>
        </div>
    )
})

export default Shelf