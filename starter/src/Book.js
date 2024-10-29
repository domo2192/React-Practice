import BookShelfChanger from './BookShelfChanger';
const Book = ({book, onUpdateBook }) => {
    return (
            <div className="book">
                <div className="book-top">
                    <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                        `url(${book.imageLinks?.thumbnail || 'default-image-url.jpg'})` 
                    }}
                    ></div>
                   <BookShelfChanger book={book} onUpdateBook={onUpdateBook} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
    )

}

export default Book