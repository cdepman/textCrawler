
var TextCrawler = function(action, className, speed, primary, secondary){

  var TEXTLENGTH = $('.' + className).length;
  var COLOR = {primary: primary || '', secondary: secondary || ''};
  var COLORPALETTE = [];
  var STOPSHIFT = 0;
  var CURRENT_POSITION = 0;
  var TEXTELEMENTARRAY = $('.' + className);
  this.ANIMATIONSPEED = speed || 100;
  this.CONTINUE = true;
    
  this.crawl = function(node){
    if (this.CONTINUE){
      CURRENT_POSITION++
      node = node || $('.title')[0];
      $(node).css('color', '#' + COLOR.primary);
      if ($(node).next().length === 0){
        var that = this;
        setTimeout(function(){
          that.changeRandomColor('primary');
          CURRENT_POSITION = 0;
          that.crawl();
        }, this.ANIMATIONSPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        that.crawl($(node).next()[0]);
      }, this.ANIMATIONSPEED);
    }
  };

  this.changeRandomColor = function(hashKey){
    var oldPrimary = COLOR['primary'] || '';
    var oldSecondary = COLOR['secondary'] || '';
    hashKey = hashKey || 'primary';
    COLOR[hashKey] = Math.floor(Math.random()*16777215).toString(16);
    if (COLOR[hashKey] === oldPrimary || COLOR[hashKey] === oldSecondary){
      this.changeRandomColor(hashKey);
    }
  }

  this.radiate = function(leftIndex, rightIndex){
    if (this.CONTINUE){
      if (!leftIndex && !rightIndex && TEXTLENGTH % 2 !== 0){
        var middle = Math.floor(TEXTLENGTH/2);
        $(TEXTELEMENTARRAY[middle]).css('color', '#' + COLOR.primary);
        that = this;
        setTimeout(function(){
          that.radiate(middle-1, middle+1);
        }, this.ANIMATIONSPEED);
        return;
      } else if (!leftIndex && !rightIndex) {
        leftIndex = Math.floor(TEXTLENGTH/2);
        rightIndex = Math.floor(TEXTLENGTH/2) + 1;
      }  
      $(TEXTELEMENTARRAY[rightIndex]).css('color', '#' + COLOR.primary);
      $(TEXTELEMENTARRAY[leftIndex]).css('color', '#' + COLOR.primary);
      if (leftIndex && rightIndex < TEXTLENGTH){
        that = this;
        setTimeout(function(){
          that.radiate(leftIndex-1, rightIndex+1);
        }, this.ANIMATIONSPEED);
        return;
      } else {
        this.changeRandomColor('primary');
        that = this;
        setTimeout(function(){
          that.radiate();
        }, this.ANIMATIONSPEED);
      }
    }
  };

  this.fillToTail = function(node){
    if (this.CONTINUE){
      CURRENT_POSITION = ++CURRENT_POSITION;
      node = node || $('.title')[0];
      $(node).css('color', '#' + COLOR.primary);

      if (STOPSHIFT === TEXTLENGTH){
        COLOR['secondary'] = COLOR['primary'];
        this.changeRandomColor('primary');
        STOPSHIFT = 0;
      }

      var that = this;
      if (CURRENT_POSITION < TEXTLENGTH - STOPSHIFT){
        setTimeout(function(){
          that.fillToTail($(node).next()[0]);
          $(node).css('color', '#' + COLOR.secondary);
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.primary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.fillToTail();
        }, this.ANIMATIONSPEED);
      }
    }
  };  

  this.fillKeepBackground = function(node){
    if (this.CONTINUE){
      CURRENT_POSITION = ++CURRENT_POSITION;
      node = node || $('.head')[0];
      $(node).css('color', '#' + COLOR.primary);

      if (STOPSHIFT === TEXTLENGTH){
        this.changeRandomColor('primary');
        STOPSHIFT = 0;
      }

      var that = this;
      if (CURRENT_POSITION < TEXTLENGTH - STOPSHIFT){
        setTimeout(function(){
          that.fillToTail($(node).next()[0]);
          $(node).css('color', '#' + COLOR.secondary);
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.primary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.fillToTail();
        }, this.ANIMATIONSPEED);
      }
    }
  };  

  this.fillChangeBackground = function(node){
    if (this.CONTINUE){
      CURRENT_POSITION = ++CURRENT_POSITION;
      node = node || $('.head')[0];
      $(node).css('color', '#' + COLOR.primary);

      if (STOPSHIFT === TEXTLENGTH){
        this.changeRandomColor('secondary');
        STOPSHIFT = 0;
      }

      var that = this;
      if (CURRENT_POSITION < TEXTLENGTH - STOPSHIFT){
        setTimeout(function(){
          that.fillToTail($(node).next()[0]);
          $(node).css('color', '#' + COLOR.secondary);
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.secondary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.fillToTail();
        }, this.ANIMATIONSPEED);
      }
    }
  };

  this.flashEveryNthCharacter = function(n){
    if (this.CONTINUE){

  }
  };

  this.intervalFlash = function(intervalOn, intervalOff){
    if (this.CONTINUE){
      intervalOn = intervalOn || 150;
      intervalOff = intervalOff || 900;
      var topLevelContext = this
      setTimeout(function(){
        TEXTELEMENTARRAY.each(function(){
          $(this).css('color', '#' + COLOR.primary);
        });
        var that = topLevelContext;
        setTimeout(function(){
           TEXTELEMENTARRAY.each(function(){
             $(this).css('color', '#' + COLOR.secondary);
           });
           that.intervalFlash();
        }, intervalOff);
      }, intervalOn);
    }
  };

  this.elastic = function(node){
    if (this.CONTINUE){
      CURRENT_POSITION = ++CURRENT_POSITION;
      node = node || $('.title')[0];
      $(node).css('color', '#' + COLOR.primary);

      if (STOPSHIFT === TEXTLENGTH){
        this.changeRandomColor('secondary');
        STOPSHIFT = 0;
      }

      var that = this;
      if (CURRENT_POSITION < TEXTLENGTH - STOPSHIFT){
        setTimeout(function(){
          that.elastic($(node).next()[0]);
        }, this.ANIMATIONSPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.secondary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.elastic();
        }, this.ANIMATIONSPEED);
      }
    }
  };

  this.singleRunner = function(node){
    if (this.CONTINUE){
      node = node || $('.title')[0];
      $(node).css('color', '#' + COLOR.primary);
      if ($(node).next().length === 0){
        var that = this;
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.secondary);
          that.changeRandomColor('primary');
          that.singleRunner();
        }, this.ANIMATIONSPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.secondary);
        that.singleRunner($(node).next()[0]);
      }, this.ANIMATIONSPEED);
    }
  };

  this.pong = function(index, rightDirection){
    if (this.CONTINUE){
      if (rightDirection === undefined){
        rightDirection = true;
      }
      index = index || 0;
      var nextStep = rightDirection ? 1 : -1;
      var node = TEXTELEMENTARRAY[index]
      $(node).css('color', '#' + COLOR.primary);
      if (index === 0 && !rightDirection || index === TEXTLENGTH - 1 && rightDirection){
        var that = this;
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.secondary);
          that.changeRandomColor('primary');
          that.changeRandomColor('secondary');
          that.pong(rightDirection ? TEXTLENGTH -1 : 0, !rightDirection);
        }, this.ANIMATIONSPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.primary);
        that.pong(index + nextStep, rightDirection);
      }, this.ANIMATIONSPEED);
    }
  }

  this.stop = function(){
    this.CONTINUE = false;
  }

  this.growUp = function(node, size){
    if (this.CONTINUE){
      node = node || $('.title')[0];
      previousSize = size || Number.parseInt($(node).css('font-size'));
      newSize = previousSize * 1.5;
      $(node).css('font-size', newSize + 'px');
      if ($(node).next().length === 0){
        var that = this;
        setTimeout(function(){
          $(node).css('font-size', previousSize + 'px');
          that.growUp();
        }, this.ANIMATIONSPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        $(node).css('font-size', previousSize + 'px');
        that.growUp($(node).next()[0], previousSize);
      }, this.ANIMATIONSPEED);
    }
  }

  this.changeSpeed = function(speed){
    this.ANIMATIONSPEED = speed;
  }

  this.initialize = function(action, element){
    this.CONTINUE = true;
    this.changeRandomColor('primary');
    this.changeRandomColor('secondary');
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