import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [pokemonData, setPokemonData] = useState([]); // Armazenar os dados dos Pokémon aleatórios
  const [selectedPokemons, setSelectedPokemons] = useState([null, null, null]); // Garantir 3 slots para as boxes
  const [availablePokemons, setAvailablePokemons] = useState([]); // Armazenar os pokémons disponíveis para seleção
  const [loading, setLoading] = useState(false); // Controlar o estado de carregamento

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para buscar Pokémon aleatórios
  const fetchRandomPokemons = async () => {
    setLoading(true);
    try {
      const randomPokemons = [];
      for (let i = 0; i < 3; i++) {
        const randomId = Math.floor(Math.random() * 1000) + 1; // Gerar IDs aleatórios de 1 a 1000
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        randomPokemons.push(data); // Adiciona o Pokémon à lista
      }
      setPokemonData(randomPokemons); // Atualiza o estado com os Pokémon aleatórios
      setAvailablePokemons(randomPokemons); // Armazena os Pokémons disponíveis para seleção
      setShowOptions(true); // Exibe as opções após os dados serem carregados
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Função para exibir as imagens quando um nome de Pokémon é clicado
  const handlePokemonClick = (pokemon) => {
    // Verifica se o Pokémon já foi selecionado
    if (selectedPokemons.some(selectedPokemon => selectedPokemon && selectedPokemon.name === pokemon.name)) {
      alert("Este Pokémon já foi selecionado.");
      return; // Se o Pokémon já estiver nos slots selecionados, não permite selecionar novamente
    }

    const updatedPokemons = [...selectedPokemons]; // Cria uma cópia do estado atual

    // Tenta encontrar o primeiro slot vazio
    for (let i = 0; i < updatedPokemons.length; i++) {
      if (!updatedPokemons[i]) {
        updatedPokemons[i] = {
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          types: pokemon.types, // Armazena os tipos do Pokémon
        };
        break;
      }
    }

    // Atualiza os slots de Pokémon selecionados
    setSelectedPokemons(updatedPokemons);

    // Remove o Pokémon selecionado da lista de opções
    const updatedAvailablePokemons = availablePokemons.filter(item => item.name !== pokemon.name);
    setAvailablePokemons(updatedAvailablePokemons);
  };

  return (
    <div className="container">
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
        <a href="https://www.naughtydog.com/" className="subscribe-button">
          Site Oficial
        </a>
      </nav>

      {/* Seção Hero */}
      <header className="hero">
        <h1>The Last of Us Part II</h1>
        <p>Reserve agora.</p>
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

      {/* Nova Box de Texto */}
      <div className="text-box">
        <h1>Já que está aqui, escolha seus Pokémons</h1>
      </div>

      {/* Nova Box de Subtítulo e Botão de Escolha */}
      <div className="subtitle-box">
        <h3>Escolha um Pokémon</h3>
        <button className="choice-button" onClick={fetchRandomPokemons}>
          Selecione uma opção
        </button>

        {/* Opções de Pokémon mostradas abaixo do botão */}
        {showOptions && (
          <div className="pokemon-options">
            <h4>Escolha seu Pokémon:</h4>
            <ul>
              {availablePokemons.map((pokemon) => (
                <li key={pokemon.id} onClick={() => handlePokemonClick(pokemon)}>
                  {pokemon.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Box de imagens com os Pokémon selecionados */}
      <div className="image-box-container">
        {selectedPokemons.map((pokemon, index) => (
          <div key={index} className="image-box">
            {pokemon ? (
              <>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </>
            ) : (
              <p>Selecione um Pokémon</p>
            )}
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <footer className="footer">
        <p>&copy; 2025 Naughty Dog. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
