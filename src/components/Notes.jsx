
import { useSelector, useDispatch } from "react-redux";
import { selectnotes, eraseNote, addNotes } from "../store/noteSlice";

function Notes({bookId}) {
    
   

    let notes = useSelector(selectnotes).filter(note => note.book_id == bookId)
    const dispatch = useDispatch()
    function handleEraseNote(id) {
      if(confirm("do you want to erase note ?")) {
        dispatch(eraseNote(id))
      }
     
    }

    function handleAddNote(e) {
      e.preventDefault();
      const newNote = {
        book_id: bookId,
        title:document.querySelector('input[name=title]').value,
        text:document.querySelector('textarea[name=note]').value,
      }
      if(newNote.title && newNote.text) {
          dispatch(addNotes(newNote))
          document.querySelector('input[name=title]').value = "";
          document.querySelector('textarea[name=note]').value = "";
      } else {
          alert("please fill all the mandatory fields")
      }

    }
    
    return (
      <>

        <div className="notes-wrapper">

            <h2>Reader's Notes</h2>

            {
              notes.length ?
              <div className="notes">
              {notes.map(note => 
                  <div key={note.id} className="note">
                      <div onClick={()=>handleEraseNote(note.id)} className="erase-note">Erase note</div>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                  </div>
                  )}
          </div> :
          <p>This book doesnt have any notes</p>
            }

            

            <details>
                <summary>Add a note</summary>
                <form className="add-note">
                    <div className="form-control">
                        <label>Title *</label>
                        <input type="text" name="title" placeholder="Add a note title" />
                    </div>
                    <div className="form-control">
                        <label>Note *</label>
                        <textarea type="text" name="note" placeholder="Add note" />
                    </div>
                    
                    <button onClick={(e) =>handleAddNote(e)} className="btn btn-block">Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  