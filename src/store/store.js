import { legacy_createStore as createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

const store = createStore(rootReducer);
console.log(store.getState())

export default store;
