const INITIAL_STATE = {
    modalContent: null
}

function modalReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case "SHOW_MODAL":
            return {
                ...state,
                modalContent: action.payload.modalContent
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                modalContent: null
            }
        default: 
            return state
    }
}

export default modalReducer