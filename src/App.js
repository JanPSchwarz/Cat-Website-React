import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Components/Header/Header";
import CatBox from "./Components/Cat-Box/CatBox";
import PageButtons from "./Components/PageNavigation/PageButtons";
import ScrollToTop from "react-scroll-to-top";

function App() {
  // stores fetched Data
  const [cats, setCats] = useState([]);

  // stores boolean for conditional render on cat button click
  const [render, setRender] = useState(false);

  // stores boolean for Loading Animation on Cat Button
  const [showLoading, setShowLoading] = useState(false);

  // stores boolean for description toggle
  const [show, setShow] = useState([]);

  // stores current Page
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

  // fetching 100 cats on first load
  useEffect(() => {
    loadCats();
  }, []);

  // defines page-number and get 10 cats per page
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentItems = cats.slice(startIndex, endIndex);

  // update render on cat button click, timeout matching the loading animation in Header-Component
  function renderCats() {
    setTimeout(() => {
      setRender(true);
    }, 5000);
  }

  // description toggle for every mapped cat
  function toggleDescription(index) {
    const updateShow = [...show];
    updateShow[index] = !updateShow[index];
    setShow(updateShow);
  }

  // page-navigation
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

  // updates boolean for loading animation for Header-Component, timeout matches render-timeout
  function renderLoading() {
    if (render === false) {
      setShowLoading(true);
    }
    setTimeout(() => {
      setShowLoading(false);
    }, 5000);
  }

  // function for refresh-button from PageButtons-Component
  function refreshCats() {
    loadCats();

    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    setTimeout(() => {
      setCurrentPage(1);
    }, 5000);
  }

  function reloadPage() {
    document.location.reload();
  }

  // console.log(render);

  return (
    <>
      <Header
        renderCats={renderCats}
        renderLoading={renderLoading}
        showLoading={showLoading}
        reload={reloadPage}
      />

      <div className="start-box" id="start-box">
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

        {currentPage === 11 ? (
          <div className="endScreen__box">
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

      {/* shows only on scrollable page */}
      <ScrollToTop smooth color="orange" />
    </>
  );
}

export default App;
