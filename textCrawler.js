
var TextCrawler = function(action, className, speed){

  var TEXTLENGTH = $('.' + className).length;
  var COLOR = {primary: '', secondary: ''};
  var STOPSHIFT = 0;
  var CURRENT_POSITION = 0;
    
  this.crawl = function(node){
    CURRENT_POSITION++
    var node = node || $('.head')[0];
    $(node).css('color', '#' + COLOR.primary);
    if ($(node).next().length === 0){
      var that = this;
      setTimeout(function(){
        that.changeRandomColor('primary');
        CURRENT_POSITION = 0;
        that.crawl();
      }, speed);
      return;
    }
    var that = this;
    setTimeout(function(){
      that.crawl($(node).next()[0]);
    }, speed);
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

  this.fillToTail = function(node){
    CURRENT_POSITION = ++CURRENT_POSITION;
    var node = node || $('.head')[0];
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
      }, speed); 
    } else {
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.primary);
        CURRENT_POSITION = 0;
        STOPSHIFT++;
        that.fillToTail();
      }, speed);
    }
  }  

  this.fillKeepBackground = function(node){
    CURRENT_POSITION = ++CURRENT_POSITION;
    var node = node || $('.head')[0];
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
      }, speed); 
    } else {
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.primary);
        CURRENT_POSITION = 0;
        STOPSHIFT++;
        that.fillToTail();
      }, speed);
    }
  }  

  this.fillChangeBackground = function(node){
    CURRENT_POSITION = ++CURRENT_POSITION;
    var node = node || $('.head')[0];
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
      }, speed); 
    } else {
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.secondary);
        CURRENT_POSITION = 0;
        STOPSHIFT++;
        that.fillToTail();
      }, speed);
    }
  }

  this.elastic = function(node){
    CURRENT_POSITION = ++CURRENT_POSITION;
    var node = node || $('.head')[0];
    $(node).css('color', '#' + COLOR.primary);

    if (STOPSHIFT === TEXTLENGTH){
      this.changeRandomColor('secondary');
      STOPSHIFT = 0;
    }

    var that = this;
    if (CURRENT_POSITION < TEXTLENGTH - STOPSHIFT){
      setTimeout(function(){
        that.elastic($(node).next()[0]);
      }, speed); 
    } else {
      setTimeout(function(){
        $(node).css('color', '#' + COLOR.secondary);
        CURRENT_POSITION = 0;
        STOPSHIFT++;
        that.elastic();
      }, speed);
    }
  } 

  this.changeRandomColor('primary');
  this.changeRandomColor('secondary');
  this[action]();
};




textCrawler = new TextCrawler('fillToTail', 'title', 25);