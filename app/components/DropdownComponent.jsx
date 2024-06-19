"use client";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";

export default function CustomDropdown({ onFilterChange }) {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["popularity"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
    onFilterChange(Array.from(keys)[0]);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="popularity">Popularity</DropdownItem>
        <DropdownItem key="Price: low to high">Price: low to high</DropdownItem>
        <DropdownItem key="Price: high to low">Price: high to low</DropdownItem>
        <DropdownItem key="rating">Rating</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
