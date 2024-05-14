import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Textarea = ({onRefresh}) => {
  const { id } = useParams();
  const [body, setBody] = useState("");
  const textareaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFresh = () => {
    onRefresh();
  }

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const token = user_data?.token;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "50px"; // Reset height to ensure correct calculation
    textarea.style.height = textarea.scrollHeight + "px"; // Set to scroll height
  }, [body]);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleComment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/products/${id}/comment`,
        { body: body },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      setBody("");
      handleFresh()
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setBody("");
      setIsLoading(false);
      handleFresh()
    }
  };
  return (
    <div className="flex items-start w-11/12">
      <textarea
        ref={textareaRef}
        className="w-[90%] rounded-lg outline-none border-2 shadow-sm resize-none overflow-hidden text-lg p-2 max-h-[200px]"
        placeholder="Type your message here..."
        value={body}
        onChange={handleChange}
      />
      <div className="ml-2 flex-shrink-0">
        {isLoading ? (
          <button  className="px-4 py-2 rounded-lg bg-blue-500 opacity-[0.6] text-lg whitespace-nowrap text-white disabled cursor-progress">Comment</button>
        ) : (
          <button
            onClick={handleComment}
            className="px-4 py-2 rounded-lg bg-blue-500 text-lg whitespace-nowrap text-white"
          >
            Comment
          </button>
        )}
      </div>
    </div>
  );
};

export default Textarea;
