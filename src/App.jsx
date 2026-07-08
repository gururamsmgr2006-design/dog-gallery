import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_DOG_API_KEY;

function App() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.thedogapi.com/v1/images/search?limit=20&has_breeds=1",
        {
          headers: {
        "x-api-key": API_KEY,
      },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();

      setDogs(data);
    } catch (err) {
      setError("Unable to fetch dog images.");
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🐶 Dog Gallery</h1>

      <button onClick={fetchDogs}>Fetch Dogs</button>

      {loading && <h2>Loading...</h2>}

      {error && <p>{error}</p>}

      <div className="dog-container">
        {dogs.map((dog) => (
          <div className="dog-card" key={dog.id}>
            <img src={dog.url} alt="Dog" />

            {dog.breeds && dog.breeds.length > 0 ? (
              <>
                <h2>{dog.breeds[0].name}</h2>

                <p>
                  <strong>Life Span:</strong>{" "}
                  {dog.breeds[0].life_span}
                </p>

                <p>
                  <strong>Temperament:</strong>{" "}
                  {dog.breeds[0].temperament}
                </p>

                <p>
                  <strong>Bred For:</strong>{" "}
                  {dog.breeds[0].bred_for || "Not Available"}
                </p>

                <p>
                  <strong>Origin:</strong>{" "}
                  {dog.breeds[0].origin || "Unknown"}
                </p>

                <p>
                  <strong>Weight:</strong>{" "}
                  {dog.breeds[0].weight.metric} kg
                </p>

                <p>
                  <strong>Height:</strong>{" "}
                  {dog.breeds[0].height.metric} cm
                </p>
              </>
            ) : (
              <>
                <h2>Unknown Breed</h2>

                <p>
                  Breed information is not available for this image.
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;