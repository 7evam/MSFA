const INITIAL_STATE = {
    userToken: null
  }

function authReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                userToken: action.payload.userToken,
            }
        default:
            return state
    }
}

export default authReducer