const INITIAL_STATE = {
  userToken: null,
  name: null,
  email: null,
  currentOrganization: null,
  organizations: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN':
      console.log('here is action payload');
      console.log(action.payload);
      const currentOrg = action.payload.organizations.find((org) => org.current === 1);
      const currentOrganizationLogin = currentOrg || action.payload.organizations[0];
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        organizations: action.payload.organizations,
        userToken: action.payload.userToken,
        currentOrganization: currentOrganizationLogin,
      };
    case 'SET_NEW_ORGS':
      const currentOrganizationSet = action.payload.organizations.find((org) => org.current === 1);
      return {
        ...state,
        organizations: action.payload.organizations,
        currentOrganization: currentOrganizationSet,
      };
    default:
      return state;
  }
}

export default authReducer;
