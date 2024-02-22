import "./Header.css";
import { useState } from "react";

export default function Header({ renderCats, renderLoading, showLoading }) {
  return (
    <header className="header">
      <h1 className="heading">Cute-Cat-Generator</h1>
      <button
        onClick={() => {
          renderCats();
          renderLoading();
        }}
        className="button"
        type="button"
        data-js="button">
        <span className={showLoading ? `loading__animation` : null}>😼</span>
      </button>
      {showLoading ? <span className="loading__text">Loading...</span> : null}
    </header>
  );
}
