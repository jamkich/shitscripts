const wl = Bun.file("wordlist.txt");

/* Pseudocode
[x] Load the word list (dictionary) 
[x]  Input the words to unscramble
For each word:
[x]  Find every permutation of letters in that word (permutation)
For each permutation:
[x] Add this permutation to the solution list if it exists in the dictionary
[x]  Print the solutions that were found.
*/

async function unscrambler(words: string) {
  // parse input
  const parsed = words.split(" ");
  const wordlist = await wl.text();
  const listArray = wordlist.split("\r\n");
  let ar: string[] = [];

  function permutation(word: string, step = 0): string {
    if (step === word.length) {
      const findings = listArray.find((dictWord) => dictWord == word);
      if (findings !== undefined) return findings;
    }
    for (let j = step; j < word.length; j++) {
      let copy = [...word];
      let temp = copy[step];
      copy[step] = copy[j];
      copy[j] = temp;

      const result = permutation(copy.join(""), step + 1);
      if (result) return result;
    }
    return "";
  }
  for (let i = 0; i < parsed.length; i++) {
    const result = permutation(parsed[i]);
    ar.push(result);
  }
  return ar.join(",");
}

const testInput =
  "snkiyt 5nyabolb gbdier elksye naitsto innsas apamnhc tpeaanr nhziet lkiame";

console.log(await unscrambler(testInput));
