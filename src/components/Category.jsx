import { Link } from "react-router-dom";

const Category = ({ id, image, title }) => {

  
  return (
    <div>
      <div className="h-[330px]  rounded-md overflow-hidden">
        <Link to={`/category/${id}/${title}`}>
          <div className="w-full h-[80%] overflow-hidden bg-gray-200 flex justify-center items-center">
            <img
              src={`http://localhost:8000/storage/${image}`}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex items-center justify-center bg-gray-600 w-full h-[20%] px-2">
          <button className="text-xl text-white">{title}</button>
        </div>
      </div>
    </div>
  );
};

export default Category;
