import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";


const Favorite = () => {
  const [newArrival, setNewArrival] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const token = user_data?.token;

  const handleLikeClick = async (id, isLiked) => {
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
        `${process.env.APP_URL}/api/products/${id}/upvote`,
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
          `${process.env.APP_URL}/api/products/${id}/favorite`,
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
          `${process.env.APP_URL}/api/products/${id}/favorite`,

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
  if (token) {
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
    console.log("no token");
  }

  const isArrayEmpty = (arr) => {
    return arr.length === 0;
  };

  return (
    <div className="w-full mx-auto gap-6 py-4 relative min-h-[49vh]">
      {isLoading ? (
        <div>
          <span className="loading loading-dots loading-lg absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
        </div>
      ) : (
        <div>
          {isArrayEmpty(newArrival) ? (
            <div className=" text-[3rem] text-gray-400 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              No items
            </div>
          ) : (
            <div className=" grid grid-cols-5 container mx-auto" >
              {newArrival
                .filter((d) => d.isFavorited === true)
                .map((item) => (
                  <Card
                    {...item}
                    key={item.id}
                    comments={item.comments}
                    onLikeClick={handleLikeClick}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorite;
