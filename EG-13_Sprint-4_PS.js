// 01. Isomorphic Strings
// Write a validation function that determines whether two strings are isomorphic. Each character in the first string must map to exactly one character in the second string, while preserving the order of characters.

var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;

    const mapS = {};
    const mapT = {};

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];

        if (!mapS[charS] && !mapT[charT]) {
            mapS[charS] = charT;
            mapT[charT] = charS;
        } else if (mapS[charS] !== charT || mapT[charT] !== charS) {
            return false;
        }
    }

    return true;
};

console.log(isIsomorphic("egg", "add")); // true
console.log(isIsomorphic("foo", "bar")); // false
console.log(isIsomorphic("paper", "title")); // true
console.log(isIsomorphic("ab", "aa")); // false
console.log(isIsomorphic("aab", "xxy")); // true

// 02. Word Pattern
// Write a validation function that determines whether a string follows a given word pattern. Each pattern character must map to exactly one word, and each word must map to exactly one pattern character.

var wordPattern = function (pattern, s) {
  const words = s.split(" ");

  // Pattern characters and words must have the same length
  if (pattern.length !== words.length) {
    return false;
  }

  const patternMap = {};
  const wordMap = {};

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    // If neither has a mapping, create the mapping
    if (!patternMap[char] && !wordMap[word]) {
      patternMap[char] = word;
      wordMap[word] = char;
    }

    // If an existing mapping doesn't match, return false
    else if (
      patternMap[char] !== word ||
      wordMap[word] !== char
    ) {
      return false;
    }
  }

  return true;
};

console.log(wordPattern("abba", "dog cat cat dog")); // true
console.log(wordPattern("abba", "dog cat cat fish")); // false
console.log(wordPattern("aaaa", "dog cat cat dog")); // false
