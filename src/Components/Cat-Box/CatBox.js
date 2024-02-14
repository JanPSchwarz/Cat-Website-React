import "./cat-box.css";
import { useState } from "react";

export default function CatBox({
  catArray,
  toggleDescription,
  showDescription,
}) {
  console.log(catArray);

  return catArray.map((cat) => {
    const thisCat = cat.breeds[0];

    return (
      <>
        <div className="card" key={cat.id}>
          <div className="image-box">
            <img
              src={cat.url}
              alt="cat"
              onClick={() => {
                toggleDescription();
              }}
            />
            <i
              className={`fa-solid ${
                showDescription ? "fa-arrow-up" : "fa-arrow-down"
              }`}></i>
          </div>
          <ul
            className="cat-description"
            style={{ display: showDescription ? `block` : `none` }}>
            <li>
              Breed-Name:
              <span>{thisCat.name}</span>
            </li>
            <li>
              Origin: <span>{thisCat.origin}ple</span>
            </li>
            <li>
              Temperament: <span>{thisCat.temperament}</span>
            </li>
            <li>
              Description: <span>{thisCat.description}</span>
            </li>
            <li>
              <span>
                <a
                  href={thisCat.wikipedia_url}
                  target="_blank"
                  rel="noreferrer">
                  Wikipedia-Article
                </a>
              </span>
            </li>
          </ul>
          <div className="divider"></div>
        </div>
      </>
    );
  });
}
