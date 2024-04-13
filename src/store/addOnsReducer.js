const INITIAL_STATE = {
    addOns:[],
    allAmenities:[]
  }
  export const addOnsReducer = function (state = INITIAL_STATE , action) {
    switch (action.type) {
      case "setAddOns":
        return state = {...state,addOns:action.payload};
        case "setAllAmenities":
          return state = {...state,allAmenities:action.payload};
      default:
        return state;
    }
  };