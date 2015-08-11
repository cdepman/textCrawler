
var TextCrawler = function(action, className, speed, primary, secondary){

  // constants

  this.TEXTLENGTH = document.getElementsByClassName(className || 'title').length;
  this.COLOR = {};
  this.COLOR.primary = primary;
  this.COLOR.secondary = secondary;
  this.RANDOMCOLOR = false;
  this.STOPSHIFT = 0;
  this.CURRENT_POSITION = 0;
  this.TEXTELEMENTARRAY = document.getElementsByClassName(className || 'title');
  this.ANIMATIONSPEED = speed || 100;
  this.CONTINUE = true;

  // animation methods
    
  this.crawl = function(node){
    if (this.CONTINUE){
      node = node || document.getElementsByClassName('title')[0];
      node.style.color = '#' + this.COLOR.primary;
      if (node.nextSibling === null){
        var that = this;
        setTimeout(function(){
          that.changeColor('primary');
          that.crawl();
        }, this.ANIMATIONSPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        that.crawl(node.nextSibling);
      }, this.ANIMATIONSPEED);
    }
  };


  this.radiate = function(leftIndex, rightIndex){
    if (this.CONTINUE){
      if (!leftIndex && !rightIndex && this.TEXTLENGTH % 2 !== 0){
        var middle = Math.floor(this.TEXTLENGTH/2);
        this.TEXTELEMENTARRAY[middle].style.color = '#' + this.COLOR.primary;
        that = this;
        setTimeout(function(){
          that.radiate(middle-1, middle+1);
        }, this.ANIMATIONSPEED);
        return;
      } else if (!leftIndex && !rightIndex) {
        leftIndex = Math.floor(this.TEXTLENGTH/2);
        rightIndex = Math.floor(this.TEXTLENGTH/2) - 1;
      }  
      this.TEXTELEMENTARRAY[rightIndex].style.color = '#' + this.COLOR.primary;
      this.TEXTELEMENTARRAY[leftIndex].style.color = '#' + this.COLOR.primary;
      if (leftIndex && rightIndex < this.TEXTLENGTH){
        that = this;
        setTimeout(function(){
          that.radiate(leftIndex-1, rightIndex+1);
        }, this.ANIMATIONSPEED);
        return;
      } else {
        this.changeColor('primary');
        that = this;
        setTimeout(function(){
          that.radiate();
        }, this.ANIMATIONSPEED);
      }
    }
  };

  this.fillToTail = function(node){
    if (this.CONTINUE){
      this.CURRENT_POSITION = ++this.CURRENT_POSITION;
      node = node || document.getElementsByClassName('title')[0];
      node.style.color = '#' + this.COLOR.primary;

      if (this.STOPSHIFT === this.TEXTLENGTH){
        this.COLOR['secondary'] = this.COLOR['primary'];
        this.changeColor('primary');
        this.STOPSHIFT = 0;
      }

      var that = this;
      if (this.CURRENT_POSITION < this.TEXTLENGTH - this.STOPSHIFT){
        setTimeout(function(){
          that.fillToTail(node.nextSibling);
          node.style.color = '#' + that.COLOR.secondary;
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          node.style.color = '#' + that.COLOR.primary;
          this.CURRENT_POSITION = 0;
          this.STOPSHIFT++;
          that.fillToTail();
        }, this.ANIMATIONSPEED);
      }
    }
  };  

  this.fillKeepBackground = function(node){
    if (this.CONTINUE){
      this.CURRENT_POSITION = ++this.CURRENT_POSITION;
      node = node || document.getElementsByClassName('title')[0];
      node.style.color = '#' + this.COLOR.primary;

      if (this.STOPSHIFT === this.TEXTLENGTH){
        this.changeColor('primary');
        this.STOPSHIFT = 0;
      }

      var that = this;
      if (this.CURRENT_POSITION < this.TEXTLENGTH - this.STOPSHIFT){
        setTimeout(function(){
          that.fillToTail(node.nextSibling);
          node.style.color = '#' + this.COLOR.secondary;
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          node.style.color = '#' + this.COLOR.primary;
          this.CURRENT_POSITION = 0;
          this.STOPSHIFT++;
          that.fillToTail();
        }, this.ANIMATIONSPEED);
      }
    }
  };  

  this.fillChangeBackground = function(node){
    if (this.CONTINUE){
      this.CURRENT_POSITION = ++this.CURRENT_POSITION;
      node = node || document.getElementsByClassName('title')[0];
      node.style.color = '#' + this.COLOR.primary;

      if (this.STOPSHIFT === this.TEXTLENGTH){
        this.changeColor('secondary');
        this.STOPSHIFT = 0;
      }

      var that = this;
      if (this.CURRENT_POSITION < this.TEXTLENGTH - this.STOPSHIFT){
        setTimeout(function(){
          that.fillToTail(node.nextSibling);
          node.style.color = '#' + this.COLOR.secondary;
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          node.style.color = '#' + this.COLOR.secondary;
          this.CURRENT_POSITION = 0;
          this.STOPSHIFT++;
          that.fillToTail();
        }, this.ANIMATIONSPEED);
      }
    }
  };

  this.flashEveryNthCharacter = function(n){
    if (this.CONTINUE){

  }
  };

  // this.intervalFlash = function(intervalOn, intervalOff){
  //   if (this.CONTINUE){
  //     intervalOn = intervalOn || 150;
  //     intervalOff = intervalOff || 900;

  //     var topLevelContext = this
  //     setTimeout(function(){
  //       this.TEXTELEMENTARRAY.each(function(){
  //         $(this).css('color', '#' + this.COLOR.primary);
  //       });
  //       var that = topLevelContext;
  //       setTimeout(function(){
  //          this.TEXTELEMENTARRAY.each(function(){
  //            $(this).css('color', '#' + this.COLOR.secondary);
  //          });
  //          that.intervalFlash();
  //       }, intervalOff);
  //     }, intervalOn);
  //   }
  // };

  this.elastic = function(node){
    if (this.CONTINUE){
      this.CURRENT_POSITION = ++this.CURRENT_POSITION;
      node = node || document.getElementsByClassName('title')[0];
      node.style.color = '#' + this.COLOR.primary;

      if (this.STOPSHIFT === this.TEXTLENGTH){
        this.changeColor('secondary');
        this.STOPSHIFT = 0;
      }

      var that = this;
      if (this.CURRENT_POSITION < this.TEXTLENGTH - this.STOPSHIFT){
        setTimeout(function(){
          that.elastic(node.nextSibling);
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          node.style.color = '#' + this.COLOR.secondary;
          this.CURRENT_POSITION = 0;
          this.STOPSHIFT++;
          that.elastic();
        }, this.ANIMATIONSPEED);
      }
    }
  };

  this.singleRunner = function(node){
    if (this.CONTINUE){
      node = node || document.getElementsByClassName('title')[0];
      node.style.color = '#' + this.COLOR.primary;
      if (node.nextSibling === null){
        var that = this;
        setTimeout(function(){
          node.style.color = '#' + this.COLOR.secondary;
          that.changeColor('primary');
          that.singleRunner();
        }, this.ANIMATIONSPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        node.style.color = '#' + this.COLOR.secondary;
        that.singleRunner(node.nextSibling);
      }, this.ANIMATIONSPEED);
    }
  };

  this.pong = function(index, rightDirection){
    console.log(index);
    if (this.CONTINUE){
      if (rightDirection === undefined){
        rightDirection = true;
      }
      index = index || 0;
      var nextStep = rightDirection ? 1 : -1;
      var node = this.TEXTELEMENTARRAY[index]
      node.style.color = '#' + this.COLOR.primary;
      if (index === 0 && !rightDirection || index === this.TEXTLENGTH - 1 && rightDirection){
        var that = this;
        setTimeout(function(){
          node.style.color = '#' + that.COLOR.secondary;
          that.changeColor('primary');
          that.changeColor('secondary');
          that.pong(rightDirection ? this.TEXTLENGTH -1 : 0, !rightDirection);
        }, this.ANIMATIONSPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        node.style.color = '#' + that.COLOR.primary;
        that.pong(index + nextStep, rightDirection);
      }, this.ANIMATIONSPEED);
    }
  }


  // this.growUp = function(node, size){
  //   if (this.CONTINUE){
  //     node = node || document.getElementsByClassName('title')[0];
  //     previousSize = size || Number.parseInt($(node).css('font-size'));
  //     newSize = previousSize * 1.5;
  //     $(node).css('font-size', newSize + 'px');
  //     if (node.nextSibling === null){
  //       var that = this;
  //       setTimeout(function(){
  //         $(node).css('font-size', previousSize + 'px');
  //         that.growUp();
  //       }, this.ANIMATIONSPEED);
  //       return;
  //     }
  //     var that = this;
  //     setTimeout(function(){
  //       $(node).css('font-size', previousSize + 'px');
  //       that.growUp(node.nextSibling, previousSize);
  //     }, this.ANIMATIONSPEED);
  //   }
  // }

  // utility methods

  this.changeColor = function(hashKey){
    var oldPrimary = this.COLOR.primary;
    var oldSecondary = this.COLOR.secondary;
    if (this.RANDOMCOLOR){
      hashKey = hashKey || 'primary';
      this.COLOR[hashKey] = Math.floor(Math.random()*16777215).toString(16);
      if (this.COLOR[hashKey] === oldPrimary || this.COLOR[hashKey] === oldSecondary){
        this.changeColor(hashKey);
      }
    } else {
      this.COLOR.primary = oldSecondary;
      this.COLOR.secondary = oldPrimary;
    }
  }

  this.stop = function(){
    this.CONTINUE = false;
  }

  this.changeSpeed = function(speed){
    this.ANIMATIONSPEED = speed;
  }

  this.initialize = function(action, element){
    this.CONTINUE = true;
    if (this.COLOR.primary === "ffffff" && this.COLOR.secondary === "ffffff"){
      this.RANDOMCOLOR = true;
      this.changeColor('primary');
      this.changeColor('secondary');
    }
    this[action]();
  }

  this.initialize(action);
};
// to make:
// color random letter
// flash individual letters
// move letters?

// make it work for all HTML elements, going not just from right to left but up/down/left/diagonal

// make a hash of all elements and update their positions constantly as one of their properties. when looking for the next closest element 