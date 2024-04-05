/* eslint-disable react/prop-types */
import { useState } from "react";

function ConfirmCheckIn({ onStatusChange, bookingId, status, statusUpdateLoading, showCheckInForm, setShowCheckInForm }) {
console.log('✌️bookingId --->', bookingId);
    const [bookingStatus, changeBookingStatus] = useState(status);
 

    return (
        <>
            {showCheckInForm &&
                <div
                    id="hs-danger-alert1"
                    className="backdrop-blur-sm hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                >
                    <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                        <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                            <div className="absolute top-2 right-2">
                                <button
                                    type="button"
                                    onClick={() =>setShowCheckInForm(false)}
                                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                                    data-hs-overlay="#hs-danger-alert1"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg
                                        className="w-3.5 h-3.5"
                                        width={8}
                                        height={8}
                                        viewBox="0 0 8 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 sm:p-10 overflow-y-auto align-center">
                                <div className="flex gap-x-4 md:gap-x-7">
                                    
                                    <div className="grow">
                                        <h3
                                            className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200 text-center">
                                            Change Booking Status
                                        </h3>
                                        
                                    </div>
                                    
                                </div>
                                <div className="sm:col-span-3">
                              <label
                                htmlFor="numberOfPeople"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                               Change Status to 
                              </label>
                              <div className="mt-2">
                                <select
                                  id="numberOfPeople"
                                  name="numberOfPeople"
                                  autoComplete="numberOfPeople"
                                  value={bookingStatus}
                                  onChange={(e)=> changeBookingStatus(e.target.value)}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  
                                    <option value="checkin">Check In</option>
                                    <option value="checkout">Check Out</option>
                                    <option value="booked">Booked</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </div>
                            </div>
                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={()=> setShowCheckInForm(false) }
                                    className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                    data-hs-overlay="#hs-danger-alert1"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={statusUpdateLoading}
                                    onClick={() => {
                                        if(bookingId){
                                            onStatusChange(Number(bookingId),bookingStatus)
                                        }  

                                    }
                                    }
                                    data-hs-overlay="#hs-danger-alert1"
                                    className="disabled:cursor-not-allowed py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold disabled:bg-gray-200 bg-gray-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Change Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default ConfirmCheckIn