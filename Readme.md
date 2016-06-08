## Projekt MBI
Aby uruchomić aplikację należy otworzyć w przedlądarce plik app/index.html

Aby mieć możliwość wprowadzania zmian w aplikacji należy zainstalować node.js

* Linux: apt-get install node
* Windows: https://nodejs.org/en/download/

Nasteępnie w glównym folderze folderze, aby pobrac paczki do folderu "node_modules":
npm install 

Aby odpalic testy jednostkowe bedac w glownym katalogu:  

* Linux: ./node_modules/karma/bin/karma start karma.conf.js
* Windows: 
  1. npm install -g karma-cli
  2. karma start karma.conf.js
