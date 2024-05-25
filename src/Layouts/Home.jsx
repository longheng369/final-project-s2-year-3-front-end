import { useState } from "react";
import Chat from "../components/Chat";
import Hero from "./Hero";
import NewArrival from "./NewArrival";
import ShopCategory from "./ShopCategory";
import { PiChatCenteredDotsFill } from "react-icons/pi";
// import MessengerChat from "../components/MessengerChat";

const Home = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      
      <Hero />
      <NewArrival />
      <ShopCategory />

      {/* <MessengerChat/> */}



  
    </div>
  );
};

export default Home;
