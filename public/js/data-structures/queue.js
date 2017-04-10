function QueueItem(value){
  this.value = value;
  this.next = null;
}

function Queue(){
  this.head = null;
  this.last = null;
  this.push = function(value){
    var item = new QueueItem(value);
    if(this.head == null){
      this.head = item;
      this.last = item;
    } else {
      this.last.next = item;
      this.last = item;
    }
  }
  this.pop = function(){
    var firstInQueue = this.head;
    this.head = this.head.next;
    return firstInQueue.value;
  }
}
