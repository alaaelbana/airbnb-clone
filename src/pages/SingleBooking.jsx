import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBooking = ({ Bookings }) => {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  useEffect(() => {
    const FoundBookings = Bookings.find(({ _id }) => _id === id);
    setBooking(FoundBookings);
  }, []);
  if (!booking) {
    return "";
  }
  return (
    <div>
      <div className="text-[26px] font-medium">
        {booking.place.title}
        <span className="text-[22px] mt-2 "> {booking._id}</span>
      </div>
      <a
        target="_blank"
        className="my-2 font-semibold underline flex items-center"
        href={"https://maps.google.com/?q=" + booking.place.address}
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
        {booking.place.address}
      </a>
      {booking.place.photos ? (
        <div className="flex flex-wrap md:grid gap-2 grid-cols-[2fr_1fr] mt-4 rounded-2xl overflow-hidden relative">
          <div className="pb-1 h-[250px] md:h-[500px] w-full">
            <img
              src={
                "https://airbnb-clone-api-bewg.onrender.com/uploads/" +
                booking.place.photos?.[0]
              }
              className="aspect-square"
              alt=""
            />
          </div>
          <div className="flex md:block">
            <div className="pb-1 h-[150px] md:h-[250px]">
              <img
                src={
                  "https://airbnb-clone-api-bewg.onrender.com/uploads/" +
                  booking.place.photos?.[1]
                }
                className="md:aspect-square"
                alt=""
              />
            </div>
            <div className="pb-1 h-[150px] md:h-[250px]">
              <img
                src={
                  "https://airbnb-clone-api-bewg.onrender.com/uploads/" +
                  booking.place.photos?.[2]
                }
                className="md:aspect-square"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="mt-10">
        <div className="text-sm">
          <div className="text-xl mb-2 font-medium">description</div>
          <div>{booking.place.description} </div>
          <div className="text-xl mt-4 mb-2 font-medium border-t pt-2">
            What this place offers
          </div>
          <div className="grid  grid-cols-2 ">
            {booking.place.perks?.map((perk, idx) => (
              <div className="text-base mb-2" key={idx}>
                {perk}
              </div>
            ))}
          </div>
          <div className="mt-4 normal-case">
            Check in : {booking.place.checkIn}
            <br />
            Check out : {booking.place.checkOut}
            <br />
            Max guests : {booking.place.maxGuests}
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="text-xl mt-8 mb-2 font-medium">extra info</div>
        <div className="text-gray-600 ">{booking.place.extraInfo} </div>
      </div>
    </div>
  );
};

export default SingleBooking;
