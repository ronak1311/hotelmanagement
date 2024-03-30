import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RoomCard from "../ui/RoomCard";

function Rooms() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [persons, setPersons] = React.useState(1);

  // Function to handle date changes
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Function to handle number of persons change
  const handlePersonsChange = (e) => {
    setPersons(parseInt(e.target.value));
  };

  // Sample data for available rooms (you can replace this with actual data)
  const availableRooms = [
    { id: 1, type: "Single", capacity: 1, price: 100 },
    { id: 2, type: "Double", capacity: 2, price: 150 },
    { id: 3, type: "Suite", capacity: 4, price: 250 },
  ];

  // Filter available rooms based on number of persons
  const filteredRooms = availableRooms.filter(
    (room) => room.capacity >= persons
  );

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Available Rooms</h1>
          <div className="flex justify-between mb-4">
            <div className="mr-2">
              <label className="block mb-2">Check-in Date:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="ml-2">
              <label className="block mb-2">Check-out Date:</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="mb-4">
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
          {/* Grid to showcase available rooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
