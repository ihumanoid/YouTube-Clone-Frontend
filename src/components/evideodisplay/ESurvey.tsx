"use client";
import { SurveyDataDTO } from "@/utils/YouTubeTypes";
import React, { useState } from "react";

interface ESurveyProps {
  experimentId: string;
}

const ESurvey = ({ experimentId }: ESurveyProps) => {
  const [responses, setResponses] = useState({
    rating: "",
    product: "",
    brand: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setResponses({ ...responses, [e.target.name]: e.target.value });
    console.log(responses);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/surveyData`;
    const surveyData: SurveyDataDTO = {
      experimentId,
      advertisementBrand: responses.brand,
      advertisementProduct: responses.product,
      advertisementRating: parseInt(responses.rating),
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyData),
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Error code: ${response.status}`);
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center text-3xl">
        Session complete. Thank you for your participation!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Post Survey</h1>
      <form onSubmit={handleSubmit}>
        {/* Question 1: Rating */}
        <div className="mb-6">
          <label htmlFor="rating" className="block text-lg font-medium mb-2">
            On a scale of 1 to 10, rate the advertisement
          </label>
          {[...Array(10)].map((_, index) => (
            <label key={index} className="inline-flex items-center mr-4">
              <input
                type="radio"
                id={`rating${index + 1}`}
                name="rating"
                value={index + 1}
                className="hidden"
                required
                onChange={handleChange}
              />
              <div
                className={`rounded-full w-10 h-10 flex justify-center items-center cursor-pointer ${
                  responses.rating === `${index + 1}`
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-400"
                }`}
              >
                {index + 1}
              </div>
            </label>
          ))}
        </div>

        {/* Question 2: Product */}
        <div className="mb-6">
          <label htmlFor="product" className="block text-lg font-medium mb-2">
            In the advertisement you watched, what was the featured product?
          </label>
          <input
            type="text"
            id="product"
            name="product"
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            required
            onChange={handleChange}
          />
        </div>

        {/* Question 3: Brand */}
        <div className="mb-6">
          <label htmlFor="brand" className="block text-lg font-medium mb-2">
            What was the brand of the product?
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            required
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-xl"
        >
          Submit Survey
        </button>
      </form>
    </div>
  );
};

export default ESurvey;
