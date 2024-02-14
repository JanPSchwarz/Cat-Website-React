import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Components/Header/Header";
import CatBox from "./Components/Cat-Box/CatBox";

function App() {
  const [cats, setCats] = useState();
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  async function loadCats() {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_80QHtDPhcDJgMWfVMivtOm4RkbsEB7Op11NNA8NkImpLpcuUvYoyb12eDy5cLmnb`
      );
      const cats = await response.json();
      setCats(cats);
      // console.log(cats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCats();
  }, []);

  function renderCats() {
    setRender(true);
  }

  function toggleDescription() {
    show ? setShow(false) : setShow(true);
  }

  return (
    <>
      <Header renderCats={renderCats} />

      <div className="start-box" id="start-box">
        {render ? (
          <CatBox
            catArray={cats}
            toggleDescription={toggleDescription}
            showDescription={show}
          />
        ) : null}
      </div>

      {render ? <p class="note">Made with ❤️</p> : null}
    </>
  );
}

export default App;
