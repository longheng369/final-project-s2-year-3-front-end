const Comment = ({id,body,user_name}) => {
  return (
    <div className="flex flex-col bg-blue-50 w-full p-4 rounded-2xl">
      <div className="flex items-center gap-2">
        {/* <div className="p-2 w-10 h-10 rounded-[50%] bg-blue-300">{profile}</div> */}
        <div>{user_name}</div>
      </div>
      <div className="text-lg ml-12">{body}</div>
    </div>
  );
};

export default Comment;
