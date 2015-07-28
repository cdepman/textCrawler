var createClosingTag = function(elementName){
  elementName = elementName || 'div';
  return '</' + elementName + '>';
}

var buildCSS = function(options){
  var CSSBlock = "style='"
  for (var key in options) {
    CSSBlock += key + ': ' + options[key] + '; '; 
  }
  return CSSBlock + "'";
}

var createOpeningTag = function(elementName, options){
  elementName = elementName || 'div';
  var openingTag = '<' + elementName;
  for (var key in options){
    if (options[key]){
      openingTag += " " + key + "='" + options[key] + "'";
    }
  }
  return openingTag + '>';
}

var getHTMLCharacterCode = function(char){
   return '&#' + char.charCodeAt(0);
}

var stringToHTMLContainer = function(string, containerOptions, letterOptions){
  
  containerOptions = containerOptions || {'class': 'container', 'element':'div'};
  element = containerOptions['element'];
  letterOptions = letterOptions || {};

	var HTMLStringBuilder = createOpeningTag(element, containerOptions);
	for (var i = 0; i < string.length; i++){
		HTMLStringBuilder += createOpeningTag('div', letterOptions) + getHTMLCharacterCode(string[i]) + createClosingTag('div');
	}
	return HTMLStringBuilder + createClosingTag(element);
}