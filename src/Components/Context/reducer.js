export const initialState = {
  user: null,
  token: null,
  order: null
}

export const reducer = (state, action) => {

  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_ORDER':
      return {
        ...state,
        order: action.order
      };
    default:
      return state;
  }
  
}