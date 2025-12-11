class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add (vertex);
    //console.log ("99 addVertex ", vertex, this);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let i=0; i<vertexArray.length; i++) {
      this.nodes.add (vertexArray[i]);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add (v2);
    v2.adjacent.add (v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete (v2);
    v2.adjacent.delete (v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete (vertex);
    for (const node of this.nodes) {
      node.adjacent.delete (vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {

    let out = [];
    //console.log ("999 dfs start=", start);
    function dfsR (curr, seen) {
      //console.log ("9999 dfsR  curr seen =", curr, seen);
        out.push (curr.value);
        for (const neighbor of curr.adjacent) {
          if (!seen.has (neighbor)) {
            seen.add (neighbor);
            dfsR (neighbor, seen);
          }
        }
        return out;
    }
    
    function dfsI (start) {
      let toVisitStack = [];
      toVisitStack.push (start);
      let seen = new Set ([start]);
      let out = [];
      if (!start)
        return out;

      while (toVisitStack.length > 0) {
        let curr = toVisitStack.pop ();
        out.push (curr.value)
        for (const neighbor of curr.adjacent) {
          if (!seen.has(neighbor)) {
            seen.add(neighbor);
            toVisitStack.push(neighbor);
          }
        }
      }
      return out;
    }

    return dfsR (start, new Set ([start]));

    //return dfsI (start)
    
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [];
    let seen = new Set ([start]);
    let out = [];

    if (!start)
      return out;

    toVisitQueue.push (start);
    while (toVisitQueue.length >0) {
      let curr = toVisitQueue.shift ();
      out.push (curr.value);
      for (const neighbor of curr.adjacent) {
        if (!seen.has (neighbor)) {
          seen.add (neighbor);
          toVisitQueue.push (neighbor);
        }
      }
    }

    return out;
  }
}

module.exports = {Graph, Node}