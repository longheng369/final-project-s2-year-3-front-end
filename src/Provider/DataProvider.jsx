import React, { useEffect, useState } from "react";
import DataContext from "../Context/DataContext";
import axios from "axios"

const DataProvider = ({ children }) => {
  const [newArrival, setNewArrival] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/all"
        );
        setNewArrival(data.data);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  },[]);
  return <DataContext.Provider value={{newArrival,isLoading,isError}}>
    {children}
  </DataContext.Provider>;
};

export default DataProvider;
