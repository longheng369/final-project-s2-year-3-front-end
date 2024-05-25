import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { BsBookmarkFill } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css";

export const CardFav = ({
  id,
  image,
  details,
  title,
  price,
  comments,
  upvotes_counts,
  isLiked,
  onLikeClick,
  isFavorited,
  onFavoriteClick
}) => {
  const handleLikeClick = () => {
    onLikeClick(id, isLiked);
  };

  const handleFavorite = () => {
    onFavoriteClick(id, isFavorited);
  };

  return (
    <div className="w-[270px] h-[361px] bg-blue-100 rounded-sm overflow-hidden shadow-sm cursor-pointer transition-all duration-200 hover:scale-[1.02]">
      <Link
        to={`/card/${id}`}
        className="w-full h-[66%] bg-gray-300  flex justify-center items-center overflow-hidden"
      >
        <img
          src={`https://pott.website/storage/${image}`}
          alt="Product"
          className="w-full"
        />
      </Link>
      <div className="px-2 pt-1">{details}</div>
      <div className="text-lg px-2 capitalize font-bold">{title}</div>
      <div className="flex justify-between w-full px-2">
        <div className="font-600 text-lg">{price}$</div>
        <div>{upvotes_counts} Likes</div>
      </div>
      <div className="flex justify-between items-center w-full px-2 pt-2 relative">
        <div>{comments.length} Comments</div>
        <button className="text-[1.8rem] px-2 z-100" onClick={handleLikeClick}>
          {isLiked ? <FaHeart className="text-red-500" /> : <CiHeart />}
        </button>
        <button onClick={handleFavorite}>
          {isFavorited ? (
            <BsBookmarkFill className="text-2xl text-yellow-500" />
          ) : (
            <BsBookmarkFill className="text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
};
