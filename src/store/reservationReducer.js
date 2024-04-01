const INITIAL_STATE = {
    reservation:[]
  }
  export const reservationReducer = function (state = INITIAL_STATE , action) {
    switch (action.type) {
      case "setReservation":
        return state = {...state,reservation:action.payload};
      default:
        return state;
    }
  };