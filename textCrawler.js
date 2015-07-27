
var TextCrawler = function(action, className, speed){

  var TEXTLENGTH = $('.' + className).length;
  var SPEED = speed || 100;
  var COLOR = {primary: '', secondary: ''};
  var COLORPALETTE = [];
  var STOPSHIFT = 0;
  var CURRENT_POSITION = 0;
  var TEXTELEMENTARRAY = $('.' + className);
  this.CONTINUE = true;
    
  this.crawl = function(node){
    if (this.CONTINUE){
      CURRENT_POSITION++
      node = node || $('.head')[0];
      $(node).css('color', '#' + COLOR.primary);
      if ($(node).next().length === 0){
        var that = this;
        setTimeout(function(){
          that.changeRandomColor('primary');
          CURRENT_POSITION = 0;
          that.crawl();
        }, SPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        that.crawl($(node).next()[0]);
      }, SPEED);
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
        }, SPEED);
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
        }, SPEED);
        return;
      } else {
        this.changeRandomColor('primary');
        that = this;
        setTimeout(function(){
          that.radiate();
        }, SPEED);
      }
    }
  };

  this.fillToTail = function(node){
    if (this.CONTINUE){
      CURRENT_POSITION = ++CURRENT_POSITION;
      node = node || $('.head')[0];
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
        }, SPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.primary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.fillToTail();
        }, SPEED);
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
        }, SPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.primary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.fillToTail();
        }, SPEED);
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
        }, SPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.secondary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.fillToTail();
        }, SPEED);
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
      node = node || $('.head')[0];
      $(node).css('color', '#' + COLOR.primary);

      if (STOPSHIFT === TEXTLENGTH){
        this.changeRandomColor('secondary');
        STOPSHIFT = 0;
      }

      var that = this;
      if (CURRENT_POSITION < TEXTLENGTH - STOPSHIFT){
        setTimeout(function(){
          that.elastic($(node).next()[0]);
        }, SPEED); 
      } else {
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.secondary);
          CURRENT_POSITION = 0;
          STOPSHIFT++;
          that.elastic();
        }, SPEED);
      }
    }
  };

  this.singleRunner = function(node){
    if (this.CONTINUE){
      node = node || $('.head')[0];
      $(node).css('color', '#' + COLOR.primary);
      if ($(node).next().length === 0){
        var that = this;
        setTimeout(function(){
          $(node).css('color', '#' + COLOR.secondary);
          that.changeRandomColor('primary');
          that.singleRunner();
        }, SPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.secondary);
        that.singleRunner($(node).next()[0]);
      }, SPEED);
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
        }, SPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.primary);
        that.pong(index + nextStep, rightDirection);
      }, SPEED);
    }
  }

  this.stop = function(){
    this.CONTINUE = false;
  }

  this.growUp = function(node, size){
    if (this.CONTINUE){
      node = node || $('.head')[0];
      previousSize = size || Number.parseInt($(node).css('font-size'));
      newSize = previousSize * 1.5;
      $(node).css('font-size', newSize + 'px');
      if ($(node).next().length === 0){
        var that = this;
        setTimeout(function(){
          $(node).css('font-size', previousSize + 'px');
          that.growUp();
        }, SPEED);
        return;
      }
      var that = this;
      setTimeout(function(){
        $(node).css('font-size', previousSize + 'px');
        that.growUp($(node).next()[0], previousSize);
      }, SPEED);
    }
  }

  this.initialize = function(action, speed){
    this.CONTINUE = true;
    speed = speed || 100;
    this.changeRandomColor('primary');
    this.changeRandomColor('secondary');
    this[action]();
  }

  this.initialize(action);
};

textCrawler = new TextCrawler('growUp', 'title');

// to make:
// color random letter
// flash individual letters
// move letters?