export const authState = {
  user: null,
  token: null
};


export const authReducer = (state, action) => {
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
};