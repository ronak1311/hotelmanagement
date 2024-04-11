const INITIAL_STATE = {
    bookings:[],
    fiveBooking:[],
    customerAllBookings:[]
  }
  export const bookingsReducer = function (state = INITIAL_STATE , action) {
    switch (action.type) {
      case "setbookings":
        return state = {...state,bookings:action.payload};
        case "setFiveBooking":
        return state = {...state,fiveBooking:action.payload};
        case "setCustomerAllBookings":
        return state = {...state,customerAllBookings:action.payload};
      default:
        return state;
    }
  };