
var TextCrawler = function(action, className, speed){

  var textLength = $('.' + className).length;
  var hash = {color: ''};
    
  this.crawl = function(element){
    element = element || $('.head')[0];
    $(element).css('color', '#' + hash.color);
    if ($(element).next().length === 0){
      var that = this;
      setTimeout(function(){
        that.changeColor(hash.color);
        that.crawl($('.head'));
      }, speed);
      return;
    }
    var that = this;
    setTimeout(function(){
      that.crawl($(element).next()[0]);
    }, speed);
  };

  this.changeColor = function(oldColor){
    oldColor = oldColor || '';
    hash.color = Math.floor(Math.random()*16777215).toString(16);
    if (hash.color === oldColor){
      this.changeColor();
    }
  }

  this[action]();
  this.changeColor();
};




textCrawler = new TextCrawler('crawl', 'title', 50);