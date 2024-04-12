/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RoomCard from "../ui/RoomCard";
import { useAddOns, useReservation, useSetReservation } from "../hooks/useRoom";
import { useSelector } from "react-redux";
import Spinner from "../ui/Spinner";
import { useLogin } from "../hooks/useLogin";
import { AiOutlineLogin } from "react-icons/ai";
import toast from "react-hot-toast";
import Select from "react-tailwindcss-select";
import RenderLogin from "../ui/renderLogin";
import moment from "moment";
import { calculateNightStay } from "../utils/helpers";
import { getDate } from "date-fns";

function Rooms() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [persons, setPersons] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dob, setDOB] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("guest");
  const [numberOfPeople, setNumberofPeople] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [loginStatus, setLoginStatus] = useState(null);
  const [isPaymentPage, setPaymentPage] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [currentBookingRoom, setCurrentBookingRoom] = useState(false);
  const [open, setOpen] = useState(false);
  const { isLoading, getReservation } = useReservation();
  const [isRoomBooking, setIsRoomBooking ] = useState(false);
  const reservations = useSelector(
    (state) => state.reservationReducer.reservation
  );
  const addOns = useSelector((state) => state.addOnsReducer.addOns);
  let user = JSON.parse(localStorage.getItem("user")) || false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading: loginLoading, login } = useLogin();
  const { isLoading: addOnLoading, getAddons } = useAddOns();
  const { isLoading: setReservationLoading, addUser, addPayment, addReservation, addReservationAddOns } = useSetReservation();
  const [addOnsForRoom, setAddOnsForRoom] = useState(null);
  const [addOnsForExtra, setAddOnsForExtra] = useState(null);
  const navigate = useNavigate();
  const onSubmitHandler = function (event) {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      toast.error("Email must be in xyz@abc.com");
      return;
    }

    const passRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{6,})[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;
    if (!passRegex.test(password)) {
      toast.error(
        "Password must be Alphanumeric with special character and 6 of length"
      );
      return;
    }

    login(
      { email, password, from: "room" },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
          setIsLogging(false);
        },
      }
    );
  };
  useEffect(() => {
    getReservation({
      checkInDate: new Date().toISOString().substring(0, 10),
      checkOutDate: new Date().toISOString().substring(0, 10),
      maxOccupancy: persons,
    });
    getAddons();
  }, []);

  // Function to handle date changes
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(date)
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Function to handle number of persons change
  const handlePersonsChange = (e) => {
    setPersons(parseInt(e.target.value));
  };

  const handleDOBChange =(date) =>{
    setDOB(date);
  }
  const searchRooms = () => {
    getReservation({
      checkInDate: startDate.toISOString().substring(0, 10),
      checkOutDate: endDate.toISOString().substring(0, 10),
      maxOccupancy: persons,
    });
  };
  const handleBook = (room) => {
    setCurrentBookingRoom(room);
    setOpen(true);
  };
  const RenderAdultsDropdown = () => {
    let jsxElements = [];
    for (let i = 0; i < Number(currentBookingRoom.roomType.maxOccupancy); i++) {
      jsxElements.push(<option>{i + 1}</option>);
    }
    return jsxElements;
  };

  const handleChange = (value) => {
    setAddOnsForRoom(value);
  };

  const handleExtraChange = (value) => {
    setAddOnsForExtra(value);
  };
  const filterdRoomAddOnList = addOns?.filter((item) => {
    return (
      item.forRoom && {
        Name: item.Name,
        addonId: item.addonId,
        created_at: item.created_at,
      }
    );
  });
  const filterdExtraAddOnList = addOns?.filter((item) => {
    return (
      !item.forRoom && {
        Name: item.Name,
        addonId: item.addonId,
        created_at: item.created_at,
      }
    );
  });
  const roomAddOnList = filterdRoomAddOnList
    ? filterdRoomAddOnList.map((item) => {
        return { value: `${item.Name} ($${item.price})`, label: `${item.Name} ($${item.price})`, id: item.addonId, price: item.price };
      })
    : [];
  const extraAddOnList = filterdExtraAddOnList
    ? filterdExtraAddOnList.map((item) => {
        return { value: `${item.Name} ($${item.price})`, label: `${item.Name} ($${item.price})`, id: item.addonId, price: item.price };
      })
    : [];
