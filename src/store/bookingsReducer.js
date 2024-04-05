const INITIAL_STATE = {
    bookings:[],
    fiveBooking:[]
  }
  export const bookingsReducer = function (state = INITIAL_STATE , action) {
    switch (action.type) {
      case "setbookings":
        return state = {...state,bookings:action.payload};
        case "setFiveBooking":
        return state = {...state,fiveBooking:action.payload};
      default:
        return state;
    }
  };