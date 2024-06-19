"use client";
import { NextUIProvider } from "@nextui-org/system";
import React from "react";

const Providers = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
