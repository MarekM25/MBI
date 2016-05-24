function medianSearch(X,l) {

		X = X.split('\n');
		
		var t = X.length;
		var n = X[0].length;
		
		for (var i = 0; i < t; i++) {
			X[i] = lettersToNumbers(X[i]);
		}


		
		function lettersToNumbers(str)
		{
			str = str.replace(/A/g,"0");
			str = str.replace(/C/g,"1");
			str = str.replace(/G/g,"2");
			str = str.replace(/T/g,"3");
			return str;
		}
		
		function numbersToLetters(str)
		{
			str = str.replace(/0/g,"A");
			str = str.replace(/1/g,"C");
			str = str.replace(/2/g,"G");
			str = str.replace(/3/g,"T");
			return str;
		}
		
		function permute(n, isPrefix) 
		{
			if (isPrefix) {
				var prefixLength = n.length;
				var result = parseInt(n,4) + 1;
				result = result.toString(4);
				while (result.length < prefixLength){
					result = "0" + result;
				}
				while (result.length < l){
					result = result + "0";
				}
				return result
			} else {
				var result = parseInt(n,4) + 1;
				result = result.toString(4);
				while (result.length < l){
					result = "0" + result;
				}
				return result
			}
		}
		
		function hamming(str1, str2) {
			var distance = 0;
			for (var i = 0; i < str1.length; i++) {
				if (str1.charCodeAt(i) != str2.charCodeAt(i)) {
					distance += 1;
				}
			}
			return distance;
		}
		
		function distance(X, word) {
			var j = word.length;
			var resultX = 0;
			var hammingDistanceWord;
			var hammingDistanceX;
			for (var k = 0; k < X.length; k++) {
				var resultWord = j;
				for (var i = 0; i < X[k].length - j; i++) {
					hammingDistanceWord = hamming(X[k].substring(i,j + i),word)
					if (resultWord > hammingDistanceWord) {
						resultWord = hammingDistanceWord;
					}
				}
				resultX += resultWord;
			}
			return resultX;
		}
		
		
		var iterator = 0;
		var best = l*t + 1;
		var median = "";
		var i = 1;
		var v = permute(-1, false);
		var prefix = "";
		var optimistic = 0;
		var current = 0;
		var prevV = -1;
		
		
		while (true){
			prevV = v;
			if (i < l) { 
				prefix = v.substring(0, i);
				optimistic = distance(X,prefix);

				if (optimistic > best) {
					v = permute(prefix, true);
					if (prevV > v) break;
				} else {
					//
					i += 1;
				}
			} else {
				current = distance(X,v);
				if (current < best) {
					best = current;
					median = v;
					console.log("Median = " + numbersToLetters(median) + " score: " + best);
					//$scope.result = numbersToLetters(median);
					//stop
				}
				v = permute(v,false);
				if (prevV > v) break;
				i = 1;
			}
		}
		
		
}
