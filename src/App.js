import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Components/Header/Header";
import CatBox from "./Components/Cat-Box/CatBox";
import PageButtons from "./Components/PageNavigation/PageButtons";
import ScrollToTop from "react-scroll-to-top";

// OPEN new Branche: erase useEffect, put loadCats to props of Header, change useState of render to "showLoadingAnimation", give that as prop to Header, change loadCats with timeout Functions to se UseState of showLoadingAnimation to true and false similar to renderLoading function in Header, test if funct refreshCats functions well

function App() {
  const [cats, setCats] = useState([]);
  const [render, setRender] = useState(false);

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
    // setTimeout(() => {
    //   setRender(true);
    // }, 4000);

    setRender(true);
  }

  function toggleDescription(index) {
    const updateShow = [...show];
    updateShow[index] = !updateShow[index];
    setShow(updateShow);
  }

  function pageUp() {
    if (currentPage < 10) {
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

  function refreshCats() {
    setCurrentPage(1);
    loadCats();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: `smooth` });
    }, 300);
  }

  console.log(render);

  return (
    <>
      <Header renderCats={renderCats} render={render} />

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
            <p className="counterTop">{currentPage} / 10</p>
          </>
        ) : null}
        {render ? (
          <CatBox
            catArray={currentItems}
            toggleDescription={toggleDescription}
            showDescription={show}
          />
        ) : null}
        {render ? <p className="counterBottom">{currentPage} / 10</p> : null}
        {render ? (
          <PageButtons
            pageUp={pageUp}
            pageDown={pageDown}
            currentPage={currentPage}
            refreshCats={refreshCats}
          />
        ) : null}
      </div>

      {render ? <p class="note">Made with ❤️</p> : null}

      <ScrollToTop smooth color="orange" />
    </>
  );
}

export default App;
