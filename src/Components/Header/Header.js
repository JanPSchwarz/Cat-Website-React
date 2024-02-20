import "./Header.css";
// import { useState } from "react";

export default function Header({ renderCats, render }) {
  // const [showLoading, setShowLoading] = useState(false);

  // function renderLoading() {
  //   if (render === false) {
  //     setShowLoading(true);
  //   }
  //   setTimeout(() => {
  //     setShowLoading(false);
  //   }, 4000);
  // }

  return (
    <header className="header">
      <h1 className="heading">Cute-Cat-Generator</h1>
      <button
        onClick={() => {
          renderCats();
          // renderLoading();
        }}
        className="button"
        type="button"
        data-js="button">
        😼
      </button>
      {/* {showLoading ? <div>Hallo</div> : null} */}
    </header>
  );
}
