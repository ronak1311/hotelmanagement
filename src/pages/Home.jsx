import { useState } from "react";
import { Carousel } from "@material-tailwind/react";
import Gallery1 from "../assets/Gallery1.jpg";
import Gallery2 from "../assets/Gallery2.jpg";
import Gallery3 from "../assets/Gallery3.jpg";
import Gallery4 from "../assets/Gallery4.jpg";
import R1 from "../assets/R1.jpg";
import R3 from "../assets/R3.jpg";
import R2 from "../assets/R2.jpg";
import R4 from "../assets/R4.jpg";

function Home() {
  return (
    <>
      <div className="flex justify-center h-100 bg-#e9e9e9">
          <Carousel
            className=""
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
              src={Gallery1}
              alt="image 1"
              className="h-screen w-full object-cover"
            />
            <img
              src={Gallery2}
              alt="image 1"
              className="h-screen w-full object-cover"
            />
            <img
              src={Gallery3}
              alt="image 1"
              className="h-screen w-full object-cover"
            />
            <img
              src={Gallery4}
              alt="image 1"
              className="h-screen w-full object-cover"
            />
          </Carousel>
        </div>

        <div className="flex flex-wrap justify-center mt-8">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
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
            </Carousel>
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
            </Carousel>
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
            </Carousel>
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
            </Carousel>
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
