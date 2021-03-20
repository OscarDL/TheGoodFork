export const initialState = {
  user: null,
  token: null,
  currentOrder: {
    appetizer: null,
    mainDish: null,
    dessert: null,
    drinks: null,
    alcohols: null
  }
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
    case 'SET_CURRENT_ORDER':
      return {
        ...state,
        currentOrder: action.currentOrder
      };
    default:
      return state;
  }
  
}