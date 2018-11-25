import {applyMiddleware, compose,combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import pressmarkReducer from '../reducers/pressmark-reducer';
import notesReducer from '../reducers/notes-reducer';
import {firestoreReducer, reduxFirestore, getFirestore} from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import fbConfig from '../config/fbConfig';
import firebase from '../config/fbConfig';
 import catalog from '../sial';



/* let db = firebase.firestore();
/*catalog.map((item) => {
    db.collection('pressmarks').add({
    ...item
});
}) */

 



const allReducers = combineReducers({
    pressmarks: pressmarkReducer,
    notes: notesReducer,
    firestore: firestoreReducer
});

const allStoreEnhancers = compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig),
    window.devToolsExtension && window.devToolsExtension()
);

 export const store = createStore(allReducers, 
    allStoreEnhancers
     );