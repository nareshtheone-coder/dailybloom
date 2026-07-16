/**
 * DailyBloom - Comprehensive Games Library (EXPANDED)
 * 30+ Games organized by age groups with learning objectives
 * Includes matching, puzzle, racing, and activity games
 */

export const GAMES_LIBRARY = {
  // AGE 2-3: Sensory, Motor Skills & Early Alphabet (4 + 3 new games)
  age_2_3: [
    // Original sensory games
    {
      id: 'tap-game',
      name: 'Tap Game',
      emoji: '👆',
      color: 'from-pink-400 to-pink-500',
      description: 'Tap colorful emojis',
      learningGoal: 'Hand-eye coordination',
    },
    {
      id: 'color-match',
      name: 'Color Match',
      emoji: '🎨',
      color: 'from-blue-400 to-blue-500',
      description: 'Match same colors',
      learningGoal: 'Color recognition',
    },
    {
      id: 'shape-sort',
      name: 'Shape Sort',
      emoji: '⭐',
      color: 'from-yellow-400 to-yellow-500',
      description: 'Tap different shapes',
      learningGoal: 'Shape recognition',
    },
    {
      id: 'sound-explorer',
      name: 'Sound Explorer',
      emoji: '🎵',
      color: 'from-purple-400 to-purple-500',
      description: 'Explore musical sounds',
      learningGoal: 'Auditory awareness',
    },
    // NEW: Early alphabet games for 2-3 year olds
    {
      id: 'letter-painter',
      name: 'Letter Painter',
      emoji: '🎨',
      color: 'from-rose-400 to-pink-500',
      description: 'Paint letters A–Z in 6 stages',
      learningGoal: 'Letter recognition + color learning',
    },
    {
      id: 'letter-pop',
      name: 'Letter Pop',
      emoji: '💥',
      color: 'from-orange-400 to-red-500',
      description: 'Pop letter bubbles A–Z in 6 stages',
      learningGoal: 'Letter identification + hand-eye coordination',
    },
    {
      id: 'ais-for-puzzle',
      name: '🍎 A is for Apple',
      emoji: '🧩',
      color: 'from-red-400 to-pink-500',
      description: 'Match letters A–Z to objects (6 stages)',
      learningGoal: 'Letter-object association + problem solving',
    },
    // Fun zone — just for play!
    {
      id: 'catch-the-bubbles',
      name: 'Bubble Pop',
      emoji: '🫧',
      color: 'from-sky-400 to-cyan-500',
      description: 'Pop floating bubbles',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'peek-a-boo',
      name: 'Peek-a-Boo',
      emoji: '👀',
      color: 'from-indigo-400 to-purple-500',
      description: 'Find hidden friends',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'balloon-float',
      name: 'Balloon Pop',
      emoji: '🎈',
      color: 'from-rose-400 to-orange-400',
      description: 'Pop rising balloons',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'silly-faces',
      name: 'Silly Faces',
      emoji: '🤪',
      color: 'from-fuchsia-400 to-pink-500',
      description: 'Tap for silly surprises',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
  ],

  // AGE 3-4: Numbers, Patterns & Matching Games (4 + 3 new games)
  age_3_4: [
    // Original games
    {
      id: 'number-recognition',
      name: 'Number Parade',
      emoji: '🔢',
      color: 'from-orange-400 to-orange-500',
      description: 'Learn numbers 1-5',
      learningGoal: 'Number recognition',
    },
    {
      id: 'counting-game',
      name: 'Counting Stars',
      emoji: '⭐',
      color: 'from-indigo-400 to-indigo-500',
      description: 'Count items on screen',
      learningGoal: 'Counting skills',
    },
    {
      id: 'pattern-match',
      name: 'Pattern Play',
      emoji: '🎭',
      color: 'from-red-400 to-red-500',
      description: 'Match color patterns',
      learningGoal: 'Pattern recognition',
    },
    {
      id: 'animal-sounds',
      name: 'Animal Sounds',
      emoji: '🦁',
      color: 'from-amber-400 to-amber-500',
      description: 'Hear animal sounds',
      learningGoal: 'Sound association',
    },
    // NEW: Matching games
    {
      id: 'shape-matcher',
      name: 'Shape Matcher',
      emoji: '🔗',
      color: 'from-cyan-400 to-blue-500',
      description: 'Match pairs of shapes',
      learningGoal: 'Shape recognition + memory',
    },
    {
      id: 'color-memory',
      name: 'Color Memory',
      emoji: '🎯',
      color: 'from-purple-400 to-pink-500',
      description: 'Flip and match color pairs',
      learningGoal: 'Color recognition + memory skills',
    },
    {
      id: 'emoji-pairs',
      name: 'Emoji Pairs',
      emoji: '😊',
      color: 'from-yellow-400 to-orange-500',
      description: 'Match emoji cards',
      learningGoal: 'Visual discrimination + memory',
    },
    {
      id: 'whack-a-mole',
      name: 'Whack-a-Mole',
      emoji: '🔨',
      color: 'from-lime-500 to-green-600',
      description: 'Tap the silly moles',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'treasure-hunt',
      name: 'Treasure Hunt',
      emoji: '🗺️',
      color: 'from-amber-400 to-yellow-500',
      description: 'Find hidden treasure',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'dance-party',
      name: 'Dance Party',
      emoji: '💃',
      color: 'from-violet-500 to-pink-600',
      description: 'Tap to the beat',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'star-catcher',
      name: 'Star Catcher',
      emoji: '⭐',
      color: 'from-indigo-500 to-purple-600',
      description: 'Catch falling stars',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
  ],

  // AGE 4-5: Alphabet, Words, Racing & Puzzles (8 + 4 fun games)
  age_4_5: [
    // Original games
    {
      id: 'alphabet-sounds',
      name: 'ABC Quest',
      emoji: '🔤',
      color: 'from-cyan-400 to-cyan-500',
      description: 'Learn alphabet A–Z in 6 stages',
      learningGoal: 'Alphabet & phonetics',
    },
    {
      id: 'alphabet-objects',
      name: 'A for Apple',
      emoji: '🍎',
      color: 'from-red-400 to-red-500',
      description: 'Match alphabet with objects',
      learningGoal: 'Letter-object association',
    },
    {
      id: 'simple-words',
      name: 'Word Builders',
      emoji: '📚',
      color: 'from-green-400 to-green-500',
      description: 'Learn common words',
      learningGoal: 'Vocabulary building',
    },
    {
      id: 'rhyming-words',
      name: 'Rhyme Time',
      emoji: '🎵',
      color: 'from-fuchsia-400 to-fuchsia-500',
      description: 'Find rhyming words',
      learningGoal: 'Phonetic awareness',
    },
    {
      id: 'number-counting-10',
      name: 'Count to 10',
      emoji: '🔟',
      color: 'from-teal-400 to-teal-500',
      description: 'Count numbers 1-10',
      learningGoal: 'Advanced counting',
    },
    // NEW: Racing & puzzle games
    {
      id: 'letter-race',
      name: 'Letter Race',
      emoji: '🏃',
      color: 'from-rose-400 to-red-500',
      description: 'Race to collect letters A-M',
      learningGoal: 'Letter sequence + competitive play',
    },
    {
      id: 'catch-the-letters',
      name: 'Catch the Letters',
      emoji: '⚡',
      color: 'from-yellow-400 to-orange-500',
      description: 'Catch falling letter raindrops',
      learningGoal: 'Fast letter recognition + hand-eye coordination',
    },
    {
      id: 'word-puzzle',
      name: 'Word Puzzle',
      emoji: '🧩',
      color: 'from-green-400 to-teal-500',
      description: 'Drag letters to spell words',
      learningGoal: 'Spelling + letter arrangement',
    },
    {
      id: 'confetti-pop',
      name: 'Confetti Cannon',
      emoji: '🎊',
      color: 'from-pink-500 to-red-500',
      description: 'Blast confetti everywhere',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'simon-says',
      name: 'Simon Says',
      emoji: '🎮',
      color: 'from-cyan-500 to-blue-600',
      description: 'Repeat the color pattern',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'rocket-launch',
      name: 'Rocket Launch',
      emoji: '🚀',
      color: 'from-slate-600 to-indigo-800',
      description: 'Fuel up and blast off',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'pet-party',
      name: 'Pet Party',
      emoji: '🐾',
      color: 'from-teal-400 to-emerald-500',
      description: 'Feed cute pets',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
  ],

  // AGE 5-6: Advanced Reading, Numbers & Competition (9 + 4 fun games)
  age_5_6: [
    // Original games
    {
      id: 'full-alphabet',
      name: 'Full ABC',
      emoji: '🔤',
      color: 'from-sky-400 to-sky-500',
      description: 'Complete alphabet A-Z',
      learningGoal: 'Full alphabet mastery',
    },
    {
      id: 'spelling-words',
      name: 'Spell It',
      emoji: '✍️',
      color: 'from-lime-400 to-lime-500',
      description: '30 words in 3 stages, then 24 four-letter words',
      learningGoal: 'Spelling basics',
    },
    {
      id: 'number-sequence',
      name: 'Number Jump',
      emoji: '1️⃣',
      color: 'from-rose-400 to-rose-500',
      description: 'Sequence numbers 1-20',
      learningGoal: 'Number ordering',
    },
    {
      id: 'sight-words',
      name: 'Sight Words',
      emoji: '👀',
      color: 'from-violet-400 to-violet-500',
      description: 'Learn common sight words',
      learningGoal: 'Reading readiness',
    },
    {
      id: 'simple-sentences',
      name: 'Sentence Builder',
      emoji: '📖',
      color: 'from-emerald-400 to-emerald-500',
      description: 'Build simple sentences',
      learningGoal: 'Sentence structure',
    },
    // NEW: Advanced racing & puzzle games
    {
      id: 'number-race',
      name: 'Number Race',
      emoji: '🏎️',
      color: 'from-red-500 to-red-600',
      description: 'Race to sequence 1-20',
      learningGoal: 'Number sequencing + competitive play',
    },
    {
      id: 'story-puzzle',
      name: 'Story Puzzle',
      emoji: '📖',
      color: 'from-blue-400 to-purple-500',
      description: 'Arrange words into sentences',
      learningGoal: 'Grammar + sentence structure',
    },
    {
      id: 'sight-word-race',
      name: 'Sight Word Race',
      emoji: '🎪',
      color: 'from-pink-400 to-rose-500',
      description: 'Catch falling sight words',
      learningGoal: 'Sight word recognition + speed reading',
    },
    {
      id: 'pattern-rush',
      name: 'Pattern Rush',
      emoji: '⚡',
      color: 'from-purple-400 to-indigo-500',
      description: 'Complete patterns quickly',
      learningGoal: 'Pattern recognition + fast thinking',
    },
    {
      id: 'reaction-dash',
      name: 'Reaction Dash',
      emoji: '🚦',
      color: 'from-gray-600 to-gray-800',
      description: 'Tap when green',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'brick-breaker',
      name: 'Brick Breaker',
      emoji: '🧱',
      color: 'from-slate-500 to-indigo-700',
      description: 'Bounce and break bricks',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'speed-tap',
      name: 'Speed Tap',
      emoji: '⚡',
      color: 'from-yellow-500 to-orange-500',
      description: 'Tap as fast as you can',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
    {
      id: 'emoji-maze',
      name: 'Emoji Maze',
      emoji: '🗺️',
      color: 'from-emerald-500 to-teal-600',
      description: 'Guide bunny to treasure',
      learningGoal: 'Just for fun!',
      gameType: 'fun',
    },
  ],
}

// Alphabet Data with examples
export const ALPHABET_DATA = [
  { letter: 'A', words: ['Apple', 'Ant', 'Arrow', 'Airplane'], emoji: '🍎', sound: 'a' },
  { letter: 'B', words: ['Ball', 'Bat', 'Bee', 'Banana'], emoji: '🎾', sound: 'b' },
  { letter: 'C', words: ['Cat', 'Car', 'Cup', 'Cookie'], emoji: '🐱', sound: 'c' },
  { letter: 'D', words: ['Dog', 'Duck', 'Doll', 'Drum'], emoji: '🐕', sound: 'd' },
  { letter: 'E', words: ['Egg', 'Elephant', 'Eagle', 'Envelope'], emoji: '🥚', sound: 'e' },
  { letter: 'F', words: ['Fish', 'Fox', 'Flower', 'Frog'], emoji: '🐠', sound: 'f' },
  { letter: 'G', words: ['Grapes', 'Goat', 'Girl', 'Gift'], emoji: '🍇', sound: 'g' },
  { letter: 'H', words: ['House', 'Hat', 'Heart', 'Horse'], emoji: '🏠', sound: 'h' },
  { letter: 'I', words: ['Ice Cream', 'Ice', 'Igloo', 'Iris'], emoji: '🍦', sound: 'i' },
  { letter: 'J', words: ['Jellyfish', 'Jar', 'Jelly', 'Jacket'], emoji: '🪼', sound: 'j' },
  { letter: 'K', words: ['Kite', 'Key', 'King', 'Kangaroo'], emoji: '🪁', sound: 'k' },
  { letter: 'L', words: ['Lion', 'Lemon', 'Lamp', 'Leaf'], emoji: '🦁', sound: 'l' },
  { letter: 'M', words: ['Monkey', 'Moon', 'Milk', 'Mountain'], emoji: '🐵', sound: 'm' },
  { letter: 'N', words: ['Nest', 'Nose', 'Necklace', 'Nut'], emoji: '🪺', sound: 'n' },
  { letter: 'O', words: ['Orange', 'Octopus', 'Olive', 'Owl'], emoji: '🍊', sound: 'o' },
  { letter: 'P', words: ['Pig', 'Penguin', 'Pizza', 'Penguin'], emoji: '🐷', sound: 'p' },
  { letter: 'Q', words: ['Queen', 'Quilt', 'Quill', 'Quartet'], emoji: '👑', sound: 'q' },
  { letter: 'R', words: ['Rabbit', 'Rainbow', 'Rose', 'Ring'], emoji: '🐰', sound: 'r' },
  { letter: 'S', words: ['Sun', 'Star', 'Snake', 'Strawberry'], emoji: '☀️', sound: 's' },
  { letter: 'T', words: ['Tiger', 'Tree', 'Turtle', 'Tent'], emoji: '🐯', sound: 't' },
  { letter: 'U', words: ['Umbrella', 'Unicorn', 'Uniform', 'Urn'], emoji: '☂️', sound: 'u' },
  { letter: 'V', words: ['Van', 'Violin', 'Vase', 'Volcano'], emoji: '🚐', sound: 'v' },
  { letter: 'W', words: ['Wolf', 'Watch', 'Whale', 'Watermelon'], emoji: '🐺', sound: 'w' },
  { letter: 'X', words: ['Xylophone', 'X-ray'], emoji: '🎹', sound: 'x' },
  { letter: 'Y', words: ['Yak', 'Yarn', 'Yo-yo', 'Yellow'], emoji: '🦬', sound: 'y' },
  { letter: 'Z', words: ['Zebra', 'Zoo', 'Zipper', 'Zucchini'], emoji: '🦓', sound: 'z' },
]

// Number Data
export const NUMBER_DATA = [
  { number: 1, count: 1, emoji: '☝️', word: 'One' },
  { number: 2, count: 2, emoji: '✌️', word: 'Two' },
  { number: 3, count: 3, emoji: '🤟', word: 'Three' },
  { number: 4, count: 4, emoji: '🖐️', word: 'Four' },
  { number: 5, count: 5, emoji: '🖐️', word: 'Five' },
  { number: 6, count: 6, emoji: '👋', word: 'Six' },
  { number: 7, count: 7, emoji: '👋', word: 'Seven' },
  { number: 8, count: 8, emoji: '👋', word: 'Eight' },
  { number: 9, count: 9, emoji: '👋', word: 'Nine' },
  { number: 10, count: 10, emoji: '👏', word: 'Ten' },
]

// Simple 3-letter words for spelling
export const SIMPLE_WORDS = [
  { word: 'CAT', emoji: '🐱', image: 'cat' },
  { word: 'DOG', emoji: '🐕', image: 'dog' },
  { word: 'BAT', emoji: '🦇', image: 'bat' },
  { word: 'BUS', emoji: '🚌', image: 'bus' },
  { word: 'HAT', emoji: '🎩', image: 'hat' },
  { word: 'SUN', emoji: '☀️', image: 'sun' },
  { word: 'RUN', emoji: '🏃', image: 'run' },
  { word: 'SIT', emoji: '🪑', image: 'sit' },
  { word: 'PIG', emoji: '🐷', image: 'pig' },
  { word: 'BOX', emoji: '📦', image: 'box' },
  { word: 'CUP', emoji: '☕', image: 'cup' },
  { word: 'MAP', emoji: '🗺️', image: 'map' },
  { word: 'PEN', emoji: '🖊️', image: 'pen' },
  { word: 'RED', emoji: '🔴', image: 'red' },
  { word: 'BIG', emoji: '🐘', image: 'big' },
  { word: 'HOT', emoji: '🔥', image: 'hot' },
  { word: 'WET', emoji: '💧', image: 'wet' },
  { word: 'JAM', emoji: '🍓', image: 'jam' },
  { word: 'FUN', emoji: '🎉', image: 'fun' },
  { word: 'ZOO', emoji: '🦁', image: 'zoo' },
]

// Sight words for 5-6 year olds
export const SIGHT_WORDS = [
  'the', 'a', 'and', 'is', 'it', 'in', 'to', 'of', 'I', 'you',
  'we', 'he', 'she', 'that', 'this', 'with', 'for', 'as', 'at', 'be',
  'go', 'me', 'my', 'no', 'so', 'up', 'on', 'do', 'an', 'am',
  'or', 'by', 'if', 'all', 'are', 'was', 'has', 'had', 'did', 'get',
]

// Simple sentences for 5-6 year olds
export const SIMPLE_SENTENCES = [
  { sentence: 'The cat is black', words: ['The', 'cat', 'is', 'black'] },
  { sentence: 'I like the sun', words: ['I', 'like', 'the', 'sun'] },
  { sentence: 'The dog can run', words: ['The', 'dog', 'can', 'run'] },
  { sentence: 'I see a bird', words: ['I', 'see', 'a', 'bird'] },
  { sentence: 'We can play', words: ['We', 'can', 'play'] },
  { sentence: 'The sun is hot', words: ['The', 'sun', 'is', 'hot'] },
  { sentence: 'I have a cat', words: ['I', 'have', 'a', 'cat'] },
  { sentence: 'She likes dogs', words: ['She', 'likes', 'dogs'] },
  { sentence: 'It is fun', words: ['It', 'is', 'fun'] },
  { sentence: 'We go up', words: ['We', 'go', 'up'] },
]

// ==================== NEW GAME DATA ====================

// Letter Painter - Early alphabet for 2-3 year olds (A-E)
export const PAINTABLE_LETTERS = [
  { letter: 'A', emoji: '🍎', color: 'bg-red-400' },
  { letter: 'B', emoji: '🎈', color: 'bg-blue-400' },
  { letter: 'C', emoji: '🐱', color: 'bg-orange-400' },
  { letter: 'D', emoji: '🦆', color: 'bg-yellow-400' },
  { letter: 'E', emoji: '🥚', color: 'bg-purple-400' },
]

// Letter Pop - Bubble letters for 2-3 year olds
export const POP_LETTERS = ['A', 'B', 'C', 'D', 'E']

// Shape Matcher - Pairs for 3-4 year olds
export const SHAPE_PAIRS = [
  { shape: '⭐', color: 'bg-yellow-400' },
  { shape: '❤️', color: 'bg-red-400' },
  { shape: '🔵', color: 'bg-blue-400' },
  { shape: '🟩', color: 'bg-green-400' },
  { shape: '🟪', color: 'bg-purple-400' },
  { shape: '🟨', color: 'bg-yellow-300' },
]

// Color Memory - Color pairs for 3-4 year olds
export const MEMORY_COLORS = [
  { id: 1, color: 'bg-red-500', name: 'Red' },
  { id: 2, color: 'bg-blue-500', name: 'Blue' },
  { id: 3, color: 'bg-green-500', name: 'Green' },
  { id: 4, color: 'bg-yellow-500', name: 'Yellow' },
  { id: 5, color: 'bg-purple-500', name: 'Purple' },
  { id: 6, color: 'bg-pink-500', name: 'Pink' },
]

// Emoji Pairs - Emoji matching for 3-4 year olds
export const EMOJI_PAIRS = [
  { id: 1, emoji: '🍎', name: 'Apple' },
  { id: 2, emoji: '🐶', name: 'Dog' },
  { id: 3, emoji: '⭐', name: 'Star' },
  { id: 4, emoji: '🎈', name: 'Balloon' },
  { id: 5, emoji: '🌸', name: 'Flower' },
  { id: 6, emoji: '🎂', name: 'Cake' },
]

// Word Puzzle - Words to arrange for 4-5 year olds
export const PUZZLE_WORDS = [
  { word: 'CAT', letters: ['C', 'A', 'T'], emoji: '🐱', image: 'cat' },
  { word: 'DOG', letters: ['D', 'O', 'G'], emoji: '🐕', image: 'dog' },
  { word: 'BIRD', letters: ['B', 'I', 'R', 'D'], emoji: '🦅', image: 'bird' },
  { word: 'FISH', letters: ['F', 'I', 'S', 'H'], emoji: '🐠', image: 'fish' },
  { word: 'TREE', letters: ['T', 'R', 'E', 'E'], emoji: '🌳', image: 'tree' },
  { word: 'MOON', letters: ['M', 'O', 'O', 'N'], emoji: '🌙', image: 'moon' },
  { word: 'STAR', letters: ['S', 'T', 'A', 'R'], emoji: '⭐', image: 'star' },
  { word: 'BOOK', letters: ['B', 'O', 'O', 'K'], emoji: '📚', image: 'book' },
  { word: 'CAKE', letters: ['C', 'A', 'K', 'E'], emoji: '🎂', image: 'cake' },
  { word: 'DUCK', letters: ['D', 'U', 'C', 'K'], emoji: '🦆', image: 'duck' },
  { word: 'FROG', letters: ['F', 'R', 'O', 'G'], emoji: '🐸', image: 'frog' },
  { word: 'LION', letters: ['L', 'I', 'O', 'N'], emoji: '🦁', image: 'lion' },
  { word: 'BEAR', letters: ['B', 'E', 'A', 'R'], emoji: '🐻', image: 'bear' },
]

// Story Puzzle - Sentences to arrange for 5-6 year olds
export const STORY_PUZZLES = [
  {
    correct: ['The', 'cat', 'is', 'sleeping'],
    shuffled: ['sleeping', 'The', 'is', 'cat'],
    hint: 'The ___ ___ ___',
  },
  {
    correct: ['I', 'like', 'to', 'read'],
    shuffled: ['to', 'I', 'read', 'like'],
    hint: 'I ___ ___ ___',
  },
  {
    correct: ['The', 'dog', 'can', 'run'],
    shuffled: ['can', 'The', 'run', 'dog'],
    hint: 'The ___ ___ ___',
  },
  {
    correct: ['She', 'sees', 'a', 'bird'],
    shuffled: ['bird', 'a', 'sees', 'She'],
    hint: 'She ___ ___ ___',
  },
  {
    correct: ['We', 'go', 'to', 'school'],
    shuffled: ['school', 'We', 'to', 'go'],
    hint: 'We ___ ___ ___',
  },
  {
    correct: ['The', 'bird', 'can', 'fly'],
    shuffled: ['fly', 'The', 'bird', 'can'],
    hint: 'The ___ ___ ___',
  },
  {
    correct: ['I', 'see', 'the', 'moon'],
    shuffled: ['moon', 'I', 'the', 'see'],
    hint: 'I ___ ___ ___',
  },
  {
    correct: ['He', 'has', 'a', 'book'],
    shuffled: ['book', 'He', 'has', 'a'],
    hint: 'He ___ ___ ___',
  },
  {
    correct: ['They', 'like', 'to', 'play'],
    shuffled: ['play', 'They', 'to', 'like'],
    hint: 'They ___ ___ ___',
  },
  {
    correct: ['She', 'is', 'my', 'friend'],
    shuffled: ['friend', 'She', 'my', 'is'],
    hint: 'She ___ ___ ___',
  },
]

// Racing Data - Letter sequences for races
export const RACING_LETTERS_4_5 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
export const RACING_NUMBERS_5_6 = Array.from({ length: 20 }, (_, i) => i + 1)

// Falling objects for catch games
export const FALLING_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']

// Catch the Bubbles - Bubble types
export const BUBBLE_TYPES = {
  regular: { color: 'bg-blue-400', emoji: '🫧', score: 1 },
  gold: { color: 'bg-yellow-400', emoji: '✨', score: 2 },
  rainbow: { color: 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400', emoji: '🌈', score: 3 },
}

// Pattern Rush - Quick patterns to complete for 5-6 year olds
export const QUICK_PATTERNS = [
  { pattern: ['🔴', '🟢', '🔴'], missing: 2, name: 'Colors' },
  { pattern: ['⭐', '❤️', '⭐'], missing: 2, name: 'Shapes' },
  { pattern: ['🍎', '🍊', '🍎'], missing: 2, name: 'Fruits' },
  { pattern: ['🐶', '🐱', '🐶'], missing: 2, name: 'Animals' },
]

// Expanded Sight Words for racing game
export const RACING_SIGHT_WORDS = [
  'the', 'a', 'and', 'is', 'it', 'in', 'to', 'of', 'I', 'you',
  'we', 'he', 'she', 'that', 'this', 'with', 'for', 'as', 'at', 'be'
]

// Letter Pop bubbles for 2-3 year olds (with colors)
export const POP_BUBBLES = [
  { letter: 'A', color: 'bg-red-400', emoji: '🍎' },
  { letter: 'B', color: 'bg-blue-400', emoji: '🎈' },
  { letter: 'C', color: 'bg-cyan-400', emoji: '🐱' },
  { letter: 'D', color: 'bg-yellow-400', emoji: '🦆' },
  { letter: 'E', color: 'bg-purple-400', emoji: '🥚' },
]

// Early Puzzle - Letter and object matching for 2-3 year olds
export const EARLY_PUZZLES = [
  { letter: 'A', emoji: '🍎', name: 'Apple' },
  { letter: 'B', emoji: '🎈', name: 'Balloon' },
  { letter: 'C', emoji: '🐱', name: 'Cat' },
  { letter: 'D', emoji: '🦆', name: 'Duck' },
  { letter: 'E', emoji: '🥚', name: 'Egg' },
  { letter: 'F', emoji: '🐠', name: 'Fish' },
]

// Rhyme Time - Rhyming word pairs for 4-5 year olds
export const RHYMING_PAIRS = [
  { word: 'cat', rhyme: 'hat', emoji: '🐱' },
  { word: 'dog', rhyme: 'log', emoji: '🐕' },
  { word: 'sun', rhyme: 'fun', emoji: '☀️' },
  { word: 'bee', rhyme: 'tree', emoji: '🐝' },
  { word: 'fish', rhyme: 'dish', emoji: '🐠' },
  { word: 'star', rhyme: 'car', emoji: '⭐' },
  { word: 'cake', rhyme: 'snake', emoji: '🎂' },
  { word: 'bear', rhyme: 'chair', emoji: '🐻' },
  { word: 'duck', rhyme: 'truck', emoji: '🦆' },
  { word: 'moon', rhyme: 'spoon', emoji: '🌙' },
  { word: 'pig', rhyme: 'wig', emoji: '🐷' },
  { word: 'fox', rhyme: 'box', emoji: '🦊' },
]

// Animal Sounds - Animals with sounds for 3-4 year olds
export const ANIMAL_SOUNDS = [
  { name: 'Dog', emoji: '🐕', sound: 'Woof' },
  { name: 'Cat', emoji: '🐱', sound: 'Meow' },
  { name: 'Cow', emoji: '🐄', sound: 'Moo' },
  { name: 'Duck', emoji: '🦆', sound: 'Quack' },
  { name: 'Pig', emoji: '🐷', sound: 'Oink' },
  { name: 'Sheep', emoji: '🐑', sound: 'Baa' },
  { name: 'Lion', emoji: '🦁', sound: 'Roar' },
  { name: 'Frog', emoji: '🐸', sound: 'Ribbit' },
]

// Pattern Match - Color and shape sequences with missing index for 3-4 year olds
export const PATTERN_SEQUENCES = [
  { pattern: ['🔴', '🔵', '🔴', '🔵'], missing: 2, name: 'Colors' },
  { pattern: ['🟡', '🟢', '🟡', '🟢'], missing: 2, name: 'Colors' },
  { pattern: ['⭐', '❤️', '⭐', '❤️'], missing: 2, name: 'Shapes' },
  { pattern: ['🔺', '🔵', '🔺', '🔵'], missing: 2, name: 'Shapes' },
  { pattern: ['🔴', '🔴', '🟢', '🟢'], missing: 2, name: 'Colors' },
  { pattern: ['🟦', '🟨', '🟦', '🟨'], missing: 2, name: 'Colors' },
  { pattern: ['🟣', '🟠', '🟣', '🟠'], missing: 2, name: 'Colors' },
  { pattern: ['⬛', '⬜', '⬛', '⬜'], missing: 2, name: 'Shapes' },
]
