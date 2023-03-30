const INITIAL_STATE = {
  modalContent: null,
  props: null,
};

function modalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        modalContent: action.payload.modalContent,
        props: action.payload.props,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalContent: null,
        props: null,
      };
    default:
      return state;
  }
}

export default modalReducer;
