import {legacy_createStore as createStore} from "redux";
import {notifiesReducer} from "./notifiesReducer"

export const store = createStore(notifiesReducer);