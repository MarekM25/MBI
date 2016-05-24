/**
 * Created by Marek on 06.03.2016.
 */

var app = angular.module("app",[]);

app.controller("AppCtrl",function($scope,$http) {
    var app = this;
	
	$scope.medianSearchAlgorithm = function() 
    {
        var X = $scope.sekwencje;
        var l = $scope.dlugoscSekwencji;
        console.log($scope.sekwencje);
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

        function log(str)
        {
            $scope.log +=str+'\n';
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
                for (var i = 0; i < X[k].length - j +1 ; i++) {
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
        var stepNumber = 1;

        while (true){
            log('Krok '+stepNumber);
            prevV = v;
            if (i < l) {
                prefix = v.substring(0, i);
                optimistic = distance(X,prefix);
				log('Aktualna wartość prefixu '+numbersToLetters(prefix) + ' oceniona optymistycznie na ' + optimistic);
                if (optimistic > best) {
					log("Optymistyczna ocena jest gorsza niż dotychczasowa najlepsza (" + best + "), pomijam poddrzewo " + numbersToLetters(prefix));
                    v = permute(prefix, true);
                    if (prevV > v) break;
                } else {
                    //log('Prefix wydłużony')
                    i += 1;
                }
            } else {
                current = distance(X,v);
				log("Porównywanie napisu " + numbersToLetters(v) + " z dotychczasowo najlepszym " + numbersToLetters(median));
                if (current < best) {
                    log("Napis " + numbersToLetters(v) + " jest lepszy niż " + numbersToLetters(median) + " aktualizacja...");
					best = current;
                    median = v;
                    log("Mediana = " + numbersToLetters(median) + " wartość odległości hamminga: " + best);
                } else {
			log("Brak poprawy")
		}
                v = permute(v,false);
                if (prevV > v) break;
				log("Następna permutacja: " + numbersToLetters(v));
                i = 1;
            }
            ++stepNumber;
        }
        $scope.result = numbersToLetters(median);
        $scope.hamming = best;
    }

  $scope.fillSampleData = function() {
	  $scope.dlugoscSekwencji = 8;
      $scope.sekwencje = 'CCTGATAGACGCTATCTGGCTATCCAGGTACTTAGGTCCTCTGTGCGAATCTATGCGTTTCCAACCAT\nAGTACTGGTGTACATTTGATCCATACGTACACCGGCAACCTGAAACAAACGCTCAGAACCAGAAGTGC\nAAACGTTAGTGCACCCTCTTTCTTCGTGGCTCTGGCCAACGAGGGCTGATGTATAAGACGAAAATTTT\nAGCCTCCGATGTAAGTCATAGCTGTAACTATTACCTGCCACCCCTATTACATCTTACGTCCATATACA\nCTGTTATACAACGCGTCATGGCGGGGTATGCGTTTTGGTCGTCGTACGCTCGATCGTTACCGTACGGC';
  }
  
});

// X - tablica ciągów sekwencji
// t - ilość sekwencji
// n - długośc pojedynczej sekwencji
// l - długość szukanego motywu
