/**
 * Staged content tiers — designed for months of play, not weeks.
 * Ages 2–4 get full A–Z across multiple stages (5–6 letters per stage).
 */
import { ALPHABET_DATA } from './gamesLibrary'

const LETTER_COLORS = [
  'bg-red-400',
  'bg-blue-400',
  'bg-orange-400',
  'bg-yellow-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-cyan-400',
  'bg-green-400',
  'bg-indigo-400',
  'bg-rose-400',
]

/** Split A–Z into 6 stages (~4–5 letters) for ages 2–4 */
export const LETTER_STAGES = (() => {
  const chunkSize = 5
  const stages: {
    id: number
    label: string
    letters: string
    items: { letter: string; emoji: string; color: string; words: string[] }[]
  }[] = []

  for (let i = 0; i < ALPHABET_DATA.length; i += chunkSize) {
    const slice = ALPHABET_DATA.slice(i, i + chunkSize)
    const letters = `${slice[0].letter}–${slice[slice.length - 1].letter}`
    stages.push({
      id: stages.length,
      label: `Letters ${letters}`,
      letters,
      items: slice.map((item, idx) => ({
        letter: item.letter,
        emoji: item.emoji,
        color: LETTER_COLORS[(i + idx) % LETTER_COLORS.length],
        words: item.words,
      })),
    })
  }
  return stages
})()

export const PAINTABLE_BY_STAGE = LETTER_STAGES.map((s) =>
  s.items.map(({ letter, emoji, color }) => ({ letter, emoji, color })),
)

export const POP_BY_STAGE = LETTER_STAGES.map((s) =>
  s.items.map(({ letter, emoji, color }) => ({ letter, emoji, color })),
)

export const PUZZLE_BY_STAGE = LETTER_STAGES.map((s) =>
  s.items.map(({ letter, emoji, words }) => ({
    letter,
    emoji,
    name: words[0],
  })),
)

/** Number stages: progressive difficulty for ages 2–4 and up */
export const NUMBER_STAGES = [
  { id: 0, label: 'Numbers 1–5', min: 1, max: 5, rounds: 8 },
  { id: 1, label: 'Numbers 1–10', min: 1, max: 10, rounds: 10 },
  { id: 2, label: 'Numbers 1–15', min: 1, max: 15, rounds: 12 },
  { id: 3, label: 'Numbers 1–20', min: 1, max: 20, rounds: 15 },
]

export const NUMBER_WORDS: Record<number, string> = {
  1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
  6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten',
  11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen', 15: 'Fifteen',
  16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen', 20: 'Twenty',
}

/** 3-letter words — 30 words in 3 stages */
export const WORDS_3_STAGE_1 = [
  { word: 'CAT', emoji: '🐱' }, { word: 'DOG', emoji: '🐕' }, { word: 'BAT', emoji: '🦇' },
  { word: 'BUS', emoji: '🚌' }, { word: 'HAT', emoji: '🎩' }, { word: 'SUN', emoji: '☀️' },
  { word: 'RUN', emoji: '🏃' }, { word: 'SIT', emoji: '🪑' }, { word: 'PIG', emoji: '🐷' },
  { word: 'BOX', emoji: '📦' },
]

export const WORDS_3_STAGE_2 = [
  { word: 'CUP', emoji: '☕' }, { word: 'MAP', emoji: '🗺️' }, { word: 'PEN', emoji: '🖊️' },
  { word: 'RED', emoji: '🔴' }, { word: 'BIG', emoji: '🐘' }, { word: 'HOT', emoji: '🔥' },
  { word: 'WET', emoji: '💧' }, { word: 'JAM', emoji: '🍓' }, { word: 'FUN', emoji: '🎉' },
  { word: 'ZOO', emoji: '🦁' },
]

export const WORDS_3_STAGE_3 = [
  { word: 'BED', emoji: '🛏️' }, { word: 'EGG', emoji: '🥚' }, { word: 'FOX', emoji: '🦊' },
  { word: 'GEM', emoji: '💎' }, { word: 'HEN', emoji: '🐔' }, { word: 'ICE', emoji: '🧊' },
  { word: 'JET', emoji: '✈️' }, { word: 'KEY', emoji: '🔑' }, { word: 'LOG', emoji: '🪵' },
  { word: 'MUD', emoji: '🟤' },
]

