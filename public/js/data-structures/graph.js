function Graph(){
  this.Vertices = [];
}

function Vertex(value){
  this.parent = null;
  this.distance = Infinity;
  this.value = value;
  this.color = "white";
  this.adjascences = [];
}
