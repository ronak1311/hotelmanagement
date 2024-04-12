const INITIAL_STATE = {
  rooms:[],
  amenities:[],
  allRooms:[],
}
export const roomReducer = function (state = INITIAL_STATE , action) {
  switch (action.type) {
    case "setRooms":
      return state = {...state,rooms:action.payload};
    case "setAmenities":
      return state ={...state,amenities:action.payload};
      case "setAllRooms":
        return state ={...state,allRooms:action.payload};
    default:
      return state;
  }
};