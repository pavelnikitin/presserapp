import catalog from '../sial';


/* export const showPressmarkList = (list) => ({
    type: 'SHOW_PRESSMARKLIST',
    payload: list
});

export function dataRequest(searchValue) {
    
    let list = catalog.filter((item) => {
        return item.pressmark.toLoweCase().replace(/\s+/g, '').indexOf(searchValue.toLowerCase().replace(/\s+/g, '')) !== -1;
    })

    return dispatch => {
       dispatch(showPressmarkList(list));
    }
  
} */



/* export const dataRequest = (searchValue) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        let list = catalog.filter((item) => {
            return item.pressmark.toLowerCase().replace(/\s+/g, '').indexOf(searchValue.toLowerCase().replace(/\s+/g, '')) !== -1;
        })

        firestore.collection('pressmarks').add({
            catalog
        }).then(() => {
            dispatch({type: 'SHOW_PRESSMARKLIST',
                  payload: list
                  }) 
        }).catch((err) => {
            dispatch({
                type: 'SHOW_PRESSMARKLIST_ERROR', 
                err: err
            })
        })        
    };
} */



