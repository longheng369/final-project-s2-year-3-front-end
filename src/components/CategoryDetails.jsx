// import { useParams } from "react-router-dom";
// import { categorysDetails } from "../data";
// import SearchBar from "./SearchBar";
// import { useState } from "react";
// import DropDown from "./DropDown";
// import { Details } from "./Details";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const CategoryDetails = () => {
//   const [select, setSelect] = useState("All");
//   const { id } = useParams();
//   const [initialValue, setInitialValue] = useState("");
//   const [arrayData,setArrayData] = useState([])

//   const [filteredData, setFilteredData] = useState([]);

//   const user_data = JSON.parse(localStorage.getItem("user_data"));
//   const token = user_data?.token;

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["Categories"],
//     queryFn: () => {
//       return axios
//         .get("http://127.0.0.1:8000/api/items-with-likes-favorites", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => res.data);
//     },
//   });

//   // console.log(data);

//   function value(e) {
//     setInitialValue(e);
//   }

//   const selectedValue = (value) => {
//     setSelect(value);
//     setInitialValue("");
//   };

//   if(isLoading){
//     return <h1>isLoading...</h1>
//   }else{
//     // Initially filter data based on category ID
//     // dataFilter = data.data.filter((card) => card.category_id == id);
//     setArrayData(data.data)
//     console.log(arrayData)
//   }

//   // Further filter based on dropdown selection if not "All"
//   if (select !== "All") {
//     dataFilter = dataFilter.filter((card) =>
//       card.title.toLowerCase().includes(select.toLowerCase())
//     );
//   }

//   // Apply search filter if there is an initialValue
//   if (initialValue) {
//     dataFilter = dataFilter.filter((card) =>
//       card.title.toLowerCase().includes(initialValue.toLowerCase())
//     );
//   }

//   return

//   // const dataFilter = categorysDetails.filter(card => card.category_id == id);

//   const options = ["All", "option 1", "Option 2", "Option 3"];

//   return (
//     <div>
//       <div className="flex w-[99.3vw] justify-center mt-4 relative">
//         <div className="absolute left-[100px] z-10">
//           <DropDown options={options} selected={selectedValue} />
//         </div>
//         <SearchBar value={value} />
//       </div>
//       <div className="flex flex-wrap justify-center items-center gap-10 p-6 border-b-2">
//         {dataFilter.map((card) => (
//           <Details {...card} cid={card.id} key={card.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryDetails;

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import { Details } from "./Details";
import axios from "axios";
import { BsColumns } from "react-icons/bs";

const user_data = JSON.parse(localStorage.getItem("user_data"));
const token = user_data?.token;

const CategoryDetails = () => {
  const [select, setSelect] = useState(0);
  const { id, name } = useParams();
  const [initialValue, setInitialValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // const [subCategory,setSubCategory] = useState([])
  // const [value,setValue] = useState(0);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectedValue = (value) => {
    setSelect(value); // Update the selected value
    // Perform filtering based on the selected value
    // For example, set filtered data here
  };

  // console.log(select);

  // check if have user
  if (user_data?.token && user_data?.name) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/items-with-likes-favorites",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const response1 = await axios.get(
            `http://127.0.0.1:8000/api/sub-category/${id}`
          );
        
          setCategory(response1.data.sub_category);

          const { data, likedItems, favoriteItems } = response.data;

          const newData = data.map((card) => ({
            ...card,
            isLiked: likedItems.includes(card.id),
            isFavorited: favoriteItems.includes(card.id),
          }));

          setData(newData);
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
          const { data } = await axios.get("http://127.0.0.1:8000/api/all");
          const response1 = await axios.get(
            `http://127.0.0.1:8000/api/sub-category/${id}`
          );
          setCategory(response1.data.sub_category);
          setData(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAllData();
    }, []);
  }

  const handleLikeClick = async (id, isLiked) => {
    if (!user_data?.token) {
      navigate("/auth");
      return;
    }
    // Optimistic update: Update UI immediately
    setData((prev) => {
      return prev.map((item) => {
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
        `http://127.0.0.1:8000/api/products/${id}/upvote`,
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
    if (!user_data?.token) {
      navigate("/auth");
      return;
    }
    setData((preview) => {
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
          `http://127.0.0.1:8000/api/products/${id}/favorite`,
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
          `http://127.0.0.1:8000/api/products/${id}/favorite`,

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

  // useEffect(() => {
  //   if (data) {
  //     let dataFilter = data.filter((card) => card.category_id == id);

  //     if (select !== "All") {
  //       dataFilter = dataFilter.filter((card) =>
  //         card.title.toLowerCase().includes(select.toLowerCase())
  //       );
  //     }

  //     if (initialValue) {
  //       dataFilter = dataFilter.filter((card) =>
  //         card.title.toLowerCase().includes(initialValue.toLowerCase())
  //       );
  //     }

  //     setFilteredData(dataFilter);
  //   }
  // }, [ select, initialValue]);

  useEffect(() => {
    let updatedFilteredData = [];
    if (select === 0) {
      // Filter data based on category ID
      const dataFilter = data.filter((card) => card.category_id == id);
      updatedFilteredData = dataFilter;
    } else {
      // Filter data based on sub-category ID
      updatedFilteredData = data.filter((d) => d.sub_category_id == select && d.category_id == id);
    }
    setFilteredData(updatedFilteredData);
  }, [select, data, id]);
  

  // if (initialValue) {
  //   dataFilter = data.filter((card) =>
  //     card.title.toLowerCase().includes(initialValue.toLowerCase())
  //   );
  // }

  if (isLoading) return <h1 className="flex justify-center items-center w-full h-[400px]"><span className="loading loading-dots loading-lg"></span></h1>;

  const optionMap = category.map((subCategory) => ({
    label: subCategory.name,
    value: subCategory.id,
  }));

  const options = [{ label: "All", value: 0 }, ...optionMap];

  // console.log(options);

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
