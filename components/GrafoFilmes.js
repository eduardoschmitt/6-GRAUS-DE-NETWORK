import React, { useState } from "react";
import { Grafo } from "./Grafo";
import data from "../data/latest_movies.json";

const GrafoFilmes = () => {
  const [grafo, setGrafo] = useState(new Grafo());
  const [atorDe, setAtorDe] = useState("");
  const [atorPara, setAtorPara] = useState("");
  const [caminho, setCaminho] = useState('');
  const [caminhos, setCaminhos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const criarGrafo = () => {
    const novoGrafo = new Grafo();
    console.log("Carregando dados para o grafo...");
    data.forEach((movie) => {
      console.log(`Adicionando filme: ${movie.title}`);
      novoGrafo.adicionarVertice(movie.title);
      movie.cast.forEach((actor) => {
        console.log(`Adicionando ator: ${actor} ao filme: ${movie.title}`);
        novoGrafo.adicionarVertice(actor);
        novoGrafo.adicionarAresta(movie.title, actor);
      });
    });
    console.log("Grafo carregado com sucesso!");
    setGrafo(novoGrafo);
  };

  const encontrarCaminhoMaisCurto = () => {
    if (!grafo) {
      alert("Por favor, carregue o grafo primeiro.");
      return;
    }
    if (
      !grafo.listaAdjacencia.has(atorDe) ||
      !grafo.listaAdjacencia.has(atorPara)
    ) {
      alert("Um ou ambos os atores não encontrados no grafo!");
      return;
    }
    console.log(`Buscando caminho de ${atorDe} para ${atorPara}`);
    const resultado = grafo.bfs(atorDe, atorPara);
    setCaminho(resultado ? resultado.join(" -> ") : "Caminho não encontrado.");
  };

  const encontrarTodosCaminhosMenoresQue6 = () => {
    if (!grafo) {
        alert('Por favor, carregue o grafo primeiro.');
        return;
    }
    setIsLoading(true); 
    const resultados = grafo.procurarTodosOsCaminhos(atorDe, atorPara, 6); // Correção aqui
    setCaminhos(resultados.map(path => path.join(' -> ') + ` (Comprimento: ${path.length - 1})`));
    setIsLoading(false);
};

  return (
    <div>
      <div class="menuGrafos">
        <h1>Atores e Filmes: Grafo</h1>
        <button class="btn btn-dark" onClick={criarGrafo}>Criar Grafo</button>
        <input
          class="form-control"
          type="text"
          value={atorDe}
          onChange={(e) => setAtorDe(e.target.value)}
          placeholder="Ator de Origem"
        />
        <input
          class="form-control"
          type="text"
          value={atorPara}
          onChange={(e) => setAtorPara(e.target.value)}
          placeholder="Ator de Destino"
        />
        <button class="btn btn-dark" onClick={encontrarCaminhoMaisCurto}>Encontrar Caminho Mais Curto</button>
        <button class="btn btn-dark" onClick={encontrarTodosCaminhosMenoresQue6}>Encontrar Todos Caminhos Até 6 Arestas</button>
      </div>
      <div>
        {caminho && <p>Caminho Mais Curto: {caminho}</p>}
        {caminhos.length > 0 && (
          <div>
            <h2>Caminhos Encontrados (até 6 arestas):</h2>
            {caminhos.map((caminho, index) => <p key={index}>{caminho}</p>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrafoFilmes;
