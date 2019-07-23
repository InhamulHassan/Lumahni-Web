import { combineReducers } from "redux";

import genreDbReducer from "./genreDbReducer";
import bookDbReducer from "./bookDbReducer";
import bookGrReducer from "./bookGrReducer";

export default combineReducers({
  genre: genreDbReducer,
  book: bookDbReducer,
  book_gr: bookGrReducer
});
