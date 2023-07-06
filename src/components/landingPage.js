import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LandingPage.css";
import "./load.css";

function LandingPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [currentJoke, setCurrentJoke] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingJoke, setLoadingJoke] = useState(false);


  // Close the open Box

  const closeModal = () => {
    setSelectedCategory(null);
    setActiveButton(null);
  };



// on click of the button and Open of a Modal

  const handleButtonClick = (category, index) => {
    setSelectedCategory(category);
    setActiveButton(index);
    fetchNextJoke(category);
  };


// On every click of Next in Open Modal

  const fetchNextJoke = (category) => {
    setLoadingJoke(true);

    axios
      .get(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => {
        setCurrentJoke(response.data.value);
        setLoadingJoke(false);
      })
      .catch((error) => {
        console.error("Error fetching joke: ", error);
        setLoadingJoke(false);
      });
  };

// Fetch of All the Categories

  useEffect(() => {
    setLoading(true);

    axios
      .get("https://api.chucknorris.io/jokes/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);




  return (
    <div className="overAll">
      {loading ? (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div className="bouncing">Chuck Norries</div>
          <div className="buttonsss">
            {categories.map((category, index) => (
              <button
                key={index}
                style={{ margin: "10px" }}
                onClick={() => handleButtonClick(category, index)}
                className={`one-btns ${index === activeButton ? "active" : ""}`}
              >
                <p
                  className="category-title"
                  style={{
                    color: "#1f3a8a",
                    marginTop: "-20px",
                    fontWeight: "500",
                  }}
                >
                  
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </p>

                <h4
                  className="joke-caption"
                  style={{ marginTop: "-25px", color: "#7e3cb4" , fontWeight: "100" }}
                >
                  Unlimited Jokes On{" "}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
              </button>
            ))}
          </div>
          {selectedCategory && (
            <div
              style={{
                color: "white",
              }}
              className="modal"
            >
              <p
                className="below-cat"
                style={{ textAlign: "center", marginTop: "0" }}
              >
                {selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)}
              </p>
              <div className="content-box">
                {loadingJoke ? (
                  <div className="loader1con">
                    <div className="loader1"></div>
                  </div>
                ) : (
                  <p className="currentJoke">"{currentJoke}"</p>
                )}
                <button
                  className="next-joke-button"
                  onClick={() => fetchNextJoke(selectedCategory)}
                >
                  Next Joke
                </button>
              </div>
              <button onClick={closeModal} className="close-button">
                X
              </button>
            </div>
          )}
        </>
      )}
      <p>created with ❤️ By Krishnam </p>
    </div>
  );
}

export default LandingPage;