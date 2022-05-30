import './index.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="github"></div>
        <div>
          <a
            className="footer-link"
            href="https://github.com/anaya-che"
            target="_blank"
            rel="noreferrer"
          >
            Анастасия
          </a>
        </div>
        <div>
          <a
            className="footer-link"
            href="https://github.com/FilionchykMaryia"
            target="_blank"
            rel="noreferrer"
          >
            Мария
          </a>
        </div>
        <div>
          <a
            className="footer-link"
            href="https://github.com/backspacev9"
            target="_blank"
            rel="noreferrer"
          >
            <span className="footer-name">Александр</span>
          </a>
        </div>
      </div>
      <div className="footer-container">© 2022</div>
      <div className="footer-container">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <div className="rss"></div>
        </a>
      </div>
    </footer>
  );
};
