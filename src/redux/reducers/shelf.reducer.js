
const shelfReducer = ( state = [], action) => {
    switch (action.type) {
        case 'SET_SHELF': return action.payload;
        default: return state;
    }
} 

export default shelfReducer;