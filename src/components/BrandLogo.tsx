
import { Link } from "react-router-dom";

export const BrandLogo = () => {
  return (
    <Link to="/" className="fixed top-4 left-4 z-50 w-32 h-32 transition-transform hover:scale-105">
      <img
        src="/lovable-uploads/0562e1f0-b033-4094-86a6-cbf9c21240d6.png"
        alt="Milenasia Tea"
        className="w-full h-full object-contain"
      />
    </Link>
  );
};
