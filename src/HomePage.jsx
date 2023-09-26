// import { useState } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Cricket", slug: "Cricket" },
    { name: "Marvel Cinematic Universe", slug: "Marvel Cinematic Universe" },
    { name: "Bollywood Movies", slug: "Bollywood" },
    { name: "Science and Tech", slug: "Science and Tech" },
    { name: "World History", slug: "World History" },
  ];
  const handleCategorySelect = (slug) => {
    navigate(`/quiz/${slug}`);
  };

  return (
    <div className="back">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4 font-satoshi text-center">
          Welcome to the Quiz App
        </h1>
        <p className="text-gray-600 mb-6 font-satoshi text-center">
          Select a category to start the quiz:
        </p>
              <div className="p-2">
                  {categories.map((category) => (
                      <div key={category.slug}
                          className="bg-pink-300 mb-5 p-5 w-full rounded-lg  cursor-pointer hover:bg-pink-400 transition duration-300"
                          onClick={()=>handleCategorySelect(category.slug)}
                      >
                          <h2 className="text-xl font-semibold font-satoshi">{category.name}</h2>
                      </div>
                  ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
