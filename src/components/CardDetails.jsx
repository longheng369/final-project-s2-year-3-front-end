import { useParams } from "react-router-dom";

import { comments } from "../data";
import Comment from "./Comment";
import Rate from "./Rate";
import Textarea from "./Textarea";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";

const CardDetails = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [refresh, setRefresh] = useState(true);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };


  useEffect(() => {
    const fetchComment = async () => {
      try {
        const { data } = await axios.get(
          `https://pott.website/api/products/${id}/comments`
        );
        console.log(data)
        setProduct(data.data);
        setComments(data.data.comments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComment();
    const intervalId = setInterval(fetchComment, 6000); // Poll every 60 seconds

    return () => clearInterval(intervalId);
  }, [refresh]);

  if (isLoading)
    return (
      <h1 className="flex justify-center items-center w-full h-[400px]">
        <span className="loading loading-dots loading-lg"></span>
      </h1>
    );

  return (
    <div>
      <>
        <div
          className="flex flex-col justify-center items-center p-4"
          key={product.id}
        >
          <div className=" w-full px-[12rem] py-[4rem] bg-gray-200">
            <div className="bg-white flex justify-center">
              <div className="flex justify-center items-center py-4">
                <div className="w-[500px] h-[500px]">
                  <img
                    className="w-full ml-8"
                    src={`https://pott.website/storage/${product.image}`}
                    alt="image"
                  />
                </div>
              </div>
              <div className="mx-16 my-12 flex-1 ">
                <h1 className="text-2xl mt-2">Model: {product.title}</h1>

                <h1 className="text-xl">Size: {product.size} {product.scale}</h1>
                <h1 className="text-xl">Color: {product.color}</h1>

                <div className="bg-yellow-400 px-4 py-2 rounded-lg">
                  <h1 className="text-xl">
                    Price: <span className="font-bold text-blue-800">3$</span>
                  </h1>
                </div>

                {/* <h2 className="w-full border border-gray-400"></h2> */}
                <p className="text-lg">
                  <span className="font-bold text-xl">More Details: </span>
                  {product.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>

      <div>
        <div className="container mx-auto flex justify-center border-t-2 border-gray-300 pt-4 mt-5">
          <Textarea onRefresh={handleRefresh} />
        </div>

        <div className="flex flex-col py-4 mx-auto container gap-4 items-center mb-6">
          {comments.map((comment) => (
            <Comment {...comment} key={comment.comment_id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
