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
          `http://127.0.0.1:8000/api/products/${id}/comments`
        );
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

  if (isLoading) return <h1 className="flex justify-center items-center w-full h-[400px]"><span className="loading loading-dots loading-lg"></span></h1>;


  return (
    <div>
      <>
        <div
          className="flex flex-col justify-center items-center p-4"
          key={product.id}
        >
          <div className="w-[500px] h-[500px] overflow-hidden flex justify-center items-center">
            <img
              className="w-full"
              src={`http://localhost:8000/storage/${product.image}`}
              alt="image"
            />
          </div>
          <h1 className="text-2xl mt-2">{product.title}</h1>

          <div className="text-xl flex items-center text-white gap-4 bg-green-600 py-2 px-4 rounded-lg mt-1">
            <HiOutlineShoppingCart />
            {product.price}$
          </div>
        </div>
        <div className="container mx-auto my-5 ">
          <h1 className="text-2xl">More Details</h1>
          <p className=" text-[1.2rem]">{product.details}</p>
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
