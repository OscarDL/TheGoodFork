export const initialState = {
  user: null,
  token: null
}

export const reducer = (state, action) => {

  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
        token: action.token
      };
    default:
      return state;
  }
  
}