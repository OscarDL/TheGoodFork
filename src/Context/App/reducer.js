export const appState = {
  order: null,
  darkTheme: false
};


export const appReducer = (state, action) => {
  switch(action.type) {
    case 'ORDER':
      return {
        ...state,
        order: action.order
      };
    case 'THEME':
      return {
        ...state,
        darkTheme: action.darkTheme
      };
    default:
      return state;
  }
};