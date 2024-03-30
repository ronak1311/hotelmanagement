import React from "react";

function RoomCard({ room }) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">{room.type}</h2>
      <p className="text-gray-600">Price: ${room.price} per night</p>
      {/* Add any additional information you want to display */}
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Book Now
      </button>
    </div>
  );
}

export default RoomCard;
