import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import { Details } from "./Details";
import axios from "axios";

const CategoryDetails = () => {
  const [select, setSelect] = useState(0);
  const { id } = useParams();
  const [initialValue, setInitialValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const token = user_data?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `https://pott.website/api/items-with-likes-favorites`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const response1 = await axios.get(
            `https://pott.website/api/sub-category/${id}`
          );

          setCategory(response1.data.sub_category);

          const { data, likedItems, favoriteItems } = response.data;

          const newData = data.map((card) => ({
            ...card,
            isLiked: likedItems.includes(card.id),
            isFavorited: favoriteItems.includes(card.id),
          }));

          setData(newData);
        } else {
          const { data } = await axios.get(`https://pott.website/api/all`);
          const response1 = await axios.get(
            `https://pott.website/api/sub-category/${id}`
          );
          setCategory(response1.data.sub_category);
          setData(data.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refreshData, id, token]);

  useEffect(() => {
    let dataFilter = data.filter((card) => card.category_id == id);

    if (select !== 0) {
      dataFilter = dataFilter.filter((card) => card.sub_category_id == select);
    }

    if (initialValue) {
      dataFilter = dataFilter.filter((card) =>
        card.title.toLowerCase().includes(initialValue.toLowerCase())
      );
    }

    setFilteredData(dataFilter);
  }, [data, select, initialValue, id]);

  const handleLikeClick = async (id, isLiked) => {
    if (!user_data?.token) {
      navigate("/auth");
      return;
    }

    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isLiked: !isLiked, upvotes_counts: isLiked ? item.upvotes_counts - 1 : item.upvotes_counts + 1 }
          : item
      )
    );

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
      setRefreshData((prev) => !prev);
    }
  };

  const handleFavoriteClick = async (id, isFavorited) => {
    if (!user_data?.token) {
      navigate("/auth");
      return;
    }

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorited: !isFavorited } : item
      )
    );

    try {
      if (isFavorited) {
        await axios.delete(`https://pott.website/api/products/${id}/favorite`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
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
      }
    } catch (error) {
      console.error("Error updating favorite state", error);
      setRefreshData((prev) => !prev);
    }
  };

  if (isLoading)
    return (
      <h1 className="flex justify-center items-center w-full h-[400px]">
        <span className="loading loading-dots loading-lg"></span>
      </h1>
    );

  const optionMap = category.map((subCategory) => ({
    label: subCategory.name,
    value: subCategory.id,
  }));

  const options = [{ label: "All", value: 0 }, ...optionMap];

  return (
    <div>
      <div className="flex w-[99.3vw] justify-center mt-4 relative">
        <div className="absolute left-[100px] z-10">
          <DropDown options={options} selected={setSelect} />
        </div>
        <SearchBar value={setInitialValue} />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 p-6 border-b-2">
        {filteredData.map((card) => (
          <Details
            {...card}
            cid={card.id}
            comments={card.comments}
            onLikeClick={handleLikeClick}
            onFavoriteClick={handleFavoriteClick}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
