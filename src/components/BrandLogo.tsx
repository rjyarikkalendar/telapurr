
import { Link } from "react-router-dom";

export const BrandLogo = () => {
  return (
    <Link to="/" className="absolute top-4 left-32 z-50 w-24 h-24 transition-transform hover:scale-105">
      <div className="relative w-full h-full">
        <img
          src="/lovable-uploads/004faa27-58f7-44a5-a5ee-4efc14bf128a.png"
          alt="Milenasia Tea"
          className="w-full h-full object-contain relative opacity-70"
        />
      </div>
    </Link>
  );
};
