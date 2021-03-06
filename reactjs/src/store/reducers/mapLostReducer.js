const initialState = { coordinates: [50.43669835740365, 30.50491333007813] }

export const LostCoordinateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COORDINATE_LOST':
            return { ...state, coordinates: action.payload }
        default:
            return state
    }
}

export default LostCoordinateReducer;
