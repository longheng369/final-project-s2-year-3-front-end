import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../Skeleton/CardSkeleton";
import { useNavigate } from "react-router-dom";

const NewArrival = () => {
  const [newArrival, setNewArrival] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const token = user_data?.token;

  const handleLikeClick = async (id, isLiked) => {

    if(!user_data?.token && !user_data?.name){
      navigate('/auth')
      return;
    }
    // Optimistic update: Update UI immediately
    setNewArrival((prevArrival) => {
      return prevArrival.map((item) => {
        if (item.id === id) {
          const updatedLikesCount = isLiked
            ? item.upvotes_counts - 1
            : item.upvotes_counts + 1;
          return {
            ...item,
            isLiked: !isLiked,
            upvotes_counts: updatedLikesCount,
          };
        }
        return item;
      });
    });

    // Send request to upvote endpoint with the product ID
    try {
      await axios.post(
        `https://pott.website/api/products/${id}/upvote`,
        { is_upvote: !isLiked },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating like state", error);
      // If request fails, revert UI to previous state
      setRefreshData((prev) => !prev);
    }
  };

  const handleFavoriteClick = async (id, isFavorited) => {
    if(!user_data?.token && !user_data?.name){
      navigate('/auth')
      return;
    }
    setNewArrival((preview) => {
      return preview.map((item) => {
        if (item.id === id) {
          return { ...item, isFavorited: !isFavorited };
        }
        return item;
      });
    });

    if (isFavorited === false) {
      // Send request to upvote endpoint with the product ID
      try {
        await axios.post(
          `https://pott.website/api/products/${id}/favorite`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating favorite state", error);
        // If request fails, revert UI to previous state
        setRefreshData((prev) => !prev);
      }
    } else {
      // Send request to upvote endpoint with the product ID
      try {
        await axios.delete(
          `https://pott.website/api/products/${id}/favorite`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating favorite state", error);
        // If request fails, revert UI to previous state
        setRefreshData((prev) => !prev);
      }
    }
  };

  // check if have user
  if (user_data?.token && user_data?.name) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://pott.website/api/items-with-likes-favorites`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const { data, likedItems, favoriteItems } = response.data;

          const newArrivalData = data.map((card) => ({
            ...card,
            isLiked: likedItems.includes(card.id),
            isFavorited: favoriteItems.includes(card.id),
          }));

          setNewArrival(newArrivalData);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [refreshData]);
  } else {
    useEffect(() => {
      const fetchAllData = async () => {
        try {
          const {data} = await axios.get(`https://pott.website/api/all`);
          setNewArrival(data.data)

        } catch (error) {
          console.log(error)
        }finally{
          setIsLoading(false)
        }
      }
      fetchAllData();
    }, []);
  }

  return (
    <div className="w-full pb-8 flex flex-col items-center">
      <h2 className="text-[3rem] p-4">New Arrival</h2>
      <div className="flex justify-center gap-6 container mb-6">
        {isLoading && (
          <div className="flex gap-6">
            <CardSkeleton /> <CardSkeleton />
            <CardSkeleton /> <CardSkeleton />
          </div>
        )}

        {newArrival.slice(0,4).map((item) => (
          <Card
            {...item}
            key={item.id}
            comments={item.comments}
            onLikeClick={handleLikeClick}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
      <article
        className="container h-[400px] p-10 bg-green-300 relative"
        style={{
          backgroundImage:
            "url('https://marketplace.canva.com/EAFEH3mIUaM/1/0/1600w/canva-dark-grey-and-white-minimalist-new-fashion-collection-banner-nvaqxg-8iXI.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="font-bold text-3xl mb-8 text-white">Today Promotion</h1>
      </article>
    </div>
  );
};

export default NewArrival;


