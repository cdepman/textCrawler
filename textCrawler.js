
var TextCrawler = function(action, className, speed){

  var TEXTLENGTH = $('.' + className).length;
  var HASH = {color: ''};
  var STOPSHIFT = 0;
  var CURRENT_POSITION = 0;
    
  this.crawl = function(node){
    CURRENT_POSITION++
    var node = node || $('.head')[0];
    $(node).css('color', '#' + HASH.color);
    if ($(node).next().length === 0){
      var that = this;
      setTimeout(function(){
        that.changeColor(HASH.color);
        CURRENT_POSITION = 0;
        that.crawl($('.head'));
      }, speed);
      return;
    }
    var that = this;
    setTimeout(function(){
      that.crawl($(node).next()[0]);
    }, speed);
  };

  this.changeColor = function(oldColor){
    var oldColor = oldColor || '';
    HASH.color = Math.floor(Math.random()*16777215).toString(16);
    if (HASH.color === oldColor){
      this.changeColor();
    }
  }

  this.fillToTail = function(node){
    CURRENT_POSITION = ++CURRENT_POSITION;
    if (STOPSHIFT === TEXTLENGTH){
      STOPSHIFT = 0;
      this.changeColor(HASH.color);
    }
    var node = node || $('.head')[0];
    $(node).css('color', '#' + HASH.color);
    if ($(node).next().length === 0){
      var that = this;
      setTimeout(function(){
        CURRENT_POSITION = 0;
        that.fillToTail($('.head'));
      }, speed);
      return;
    }
    var that = this;
    setTimeout(function(){
      if (CURRENT_POSITION <= TEXTLENGTH - STOPSHIFT){
        that.fillToTail($(node).next()[0]);
      } else {
        CURRENT_POSITION = 0;
      }
    }, speed); 
  }

  this.changeColor();
  this[action]();
};




textCrawler = new TextCrawler('fillToTail', 'title', 50);