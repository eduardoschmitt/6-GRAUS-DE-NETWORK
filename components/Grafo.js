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
      throw new Error('Vértice não encontrado no grafo');
    }
    this.listaAdjacencia.get(vertice1).push(vertice2);
    this.listaAdjacencia.get(vertice2).push(vertice1);
  }

  bfs(origem, destino) {
    if (!this.listaAdjacencia.has(origem)) {
      console.error('Origem não encontrada no grafo.');
      return null;
    }

    let fila = [{ vertice: origem, caminho: [origem] }];
    let visitados = new Set([origem]);

    while (fila.length > 0) {
      let { vertice, caminho } = fila.shift();

      if (vertice === destino) {
        return caminho;
      }

      let vizinhos = this.listaAdjacencia.get(vertice);
      for (let vizinho of vizinhos) {
        if (!visitados.has(vizinho)) {
          visitados.add(vizinho);
          fila.push({ vertice: vizinho, caminho: [...caminho, vizinho] });
        }
      }
    }

    return null;
  }

  procurarTodosOsCaminhos(origem, destino, tamanhoMaximo) {
    let resultados = [];
    let caminhosUnicos = new Set();
    let fila = [{ caminho: [origem], visitados: new Set([origem]) }];

    while (fila.length > 0) {
      let { caminho, visitados } = fila.shift();
      let ultimoNo = caminho[caminho.length - 1];

      if (caminho.length > tamanhoMaximo + 1) continue;
      if (ultimoNo === destino) {
        let caminhoString = caminho.join('->');
        if (!caminhosUnicos.has(caminhoString)) {
          caminhosUnicos.add(caminhoString);
          resultados.push(caminho);
        }
        continue;
      }

      (this.listaAdjacencia.get(ultimoNo) || []).forEach(vizinho => {
        if (!visitados.has(vizinho)) {
          let novosVisitados = new Set(visitados);
          novosVisitados.add(vizinho);
          fila.push({ caminho: [...caminho, vizinho], visitados: novosVisitados });
        }
      });
    }
    return resultados;
  }
}

export { Grafo };
