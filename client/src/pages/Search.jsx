import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import axios from "axios";

const Search = () => {
  const [formData, setFormData] = useState({
    // searchTerm:"",
    // rent:"",
    // sale:"",
    // offer:"",
    // parking:"",
    // furnished:"",
  });
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState();
  const changeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/listing/searchlist/${formData}`);
      setLists(response.data.allList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(formData)
  return (
    <div className="container mx-auto bg-orange-200 min-h-[100vh] p-10 ">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex gap-3 w-full h-full">
          <div className="flex flex-col bg-red-200 gap-5 h-full w-1/3 rounded-2xl ">
            <div className="flex   h-full p-5 gap-5 jus items-center">
              <label className="text-xl">Search :</label>
              <input
                className="text-2lg py-2 px-4  rounded-full outline-none w-[320px]"
                type="text"
                name="searchTerm"

                onChange={changeFormData}
              ></input>
            </div>

            <div className="flex text-xl  h-full p-5 gap-5 ">
              <label className="">Type :</label>

              <div className="flex gap-2">
                <span>Rent : </span>

                <input
                  className=" p-2 outline-none w-5"
                  type="checkBox"
                  name="rent"
                  onChange={changeFormData}
                ></input>
              </div>
              <div className="flex gap-2">
                <span>Sale : </span>

                <input
                  className=" p-2 outline-none w-5"
                  type="checkBox"
                  name="sale"

                  onChange={changeFormData}
                ></input>
              </div>
              <div className="flex gap-2">
                <span>Offer : </span>

                <input
                  className=" p-2 outline-none w-5"
                  type="checkBox"
                  name="offer"

                  onChange={changeFormData}
                ></input>
              </div>
            </div>

            <div className="flex text-xl  h-full p-5 gap-5 ">
              <label className="">Amenities :</label>

              <div className="flex gap-2">
                <span>Parking : </span>

                <input
                  className=" p-2 outline-none w-5"
                  type="checkBox"
                  name="parking"

                  onChange={changeFormData}
                ></input>
              </div>
              <div className="flex gap-2">
                <span>Furnished : </span>

                <input
                  className=" p-2 outline-none w-5"
                  type="checkBox"
                  name="furnished"

                  onChange={changeFormData}
                ></input>
              </div>
            </div>
            <button className="mx-32 my-5 p-2 bg-gray-800 text-white rounded-full text-2xl hover:text-black hover:bg-white transition-all ease-linear">
              Search
            </button>
          </div>
          <div className="w-2/3 bg-white h-full">
            {lists?.map((list) => {
              return (
                <Card
                  title={`${list.title}`}
                  description={`${list.description}`}
                  imgUrls={`${list.imageUrls}`}
                  address={`${list.address}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
