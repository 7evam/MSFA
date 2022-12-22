const INITIAL_STATE = {
    activeYears: null,
    currentDate: null,
    playoffMonths: null,
    sportTeams: null,
    orgMembers: null,
    deadlines: null,
    roflYear: 2022
  }

function sportReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "SET_ROFL_YEAR":
            return {
                roflYear: action.payload.roflYear
            }
        case "SET_ACTIVE_YEARS_AND_MONTHS":
            return {
                ...state,
                activeYears: action.payload.activeYears,
                currentDate: action.payload.currentDate,
                // this data doesnt really change so api call is not necessary
                startingMonths: {
                    2022: {
                        1: 1,
                        2: 6,
                        3: 7,
                        4: 7
                    }
                },
                playoffMonths: {
                    2022: {
                        1: 7,
                        2: 10,
                        3: 14,
                        4: 14
                    }
                },
                leagueTable: {
                    1: "MLB",
                    2: "NFL",
                    3: "NHL",
                    4: "NBA"
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