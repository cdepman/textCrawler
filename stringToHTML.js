var specialChars = {' ': '&nbsp'};

var stringToHTML = function(string, element, containerOptions, letterOptions){
  containerOptions = containerOptions || {};
  letterOptions = letterOptions || {};

	var HTMLStringBuilder = createOpeningTag(element, containerOptions);
	for (var i = 0; i < string.length; i++){
		var char = string[i];
		if (specialChars[char]){
			char = specialChars[char];
		}
		HTMLStringBuilder += createOpeningTag('div', letterOptions) + char + createClosingTag('div');
	}
	return HTMLStringBuilder + createClosingTag(element);
}


var createClosingTag = function(elementName){
  return '</' + elementName + '>';
}

var createOpeningTag = function(elementName, options){
  var openingTag = '<' + elementName;
  for (key in options){
    if (options[key]){
      openingTag += ' ' + key + '="' + options[key] + '"';
    }
  }
  return openingTag + '>';
}