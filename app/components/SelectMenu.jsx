import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectMenu({ data }) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        
      </Select>
    </div>
  );
}
