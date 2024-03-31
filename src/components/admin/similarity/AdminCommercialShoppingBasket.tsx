import React from "react";
import AdminCommercialSearchBasketItem from "./AdminCommercialSearchBasketItem";
import { Commercial } from "@/utils/YouTubeTypes";

interface AdminCommercialShoppingBasketProps {
  selectedLowCommercial?: Commercial;
  selectedMediumCommercial?: Commercial;
  selectedHighCommercial?: Commercial;
  setSelectedLowCommercial: React.Dispatch<
    React.SetStateAction<Commercial | undefined>
  >;
  setSelectedMediumCommercial: React.Dispatch<
    React.SetStateAction<Commercial | undefined>
  >;
  setSelectedHighCommercial: React.Dispatch<
    React.SetStateAction<Commercial | undefined>
  >;
}

function AdminCommercialShoppingBasket({
  selectedLowCommercial,
  selectedMediumCommercial,
  selectedHighCommercial,
  setSelectedLowCommercial,
  setSelectedMediumCommercial,
  setSelectedHighCommercial,
}: AdminCommercialShoppingBasketProps) {
  return (
    <div className="h-full w-full flex flex-col gap-8">
      <AdminCommercialSearchBasketItem
        commercial={selectedLowCommercial}
        setSelectedCommercial={setSelectedLowCommercial}
        bgColorClass="bg-red-600"
        similarityLevel="Low Similarity Commercial"
      />
      <AdminCommercialSearchBasketItem
        commercial={selectedMediumCommercial}
        setSelectedCommercial={setSelectedMediumCommercial}
        bgColorClass="bg-green-600"
        similarityLevel="Medium Similarity Commercial"
      />
      <AdminCommercialSearchBasketItem
        commercial={selectedHighCommercial}
        setSelectedCommercial={setSelectedHighCommercial}
        bgColorClass="bg-blue-600"
        similarityLevel="High Similarity Commercial"
      />
    </div>
  );
}

export default AdminCommercialShoppingBasket;
