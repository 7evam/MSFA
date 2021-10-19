const INITIAL_STATE = {
    activeYears: null
  }

function sportReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "SET_ACTIVE_YEARS_AND_MONTHS":
            console.log('in thingy')
            return {
                ...state,
                activeYears: action.payload.activeYears
            }
        default:
            return state
    }
}

export default sportReducer