import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "swiper/element/bundle";
register();
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-5 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] ">
      {places
        ? places.map((place) => (
            <Link
              to={"place/" + place._id}
              key={place._id}
              className="shadow-md rounded-lg overflow-hidden mb-2 pb-2"
            >
              <div className="home_slider h-72">
                <swiper-container pagination="true">
                  {place.photos?.map((link, idx) =>
                    idx < 5 ? (
                      <swiper-slide key={link}>
                        <img
                          loading="lazy"
                          src={
                            "https://airbnb-clone-api-bewg.onrender.com/uploads/" +
                            link
                          }
                        />
                      </swiper-slide>
                    ) : (
                      ""
                    )
                  )}
                </swiper-container>
              </div>
              <div className="p-3">
                <h2 className="text-lg font-medium capitalize">
                  {place.address}
                </h2>
                <h3 className="text-sm mb-1 text-gray-500">{place.title}</h3>
                <div className="text-[18px]">
                  <span className=" font-medium"> ${place.Price}</span> night
                </div>
              </div>
            </Link>
          ))
        : ""}
    </div>
  );
};

export default IndexPage;
