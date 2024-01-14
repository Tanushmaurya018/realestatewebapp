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
    <div className="container mx-auto overflow-hidden">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {list && (
            <div>
              <Swiper navigation>
                {list.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[550px]"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="w-full text-7xl flex flex-col">
              <h1>{list.title}</h1>
              <h1>{list.description}</h1>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Listing;
