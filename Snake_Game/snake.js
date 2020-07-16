class Snake {

  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
    this.head = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }
  
  update() {
    //this.body[0].x += this.xdir;
    //this.body[0].y += this.ydir;
    this.head = this.body[this.body.length - 1].copy();
    this.body.shift();
    this.head.x += this.xdir;
    this.head.y += this.ydir;
    this.body.push(this.head);
  }

  grow() {
    //let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(this.head);
  }

  checkDeath(){
    let x = this.head.x;
    let y = this.head.y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0){
      status = 'dead';
      return true;
    }
    for(let i = 0; i < this.body.length-1; i++){
      let part = this.body[i];
      if(part.x == x && part.y == y){
        status = 'dead';
        return true;
      }
    } 
    return false;
  }


  eat(pos) {
    let x = this.head.x;
    let y = this.head.y;
    if (x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      noStroke();
      fill(255);
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }



}