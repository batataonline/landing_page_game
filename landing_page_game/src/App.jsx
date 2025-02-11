import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      {/* Importando a fonte */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />

      {/* Vídeo fixo no fundo */}
      <div className="background-video">
        <video autoPlay loop muted playsInline>
          <source src="/video-background.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>

      {/* Camada de fundo semi-transparente */}
      <div className="background-overlay"></div>

      {/* Navbar */}
      <nav className="navbar">
        <img src="/apple-logo.png" alt="Apple" className="logo" />
        {/* Botão Subscribe */}
        <a href="https://www.naughtydog.com/" className="subscribe-button">
          Site Oficial
        </a>
      </nav>

      {/* Seção Hero */}
      <header className="hero">
        <h1>The Last of Us Part II</h1>
        <p>Reserve agora.</p>
        {/* Botão Cta */}
        <a href="https://www.playstation.com/pt-br/games/the-last-of-us-part-ii/" className="cta-button">
          Comprar
        </a>
      </header>

      {/* Seção de texto que aparece ao rolar a página */}
      <section className={`lorem-section ${isVisible ? "visible" : ""}`}>
        <h2>Entre nessa jornada de vingança</h2>
        <h2>Experiencie uma gameplay única</h2>
        <h2>Desfrute de uma história digna de filmes</h2>
        <h2>Seja Ellie nessa longa aventura</h2>
      </section>

      {/* Rodapé */}
      <footer className="footer">
        <p>&copy; 2025 Naughty Dog. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
