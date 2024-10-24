import Shelf from "./Shelf.js"


const findCurrentReading = ((books) => books.filter(b => b.shelf === 'currentlyReading'))
const findWantToRead = ((books) => books.filter(b => b.shelf === 'wantToRead'))
const findRead = ((books) => books.filter(b => b.shelf === 'read'))

const Shelves = (({books, onUpdateBook}) => {

    const filteredBooks = findCurrentReading(books)
    const filteredWantToRead = findWantToRead(books)
    const filteredRead = findRead(books)

    return (
        <div className="list-books-content">
            <div>
                <Shelf shelvedBooks={filteredBooks} title={'Current Reading'} onUpdateBook={onUpdateBook}/>
                <Shelf shelvedBooks={filteredWantToRead} title={'Want to Read'} onUpdateBook={onUpdateBook}/>
                <Shelf shelvedBooks={filteredRead} title={'Read'} onUpdateBook={onUpdateBook}/>
            </div>
          </div>
    )
})

export default Shelves