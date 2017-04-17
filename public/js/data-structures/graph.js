var Graphtani = (function () {

//TODO CHANGE VERTEX AND GRAPH TO CLASS
  var Vertex = function(value){
    this.value = value;
    this.adjacencies = [];
    this.color = null;
    this.predecessor = null;
    this.wasExplored = function(){
      var response = true;
      for ( var adjacency of  adjacencies){
        if( adjacency.color != black ){
          response = false;
        }
      }
      return response;
    }
  }

  var Graph = function(){
    this.vertices = [];
    this.adjacencyList = [];
    this.adjacency = function(vertex){
      //TODO
    //  for (let vertex of adjacencyList)
    }
    this.transpose = function(){
      //TODO
    };
  }

  const white = "white";
  const gray = "gray";
  const black = "black";

  var _initializeVertices, _enqueue;
  let _timer = 0;

  _initializeVertices = function(vertices, properties){
    properties = properties || { };

    for ( let vertex of vertices ){
      if( properties.distance ) { vertex.distance = Infinity; }
      if( properties.time ) { vertex.discovery = vertex.finishing = -1; }
      if( properties.weight ) { vertex.weight = Infinity; }
      vertex.color = white;
      vertex.predecessor = null;
    }
  }

  //TODO: ENQUEUE IN INITIALIZATION TO OPTIMZE TIME
  _enqueue = function(vertices, queue, startingVertex){
    queue.push(startingVertex);

    for( let vertex of vertices ){
      if ( vertex != startingVertex ) { queue.push(vertex); }
    }
  }

  _dfsExplore = function(graph, vertex){
    vertex.discovery = ++_timer;
    vertex.color = gray;
    console.log("Discovered vertex: " + vertex.value + "            s.t.: " + vertex.discovery);
    for ( let adjacencyIndex of vertex.adjacencies ){
      let adjacentVertex = graph.vertices[adjacencyIndex];
      if ( adjacentVertex.color == white ) {
        adjacentVertex.predecessor = vertex;
        _dfsExplore(graph, adjacentVertex);
      }
    }
    vertex.color = black;
    vertex.finishing = ++_timer;
    console.log("Finished vertex: " + vertex.value + "            f.t.: " + vertex.finishing);
  }

  //NOT GOOD, NEED FIX
  _dfsExploreVertex = function(vertex, queue, time){
    if (vertex.discovery < 0) {
      vertex.discovery = time++;
      queue.push(vertex);
      for ( let adjacence of vertex.adjacencies ) {
        queue.push(adjacence);
      }
    }
    else if ( vertex.finishing < 0 ){
      vertex.finishing = time++;
    }
  }
  //NOT GOOD, NEED FIX
  _dfsExploreEdge = function(vertex, edge, time){
    if (edge.discovery < 0) {
      edge.discovery = time++;
      edge.finishing = time++;
    }
  }

  return {

    initializeGraphWithInput: function(vertices, adjacencyArray){
      var graph = new Graph();
      //TODO: Verify if while is more performatic
      vertices.forEach(function(value, index){
        var vertex = new Vertex(value);
        vertex.adjacencies = adjacencyArray[index] || [];
        graph.vertices.push( vertex );

      });
      graph.adjacencyList = adjacencyArray;
      // graph.adjacencyList = adjacen
      return graph;
    },

    //TODO: CHECK IF CLONE IS INTERESTING, MAYB CREATE A FUNC THAT DOESNT CHANGE GRAPH PROP.
    doBFS: function(graph, startingVertex){
      let vertices = graph.vertices;
      let queue = new Queue();//let queue = new HeapQueue(2);
      startingVertex = startingVertex || vertices[0];

      _initializeVertices( vertices, { distance: true } );
      startingVertex.color = gray;
      startingVertex.distance = 0;
      queue.push(startingVertex);
      while( !queue.isEmpty() ){
        let currVertex = queue.pop();
        let currAdjacencies = "";
        let allAdjacencies = "";
        for ( let adjacencyIndex of currVertex.adjacencies ){
          let adjacentVertex = graph.vertices[adjacencyIndex];
          allAdjacencies += " " + adjacentVertex.value + " ";
          if ( adjacentVertex.color == white ){
            adjacentVertex.color = gray;
            adjacentVertex.predecessor = currVertex;
            adjacentVertex.distance = currVertex.distance + 1;
            currAdjacencies += " " + adjacentVertex.value + " ";
            queue.push( adjacentVertex );
          }
        }
        console.log("Visited vertex: " + currVertex.value + ",");
        console.log("added adjacencies: [" + currAdjacencies + "], all adjacencies: [" + allAdjacencies + "]");
        currVertex.color = black;
      }
      return startingVertex;
    },

    //WONT OVERFLOW, BECAUSE IT HAS A SEPARATED QUEUE; NOT WELL IMPLEMENTED
    doSafeDFS: function(graph){
      startingVertex = startingVertex || vertices[0];
      let vertices = graph.vertices;
      let queue = new Queue();
      let time = 0;

      _initializeVertices(vertices, { time: true });
      _enqueue(vertices, queue, startingVertex);

      while ( !queue.isEmpty() ){
        var vertex = queue.pop();
        if ( vertex.adjacencies.length > 0 )
          _dfsExploreVertex(vertex, queue, time);
        else
          _dfsExploreEdge(vertex, edge, time);
      }
    },

    doDFS: function(graph){
      _timer = 0;
      _initializeVertices(graph.vertices, { time: true })
      for ( let vertex of graph.vertices ) {
        if ( vertex.color == white )
          _dfsExplore(graph, vertex);
      }
    }

  }
})();
