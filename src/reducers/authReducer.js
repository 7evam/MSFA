const INITIAL_STATE = {
    userToken: null
  }

function authReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                email: action.payload.email,
                organizations: action.payload.organizations,
                userToken: action.payload.userToken
            }
        default:
            return state
    }
}

export default authReducer