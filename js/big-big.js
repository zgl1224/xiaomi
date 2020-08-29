class Bigger{
  constructor(){
      this.small = document.getElementById("small");
      // this.A = document.getElementById("A");
      this.span = document.querySelector("span");
      console.log(this.span);
      this.big = document.getElementById("big");
      // console.log(big);
      this.B = document.getElementById("B");
      // console.log(B);
      this.right = document.getElementById("RRR");
      

      this.addEvent();
  }
  addEvent(){
      var that = this;
      this.small.onmouseover = function(){
        // console.log(this);
        that.over();
        var A = document.getElementById("A");
    // console.log(A);
        B.src = A.src;
        // console.log(that.right);  
        // that.right.style.display = 'none';
      }
      this.small.onmouseout = function(){
        that.out();
        // that.right.style.display = 'block';
      }
      this.small.onmousemove = function(){
          that.move();
      }
  }
  over(){
    // var A = document.getElementById("A");
    // console.log(A);

      this.span.style.display = "block";
      this.big.style.display = "block";
      
      var scaleW = this.B.offsetWidth / this.big.offsetWidth;
      var scaleH = this.B.offsetHeight / this.big.offsetHeight;
      
      this.span.style.width = this.small.offsetWidth / scaleW + "px";
      this.span.style.height = this.small.offsetHeight / scaleH + "px";

      // console.log(this);
  }
  out(){
      this.span.style.display = "none";
      this.big.style.display = "none";
  }
  move(eve){
      var e = eve || window.event;
      var mouseX = e.pageX;
      var mouseY = e.pageY;

      var x = mouseX - this.small.offsetLeft - this.span.offsetWidth / 2;
      var y = mouseY - this.small.offsetTop - this.span.offsetHeight / 2;

      if(x<0) x=0;
      if(y<0) y=0;

      var xMax = this.small.offsetWidth - this.span.offsetWidth;
      var yMax = this.small.offsetHeight - this.span.offsetHeight;

      if(x>xMax) x = xMax;
      if(y>yMax) y = yMax;

      this.span.style.left = x + "px";
      this.span.style.top = y + "px";
      // console.log(x,y);

      var xScale = this.small.offsetWidth - this.span.offsetWidth;
      var yScale = this.small.offsetHeight - this.span.offsetHeight;
      // console.log(xScale,yScale);

      var xx = x * (this.B.offsetWidth - this.big.offsetWidth) / xScale;
      var yy = y * (this.B.offsetHeight - this.big.offsetHeight) / yScale;
      // console.log(xx,yy);
      
      this.B.style.left = -xx + "px";
      this.B.style.top = -yy + "px";

  }
}


new Bigger;