/** 4-letter words — 3 stages */
export const WORDS_4_STAGE_1 = [
  { word: 'BIRD', emoji: '🦅', letters: ['B', 'I', 'R', 'D'] },
  { word: 'FISH', emoji: '🐠', letters: ['F', 'I', 'S', 'H'] },
  { word: 'TREE', emoji: '🌳', letters: ['T', 'R', 'E', 'E'] },
  { word: 'MOON', emoji: '🌙', letters: ['M', 'O', 'O', 'N'] },
  { word: 'STAR', emoji: '⭐', letters: ['S', 'T', 'A', 'R'] },
  { word: 'BOOK', emoji: '📚', letters: ['B', 'O', 'O', 'K'] },
  { word: 'CAKE', emoji: '🎂', letters: ['C', 'A', 'K', 'E'] },
  { word: 'DUCK', emoji: '🦆', letters: ['D', 'U', 'C', 'K'] },
]

export const WORDS_4_STAGE_2 = [
  { word: 'FROG', emoji: '🐸', letters: ['F', 'R', 'O', 'G'] },
  { word: 'LION', emoji: '🦁', letters: ['L', 'I', 'O', 'N'] },
  { word: 'BEAR', emoji: '🐻', letters: ['B', 'E', 'A', 'R'] },
  { word: 'FIRE', emoji: '🔥', letters: ['F', 'I', 'R', 'E'] },
  { word: 'RAIN', emoji: '🌧️', letters: ['R', 'A', 'I', 'N'] },
  { word: 'SNOW', emoji: '❄️', letters: ['S', 'N', 'O', 'W'] },
  { word: 'BLUE', emoji: '🔵', letters: ['B', 'L', 'U', 'E'] },
  { word: 'PINK', emoji: '🩷', letters: ['P', 'I', 'N', 'K'] },
]

export const WORDS_4_STAGE_3 = [
  { word: 'PLAY', emoji: '🎮', letters: ['P', 'L', 'A', 'Y'] },
  { word: 'JUMP', emoji: '🦘', letters: ['J', 'U', 'M', 'P'] },
  { word: 'BALL', emoji: '⚽', letters: ['B', 'A', 'L', 'L'] },
  { word: 'FARM', emoji: '🚜', letters: ['F', 'A', 'R', 'M'] },
  { word: 'SHIP', emoji: '🚢', letters: ['S', 'H', 'I', 'P'] },
  { word: 'CAVE', emoji: '🕳️', letters: ['C', 'A', 'V', 'E'] },
  { word: 'GIFT', emoji: '🎁', letters: ['G', 'I', 'F', 'T'] },
  { word: 'HOME', emoji: '🏠', letters: ['H', 'O', 'M', 'E'] },
]

export const WORD_STAGES_3 = [WORDS_3_STAGE_1, WORDS_3_STAGE_2, WORDS_3_STAGE_3]
export const WORD_STAGES_4 = [WORDS_4_STAGE_1, WORDS_4_STAGE_2, WORDS_4_STAGE_3]
export const PUZZLE_WORD_STAGES = WORD_STAGES_4

export const SIGHT_WORD_STAGES = [
  ['the', 'a', 'and', 'is', 'it', 'in', 'to', 'of', 'I', 'you'],
  ['we', 'he', 'she', 'that', 'this', 'with', 'for', 'as', 'at', 'be'],
  ['go', 'me', 'my', 'no', 'so', 'up', 'on', 'do', 'an', 'am'],
  ['or', 'by', 'if', 'all', 'are', 'was', 'has', 'had', 'did', 'get'],
  ['can', 'will', 'yes', 'not', 'but', 'out', 'now', 'who', 'how', 'our'],
  ['they', 'them', 'then', 'than', 'when', 'what', 'your', 'from', 'come', 'some'],
]