useEffect(()=>{

},[totalAmount])
  const renderPrices = () =>{
     let numberofDays = calculateNightStay(startDate, endDate);
     if (numberofDays <=0) numberofDays = 1;
      let totalPriceForBooking = currentBookingRoom.pricePerNight;
      let totalRoomAddons = 0;
      let totalExtraAddons = 0;
      addOnsForRoom && addOnsForRoom.forEach(element => {
        totalRoomAddons += element.price;
      });
      addOnsForExtra && addOnsForExtra.forEach(element=>{
        totalExtraAddons += element.price
      });
      totalPriceForBooking = totalPriceForBooking + totalExtraAddons + totalRoomAddons;
      return(
        <>
     
        <h6>Room : {currentBookingRoom.pricePerNight * numberofDays} for {numberofDays} days</h6>
        <h6>Room Add Ons : {totalRoomAddons * numberofDays} for {numberofDays} days</h6>
        <h6>Extra Add Ons : {totalExtraAddons * numberofDays} for {numberofDays} days</h6>
        <hr/>
        <h5>Total Price : {totalPriceForBooking * numberofDays}</h5>
        </>
      )
  }

  const handleBooking = () =>{
    let totalPriceForBooking = currentBookingRoom.pricePerNight;
    let totalRoomAddons = 0;
    let totalExtraAddons = 0;
    addOnsForRoom && addOnsForRoom.forEach(element => {
      totalRoomAddons += element.price;
    });
    addOnsForExtra && addOnsForExtra.forEach(element=>{
      totalExtraAddons += element.price
    });
    totalPriceForBooking = parseFloat(totalPriceForBooking + totalExtraAddons + totalRoomAddons);
    let customerId;
    let paymentId;
    let reservationId;
    setIsRoomBooking(true);
    if(user){
      customerId = user.customerId;
    }else{
      addUser({firstName, lastName, dob, email, phoneNumber, address  },{
        onSettled: (data) => {
          customerId=data[0].customerId;
        }
      })
    }
    addPayment({amount:totalPriceForBooking},
      {onSettled: (data) => {
      paymentId=data[0].paymentId;
      addReservation({checkInDate: startDate,checkOutDate: endDate, numberOfPeople, numberOfChildren,depositAmount: totalPriceForBooking,customerId,roomId:currentBookingRoom.roomId,paymentId},
        {
          onSettled: (data) =>{
              reservationId = data[0].reservationId;
              let aa = addOnsForRoom && addOnsForRoom.length>0 ?addOnsForRoom.map((item)=> {return {addonId: item.id, reservationId}}) : [];
              let bb =addOnsForExtra && addOnsForExtra.length>0 ? addOnsForExtra.map((item)=> {return {addonId: item.id, reservationId}}) : [];
              let reservationArray = [...aa,...bb];
              if(reservationArray.length > 0){
                addReservationAddOns({reservationArray},{
                  onSettled:data=>{
                    setIsRoomBooking(false);
                    setPaymentPage(true);
                          
                  }
                  })
              }else{
                setIsRoomBooking(false);
                    setPaymentPage(true);
              }
             
          }
        })
      },
    });
        
  }

 const renderAuthenticationOption = () =>{
    return(
      <div className="mt-0 ">
                            <div className="mt-0 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setLoginStatus("login");
                                  setIsLogging(true);
                                }}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Login
                              </button>{" "}
                              <p className="ml-3 mr-3">or</p>
                              <button
                                type="button"
                                onClick={() => setLoginStatus("guest")}
                                className="text-sm font-semibold leading-6 text-gray-900"
                              >
                                Book as a guest
                              </button>
                            </div>
                          </div>
    )
  }

  const renderBookingForm = () =>{
    return(
      <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="firstName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                First name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="firstName"
                                  value={
                                    user && user.firstName ? user.firstName : firstName
                                  }
                                  disabled={user && user.firstName}
                                  id="firstName"
                                  onChange={(e) => setFirstName(e.target.value) }
                                  autoComplete="firstName"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="lastName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Last name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="lastName"
                                  value={
                                    user && user.lastName ? user.lastName : lastName
                                  }
                                  onChange={(e) => setLastName(e.target.value) }
                                  disabled={user && user.lastName}
                                  id="lastName"
                                  autoComplete="family-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="email"
                                  value={user && user.email ? user.email : email}
                                  onChange={(e) => setEmail(e.target.value) }
                                  disabled={user && user.email}
                                  id="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Date of Birth
                              </label>
                              <div className="mt-2">
                              <DatePicker
                                selected={dob}
                                showYearDropdown
                                scrollableYearDropdown
                                onChange={handleDOBChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                minDate={moment().subtract(500, "years")}
                                maxDate={moment().subtract(18, "years")}
                              />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Phone Number
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="phoneNumber"
                                  onChange={(e) => setPhoneNumber(e.target.value) }
                                  value={
                                    user && user.phoneNumber
                                      ? user.phoneNumber
                                      : phoneNumber
                                  }
                                  disabled={user && user.phoneNumber}
                                  id="phoneNumber"
                                  autoComplete="phoneNumber"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="Address"
                                  onChange={(e) => setAddress(e.target.value) }
                                  value={
                                    user && user.address ? user.address : address
                                  }
                                  disabled={user && user.address}
                                  id="address"
                                  autoComplete="Address"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="numberOfPeople"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Number of Adults
                              </label>
                              <div className="mt-2">
                                <select
                                  id="numberOfPeople"
                                  name="numberOfPeople"
                                  onChange={e => setNumberofPeople(parseInt(e.target.value)) }
                                  autoComplete="numberOfPeople"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  {currentBookingRoom &&
                                  currentBookingRoom.roomType &&
                                  currentBookingRoom.roomType.maxOccupancy ? (
                                    RenderAdultsDropdown()
                                  ) : (
                                    <option>1</option>
                                  )}
                                </select>
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="numberOfChildren"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Number of Childrens
                              </label>
                              <div className="mt-2">
                                <select
                                  id="numberOfChildren"
                                  name="numberOfChildren"
                                  onChange={e => setNumberOfChildren(parseInt(e.target.value)) }
                                  autoComplete="numberOfChildren"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>0</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Add Ons
                              </label>
                              <div className="mt-2">
                                <Select
                                  value={addOnsForRoom}
                                  onChange={handleChange}
                                  options={roomAddOnList}
                                  isMultiple={true}
                                  placeholder="Room Add Ons"
                                  classNames={{
                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-smtext-black-500",
                                    listItem: ({ isSelected }) =>
                                      `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                        isSelected
                                          ? `text-white bg-blue-500`
                                          : `text-black-500 hover:bg-blue-100 hover:text-blue-500`
                                      }`,
                                  }}
                                  // classNames="block w-full rounded-md border-0 py-1.5 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Extra Services
                              </label>
                              <div className="mt-2">
                                <Select
                                  value={addOnsForExtra}
                                  onChange={handleExtraChange}
                                  options={extraAddOnList}
                                  isMultiple={true}
                                  placeholder="Room Add Ons"
                                  classNames={{
                                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-smtext-black-500",
                                    listItem: ({ isSelected }) =>
                                      `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                        isSelected
                                          ? `text-white bg-blue-500`
                                          : `text-black-500 hover:bg-blue-100 hover:text-blue-500`
                                      }`,
                                  }}
                                  // classNames="block w-full rounded-md border-0 py-1.5 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Price
                              </label>
                              <div className="mt-2">
                               {renderPrices()}
                              </div>
                            </div>
                          </div>
    )
  }
  return (
    <div className="container mx-auto mt-8 h-100">
      <div className="flex justify-center">
        <div className="w-full max-w-1xl">
          <h1 className="text-3xl font-bold mb-4 justify-center text-center">
            Available Rooms
          </h1>
          <div className="flex justify-center mb-4 items-end">
            <div className="mr-2">
              <label className="block mb-2">Check-in Date:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                minDate={new Date()}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="ml-2">
              <label className="block mb-2">Check-out Date:</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="ml-2">
              <label className="block mb-2">Number of Persons:</label>
              <input
                type="number"
                value={persons}
                onChange={handlePersonsChange}
                min="1"
                max="10" // Adjust max number of persons as needed
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="ml-2">
              <label className="block mb-2"></label>
              <button
                onClick={() => searchRooms()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center transition-colors duration-300 shadow-md"
              >
                Search
              </button>
            </div>
          </div>

          {/* Grid to showcase available rooms */}
          <div className="flex flex-wrap justify-center mt-8">
            {reservations && reservations.length <= 0
              ? "No Rooms Found"
              : reservations?.map((room) => {
                  return (
                    <RoomCard
                      key={room.id}
                      rooms={room}
                      isLoading={isLoading}
                      onBookingButton={(room) => handleBook(room)}
                    />
                  );
                })}
          </div>
        </div>
      </div>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/6 my-6 mx-auto max-w-4/5">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-hidden">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Booking Room</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto">
                  <form>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                      {isPaymentPage ? <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <h2> Booking Confirmed !!</h2>
                        </div>:null}
                        {isLogging && (
                         <div>
                         <div className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white flex justify-center">
                           <div className="max-w-screen-xl m-0 sm:m-1 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
                             <div className="lg:w-1/1 xl:w-5/12 p-6 sm:p-12">
                               <div className="mt-12 flex flex-col items-center">
                                 <h1 className="text-2xl xl:text-3xl font-extrabold">Log in</h1>
                                 <div className="w-full flex-1 mt-8">
                                   <div className="mx-auto max-w-xs">
                                     <input
                                       className="w-full px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       disabled={isLoading}
                                       type="email"
                                       placeholder="Email"
                                       autoComplete="username"
                                     />
                                     <input
                                       className="w-full px-8 py-4 rounded-lg font-medium disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-100 border border-gray-200 placeholder-gray-500 dark:text-black text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       disabled={isLoading}
                                       type="password"
                                       placeholder="Password"
                                       autoComplete="current-password"
                                     />
                                     <button
                                       onClick={(e) => onSubmitHandler(e)}
                                       className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                     >
                                       <AiOutlineLogin size={20} />
                                       <span className="ml-3 disabled:cursor-not-allowed disabled:bg-gray-300">
                                         {!isLoading ? "Log in" : <Spinner />}
                                       </span>
                                     </button>
                                     <div className="my-12 border-b text-center">
                                       <div className="leading-none px-2 py-2 inline-block text-sm text-white  dark:text-white dark:bg-gray-800 tracking-wide font-medium transform translate-y-1/2 bg-none">
                                         <button
                                           type="button"
                                           onClick={() => navigate("/register")}
                                           className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                         >
                                           Or Signup here
                                         </button>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                        )}
                        {!loginStatus && !user && !isLogging ? (
                         renderAuthenticationOption()
                        ) : (user || loginStatus == "guest") && !isPaymentPage ? (
                          renderBookingForm()
                        ) : null}
                        
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={() => {
                          setOpen(false);
                          setIsLogging(false);
                          setLoginStatus("");
                          setPaymentPage(false);
                        }}
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        {isPaymentPage ? "Ok":"Cancel"}
                      </button>
                      {
                        (user || loginStatus == "guest") && !isPaymentPage ?
                        <button
                        type="button"
                        onClick={handleBooking}
                        disabled={isRoomBooking}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {isRoomBooking ?  
                        <div className="flex items-center justify-center">
                            <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                             </div>
                          </div> 
                          : 'Book'}
                      </button>
                      :null
                      }
                      
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Rooms;
