import { useState } from "react";
import { Carousel } from "@material-tailwind/react";

function Home() {
  return (
    <>
      <div className="flex justify-center h-100">
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
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-screen w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-screen w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-screen w-full object-cover"
            />
          </Carousel>
        </div>

        <div className="flex flex-wrap justify-center mt-8">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <img src="https://via.placeholder.com/150" alt="Room" className="w-full h-40 object-cover mb-4 rounded-lg" />
            <div className="text-lg font-bold mb-2">Deluxe Room</div>
            <div className="text-gray-700 mb-2">$200 per night</div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Free Wi-Fi</li>
              <li>Complimentary breakfast</li>
              <li>Pool access</li>
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Now</button>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <img src="https://via.placeholder.com/150" alt="Room" className="w-full h-40 object-cover mb-4 rounded-lg" />
            <div className="text-lg font-bold mb-2">Deluxe Room</div>
            <div className="text-gray-700 mb-2">$200 per night</div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Free Wi-Fi</li>
              <li>Complimentary breakfast</li>
              <li>Pool access</li>
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Now</button>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <img src="https://via.placeholder.com/150" alt="Room" className="w-full h-40 object-cover mb-4 rounded-lg" />
            <div className="text-lg font-bold mb-2">Deluxe Room</div>
            <div className="text-gray-700 mb-2">$200 per night</div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Free Wi-Fi</li>
              <li>Complimentary breakfast</li>
              <li>Pool access</li>
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Now</button>
          </div>
        </div>



        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <img src="https://via.placeholder.com/150" alt="Room" className="w-full h-40 object-cover mb-4 rounded-lg" />
            <div className="text-lg font-bold mb-2">Deluxe Room</div>
            <div className="text-gray-700 mb-2">$200 per night</div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Free Wi-Fi</li>
              <li>Complimentary breakfast</li>
              <li>Pool access</li>
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Book Now</button>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Home;
