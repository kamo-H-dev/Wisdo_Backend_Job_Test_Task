const WatchlistWordModel = require('../models/watchlistWord.model');


module.exports = class WatchListService {
  
  static getAll() {
    return WatchlistWordModel.find({});
  }

  /**
   * 
   * @param str
   * @param words
   * @return {string[]}
   */
  static censoredFilter(str, words) {
    if (!words.length) return [];
    
    const text = str.toLowerCase().split(' ');
    const matches = new Set();

    for (let i = 0; i < words.length; i++) {
      let word = words[i].toLocaleLowerCase();
      for (let j = 0; j < text.length; j++) {
        if (text[j] === word) {
          matches.add(word);
        }
      }
    }

    return [...matches];
  }

  /**
   * with RegEx
   * 
   * @param str
   * @param words
   * @return {RegExpMatchArray[]}
   */
  static censoredFilterRegEx(str, words) {
    const text = str.toLowerCase();

    const regex = new RegExp('\\b(' + words.join('|') + ')\\b', 'g');

    return [...text.matchAll(regex)];
  }
  
};
