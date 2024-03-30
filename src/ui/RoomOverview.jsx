/* eslint-disable react/prop-types */
import { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import R1 from "../assets/R1.jpg";
import R3 from "../assets/R3.jpg";
import R2 from "../assets/R2.jpg";
import R4 from "../assets/R4.jpg";

// eslint-disable-next-line react/prop-types
function RoomOverview({roomDetails, handleBookButton}) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderAmenities = () => {
    return(
      <>
    {roomDetails && roomDetails.roomAmenities && roomDetails.roomAmenities.map((amenities, index)=>{
        return(<><li key={index * 123}>{amenities?.amenities?.name}</li></>)
      })}
      </>
    )
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <Carousel
              className="rounded-xl"
              transition={{ duration: 2 }}
              loop
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              <img src={R1} alt="Room" className="w-full h-80 object-cover mb-4 rounded-lg" />
              <img src={R2} alt="Room" className="w-full h-80 object-cover mb-4 rounded-lg" />
              <img src={R3} alt="Room" className="w-full h-80 object-cover mb-4 rounded-lg" />
              <img src={R4} alt="Room" className="w-full h-80 object-cover mb-4 rounded-lg" />
            </Carousel>
            <div className="text-lg font-bold mb-2">{roomDetails.roomType?.roomTypeName}</div>
            <div className="text-gray-700 mb-2">${roomDetails.pricePerNight} per night</div>
            <ul className="list-disc list-inside text-gray-700">
            {renderAmenities()}
            </ul>
          </div>
        );
      case "prices":
        return (
          <div>
            <div className="text-lg font-bold mb-2">Prices</div>
            <div className="text-gray-700 mb-2">${roomDetails.pricePerNight} per night</div>
          </div>
        );
      case "amenities":
        return (
          <div>
            <div className="text-lg font-bold mb-2">Amenities</div>
            {renderAmenities()}
          </div>
        );
      case "policies":
        return (
          <div>
            <div className="text-lg font-bold mb-2">Policies</div>
            <p>
              <ul className="list-disc list-inside text-gray-700">
                <li><b>Reservation </b>: Book via official channels. Credit card may be required.</li>
                <li><b>Check-in/Check-out</b>: From 3:00 PM / By 12:00 PM. ID and credit card required.</li>
                <li><b>Cancellation/Modification</b>: Policies vary. Check terms. Late cancel may incur a charge.</li>
                <li><b>Payment</b>: Due at check-in unless prepayment arranged. Credit cards and cash accepted.</li>
                <li><b>Occupancy/Charges</b>: Rates based on double occupancy. Extra charges for additional guests or services.</li>
                <li><b>Age Requirements</b>: Must be 18+ to check-in. Minors require parental consent.</li>
                <li><b>Smoking/Pets</b>: Non-smoking property. No pets allowed except service animals.</li>
                <li><b>Conduct/Liability</b>: Guests must adhere to policies. Hotel not liable for loss/damage.</li>
                <li><b>Special Requests</b>: Notify hotel in advance for special needs.</li>
                <li><b>Privacy Policy</b>: Guest information handled in accordance with privacy policy.</li>
              </ul>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex justify-between mb-4">
          <button
           className={`py-2 px-4 rounded-lg focus:outline-none ${
            activeTab === "overview" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"
          }`}
            onClick={() => handleTabClick("overview")}
          >
            Overview
          </button>
          <button
             className={`py-2 px-4 rounded-lg focus:outline-none ${
                activeTab === "prices" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"
              }`}
            onClick={() => handleTabClick("prices")}
          >
            Prices
          </button>
          <button
            className={`py-2 px-4 rounded-lg focus:outline-none ${
                activeTab === "amenities" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"
              }`}
            onClick={() => handleTabClick("amenities")}
          >
            Amenities
          </button>
          <button
           className={`py-2 px-4 rounded-lg focus:outline-none ${
            activeTab === "policies" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"
          }`}
            onClick={() => handleTabClick("policies")}
          >
            Policies
          </button>
        </div>
        {renderTabContent()}
        <button className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4" onClick={() =>handleBookButton()}>Book Now</button>
      </div>
    </div>
  );
}

export default RoomOverview;
