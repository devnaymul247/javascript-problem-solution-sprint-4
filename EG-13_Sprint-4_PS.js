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
