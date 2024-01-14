import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);

  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const listId = params.listId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/listing/getlist/${listId}`);
        setList(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto overflow-hidden p-3">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {list && (
            <div>
              <Swiper navigation>
                {list.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div className="h-[450px] flex justify-center items-center">
                      <img src={`${url}`} className=""></img>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full flex flex-col flex-wrap p-5 gap-5">
                <h1 className="text-5xl w-full text-center">{list.title}</h1>
                <div className="w-1/2 text-2xl p-8">
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
                    <h1 className="">{list.author}</h1>
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
