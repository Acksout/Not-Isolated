"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Globe } from "./globe-3d";
import GetCountry from "./get-country";
import ConnectSocketIo from "./connect-socketio";

const HomePage = () => {
  const [currentCoords, setCurrentCoords] = [];
  //   const updateLiveCoords() => {

  //   }
  return (
    <div>
      <ConnectSocketIo />
      {/* <Navbar />
      <GetCountry />
      <Globe className="mt-[6rem]" /> */}
    </div>
  );
};

export default HomePage;
