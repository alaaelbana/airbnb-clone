import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [Perks, setPerks] = useState([]);
  const [places, setPlaces] = useState([]);
  const [data, setData] = useState({
    Title: "",
    Address: "",
    CheckIn: "",
    CheckOut: "",
    Guests: "",
    Price: "",
    Description: "",
    Extra: "",
    Photos: "",
  });
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, [id]);

  useEffect(() => {
    if (id === "new") {
      setData({
        ...data,
        Title: "",
        Address: "",
        CheckIn: "",
        CheckOut: "",
        Guests: "",
        Price: "",
        Description: "",
        Extra: "",
      });
      setAddedPhotos([]);
      setPerks([]);
    }
    id && id !== "new"
      ? axios.get("/places/" + id).then((response) => {
          const { data: SinglePlaceData } = response;
          setData({
            ...data,
            Title: SinglePlaceData.title,
            Address: SinglePlaceData.address,
            CheckIn: SinglePlaceData.checkIn,
            CheckOut: SinglePlaceData.checkOut,
            Guests: SinglePlaceData.maxGuests,
            Description: SinglePlaceData.description,
            Extra: SinglePlaceData.extraInfo,
            Price: SinglePlaceData.Price,
          });
          setAddedPhotos(SinglePlaceData.photos);
          setPerks(SinglePlaceData.perks);
        })
      : null;
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function addPhotoByLink() {
    const { data: filename } = await axios.post("/upload-by-link", {
      link: data.Photos,
    });
    setAddedPhotos((prev) => [...prev, filename]);
    setData({ ...data, Photos: "" });
  }
  function uploadPhoto(e) {
    const files = e.target.files;
    const Filedata = new FormData();
    for (let i = 0; i < files.length; i++) {
      Filedata.append("photos", files[i]);
    }
    axios
      .post("/upload", Filedata, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => [...prev, ...filenames]);
        setData({ ...data, Photos: "" });
      });
  }
  function handleCbClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      setPerks([...Perks, name]);
    } else {
      setPerks([...Perks.filter((item) => item !== name)]);
    }
  }
  function removePhoto(link) {
    setAddedPhotos(addedPhotos.filter((item) => item !== link));
  }
  function selectAsMain(link) {
    setAddedPhotos([link, ...addedPhotos.filter((item) => item !== link)]);
  }
  async function addNewPlace(e) {
    e.preventDefault();
    await axios.post("/places", {
      ...data,
      addedPhotos,
      Perks,
    });
    setRedirect("/account/places");
  }
  async function editPlace(e) {
    e.preventDefault();
    await axios.put("/places", {
      ...data,
      addedPhotos,
      Perks,
      id,
    });
    setRedirect("/account/places");
  }
  if (redirect && id) {
    setTimeout(() => {
      setRedirect("");
    }, 10);
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      {id === undefined && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
          <div className="mt-8 grid gap-5 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
            {places
              ? places.map((place) => (
                  <Link
                    to={"/account/places/" + place._id}
                    key={place._id}
                    className="shadow-md rounded-lg overflow-hidden"
                  >
                    <div className="h-60">
                      <img
                        src={"https://airbnb-clone-api-bewg.onrender.com/uploads/" + place.photos[0]}
                        alt=""
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-lg capitalize">{place.title}</h3>
                      <p className="text-sm mt-1 mb-2 text-gray-500">
                        {place.description}
                      </p>
                    </div>
                  </Link>
                ))
              : ""}
          </div>
        </div>
      )}
      {id && (
        <div className="mb-10 max-w-screen-xl mx-auto shadow-md rounded-md p-6 pt-4">
          <form onSubmit={id === "new" ? addNewPlace : editPlace}>
            <h2 className="text-4xl text-center">Add new place</h2>

            <p className="text-gray-500 text-base mt-4">Title :</p>
            <input
              type="text"
              placeholder="title for this place"
              name="Title"
              value={data.Title}
              onChange={onChangeHandler}
            />

            <p className="text-gray-500 text-base mt-4">Address :</p>
            <input
              type="text"
              placeholder="Address for this place"
              name="Address"
              value={data.Address}
              onChange={onChangeHandler}
            />

            <div className="grid gap-5 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
              <div>
                <p className="text-gray-500 text-base mt-4">Check in time :</p>
                <input
                  type="text"
                  placeholder="14"
                  name="CheckIn"
                  value={data.CheckIn}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <p className="text-gray-500 text-base mt-4">Check out time :</p>
                <input
                  type="text"
                  placeholder="11"
                  name="CheckOut"
                  value={data.CheckOut}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <p className="text-gray-500 text-base mt-4">
                  Max number of guests :
                </p>
                <input
                  type="number"
                  placeholder="number"
                  name="Guests"
                  value={data.Guests}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <p className="text-gray-500 text-base mt-4">
                  Price per night :
                </p>
                <input
                  type="number"
                  placeholder="number"
                  name="Price"
                  value={data.Price}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <p className="text-gray-500 text-base mt-4">Perks :</p>
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] mt-1">
              <label className="border px-4 py-2 flex items-center justify-start rounded-2xl gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleCbClick}
                  checked={Perks.includes("wifi")}
                  name="wifi"
                  className="w-auto m-0"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                  />
                </svg>
                <span>Wifi</span>
              </label>
              <label className="border px-4 py-2 flex items-center justify-start rounded-2xl gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleCbClick}
                  checked={Perks.includes("Free Parking Spot")}
                  name="Free Parking Spot"
                  className="w-auto m-0"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <span>Free Parking Spot</span>
              </label>
              <label className="border px-4 py-2 flex items-center justify-start rounded-2xl gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleCbClick}
                  checked={Perks.includes("TV")}
                  name="TV"
                  className="w-auto m-0"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span>TV</span>
              </label>
              <label className="border px-4 py-2 flex items-center justify-start rounded-2xl gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleCbClick}
                  checked={Perks.includes("Pets")}
                  name="Pets"
                  className="w-auto m-0"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
                <span>Pets</span>
              </label>
              <label className="border px-4 py-2 flex items-center justify-start rounded-2xl gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleCbClick}
                  checked={Perks.includes("Private Entrance")}
                  name="Private Entrance"
                  className="w-auto m-0"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span>Private Entrance</span>
              </label>
            </div>

            <p className="text-gray-500 text-base mt-4">Description :</p>
            <textarea
              type="text"
              placeholder="Description for this placeof this place"
              rows={4}
              name="Description"
              value={data.Description}
              onChange={onChangeHandler}
            />
            <p className="text-gray-500 text-base mt-4">Extra Info :</p>
            <textarea
              type="text"
              placeholder="house rules .etc"
              rows={4}
              name="Extra"
              value={data.Extra}
              onChange={onChangeHandler}
            />
            <p className="text-gray-500 text-base mt-4">Photos :</p>
            <div className="flex gap-2">
              <input
                type="text"
                className="m-0"
                placeholder="Add Photo Using Link ...jpg"
                name="Photos"
                value={data.Photos}
                onChange={onChangeHandler}
              />
              <div
                className="primary max-w-[18%] text-center"
                onClick={addPhotoByLink}
              >
                Add Photo
              </div>
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] mt-4">
              <label className="bg-transparent border rounded-2xl cursor-pointer p-12 text-gray-500 text-lg flex flex-col justify-center items-center gap-1">
                <input type="file" multiple hidden onChange={uploadPhoto} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
              {addedPhotos?.map((link) => (
                <div key={link} className="relative">
                  <img
                    src={"https://airbnb-clone-api-bewg.onrender.com/uploads/" + link}
                    className="h-[200px] rounded-2xl"
                    alt=""
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    onClick={() => removePhoto(link)}
                    className="w-7 h-7 cursor-pointer absolute top-2 left-2 bg-[#0000006b] text-white rounded-full p-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`  ${
                      link === addedPhotos[0] ? "bg-orange-500" : ""
                    } w-7 h-7 cursor-pointer absolute top-2 right-2 bg-[#0000006b] text-white rounded-full p-1 transition duration-500 hover:bg-orange-500`}
                    onClick={() => selectAsMain(link)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="primary mt-8 mb-2 max-w-sm">save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
