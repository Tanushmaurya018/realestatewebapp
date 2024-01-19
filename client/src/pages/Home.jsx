import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SingleList from "../components/SingleList";
import Sample from "../components/Sample";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import photo1 from "../assets/homeimg/1.jpg";
import photo2 from "../assets/homeimg/2.jpg";
import photo3 from "../assets/homeimg/3.jpg";
import photo4 from "../assets/homeimg/4.jpg";

const list = [photo1, photo2, photo3, photo4];
const Home = () => {
  const [lists, setLists] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  SwiperCore.use([Navigation]);
  SwiperCore.use([Autoplay]);

  SwiperCore.use([Pagination]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/listing/getalllist`);

      setLists(response.data.allList);
      // console.log(response.data.allList);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto bg-gradient-to-b from-red-200 via-red-300 to-yellow-200 ">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-col">
          <div className="w-full h-[500px]  ">
            <div className=" flex flex-col justify-between relative  w-full h-full  p-5">
              {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-black opacity-80 rounded-2xl"></div> */}
              <div className="absolute top-0 bottom-0 left-0 right-0 p-0 h-full">
                <Swiper
                  className="w-full h-full"
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  {list.map((url) => (
                    <SwiperSlide key={url}>
                      <div className="h-auto  md:h-full flex  justify-center p- overflow-hidden  ">
                        <img
                          src={url}
                          className="shadow-sm shadow-current  h-[500px] md:h-full w-full object-cover "
                        ></img>
                        <div className="absolute  inset-0 bg-gradient-to-l from-transparent to-black opacity-95"></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <h1 className=" flex justify-center text-3xl md:text-7xl text-gray-300 z-[2]">
                Welcome To Maurya Estates{" "}
              </h1>
              <p
                className="text-sm md:text-3xl text-gray-400 w-3/4
              z-[2]"
              >
                Welcome to mauryaestate.com – Your gateway to exceptional homes
                in India! Explore a curated selection of properties tailored to
                your lifestyle. From urban dwellings to serene retreats, find
                your perfect home effortlessly. mauryaestate.com, where your
                dream home awaits!
              </p>

              <div className="flex justify-between z-[2]">
                <Link to="/login">
                  <h1 className=" text-2sm md:text-2xl z-10 px-5 md:px-10 rounded-full bg-green-600  py-2 text-white">
                    Log In
                  </h1>
                </Link>

                <Link to="/">
                  <h1 className="  text-2sm md:text-2xl z-10 px-5 md:px-10 rounded-full bg-blue-600  py-2 text-white">
                    View Listing
                  </h1>
                </Link>
              </div>
            </div>
          </div>

          <div className=" flex justify-center  items-center h-full">
            <div className=" flex flex-wrap justify-center items-center ">
              {lists?.map((list) => {
                return (
                  <Link to={`/listing/${list._id}`} key={list._id}>
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
              {lists?.length == 0 && (
                <h1 className="text-5xl p-20">No List Available</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
