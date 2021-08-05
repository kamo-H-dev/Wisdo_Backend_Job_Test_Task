/**
 * get first n words
 * 
 * @param text
 * @param limit
 * @return {string}
 */
const getFirstWords = (text, limit) => {
  let wordsCounter = 0;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    if (wordsCounter === limit)
      break;

    result += text[i];

    if (text[i] === ' ') {
      wordsCounter++;
    }
  }

  return result;
};

/**
 * get first n words by regex
 * 
 * @param text
 * @param limit
 * @return {*}
 */
const getFirstWordsRegex = (text, limit) => {
  let regex = new RegExp(`^((?:\\S+\\s+){${limit - 1}}\\S+).*`);
  return text.match(regex);
};

module.exports = {
  getFirstWords,
  getFirstWordsRegex
};
