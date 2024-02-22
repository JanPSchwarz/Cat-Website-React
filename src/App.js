import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Components/Header/Header";
import CatBox from "./Components/Cat-Box/CatBox";
import PageButtons from "./Components/PageNavigation/PageButtons";
import ScrollToTop from "react-scroll-to-top";
import catLogo from "./Images/AdobeStock_548802868.svg";

function App() {
  const [cats, setCats] = useState([]);
  const [render, setRender] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // const initialShow = Array(10).fill(false);
  const [show, setShow] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  async function loadCats() {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=100&page=${currentPage}&has_breeds=1&api_key=live_80QHtDPhcDJgMWfVMivtOm4RkbsEB7Op11NNA8NkImpLpcuUvYoyb12eDy5cLmnb`
      );
      const cats = await response.json();
      console.log(cats);
      setCats(cats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCats();
  }, []);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentItems = cats.slice(startIndex, endIndex);

  function renderCats() {
    setTimeout(() => {
      setRender(true);
    }, 5000);
  }

  function toggleDescription(index) {
    const updateShow = [...show];
    updateShow[index] = !updateShow[index];
    setShow(updateShow);
  }

  function pageUp() {
    if (currentPage < 11) {
      setCurrentPage(currentPage + 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: `smooth` });
      }, 300);
    }
  }

  function pageDown() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: `smooth` });
      }, 300);
    }
  }

  function renderLoading() {
    if (render === false) {
      setShowLoading(true);
    }
    setTimeout(() => {
      setShowLoading(false);
    }, 5000);
  }

  function refreshCats() {
    loadCats();
    setRender(false);
    renderLoading();

    setTimeout(() => {
      setRender(true);
    }, 5000);
    setTimeout(() => {
      setCurrentPage(1);
    }, 5000);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: `smooth` });
    }, 300);
  }

  console.log(render);

  return (
    <>
      <Header
        renderCats={renderCats}
        renderLoading={renderLoading}
        showLoading={showLoading}
      />

      <div className="start-box" id="start-box">
        {currentPage === 11 ? (
          <div className="endScreen__box">
            {/* <img className="cat__image" src={catLogo} alt="cat"></img> */}
            <iframe
              src="https://giphy.com/embed/bj09BK2BzLLQk"
              width="280"
              height="280"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
              title="cat-gif"></iframe>
            <p>Weowww, you made it to the end!</p>
          </div>
        ) : null}
        {currentPage > 1 ? (
          <>
            <PageButtons
              pageUp={pageUp}
              pageDown={pageDown}
              currentPage={currentPage}
              refreshCats={refreshCats}
              top="top"
            />
            {currentPage < 11 ? (
              <p className="counterTop">{currentPage} / 10</p>
            ) : null}
          </>
        ) : null}
        {render ? (
          <CatBox
            catArray={currentItems}
            toggleDescription={toggleDescription}
            showDescription={show}
          />
        ) : null}
        {render ? (
          currentPage < 11 ? (
            <p className="counterBottom">{currentPage} / 10</p>
          ) : null
        ) : null}
        {render ? (
          currentPage < 11 ? (
            <PageButtons
              pageUp={pageUp}
              pageDown={pageDown}
              currentPage={currentPage}
              refreshCats={refreshCats}
            />
          ) : null
        ) : null}
      </div>

      {render ? <p className="note">Made with ❤️</p> : null}

      <ScrollToTop smooth color="orange" />
    </>
  );
}

export default App;
