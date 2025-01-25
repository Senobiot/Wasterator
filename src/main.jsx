// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js';


// const defaultState ={
//   cash: 2385,
// }
// const reducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case 'GAME_DETAIL':
//         console.log(`reducer GAME_DETAIL: ${action.payload.image.medium_url}`)
//         return {...state, gameDetail: action.payload}
//     case 'ADD_GAME': {
//         console.log(`reducer ADD_GAME`);
//         if (!('collection' in localStorage)) localStorage.setItem('collection', JSON.stringify({}));
//         const collection = JSON.parse(localStorage.getItem('collection'));
//         const gameName = state.gameDetail.name;
//         const newCollection = {...collection, [gameName]: fieldsFilter([state.gameDetail], importantFields)[0]};
//         localStorage.setItem('collection', JSON.stringify(newCollection));
//         return {...state, collection: newCollection}
//     }
//     case 'CURRENT_SEARCH':
//         return {...state, game_list: action.payload}
//     default:
//       return state;
//   }
// }
// const store = createStore(reducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
) 
