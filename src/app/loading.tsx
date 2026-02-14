import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 h-screen">
        <div className="flex space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Volte~store
                </span>
        </div>
        <span className="loader"></span>
      </div>
    </>
  );
}
