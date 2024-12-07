"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Globe } from "./globe-3d";
import GetCountry from "./get-country";

const HomePage = () => {
  const [currentCoords, setCurrentCoords] = [];
  //   const updateLiveCoords() => {

  //   }
  return (
    <div>
      <Navbar />
      <GetCountry />
      <Globe className="mt-[6rem]" />
    </div>
  );
};

export default HomePage;
