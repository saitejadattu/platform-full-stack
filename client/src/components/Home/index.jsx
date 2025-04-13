import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar";
import cookie from "js-cookie";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRatings, setUserRatings] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const jwt = cookie.get("jwtToken");
  console.log(reviews);
  const decoded = jwtDecode(jwt);
  const fetchData = async () => {
    const payload = {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };

    const response1 = await axios.get(
      "http://localhost:5000/seller/all-stores",
      payload
    );
    setStores(response1.data.result);
    const response2 = await axios.get(
      "http://localhost:5000/seller/allReviews",
      payload
    );
    setReviews(response2.data.result);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleRatingSubmit = (storeId, rating) => {
    const userId = decoded.id;
    axios
      .post(`http://localhost:5000/user/review/${userId}/${storeId}`, {
        rating,
      })
      .then(() => {
        setUserRatings((prevRatings) => ({
          ...prevRatings,
          [storeId]: rating,
        }));
        setIsRatingModalOpen(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 h-screen">
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-lg mx-auto mb-6">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search stores by name or address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
              <p className="text-sm text-gray-500">{store.address}</p>
              <div className="mt-3 flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Overall Rating:
                  </span>
                  <span className="ml-1 text-yellow-500">
                    {store.rating || "N/A"}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-gray-700">Your Rating:</p>
                <div className="flex items-center space-x-2">
                  <span>{userRatings[store.id] || "No Rating Yet"}</span>
                  <button
                    onClick={() => {
                      setSelectedStore(store);
                      setNewRating(userRatings[store.id] || 0);
                      setIsRatingModalOpen(true);
                    }}
                    className="ml-2 text-blue-500 hover:underline"
                  >
                    {userRatings[store.id] ? "Modify Rating" : "Submit Rating"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isRatingModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-bold mb-4">{selectedStore.name}</h3>
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    className={`p-2 rounded-full ${
                      newRating >= value ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                    onClick={() => setNewRating(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsRatingModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (userRatings[selectedStore.id]) {
                      handleRatingSubmit(selectedStore.id, newRating);
                    } else {
                      handleRatingSubmit(selectedStore.id, newRating);
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {userRatings[selectedStore.id]
                    ? "Update Rating"
                    : "Submit Rating"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
