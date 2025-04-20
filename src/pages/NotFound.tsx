
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dex-dark text-white p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-6">
        The page at <span className="text-dex-primary">{location.pathname}</span> was not found
      </p>
      <Link to="/">
        <Button className="bg-dex-primary hover:bg-dex-primary/90">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
