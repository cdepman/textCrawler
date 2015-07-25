
var textCrawler = function(className, flowSpeed){

  var textLength = $('.' + className).length;
  var hash = {color: ''};
  changeColor();
    
  var crawl = function(element){
    element = element || $('.head')[0];
    $(element).css('color', '#' + hash.color);
    if ($(element).next().length === 0){
      setTimeout(function(){
        changeColor(hash.color);
        crawl($('.head'));
      }, flowSpeed);
      return;
    }
    setTimeout(function(){
      crawl($(element).next()[0]);
    }, flowSpeed);
  };

  function changeColor(oldColor){
    oldColor = oldColor || '';
    hash.color = Math.floor(Math.random()*16777215).toString(16);
    if (hash.color === oldColor){
      changeColor();
    }
  }

  crawl();
};

textCrawler('title', 50);