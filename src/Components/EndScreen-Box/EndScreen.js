import "./endScreen.css";

export default function EndScreen(currentPage) {
  return (
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
  );
}
