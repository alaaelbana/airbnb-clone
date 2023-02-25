import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { register } from "swiper/element/bundle";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";
register();

const SinglePlace = () => {
  let currentDate = new Date().toJSON().slice(0, 10);

  const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeData, setplaceData] = useState({});
  const [checkIn, setCheckIn] = useState(currentDate);
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [imgsSwiper, setImgsSwiper] = useState(false);
  useEffect(() => {
    axios
      .get("/places/" + id)
      .then(({ data }) => {
        setplaceData(data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [id]);
  useEffect(() => {
    user ? setUsername(user.name) : null;
  }, [user]);
  function bookThisPlace() {
    const data = {
      checkIn,
      checkOut,
      maxGuests,
      username,
      phone,
      place: id,
      price:
        differenceInCalendarDays(new Date(checkOut), new Date(checkIn)) *
        placeData.Price,
    };
    axios
      .post("/bookings", data)
      .then((response) => {
        const { data } = response;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className=" py-4 capitalize pb-20">
      <div className="text-[26px] font-medium">{placeData.title} </div>
      <a
        target="_blank"
        className="my-2 font-semibold underline flex items-center"
        href={"https://maps.google.com/?q=" + placeData.address}
      >
        <svg
          viewBox="0 0 100.353 100.352"
          width={22}
          height={20}
          strokeWidth={3}
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="translate-y-[2px]"
        >
          <path d="M58.23,69.992l14.993-24.108c0.049-0.078,0.09-0.16,0.122-0.245c2.589-4.222,3.956-9.045,3.956-13.969   c0-14.772-12.018-26.79-26.79-26.79S23.72,16.898,23.72,31.67c0,4.925,1.369,9.75,3.96,13.975c0.03,0.074,0.065,0.146,0.107,0.216   l14.455,24.191c-11.221,1.586-18.6,6.2-18.6,11.797c0,6.935,11.785,12.366,26.829,12.366S77.3,88.783,77.3,81.849   C77.301,76.226,69.578,71.509,58.23,69.992z M30.373,44.294c-2.39-3.804-3.653-8.169-3.653-12.624   c0-13.118,10.672-23.79,23.791-23.79c13.118,0,23.79,10.672,23.79,23.79c0,4.457-1.263,8.822-3.652,12.624   c-0.05,0.08-0.091,0.163-0.124,0.249L54.685,70.01c-0.238,0.365-0.285,0.448-0.576,0.926l-4,6.432L30.507,44.564   C30.472,44.471,30.427,44.38,30.373,44.294z M50.472,91.215c-14.043,0-23.829-4.937-23.829-9.366c0-4.02,7.37-7.808,17.283-8.981   l4.87,8.151c0.269,0.449,0.751,0.726,1.274,0.73c0.004,0,0.009,0,0.013,0c0.518,0,1-0.268,1.274-0.708l5.12-8.232   C66.548,73.9,74.3,77.784,74.3,81.849C74.301,86.279,64.515,91.215,50.472,91.215z" />
          <path d="M60.213,31.67c0-5.371-4.37-9.741-9.741-9.741s-9.741,4.37-9.741,9.741s4.37,9.741,9.741,9.741   C55.843,41.411,60.213,37.041,60.213,31.67z M43.731,31.67c0-3.717,3.024-6.741,6.741-6.741s6.741,3.024,6.741,6.741   s-3.023,6.741-6.741,6.741S43.731,35.387,43.731,31.67z" />
        </svg>
        {placeData.address}
      </a>
      {placeData.photos ? (
        <div className="grid gap-2 grid-cols-[2fr_1fr] mt-4 rounded-2xl overflow-hidden relative">
          <div className="pb-1 h-[500px]" onClick={() => setImgsSwiper(true)}>
            <img
              src={"https://airbnb-clone-api-bewg.onrender.com/uploads/" + placeData.photos?.[0]}
              className="aspect-square cursor-pointer"
              alt=""
            />
          </div>
          <div className="">
            <div className="pb-1 h-[250px]" onClick={() => setImgsSwiper(true)}>
              <img
                src={"https://airbnb-clone-api-bewg.onrender.com/uploads/" + placeData.photos?.[1]}
                className="aspect-square cursor-pointer"
                alt=""
              />
            </div>
            <div className="pb-1 h-[250px]" onClick={() => setImgsSwiper(true)}>
              <img
                src={"https://airbnb-clone-api-bewg.onrender.com/uploads/" + placeData.photos?.[2]}
                className="aspect-square cursor-pointer"
                alt=""
              />
            </div>
          </div>
          <div
            className="flex items-center gap-1 absolute right-5 bottom-5 py-2 px-4 bg-white cursor-pointer rounded-md text-sm font-medium shadow-lg"
            onClick={() => setImgsSwiper(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Show all photos
          </div>
        </div>
      ) : null}
      {imgsSwiper ? (
        <div className="imgsSwiper">
          <swiper-container
            zoom="true"
            pagination="true"
            pagination-clickable="true"
          >
            {placeData.photos?.map((link) => (
              <swiper-slide key={link}>
                <div className="swiper-zoom-container">
                  <div
                    className="absolute top-[-20px] left-[-20px] w-screen h-screen cursor-pointer"
                    onClick={() => setImgsSwiper(false)}
                  ></div>
                  <img
                    loading="lazy"
                    className="relative"
                    src={"https://airbnb-clone-api-bewg.onrender.com/uploads/" + link}
                  />
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
          <div
            className="fixed top-5 left-5 flex bg-[#1e1e1e] py-1 pl-2 pr-4 rounded-md text-white items-center gap-1 cursor-pointer z-50"
            onClick={() => setImgsSwiper(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close
          </div>
        </div>
      ) : null}
      <div className="mt-10 grid grid-cols-[2fr_1fr]">
        <div className="text-sm pr-[10%]">
          <div className="text-xl mb-2 font-medium">description</div>
          <div>{placeData.description} </div>
          <div className="text-xl mt-4 mb-2 font-medium border-t pt-2">
            What this place offers
          </div>
          <div className="grid  grid-cols-2 ">
            {placeData.perks?.map((perk, idx) => (
              <div className="text-base mb-2" key={idx}>
                {perk}
              </div>
            ))}
          </div>
          <div className="mt-4 normal-case">
            Check in : {placeData.checkIn}
            <br />
            Check out : {placeData.checkOut}
            <br />
            Max guests : {placeData.maxGuests}
          </div>
        </div>
        <div>
          <div className="shadow-dark px-5 py-6 rounded-xl">
            <div className="text-xl font-medium text-center">
              price : ${placeData.Price} / per night
            </div>
            <div className="flex">
              <div className="py-4">
                <label className="text-sm font-medium">Check in:</label>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="date"
                  min={checkIn}
                />
              </div>
              <div className="py-4 pl-4">
                <label className="text-sm font-medium">Check Out:</label>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="date"
                  min={checkIn}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium">Number of guests:</label>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            {checkIn && checkOut && (
              <>
                <div className="mb-4">
                  <label className="text-sm font-medium">Your Full name:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium">Phone Number:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}
            <button className="primary mb-1" onClick={bookThisPlace}>
              Book this place {""}
              {checkIn && checkOut && (
                <span>
                  $
                  {differenceInCalendarDays(
                    new Date(checkOut),
                    new Date(checkIn)
                  ) * placeData.Price}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="text-xl mt-8 mb-2 font-medium">extra info</div>
        <div className="text-gray-600 ">{placeData.extraInfo} </div>
      </div>
    </div>
  );
};

export default SinglePlace;
