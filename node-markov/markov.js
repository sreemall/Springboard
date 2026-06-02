/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    this.text = text;
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    //console.log ("Constructor text=", text, " words= ", this.words, " chains= ", this.chains);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let map = new Map();
    const words = this.words;
    for (let i=0; i<words.length-1; i++) {
      if (!map.has(words[i]))
        map.set(words[i], []);
      
      map.get(words[i]).push (words[i+1]);
    }
    if (!map.has(words[words.length-1]))
      map.set(words[words.length], []);
    map.get(words[words.length-1]).push ("null");

    this.chains = map;
  }


  /** return random text from chains */

  
  makeText(numWords = 100) {
    // TODO
    let randomText = "";
    let random = Math.floor (Math.random () * this.words.length);
    let currWord = this.words[random];
    //console.log ("makeText random= ", numWords, random, currWord, this.words.length);
    while (numWords-- !== 0) {
      random = Math.floor (Math.random() * this.chains.get(currWord).length);
      currWord = this.chains.get(currWord)[random];
      //console.log ("in while randomText= ", random, randomText, currWord, numWords)
      if (currWord != "null")
        randomText += " " + currWord;
      else
        break;
    }
    
    return randomText;
  }
}

let markovChain = new MarkovMachine ("the cat in the hat is in the hat");
let text = markovChain.makeText ();
console.log ("Text= ", text);