import Spinner from "../ui/Spinner";
import { getAllCustomerBookings } from "../hooks/useBookings"
import { format, isToday } from 'date-fns';
import { calculateNightStay, formatCurrency } from '../utils/helpers';
import { formatDistanceFromNow } from '../utils/helpers';
import StatusBadge from "../ui/StatusBadge";
import ConfirmBookingDeletion from "../ui/ConfirmBookingDeletion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCancelBooking } from "../hooks/useDeleteBooking";

function Mybookings() {
    const { isLoading, getAllCustomerBooking } = getAllCustomerBookings();
    // const { deleteBooking } = useDeleteBooking();
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    let user = JSON.parse(localStorage.getItem("user")) || false;
    const allbookings = useSelector(
        (state) => state.bookingsReducer.customerAllBookings
      );
      const [bookingId, setBookingId] = useState(null);
      const { isLoading: deleteLoading, cancelBooking } = useCancelBooking();

useEffect(()=>{
    getAllCustomerBooking({customerId: user.customerId});
},[])

const handleDeleteBooking = (bookingId) => {
    cancelBooking({reservationId:bookingId},{
        onSettled:()=>{
            getAllCustomerBooking({customerId: user.customerId});  
        }
        });
  };
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
        <h1 className="text-3xl font-bold mb-4 justify-center text-center">My Bookings</h1>
          <div className="flex items-center justify-center bookingTable:mx-5">
            
            <div className="mb-4 relative overflow-x-auto shadow-md sm:rounded-t-lg mt-10">
              {/* <BookingStatusFilter /> */}
              {/* <BookingsSortBy /> */}
              <div className="max-w-full relative overflow-x-auto shadow-md">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        CABIN
                      </th>
                      <th scope="col" className="px-6 py-3">
                        GUEST
                      </th>
                      <th scope="col" className="px-6 py-3">
                        DATES
                      </th>
                      <th scope="col" className="px-8 py-3">
                        STATUS
                      </th>
                      <th scope="col" className="px-6 py-3">
                        AMOUNT
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allbookings?.map((booking) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={booking.reservationId}>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {booking.room.roomType.roomTypeName}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{booking.signUp.firstName} {booking.signUp.lastName}</p>
                            <p>{booking.signUp.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          <div className="flex flex-col mobile:flex-row">
                            <span className="text-dateFont">
                              {isToday(new Date(booking.checkInDate))
                                ? 'Today'
                                : formatDistanceFromNow(booking.checkInDate)}{' '}
                              &rarr; {calculateNightStay(booking.checkInDate,booking.checkOutDate)} night stay
                            </span>
                            <span className="text-[0.75rem] text-gray-500">
                              {format(new Date(booking.checkInDate), 'MMM dd yyyy')} &mdash;{' '}
                              {format(new Date(booking.checkOutDate), 'MMM dd yyyy')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-6 py-4">
                          {formatCurrency(booking.payment.amount)}
                        </td>
                        {booking?.status == "booked" ?
                        <td className="px-7 py-4">
                          <div className="hs-dropdown relative inline-flex">
                            <button
                              id="hs-dropdown-custom-icon-trigger"
                              type="button"
                              className="hs-dropdown-toggle p-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                            >
                              <svg
                                className="w-4 h-4 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                              </svg>
                            </button>
                          
                            <div
                              className="z-50 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                              aria-labelledby="hs-dropdown-custom-icon-trigger"
                            >
                         
                                
                              <button
                                type="button"
                                onClick={() => {
                                  setShowDeleteForm(true);
                                  setBookingId(booking.reservationId);
                                }}
                                data-hs-overlay="#hs-danger-alert"
                                className="disabled:cursor-not-allowed flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              >
                                Cancel booking
                              </button>
                            </div> 
                          </div>
                          
                        </td>
                        :   <td className="px-7 py-4">Contact Hotel for more update on booking</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {allbookings?.length === 0 &&
                  <p className="text-red-500 overflow-x-hidden flex items-center justify-center p-4">
                    No booking found.
                  </p>
                }
              </div>
            </div>
          </div >
          {showDeleteForm && <ConfirmBookingDeletion isDeleting={deleteLoading} onDeleteBooking={handleDeleteBooking} bookingId={bookingId} cancel={true} />}
        </>
      );
}

export default Mybookings