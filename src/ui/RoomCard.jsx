/* eslint-disable react/prop-types */
import Spinner from "../ui/Spinner";
import { Carousel } from "@material-tailwind/react";
import R1 from "../assets/R1.jpg";
import R3 from "../assets/R3.jpg";
import R2 from "../assets/R2.jpg";
import R4 from "../assets/R4.jpg";

function RoomCard({ rooms, isLoading, onBookingButton }) {
  const renderAmenities = () => {
    if (!rooms || !rooms.roomAmenities) return null;
    return rooms.roomAmenities.map((amenities, index) => (
      <li key={index}>{amenities?.amenities?.name}</li>
    ));
  };

  return (
    <div className="w-3/4 px-4 mb-4">
      <div className="flex bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="w-2/5">
          <Carousel
            className="rounded-l-lg"
            transition={{ duration: 2 }}
            loop
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            <img src={R1} alt="Room" className="w-full h-80 object-cover rounded-l-lg" />
            <img src={R2} alt="Room" className="w-full h-80 object-cover rounded-l-lg" />
            <img src={R3} alt="Room" className="w-full h-80 object-cover rounded-l-lg" />
            <img src={R4} alt="Room" className="w-full h-80 object-cover rounded-l-lg" />
          </Carousel>
        </div>
        <div className="h-100 w-100">
          <div className="p-6">
            <div className="text-lg font-bold mb-2">{rooms.roomType?.roomTypeName}</div>
            <div className="text-gray-700 mb-2">${rooms.pricePerNight} per night</div>
            <ul className="list-disc list-inside text-gray-700">{renderAmenities()}</ul>
            <button onClick={()=> onBookingButton(rooms)} className="bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
