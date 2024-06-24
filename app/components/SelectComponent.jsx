"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectComponent({ data }) {
  return (
    <div className="flex flex-row w-full ">
      <Select
        labelPlacement="inside"
        label="Sort By"
        placeholder="Select filter"
        className="flex w-full"
        radius="lg"
      >
        {data.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
