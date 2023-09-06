// Hey how are you doing

// 1. Remove leading words
// "test test hey how are you doing"

// 2. A user might say the sentence, and some words might not be picked up
// "hey are you doing"

// 3. the skipped word might occur before, and should not be picked up
// "you are doing" => [null, null, null, null, "you", "doing"]

//4. Users may say the same word multiple times, if it is not picked up
// "hey hoe hoe hee how are you doing"

/**
 * Takes in a reference string and an input string, and returns an array the same size of the reference string, with the words that were matched in the input string.
 * Each element in returned array is either a string or null. based on whether it was matched or not
 */
export const matchReferenceStringWithInput = (
  reference: string,
  input: string,
) => {
  const referenceArray = convertStringToArray(reference).map(word =>
    sanitizeWord(word),
  );
  const inputArray = convertStringToArray(input).map(word =>
    sanitizeWord(word),
  );

  let referenceIntersectionWords = new Array(referenceArray.length).fill(false);
  let lastMatchedInputWordIndex = 0;

  for (let i = 0; i < inputArray.length; i++) {
    let inputWord = inputArray[i];
    for (let j = lastMatchedInputWordIndex; j < referenceArray.length; j++) {
      let referenceWord = referenceArray[j];

      if (inputWord === referenceWord) {
        referenceIntersectionWords[j] = true;
        lastMatchedInputWordIndex = j;
      }
    }
  }

  return referenceIntersectionWords;
};

export const sanitizeWord = (word: string) => {
  return word.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
};

export const convertStringToArray = (input: string) => {
  return input.split(/\s+/);
};
