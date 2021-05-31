export const authState = {
  user: null
};


export const authReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};