const INITIAL_STATE = {
    activeYears: null
  }

function sportReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "SET_ACTIVE_YEARS_AND_MONTHS":
            action.payload.activeYears.push({
                2022: [
                    {leagueId: 1, roflMonth: 1, dateEnding: "2021-01-14T05:00:00.000Z", playoffs: 0}
                ]
            })
            console.log('here is active years in reducer')
            console.log(action.payload.activeYears)
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