const INITIAL_STATE = {
    addOns:[]
  }
  export const addOnsReducer = function (state = INITIAL_STATE , action) {
    switch (action.type) {
      case "setAddOns":
        return state = {...state,addOns:action.payload};
      default:
        return state;
    }
  };