
import GalleryCarousel from "../ui/GalleryCarousel";
import RoomOverview from "../ui/RoomOverview";
import { ChevronRightIcon } from '@heroicons/react/24/outline';

function Home() {
  return (
    <>
      <div className="flex justify-center h-100 bg-#e9e9e9">
          <GalleryCarousel/>
        </div>

        <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 max-w-xl mx-auto">
          Experience the luxury boutique hotel in Ahmedabad. Discover a seamless blend of convenience and comfort at Hotel Cosmopolitan located in the bustling heart of the city center. Nestled in Navrangpura, Ahmedabad, Hotel Cosmopolitan is a great choice for travelers looking for a 3-star hotel providing facilities equivalent to a 4-star hotel. Our hotel stands out as one of the highly recommended hotels in Ahmedabad.
          <button className="flex items-center mt-4 text-blue-600 hover:text-blue-800">
          Read More
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </button>
        </p>
        
      </div>

      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">Why choouse us</h1>
        {/* Add your About Us content here */}
      </div>

        <div className="flex flex-wrap justify-center mt-8">
        <RoomOverview/>
        <RoomOverview/>
        <RoomOverview/>
        <RoomOverview/>

      </div>
      
    </>
  );
}

export default Home;
