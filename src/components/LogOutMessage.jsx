import React from "react";

const LogOutMessage = ({ confirm, cancel, isLoading }) => {
   
  const confirmLogout = () => {
    confirm();
  };

  const cancelLogout = () => {
    cancel();
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 fixed z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="confirm-box">
        <p className="text-xl">Are you sure you want to logout?</p>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-red-500 px-4 py-2 rounded-lg flex-1 text-white font-bold"
            onClick={cancelLogout}
          >
            Cancel
          </button>

          {isLoading ? (
            <button className="bg-green-400 px-4 py-2 rounded-lg flex-1 cursor-wait">Confirm</button>
          ) : (
            <button
              className="bg-green-400 px-4 py-2 rounded-lg flex-1 "
              onClick={confirmLogout}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogOutMessage;
