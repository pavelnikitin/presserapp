export const addNote = (note) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('notes').add({
            ...note,
            authorLastName: 'Nikitin',
            authorId: 12345,
        }).then(() => {
            dispatch({type: 'ADD_NOTE',
                  note: note
                  }) 
        }).catch((err) => {
            dispatch({
                type: 'ADD_NOTE_ERROR', 
                err: err
            })
        })        
    };
}