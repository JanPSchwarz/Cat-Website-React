import "./Header.css";

export default function Header({renderCats}) {
  return (
    <header className="heading">
      <h1 className="heading">Cute-Cat-Generator</h1>
      <button onClick={renderCats} className="button" type="button" data-js="button">
        😼
      </button>
    </header>
  );
}
