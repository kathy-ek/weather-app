"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const CityContext = createContext(null);

export const CityContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(""); 

  return (
    <CityContext.Provider
      value={{
        search,
        setSearch,
        city,  
        setCity
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
