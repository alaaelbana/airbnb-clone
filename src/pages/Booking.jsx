import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";
import SingleBooking from "./SingleBooking";

const Booking = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState();
  useEffect(() => {
    axios.get("/bookings").then(({ data }) => {
      setBookings(data);
    });
  }, []);
  return (
    <div>
      {id ? (
        bookings ? (
          <SingleBooking Bookings={bookings} />
        ) : null
      ) : (
        <div className="mt-8 grid gap-5 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] ">
          {bookings?.length > 0
            ? bookings.map((booking) => (
                <Link
                  to={booking._id}
                  key={booking._id}
                  className="shadow-md rounded-lg overflow-hidden mb-2 pb-2"
                >
                  <div className="home_slider h-72">
                    <swiper-container pagination="true">
                      {booking.place.photos?.map((link, idx) =>
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
                      {booking.place.address}
                    </h2>
                    <h3 className="text-sm my-2 text-gray-500 flex gap-2">
                      <span>
                        {differenceInCalendarDays(
                          new Date(booking.checkOut),
                          new Date(booking.checkIn)
                        )}
                        {"  Nights"}
                      </span>
                      <span>
                        From : {format(new Date(booking.checkIn), "dd-MM-yyyy")}
                      </span>
                      <span>
                        {"To : "}
                        {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                      </span>
                    </h3>
                    <div className="text-[18px]">
                      <span className=" font-medium">
                        Totle price: ${booking.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Booking;
