var createClosingTag = function(elementName){
  elementName = elementName || 'div';
  return '</' + elementName + '>';
}

var createOpeningTag = function(elementName, options){
  elementName = elementName || 'div';
  var openingTag = '<' + elementName;
  for (key in options){
    if (options[key]){
      openingTag += ' ' + key + '="' + options[key] + '"';
    }
  }
  return openingTag + '>';
}


var HTMLCharacterCode = function(char){
   return '&#' + char.charCodeAt(0);
}

var stringToHTMLContainer = function(string, containerOptions, letterOptions){
  element = containerOptions['element'] || 'div';
  console.log('hello:', element);
  containerOptions = containerOptions || {'class': 'container'};
  letterOptions = letterOptions || {};

	var HTMLStringBuilder = createOpeningTag(element, containerOptions);
	for (var i = 0; i < string.length; i++){
		HTMLStringBuilder += createOpeningTag('div', letterOptions) + HTMLCharacterCode(string[i]) + createClosingTag('div');
	}
	return HTMLStringBuilder + createClosingTag(element);
}