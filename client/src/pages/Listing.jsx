import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  SwiperCore.use([Autoplay]);

  SwiperCore.use([Pagination]);

  const [list, setList] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const listId = params.listId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/listing/getlist/${listId}`);
        setList(response.data.list);
        setUser(response.data.userWoPassword);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto overflow-hidden min-h-[100vh]">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {list && (
            <div className="bg-orange-100">
              <Swiper
                loop={true}
                navigation
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                style={{
                  "--swiper-pagination-color": "#FFBA08",
                  "--swiper-pagination-bullet-inactive-color": "#999999",
                  "--swiper-pagination-bullet-inactive-opacity": "1",
                  "--swiper-pagination-bullet-size": "16px",
                  "--swiper-pagination-bullet-horizontal-gap": "6px",
                }}
              >
                {list.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div className="realtive h-[450px] flex justify-center items-center">
                      <img src={`${url}`} className=""></img>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full flex flex-wrap p-5 gap-5">
                <h1 className="text-5xlflex w-full text-center">
                  {list.title}
                </h1>

                <div className="w-full flex">
                  <div className="w-1/2  text-2xl p-8">
                    <h1 className="">{list.description}</h1>
                    <div className="flex justify-between items-center">
                      <label>Address : </label>
                      <h1 className="">{list.address}</h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <label>Furnished : </label>
                      <h1 className="">{list.furnished}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Parking : </label>
                      <h1 className="">{list.parking}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Rent : </label>
                      <h1 className="">{list.rent}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Sale : </label>
                      <h1 className="">{list.sale}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Bathroom : </label>
                      <h1 className="">{list.bathroom}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Bedroom : </label>
                      <h1 className="">{list.bedroom}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Regular Price : </label>
                      <h1 className="">{list.regularprice}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Discounted Price : </label>
                      <h1 className="">{list.discountedprice}</h1>
                    </div>{" "}
                    <div className="flex justify-between items-center">
                      <label>Saler : </label>
                      <h1 className="">{user.username}</h1>
                    </div>
                  </div>
                  <div className="w-1/2 p-5 justify-center items-center">
                  

                    <textarea className="w-full bg-gray-200 rounded-2xl p-4 text-lg h-[300px]" placeholder="Send Your Message to Saler"></textarea>
                    <a href="mailto:tanushmaurya018@gmail.com?body=Customer request "><button className="w-full bg-gray-900 text-white px-4 py-2 rounded-full" >Contact</button></a>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Listing;
