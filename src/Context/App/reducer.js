export const aappState = {
  theme: 'light'
};


export const aappReducer = (state, action) => {
  switch(action.type) {
    case 'THEME':
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
};