import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Layouts/Home";
import Favorite from "./Layouts/Favorite";
import CardDetails from "./components/CardDetails";
import CategoryDetails from "./components/CategoryDetails";
import Login from "./Layouts/Login";
import Register from "./Layouts/Register";

import MessengerCustomerChat from "react-messenger-customer-chat";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<Login />} />
            <Route path="about" element="about" />
            <Route path="contact" element="contact" />
            <Route path="favorite" element={<Favorite />} />
            <Route path="card/:id" element={<CardDetails />} />
            <Route path="category/:id/:name">
              <Route index element={<CategoryDetails />} />
              <Route path="details/:id" element={<CardDetails />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>

      {/* <MessengerCustomerChat pageId="141916528997399" appId="<YOUR_APP_ID>" /> */}
    </div>
  );
};

export default App;
