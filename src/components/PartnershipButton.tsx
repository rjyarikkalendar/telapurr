
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export const PartnershipButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <Button
        onClick={() => navigate("/partnership")}
        className="bg-tea-brown hover:bg-tea-brown/80 text-white"
      >
        {t.common.partnership.buttonText}
      </Button>
    </div>
  );
};
