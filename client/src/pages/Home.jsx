import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SingleList from "../components/SingleList";
import Sample from "../components/Sample";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  const [lists, setLists] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
try {
  const response = await axios.get(`/api/listing/getalllist`);

  setLists(response.data.allList);
  console.log(response.data.allList);
} catch (error) {
console.log(error)
}
setLoading(false);


  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto  bg-red-200 min-h-[100vh]">
                  {loading ? (
        <Loader />
      ) : (
      <div className="flex justify-center  items-center h-full">


        <div className="flex flex-wrap justify-center items-center ">
          {lists?.map((list) => {
            return (
              <Link to={`/listing/${list._id}`}>
              <Card
                imageUrls={`${list.imageUrls[0]}`}
                title={`${list.title}`}
                address={`${list.address}`}
              />
              </Link>

            );
          })}
        </div>

        <div>
          {lists?.length == 0 && <h1 className="text-5xl p-20">No List Available</h1>}
        </div>

      </div>
      )}
    </div>
  );
};

export default Home;
