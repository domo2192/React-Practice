import { React, useState} from 'react';

const BookShelfChanger = (props) => {
  const { book, onUpdateBook } = props;

  const [currentShelf, setCurrentShelf] = useState(book.shelf || '');

  const handleChange = (event) => {
    const newShelf = event.target.value;
    const newShelfState = newShelf === 'none' ? '' : newShelf;
    setCurrentShelf(newShelfState);
    onUpdateBook(book, newShelf);
  };

  return (
    <div className="book-shelf-changer">
      <select value={currentShelf} onChange={handleChange}>
        <option value="" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        {currentShelf && <option value="none">None</option>}
      </select>
    </div>
  );
};

export default BookShelfChanger;