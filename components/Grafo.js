class Grafo {
  constructor() {
    this.listaAdjacencia = new Map();
  }

  adicionarVertice(vertice) {
    if (!this.listaAdjacencia.has(vertice)) {
      this.listaAdjacencia.set(vertice, []);
    }
  }

  adicionarAresta(vertice1, vertice2) {
    if (!this.listaAdjacencia.has(vertice1) || !this.listaAdjacencia.has(vertice2)) {
      throw new Error("Vértice não encontrado no grafo");
    }
    this.listaAdjacencia.get(vertice1).push(vertice2);
    this.listaAdjacencia.get(vertice2).push(vertice1);
  }

  bfs(origem, destino) {
    let fila = [origem];
    let visitados = new Set();
    let predecessores = { [origem]: null };

    while (fila.length > 0) {
      let atual = fila.shift();

      if (!this.listaAdjacencia.has(atual)) {
        continue; // Ignora se o vértice atual não estiver no grafo
      }

      if (atual === destino) {
        return this.construirCaminho(predecessores, destino);
      }

      let vizinhos = this.listaAdjacencia.get(atual) || []; // Assegura que vizinhos não é undefined
      vizinhos.forEach((vizinho) => {
        if (!visitados.has(vizinho)) {
          visitados.add(vizinho);
          fila.push(vizinho);
          predecessores[vizinho] = atual;
        }
      });
    }

    return null; // Retorna null se não encontrar um caminho
  }

  construirCaminho(predecessores, destino) {
    let caminho = [];
    let atual = destino;
    const visitados = new Set(); // Conjunto para rastrear nós visitados

    while (atual !== null) {
      if (visitados.has(atual)) {
        console.error('Ciclo detectado no caminho, interrompendo para evitar loop infinito');
        break; // Detecção de ciclo para evitar loops infinitos
      }
      visitados.add(atual);
      caminho.push(atual);
      atual = predecessores[atual];
    }

    caminho.reverse();
    return caminho;
  }

  procurarTodosOsCaminhos(origem, destino, tamanhoMaximo) {
    let resultados = [];
    let fila = [[origem]];

    while (fila.length > 0) {
      let caminho = fila.shift();
      let ultimoNo = caminho[caminho.length - 1];
    
      if (caminho.length > tamanhoMaximo + 1) break;
      if (ultimoNo === destino) {
        resultados.push(caminho);
        continue;
      }

      (this.listaAdjacencia.get(ultimoNo) || []).forEach((vizinho) => {
        if (!caminho.includes(vizinho)) {
          fila.push([...caminho, vizinho]);
        }
      });
    }
    return resultados;
  }
}

export { Grafo };
