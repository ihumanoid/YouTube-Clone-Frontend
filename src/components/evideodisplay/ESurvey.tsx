"use client";
import { SurveyDataDTO } from "@/utils/YouTubeTypes";
import React, { useEffect, useState } from "react";

interface ESurveyProps {
  experimentId: string;
}

const ESurvey = ({ experimentId }: ESurveyProps) => {
  const [responses, setResponses] = useState({
    rating: 0,
    product: "",
    brand: "",
    knewBrand: false,
    knewProduct: false,
    seenAdvertisement: false,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkSurvey = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/checkSurvey?experimentId=${experimentId}`;
      const response = await fetch(url);
      const json = await response.json();
      const surveyExists = json.data;
      setSuccess(surveyExists);
    };
    checkSurvey();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setResponses({ ...responses, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/experiment/surveyData`;
    const surveyData: SurveyDataDTO = {
      experimentId,
      advertisementBrand: responses.brand,
      advertisementProduct: responses.product,
      advertisementRating: responses.rating,
      knewBrand: responses.knewBrand,
      knewProduct: responses.knewProduct,
      seenAdvertisement: responses.seenAdvertisement,
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
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-black text-white overflow-scroll">
      <h1 className="text-3xl font-semibold mb-4">Post Survey</h1>
      <form onSubmit={handleSubmit}>
        {/* Question 1: Rating */}
        <div className="mb-6">
          <label htmlFor="rating" className="block text-lg font-medium mb-2">
            An advertisement was inserted into the list of videos you just
            watched. On a scale of 1 to 5, please rate the likability and
            effectiveness of the advertisement.
          </label>
          {[...Array(5)].map((_, index) => (
            <label key={index} className="inline-flex items-center mr-4">
              <input
                type="radio"
                id={`rating${index + 1}`}
                name="rating"
                value={index + 1}
                className="hidden"
                required
                onChange={() =>
                  setResponses({ ...responses, rating: index + 1 })
                }
              />
              <div
                className={`rounded-full w-10 h-10 flex justify-center items-center cursor-pointer ${
                  responses.rating === index + 1
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

        {/* Question 4-6: Seen product & brand & advertisement */}
        <div className="mb-6">
          <label htmlFor="knewBrand" className="block text-lg font-medium mb-2">
            Did you know the brand before watching the advertisement?
          </label>
          <button
            type="button"
            className={`text-xl border-2 border-gray-600 rounded-xl py-2 px-4 ${
              !responses.knewBrand
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setResponses({ ...responses, knewBrand: !responses.knewBrand });
            }}
          >
            No
          </button>
          <button
            type="button"
            className={`ml-4 text-xl border-2 border-gray-600 rounded-xl py-2 px-4 ${
              responses.knewBrand
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setResponses({ ...responses, knewBrand: !responses.knewBrand });
            }}
          >
            Yes
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="knewBrand" className="block text-lg font-medium mb-2">
            Did you know the product before watching the advertisement?
          </label>
          <button
            type="button"
            className={`text-xl border-2 border-gray-600 rounded-xl py-2 px-4 ${
              !responses.knewProduct
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setResponses({
                ...responses,
                knewProduct: !responses.knewProduct,
              });
            }}
          >
            No
          </button>
          <button
            type="button"
            className={`ml-4 text-xl border-2 border-gray-600 rounded-xl py-2 px-4 ${
              responses.knewProduct
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setResponses({
                ...responses,
                knewProduct: !responses.knewProduct,
              });
            }}
          >
            Yes
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="knewBrand" className="block text-lg font-medium mb-2">
            Have you seen the advertisement before?
          </label>
          <button
            type="button"
            className={`text-xl border-2 border-gray-600 rounded-xl py-2 px-4 ${
              !responses.seenAdvertisement
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setResponses({
                ...responses,
                seenAdvertisement: !responses.seenAdvertisement,
              });
            }}
          >
            No
          </button>
          <button
            type="button"
            className={`ml-4 text-xl border-2 border-gray-600 rounded-xl py-2 px-4 ${
              responses.seenAdvertisement
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => {
              setResponses({
                ...responses,
                seenAdvertisement: !responses.seenAdvertisement,
              });
            }}
          >
            Yes
          </button>
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
