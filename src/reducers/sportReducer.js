const INITIAL_STATE = {
    activeYears: null
  }

function sportReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "SET_ACTIVE_YEARS_AND_MONTHS":
            return {
                ...state,
                activeYears: action.payload.activeYears,
                currentDate: action.payload.currentDate
            }
        default:
            return state
    }
}

export default sportReducer