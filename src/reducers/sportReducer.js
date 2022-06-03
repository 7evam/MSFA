const INITIAL_STATE = {
    activeYears: null,
    currentDate: null,
    playoffMonths: null,
    sportTeams: null,
    orgMembers: null,
    deadlines: null
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
        case "HYDRATE_SPORT_TEAMS":
            return {
                ...state,
                sportTeams: action.payload.sportTeams
            }
        case "HYDRATE_ORG_MEMBERS":
            return {
                ...state,
                orgMembers: action.payload.orgMembers
            }
        case "HYDRATE_DEADLINES":
            const newState = {...state}
            if(!newState.deadlines){
                newState.deadlines = {}
            }
            newState.deadlines[action.payload.roflYear] = action.payload.deadlines
            return newState
        default:
            return state
    }
}

export default sportReducer