
import GalleryCarousel from "../ui/GalleryCarousel";
import RoomOverview from "../ui/RoomOverview";

function Home() {
  return (
    <>
      <div className="flex justify-center h-100 bg-#e9e9e9">
          <GalleryCarousel/>
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
