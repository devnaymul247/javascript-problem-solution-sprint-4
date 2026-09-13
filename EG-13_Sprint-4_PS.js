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


var findTheDifference = function(s, t) {
    let sum = 0;

    // add up character codes of every letter in t
    for (let i = 0; i < t.length; i++) {
        sum += t.charCodeAt(i);
    }

    // subtract character codes of every letter in s
    for (let i = 0; i < s.length; i++) {
        sum -= s.charCodeAt(i);
    }

    // whatever's left over is the extra character's code
    return String.fromCharCode(sum);
};

console.log(findTheDifference("abcd", "abcde")); // "e"

///////// // 04. Reverse Linked List ////////////
var reverseList = function(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        let nextNode = curr.next; // remember what's next before we overwrite it
        curr.next = prev;         // point this node backwards
        prev = curr;               // move prev forward
        curr = nextNode;            // move curr forward
    }

    return prev; // prev is now the new head
};

console.log(listToArray(reverseList(arrayToList([1, 2, 3, 4, 5])))); // [5, 4, 3, 2, 1]

/// 05. Middle of the Linked List
var middleNode = function(head) {
    let slow = head;
    let fast = head;

    // slow moves 1 step, fast moves 2 steps
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};

console.log(listToArray(middleNode(arrayToList([1, 2, 3, 4, 5])))); // [3, 4, 5]

/**
 * 06. Product of Array Except Self
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // pass 1: fill result[i] with product of everything BEFORE index i
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    // pass 2: multiply in the product of everything AFTER index i
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
};

console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]

/**
 * 07. Remove Nth Node From End of List
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0, head); // dummy node makes removing the real head easier
    let fast = dummy;
    let slow = dummy;

    // move fast n steps ahead first
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    // move both until fast hits the last node
    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // slow is now right before the node we want to remove
    slow.next = slow.next.next;

    return dummy.next;
};

console.log(listToArray(removeNthFromEnd(arrayToList([1, 2, 3, 4, 5]), 2))); // [1, 2, 3, 5]

/**
 * 08. Find First and Last Position of Element in Sorted Array
 */
var searchRange = function(nums, target) {
    function findBound(isFirst) {
        let lo = 0;
        let hi = nums.length - 1;
        let result = -1;

        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);

            if (nums[mid] === target) {
                result = mid; // found one match, keep searching for a better one
                if (isFirst) {
                    hi = mid - 1; // keep looking to the LEFT for an earlier match
                } else {
                    lo = mid + 1; // keep looking to the RIGHT for a later match
                }
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return result;
    }

    return [findBound(true), findBound(false)];
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]

/**
 * 09. Permutation in String
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;

    const need = new Array(26).fill(0);   // letter counts we need (from s1)
    const window = new Array(26).fill(0); // letter counts in our current window of s2
    const a = "a".charCodeAt(0);

    // fill both counts using the first window (same length as s1)
    for (let i = 0; i < s1.length; i++) {
        need[s1.charCodeAt(i) - a]++;
        window[s2.charCodeAt(i) - a]++;
    }

    if (need.join() === window.join()) return true;

    // slide the window one letter at a time across the rest of s2
    for (let i = s1.length; i < s2.length; i++) {
        window[s2.charCodeAt(i) - a]++;               // add new letter entering the window
        window[s2.charCodeAt(i - s1.length) - a]--;    // remove old letter leaving the window
        if (need.join() === window.join()) return true;
    }

    return false;
};

console.log(checkInclusion("ab", "eidbaooo")); // true

/**
 * 10. Find All Anagrams in a String
 */
var findAnagrams = function(s, p) {
    const result = [];
    if (p.length > s.length) return result;

    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);
    const a = "a".charCodeAt(0);

    for (let i = 0; i < p.length; i++) {
        need[p.charCodeAt(i) - a]++;
        window[s.charCodeAt(i) - a]++;
    }

    if (need.join() === window.join()) result.push(0);

    for (let i = p.length; i < s.length; i++) {
        window[s.charCodeAt(i) - a]++;
        window[s.charCodeAt(i - p.length) - a]--;
        if (need.join() === window.join()) {
            result.push(i - p.length + 1); // start index of this window
        }
    }

    return result;
};

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]