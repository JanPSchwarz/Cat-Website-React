import "./cat-box.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function CatBox({
  catArray,
  toggleDescription,
  showDescription,
}) {
  console.log(catArray);

  return catArray.map((cat, index) => {
    const thisCat = cat.breeds[0];
    return (
      <>
        <div className="card" key={cat.id}>
          <div className="image-box">
            <LazyLoadImage
              className="catImage"
              placeholderSrc={cat.url}
              loading="lazy"
              effect="blur"
              height="auto"
              width="auto"
              src={cat.url}
              alt="cat"
              onClick={() => {
                toggleDescription(index);
              }}
            />
            <i
              className={`fa-solid ${
                showDescription[index] ? "fa-arrow-up" : "fa-arrow-down"
              }`}></i>
          </div>
          <ul
            onClick={() => {
              toggleDescription(index);
            }}
            className="cat-description"
            style={{ display: showDescription[index] ? `block` : `none` }}>
            <li>
              Breed-Name:
              <span>{thisCat.name}</span>
            </li>
            <li>
              Origin: <span>{thisCat.origin}</span>
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
