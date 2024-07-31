import React from "react";
import { ModeToggle } from "../ui/mode-toggler";

export const Header: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </div>
    </>
  );
};
