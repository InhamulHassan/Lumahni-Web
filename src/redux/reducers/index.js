import { combineReducers } from "redux";

import genreDbReducer from "./genreDbReducer";
import bookDbReducer from "./bookDbReducer";
import bookGrReducer from "./bookGrReducer";
import authorDbReducer from "./authorDbReducer";
import authorGrReducer from "./authorGrReducer";

export default combineReducers({
  genre: genreDbReducer,
  book: bookDbReducer,
  book_gr: bookGrReducer,
  author: authorDbReducer,
  author_gr: authorGrReducer
});
