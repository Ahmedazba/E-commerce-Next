import React from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex my-60 justify-center">
      <ImSpinner2 className="text-5xl animate-spin" />
    </div>
  );
}
