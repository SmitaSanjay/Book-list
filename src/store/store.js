import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './bookslice'
import noteReducer from './noteSlice'

export default configureStore({
  reducer: {
    books: booksReducer,
    notes: noteReducer
  }
})