import "./pageButton.css";

export default function PageButtons({
  pageUp,
  pageDown,
  currentPage,
  refreshCats,
  top,
}) {
  //   console.log(currentPage);
  return (
    <div className={top ? `navButtonsBox_top` : `navButtonsBox`}>
      {currentPage > 1 ? (
        <button
          className="navButton"
          onClick={() => {
            pageDown();
          }}>
          Previous Page
        </button>
      ) : null}

      {currentPage < 11 ? (
        <button
          className="navButton"
          onClick={() => {
            pageUp();
          }}>
          Next Page
        </button>
      ) : null}

      {currentPage === 11 ? (
        <button
          className="navButton"
          onClick={() => {
            refreshCats();
          }}>
          Get me 100 new Cats!
        </button>
      ) : null}
    </div>
  );
}
