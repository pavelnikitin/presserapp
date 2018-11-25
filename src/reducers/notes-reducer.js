const notesDefault = {
    notes: [
      
    ]
};

export default function notesReducer (state = notesDefault, action) {
    switch (action.type) {
       case 'ADD_NOTE':
           console.log('created note', action.note)
       case 'ADD_NOTE_ERROR':
           console.log('add note error', action.err)
       default:
            return state;
    }
}