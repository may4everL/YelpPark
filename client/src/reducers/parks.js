const reducer = (parks = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return action.payload;
        case 'DELETE':
            return action.payload;
        default:
            return parks;
    }
}

export default reducer