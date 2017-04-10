function initializeVertices(){
  var graph = new Graph();
  var vertices = graph.Vertices;
  vertices.push(new Vertex("Sao Paulo"));
  vertices.push(new Vertex("Rio de Janeiro"));
  vertices.push(new Vertex("Guaruja"));
  vertices.push(new Vertex("Santos"));
  vertices.push(new Vertex("Joinville"));
  vertices.push(new Vertex("Curitiba"));
  vertices.push(new Vertex("Londrina"));
  var spList = [vertices[1], vertices[2], vertices[3], vertices[5]];
  var rioList = [vertices[2], vertices[3]]
  var santosList = [vertices[2]];
  var curitibaList = [vertices[6], vertices[4]];
  vertices[1].adjascences = rioList;
  vertices[0].adjascences = spList;
  vertices[3].adjascences = santosList;
  vertices[5].adjascences = curitibaList;
  bfs(graph, 0);
}

function bfs(graph, startingPos){
  var queue = new Queue();
  startingVertex = graph.Vertices[startingPos];
  startingVertex.color = "gray";
  startingVertex.distance = 0;
  queue.push(startingVertex);
  var output = [];
  while(queue.head){
    var visited = queue.pop();
    output.push(visited);
    visited.adjascences.forEach(function(adjascence){
      if(adjascence.color == "white"){
        adjascence.color = "gray";
        adjascence.distance = visited.distance + 1;
        adjascence.parent = visited;
        queue.push(adjascence);
      }
    });
    visited.color = "black";
  }
  output.forEach(function(vertex){
    console.log("City: " + vertex.value + ", distance from São Paulo: " + vertex.distance);
  })
}

initializeVertices();
