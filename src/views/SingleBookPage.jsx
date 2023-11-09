import Notes from '../components/Notes.jsx'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooks, eraseBook, toggleRead } from '../store/bookslice.js';
import { eraseBookNote } from '../store/noteSlice.js';

function SingleBookPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleEraseBook(id) {
    if(confirm("do you want to erase the book and all notes associated with it ?")) {
        dispatch(eraseBook(id))
        dispatch(eraseBookNote(id))
        navigate("/")
    }
  }

  const {id} = useParams()

  const books = useSelector(selectBooks)
    
    const book = books.filter(book => book.id == id)[0]
    
    return (
      <>
        <div className="container">
              <Link to="/">
              <button className="btn">
                    ← Back to Books
                </button>
              </Link>
               
            {
              book ?
              <div>
                 <div className="single-book">
                    <div className="book-cover">
                        <img src={book.cover} />
                    </div>

                    <div className="book-details">
                        <h3 className="book-title">{ book.title }</h3>
                        <h4 className="book-author">{ book.author }</h4>
                        <p>{book.synopsis}</p>
                        <div className="read-checkbox">
                            <input onClick={() => dispatch(toggleRead(book.id))} type="checkbox" defaultChecked={book.isRead} />
                            <label>{ book.isRead ? "Already Read It" : "Haven't Read it yet" }</label>
                        </div>
                        <div onClick={()=>handleEraseBook(book.id)} className="erase-book">
                            Erase book
                        </div>
                    </div>
            </div>

            <Notes bookId = {id} />
                </div>
                :
                <div>
                  <p>book does not exist please use above button to navigate to list of books</p>
                </div>
            }
           

        </div>

        
      </>
    )
  }
  
  export default SingleBookPage
  