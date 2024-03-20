import { Carousel } from "@material-tailwind/react";
import Gallery1 from "../assets/Gallery1.jpg";
import Gallery2 from "../assets/Gallery2.jpg";
import Gallery3 from "../assets/Gallery3.jpg";
import Gallery4 from "../assets/Gallery4.jpg";
function GalleryCarousel(){
    return(
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
    );
}

export default GalleryCarousel;