export const RHYME_STAGES = [
  [
    { word: 'cat', rhyme: 'hat', emoji: '🐱' },
    { word: 'dog', rhyme: 'log', emoji: '🐕' },
    { word: 'sun', rhyme: 'fun', emoji: '☀️' },
    { word: 'bee', rhyme: 'tree', emoji: '🐝' },
  ],
  [
    { word: 'fish', rhyme: 'dish', emoji: '🐠' },
    { word: 'star', rhyme: 'car', emoji: '⭐' },
    { word: 'cake', rhyme: 'snake', emoji: '🎂' },
    { word: 'bear', rhyme: 'chair', emoji: '🐻' },
  ],
  [
    { word: 'duck', rhyme: 'truck', emoji: '🦆' },
    { word: 'moon', rhyme: 'spoon', emoji: '🌙' },
    { word: 'pig', rhyme: 'wig', emoji: '🐷' },
    { word: 'fox', rhyme: 'box', emoji: '🦊' },
  ],
  [
    { word: 'ring', rhyme: 'sing', emoji: '💍' },
    { word: 'boat', rhyme: 'coat', emoji: '⛵' },
    { word: 'night', rhyme: 'light', emoji: '🌙' },
    { word: 'rain', rhyme: 'train', emoji: '🌧️' },
  ],
]

export const SENTENCE_STAGES = [
  [
    { sentence: 'The cat is black', words: ['The', 'cat', 'is', 'black'] },
    { sentence: 'I like the sun', words: ['I', 'like', 'the', 'sun'] },
    { sentence: 'The dog can run', words: ['The', 'dog', 'can', 'run'] },
    { sentence: 'I see a bird', words: ['I', 'see', 'a', 'bird'] },
  ],
  [
    { sentence: 'We can play', words: ['We', 'can', 'play'] },
    { sentence: 'The sun is hot', words: ['The', 'sun', 'is', 'hot'] },
    { sentence: 'I have a cat', words: ['I', 'have', 'a', 'cat'] },
    { sentence: 'She likes dogs', words: ['She', 'likes', 'dogs'] },
  ],
  [
    { sentence: 'It is fun', words: ['It', 'is', 'fun'] },
    { sentence: 'We go up', words: ['We', 'go', 'up'] },
    { sentence: 'He has a ball', words: ['He', 'has', 'a', 'ball'] },
    { sentence: 'They like cake', words: ['They', 'like', 'cake'] },
  ],
  [
    { sentence: 'I can read', words: ['I', 'can', 'read'] },
    { sentence: 'The bird can fly', words: ['The', 'bird', 'can', 'fly'] },
    { sentence: 'We see the moon', words: ['We', 'see', 'the', 'moon'] },
    { sentence: 'She has a book', words: ['She', 'has', 'a', 'book'] },
  ],
]

export const STORY_STAGES = [
  [
    { correct: ['The', 'cat', 'is', 'sleeping'], shuffled: ['sleeping', 'The', 'is', 'cat'], hint: 'The ___ ___ ___' },
    { correct: ['I', 'like', 'to', 'read'], shuffled: ['to', 'I', 'read', 'like'], hint: 'I ___ ___ ___' },
    { correct: ['The', 'dog', 'can', 'run'], shuffled: ['can', 'The', 'run', 'dog'], hint: 'The ___ ___ ___' },
    { correct: ['She', 'sees', 'a', 'bird'], shuffled: ['bird', 'a', 'sees', 'She'], hint: 'She ___ ___ ___' },
  ],
  [
    { correct: ['We', 'go', 'to', 'school'], shuffled: ['school', 'We', 'to', 'go'], hint: 'We ___ ___ ___' },
    { correct: ['The', 'bird', 'can', 'fly'], shuffled: ['fly', 'The', 'bird', 'can'], hint: 'The ___ ___ ___' },
    { correct: ['I', 'see', 'the', 'moon'], shuffled: ['moon', 'I', 'the', 'see'], hint: 'I ___ ___ ___' },
    { correct: ['He', 'has', 'a', 'book'], shuffled: ['book', 'He', 'has', 'a'], hint: 'He ___ ___ ___' },
  ],
  [
    { correct: ['They', 'like', 'to', 'play'], shuffled: ['play', 'They', 'to', 'like'], hint: 'They ___ ___ ___' },
    { correct: ['She', 'is', 'my', 'friend'], shuffled: ['friend', 'She', 'my', 'is'], hint: 'She ___ ___ ___' },
    { correct: ['We', 'can', 'count', 'stars'], shuffled: ['stars', 'We', 'count', 'can'], hint: 'We ___ ___ ___' },
    { correct: ['The', 'sun', 'is', 'bright'], shuffled: ['bright', 'The', 'is', 'sun'], hint: 'The ___ ___ ___' },
  ],
  [
    { correct: ['I', 'love', 'my', 'family'], shuffled: ['family', 'I', 'my', 'love'], hint: 'I ___ ___ ___' },
    { correct: ['He', 'can', 'ride', 'bikes'], shuffled: ['bikes', 'He', 'ride', 'can'], hint: 'He ___ ___ ___' },
    { correct: ['They', 'play', 'in', 'parks'], shuffled: ['parks', 'They', 'in', 'play'], hint: 'They ___ ___ ___' },
    { correct: ['We', 'read', 'every', 'day'], shuffled: ['day', 'We', 'every', 'read'], hint: 'We ___ ___ ___' },
  ],
]

