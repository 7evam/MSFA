const INITIAL_STATE = {
    userToken: null,
    firstName: null,
    lastName: null,
    email: null,
    currentOrganization: null,
    organizations: null
  }

function authReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "LOGIN":
            const currentOrganization = action.payload.organizations.find(org => org.current === 1)
            return {
                ...state,
                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                email: action.payload.email,
                organizations: action.payload.organizations,
                userToken: action.payload.userToken,
                currentOrganization
            }
        default:
            return state
    }
}

export default authReducer