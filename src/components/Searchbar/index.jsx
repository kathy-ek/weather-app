"use client"; 
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { useCity } from "@/contexts/CityContext";
import { getAllCities } from "@/utils/countries-api";
import SearchIcon from "@/assets/icons/search.svg";

import styles from "./styles.module.scss";

const Searchbar = () => {
  const { search, setSearch, setCity } = useCity();

  const [showDropdown, setShowDropdown] = useState(true);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getAllCities();
      setCities(data.data);
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const filter = cities.reduce((acc, country) => {
        const matchingCities = country.cities.filter(
          (city) =>
            city.toLowerCase().includes(search.toLowerCase()) ||
            country.country.toLowerCase().includes(search.toLowerCase())
        );

        if (matchingCities.length > 0) {
          acc.push(
            ...matchingCities.map((city) => `${city}, ${country.country}`)
          );
        }
        return acc;
      }, []);
      setFilteredCities(filter);
    } else {
      setFilteredCities([]);
    }
  }, [search, cities]);

  return (
    <div className={styles["search-bar-container"]}>
      <div className={styles["searchbar"]}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
            if (inputRef.current.value === "") {
              setCity(null);
            }
          }}
          onKeyDown={(e) => {
            setCity(e.target.value);
            setShowDropdown(false);
          }}
          ref={inputRef}
          placeholder="Search cities..."
        />
        <Image
          src={SearchIcon}
          alt="search icon"
          className={styles["search-icon"]}
          width={20}
          height={20}
          onClick={(e) => {
            setCity(search);
            setShowDropdown(false);
          }}
        />
      </div>
      {filteredCities.length > 0 && showDropdown && (
        <ul className={styles["list-result"]}>
          {filteredCities.map((city, index) => (
            <li
              key={index}
              onClick={() => {
                setCity(city);
                setShowDropdown(false);
              }}
              className={styles["element"]}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
