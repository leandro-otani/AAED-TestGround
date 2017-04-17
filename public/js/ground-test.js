function initializeVertices(){
  var vertices = [];
  var adjacences = [];
  vertices.push("1");
  vertices.push("2");
  vertices.push("3");
  vertices.push("4");
  vertices.push("5");
  vertices.push("6");
  adjacences.push([1, 2]); //1
  adjacences.push([4]); //2
  adjacences.push([3, 4, 5]); //3
  adjacences.push([4, 5]); //4
  adjacences.push([]); //5
  adjacences.push([4]); //6

  var graph = Graphtani.initializeGraphWithInput(vertices, adjacences);
  // Graphtani.doBFS(graph, 0);
  Graphtani.doDFS(graph);

}

function bfs(graph, startingPos){
  var queue = new Queue();
  startingVertex = [graph.startingPos];
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
