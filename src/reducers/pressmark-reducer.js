

const pressmarkDefault = [];

export default function pressmarkReducer (state=pressmarkDefault, action) {
    switch (action.type) {

        case 'SHOW_PRESSMARKLIST':
            return [
                ...action.payload
            ]

        case 'SHOW_PRESSMARK':
            return state;
        
        default:
            return state;
    }
}