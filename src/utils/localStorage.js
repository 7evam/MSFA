export const loadState = () => {
    // sometimes browser settings won't let you access local storage
    try {
        const serializedState = localStorage.getItem('user');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState)
    } catch(err){
        return undefined
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('user', serializedState);
    } catch(err) {
        console.error(err)
    }
}

export const removeState = () => {
    try{
        localStorage.removeItem('user')
    } catch(err){
        console.error(err)
    }
}