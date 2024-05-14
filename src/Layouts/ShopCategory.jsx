import Category from "../components/Category";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryCard from "../Skeleton/CategoryCard";

const ShopCategory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shopCategory"],
    queryFn: () => {
      return axios
        .get("http://127.0.0.1:8000/api/category")
        .then((res) => res.data);
    },
  });

  if (isLoading) {
    return (
      <div className="container grid grid-cols-4 gap-6 mx-auto mb-10">
        {[...Array(3)].map((_, index) => {
          return <CategoryCard key={index} />;
        })}
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-10">
      <h2 className="text-center text-[3rem] p-4 ">Shop By Category</h2>
      <div className="grid xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.categories.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
