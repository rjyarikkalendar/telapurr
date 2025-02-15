
import { Link } from "react-router-dom";

export const BrandLogo = () => {
  return (
    <Link to="/" className="absolute top-4 left-32 z-50 w-24 h-24 transition-transform hover:scale-105">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/30 pointer-events-none z-10" />
        <img
          src="/lovable-uploads/0562e1f0-b033-4094-86a6-cbf9c21240d6.png"
          alt="Milenasia Tea"
          className="w-full h-full object-contain relative"
        />
      </div>
    </Link>
  );
};