export const PATTERN_STAGES = [
  [
    { pattern: ['🔴', '🟢', '🔴'], missing: 2, name: 'Colors' },
    { pattern: ['⭐', '❤️', '⭐'], missing: 2, name: 'Shapes' },
    { pattern: ['🍎', '🍊', '🍎'], missing: 2, name: 'Fruits' },
    { pattern: ['🐶', '🐱', '🐶'], missing: 2, name: 'Animals' },
  ],
  [
    { pattern: ['🔴', '🔵', '🔴', '🔵'], missing: 2, name: 'Colors' },
    { pattern: ['🟡', '🟢', '🟡', '🟢'], missing: 2, name: 'Colors' },
    { pattern: ['⭐', '❤️', '⭐', '❤️'], missing: 2, name: 'Shapes' },
    { pattern: ['🔺', '🔵', '🔺', '🔵'], missing: 2, name: 'Shapes' },
  ],
  [
    { pattern: ['🔴', '🔴', '🟢', '🟢'], missing: 2, name: 'Colors' },
    { pattern: ['🟦', '🟨', '🟦', '🟨'], missing: 2, name: 'Colors' },
    { pattern: ['🟣', '🟠', '🟣', '🟠'], missing: 2, name: 'Colors' },
    { pattern: ['⬛', '⬜', '⬛', '⬜'], missing: 2, name: 'Shapes' },
  ],
  [
    { pattern: ['🌸', '🌺', '🌸', '🌺'], missing: 2, name: 'Flowers' },
    { pattern: ['🚗', '🚌', '🚗', '🚌'], missing: 2, name: 'Vehicles' },
    { pattern: ['🍌', '🍇', '🍌', '🍇'], missing: 2, name: 'Fruits' },
    { pattern: ['🐸', '🐢', '🐸', '🐢'], missing: 2, name: 'Animals' },
  ],
]

export const ANIMAL_STAGES = [
  [
    { name: 'Dog', emoji: '🐕', sound: 'Woof' },
    { name: 'Cat', emoji: '🐱', sound: 'Meow' },
    { name: 'Cow', emoji: '🐄', sound: 'Moo' },
    { name: 'Duck', emoji: '🦆', sound: 'Quack' },
  ],
  [
    { name: 'Pig', emoji: '🐷', sound: 'Oink' },
    { name: 'Sheep', emoji: '🐑', sound: 'Baa' },
    { name: 'Lion', emoji: '🦁', sound: 'Roar' },
    { name: 'Frog', emoji: '🐸', sound: 'Ribbit' },
  ],
  [
    { name: 'Horse', emoji: '🐴', sound: 'Neigh' },
    { name: 'Bird', emoji: '🐦', sound: 'Tweet' },
    { name: 'Bee', emoji: '🐝', sound: 'Buzz' },
    { name: 'Owl', emoji: '🦉', sound: 'Hoot' },
  ],
]

export const LETTER_RACE_STAGES = LETTER_STAGES.map((s) => s.items.map((i) => i.letter))

export const CATCH_TARGETS_BY_STAGE = [10, 12, 15, 18, 20, 22]

export const SIGHT_RACE_STAGES = SIGHT_WORD_STAGES
