const INITIAL_STATE = {
    activeYears: null
  }

function sportReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "SET_ACTIVE_YEARS_AND_MONTHS":
            return {
                ...state,
                activeYears: action.payload.activeYears,
                currentDate: action.payload.currentDate,
                playoffMonths: {
                    2022: {
                        1: 7,
                        2: 10,
                        3: 14,
                        4: 14
                    }
                }
            }
        default:
            return state
    }
}

export default sportReducer