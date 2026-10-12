/**
 * Kenyan CBC Grade 3-6 Kid-Friendly Vocabulary Dictionary.
 * Provides tap-on-word explanations for tricky terms across Mathematics,
 * Science & Technology, Agriculture, and English.
 */

export interface VocabularyTerm {
  word: string;
  definition: string;
  example?: string;
  category: 'MATH' | 'SCIENCE' | 'AGRICULTURE' | 'ENGLISH' | 'GENERAL';
}

export const CBE_VOCABULARY: Record<string, VocabularyTerm> = {
  // --- Mathematics ---
  commutative: {
    word: 'Commutative Property',
    definition: 'Changing the order of the numbers does not change the answer.',
    example: '4 × 7 = 28 and 7 × 4 = 28. Both give the exact same answer!',
    category: 'MATH'
  },
  associative: {
    word: 'Associative Property',
    definition: 'Grouping numbers differently when adding or multiplying gives the same result.',
    example: '(2 + 3) + 4 = 2 + (3 + 4) = 9.',
    category: 'MATH'
  },
  perimeter: {
    word: 'Perimeter',
    definition: 'The total distance all the way around the outside edge of a shape.',
    example: 'If a garden has 4 sides each 5 metres long, its perimeter is 5 + 5 + 5 + 5 = 20 metres.',
    category: 'MATH'
  },
  area: {
    word: 'Area',
    definition: 'The amount of flat surface inside a shape, measured in square units.',
    example: 'A shamba rectangle 4m long and 3m wide has an area of 12 square metres (m²).',
    category: 'MATH'
  },
  fraction: {
    word: 'Fraction',
    definition: 'An equal part of a whole thing or group.',
    example: 'If you cut a chapati into 4 equal slices and eat 1, you ate 1/4 (one quarter).',
    category: 'MATH'
  },
  numerator: {
    word: 'Numerator',
    definition: 'The top number in a fraction that shows how many equal parts you have.',
    example: 'In 3/4, the numerator is 3.',
    category: 'MATH'
  },
  denominator: {
    word: 'Denominator',
    definition: 'The bottom number in a fraction that shows total equal parts in the whole.',
    example: 'In 3/4, the denominator is 4.',
    category: 'MATH'
  },
  sum: {
    word: 'Sum',
    definition: 'The total amount you get when you add two or more numbers together.',
    example: 'The sum of 15 and 25 is 40.',
    category: 'MATH'
  },
  difference: {
    word: 'Difference',
    definition: 'The result when you subtract one number from another.',
    example: 'The difference between 50 and 20 is 30.',
    category: 'MATH'
  },
  product: {
    word: 'Product',
    definition: 'The result when two or more numbers are multiplied together.',
    example: 'The product of 6 and 7 is 42.',
    category: 'MATH'
  },
  quotient: {
    word: 'Quotient',
    definition: 'The answer you get after dividing one number by another.',
    example: '24 ÷ 6 = 4. Here, 4 is the quotient.',
    category: 'MATH'
  },
  'place value': {
    word: 'Place Value',
    definition: 'The value represented by the position of a digit in a number.',
    example: 'In 452, 4 is hundreds, 5 is tens, and 2 is ones.',
    category: 'MATH'
  },
  ascending: {
    word: 'Ascending Order',
    definition: 'Arranging numbers or quantities from smallest to largest.',
    example: '3, 7, 12, 25 are arranged in ascending order.',
    category: 'MATH'
  },
  descending: {
    word: 'Descending Order',
    definition: 'Arranging numbers or quantities from largest to smallest.',
    example: '50, 40, 30, 20 are in descending order.',
    category: 'MATH'
  },
  estimate: {
    word: 'Estimate',
    definition: 'A sensible, close guess made by rounding numbers.',
    example: 'Rounding 49 to 50 to calculate shopping costs quickly in your head.',
    category: 'MATH'
  },
  tally: {
    word: 'Tally Marks',
    definition: 'A quick way of counting objects in groups of five using vertical strokes.',
    example: '|||| with a diagonal line across equals 5 items.',
    category: 'MATH'
  },

  // --- Science & Environment ---
  germination: {
    word: 'Germination',
    definition: 'The process where a seed absorbs water, sprouts, and begins growing into a young plant.',
    example: 'Bean seeds need water, air (oxygen), and warmth to germinate.',
    category: 'SCIENCE'
  },
  photosynthesis: {
    word: 'Photosynthesis',
    definition: 'How green plants use sunlight, water, and air to produce their own food and release oxygen.',
    example: 'Leaves are like solar kitchens for the plant.',
    category: 'SCIENCE'
  },
  pollination: {
    word: 'Pollination',
    definition: 'The transfer of pollen grains from one flower to another by bees, wind, or butterflies.',
    example: 'Honeybees visit pumpkin flowers and help fruits to grow through pollination.',
    category: 'SCIENCE'
  },
  herbivore: {
    word: 'Herbivore',
    definition: 'An animal that eats only plants, grass, leaves, and fruits.',
    example: 'Zebras, cows, giraffes, and gazelles are herbivores.',
    category: 'SCIENCE'
  },
  carnivore: {
    word: 'Carnivore',
    definition: 'An animal that feeds primarily on meat and other animals.',
    example: 'Lions, cheetahs, and eagles are carnivores.',
    category: 'SCIENCE'
  },
  omnivore: {
    word: 'Omnivore',
    definition: 'A living creature that eats both plants and animals.',
    example: 'Baboons, pigs, and humans are omnivores.',
    category: 'SCIENCE'
  },
  habitat: {
    word: 'Habitat',
    definition: 'The natural home or environment where a plant or animal lives, feeds, and finds shelter.',
    example: 'Lake Nakuru is the habitat of pink flamingos and waterbucks.',
    category: 'SCIENCE'
  },
  opaque: {
    word: 'Opaque',
    definition: 'A material that does not let any light pass through, forming a clear shadow.',
    example: 'Wood, stone, and your body are opaque.',
    category: 'SCIENCE'
  },
  translucent: {
    word: 'Translucent',
    definition: 'A material that lets some light pass through, but you cannot see clearly through it.',
    example: 'Frosted bathroom glass and tracing paper are translucent.',
    category: 'SCIENCE'
  },
  transparent: {
    word: 'Transparent',
    definition: 'A clear material that allows almost all light to pass straight through.',
    example: 'Clean window glass and clear tap water are transparent.',
    category: 'SCIENCE'
  },
  evaporation: {
    word: 'Evaporation',
    definition: 'When liquid water warms up in the sun and turns into invisible water vapor in the air.',
    example: 'Puddles drying up on the school playground after rain.',
    category: 'SCIENCE'
  },
  condensation: {
    word: 'Condensation',
    definition: 'When warm water vapor cools down and turns back into tiny liquid droplets.',
    example: 'Water droplets forming on the outside of a cold cup of water.',
    category: 'SCIENCE'
  },
  precipitation: {
    word: 'Precipitation',
    definition: 'Water that falls from clouds onto the ground as rain, drizzle, or hail.',
    example: 'April long rains across Kenya are a form of precipitation.',
    category: 'SCIENCE'
  },

  // --- Agriculture & Nutrition ---
  mulching: {
    word: 'Mulching',
    definition: 'Covering the topsoil around crops with dry grass, leaves, or straw to preserve moisture.',
    example: 'Farmers mulch tomato and sukuma wiki beds to reduce water loss from the soil.',
    category: 'AGRICULTURE'
  },
  compost: {
    word: 'Compost',
    definition: 'Organic plant food made by breaking down vegetable peelings, dry leaves, and animal manure.',
    example: 'Compost manure makes garden soil fertile and moist without synthetic chemicals.',
    category: 'AGRICULTURE'
  },
  erosion: {
    word: 'Soil Erosion',
    definition: 'The washing away or blowing away of fertile topsoil by strong wind or heavy rainwater.',
    example: 'Planting vetiver grass along slopes prevents soil erosion.',
    category: 'AGRICULTURE'
  },
  monocotyledon: {
    word: 'Monocotyledon (Monocot)',
    definition: 'A flowering plant whose seeds contain only one seed leaf (cotyledon).',
    example: 'Maize, grass, wheat, and sugarcane are monocotyledons.',
    category: 'AGRICULTURE'
  },
  dicotyledon: {
    word: 'Dicotyledon (Dicot)',
    definition: 'A flowering plant whose seeds split naturally into two seed leaves (cotyledons).',
    example: 'Beans, peas, and groundnuts are dicotyledons.',
    category: 'AGRICULTURE'
  },
  seedbed: {
    word: 'Seedbed / Nursery Bed',
    definition: 'A specially prepared, soft piece of soil where delicate seeds are planted before transplanting.',
    example: 'Sukuma wiki seeds are first raised in a nursery bed before moving to the main shamba.',
    category: 'AGRICULTURE'
  },

  // --- English Language Arts ---
  synonym: {
    word: 'Synonym',
    definition: 'A word that has the same or nearly the same meaning as another word.',
    example: '"Happy" and "joyful" are synonyms.',
    category: 'ENGLISH'
  },
  antonym: {
    word: 'Antonym',
    definition: 'A word that means the direct opposite of another word.',
    example: '"Hot" and "cold" are antonyms.',
    category: 'ENGLISH'
  },
  preposition: {
    word: 'Preposition',
    definition: 'A word that shows position, direction, or time relationship.',
    example: '"Under", "over", "between", "beside", and "inside".',
    category: 'ENGLISH'
  },
  conjunction: {
    word: 'Conjunction',
    definition: 'A connecting word used to join words, phrases, or clauses in a sentence.',
    example: '"And", "but", "because", and "although".',
    category: 'ENGLISH'
  },
  adverb: {
    word: 'Adverb',
    definition: 'A word that describes how, when, or where an action is performed.',
    example: 'Amina ran "quickly". Here, "quickly" is an adverb.',
    category: 'ENGLISH'
  },
  adjective: {
    word: 'Adjective',
    definition: 'A describing word that tells us more about a noun (person, animal, or thing).',
    example: 'A "tall" acacia tree. "Tall" is an adjective.',
    category: 'ENGLISH'
  },

  // --- Extended CBC Science, Agriculture & General Terms ---
  radicle: {
    word: 'Radicle',
    definition: 'The very first embryonic root that grows downwards from a germinating seed into the soil to absorb water.',
    example: 'When the bean seed swells, the radicle emerges first to anchor the seedling in the soil.',
    category: 'SCIENCE'
  },
  plumule: {
    word: 'Plumule',
    definition: 'The baby plant shoot that grows upwards towards sunlight to produce the stem and green leaves.',
    example: 'The plumule grows upwards into the air and unfolds into the plant’s first true green leaves.',
    category: 'SCIENCE'
  },
  cotyledon: {
    word: 'Cotyledon',
    definition: 'A seed leaf that stores food and nourishes the developing baby plant before it can make its own food.',
    example: 'A bean seed has two cotyledons packed with starch and protein for the embryo.',
    category: 'SCIENCE'
  },
  testa: {
    word: 'Testa (Seed Coat)',
    definition: 'The tough, waterproof protective outer layer of a seed that protects the delicate embryo.',
    example: 'The testa softens and splits open when the seed absorbs water during germination.',
    category: 'SCIENCE'
  },
  germinate: {
    word: 'Germinate',
    definition: 'To begin sprouting and growing from a resting seed into a young seedling.',
    example: 'Seeds need water, oxygen, and warmth to germinate successfully in the garden.',
    category: 'SCIENCE'
  },
  germinating: {
    word: 'Germinating Seed',
    definition: 'A seed that is actively absorbing water and sprouting its first root and shoot.',
    example: 'The germinating maize seed pushes its radicle into the damp soil.',
    category: 'SCIENCE'
  },
  petri: {
    word: 'Petri Dish',
    definition: 'A transparent shallow glass or plastic dish used in science investigations to observe seeds or microbes.',
    example: 'Pupils place soaked bean seeds on damp cotton in a petri dish to observe germination.',
    category: 'SCIENCE'
  },
  indigenous: {
    word: 'Indigenous',
    definition: 'Naturally native or originating in a specific local region or country.',
    example: 'Baobab trees, acacia, and Boran cattle are indigenous to Kenya.',
    category: 'GENERAL'
  },
  commute: {
    word: 'Commute',
    definition: 'To travel regularly over a distance between one’s home and workplace or school.',
    example: 'Many Kenyans commute from Kikuyu to Nairobi CBD by matatu or commuter train.',
    category: 'GENERAL'
  },
  regroup: {
    word: 'Regrouping',
    definition: 'Rearranging numbers into tens or hundreds when adding or subtracting (also called carrying or borrowing).',
    example: 'When subtracting 43 - 18, we regroup 1 ten into 10 ones to subtract 8 from 13.',
    category: 'MATH'
  },
  granary: {
    word: 'Granary',
    definition: 'A raised, aerated storehouse built on wooden posts with rat guards to protect harvested grain from pests and dampness.',
    example: 'The farmer stores dried maize cobs in a raised granary fitted with metal rodent collars.',
    category: 'AGRICULTURE'
  },
  chaff: {
    word: 'Chaff',
    definition: 'The dry, papery outer casing of cereal grains separated during threshing and winnowing.',
    example: 'The wind blows light chaff away while heavy grain falls straight down into the basket.',
    category: 'AGRICULTURE'
  },
  winnowing: {
    word: 'Winnowing',
    definition: 'The traditional technique of tossing grain in a shallow tray so the wind blows away the chaff.',
    example: 'Winnowing in the afternoon breeze separates clean sorghum grain from dry husks.',
    category: 'AGRICULTURE'
  },
  hermetic: {
    word: 'Hermetic Storage',
    definition: 'Airtight, sealed storage bags or silos where insects cannot breathe and grains remain fresh without pesticides.',
    example: 'Hermetic PICS bags preserve dried cowpeas and beans pest-free for many months.',
    category: 'AGRICULTURE'
  },
  chordophone: {
    word: 'Chordophone',
    definition: 'A musical instrument that produces sound by vibrating strings.',
    example: 'The 8-stringed Luo nyatiti and the Kikuyu wandindi are Kenyan chordophones.',
    category: 'GENERAL'
  },
  membranophone: {
    word: 'Membranophone',
    definition: 'A musical instrument that produces sound from a stretched animal skin or membrane.',
    example: 'The Luhya isukuti drum is an energetic Kenyan membranophone.',
    category: 'GENERAL'
  },
  aerophone: {
    word: 'Aerophone',
    definition: 'A musical instrument that creates sound by vibrating a column of air inside a hollow body.',
    example: 'The side-blown animal horn (coro) and bamboo flute (chivoti) are aerophones.',
    category: 'GENERAL'
  },
  idiophone: {
    word: 'Idiophone',
    definition: 'An instrument that makes sound by vibrating its entire body when shaken, tapped, or struck.',
    example: 'The reed shaker kayamba and metallic leg bells (gara) are traditional idiophones.',
    category: 'GENERAL'
  },
  draught: {
    word: 'Draught Animal',
    definition: 'A strong domestic working animal trained to pull heavy farm implements like ploughs, carts, or wagons.',
    example: 'Trained oxen provide draught power for ploughing stony agricultural land.',
    category: 'AGRICULTURE'
  }
};

/**
 * Returns a vocabulary term if the word matches any registered key.
 */
export function lookupVocabulary(word: string): VocabularyTerm | null {
  if (!word) return null;
  const clean = word.toLowerCase().trim().replace(/[^a-z0-9 -]/g, '');
  if (CBE_VOCABULARY[clean]) return CBE_VOCABULARY[clean];

  // Try singularization or simple suffix removal
  if (clean.endsWith('s') && CBE_VOCABULARY[clean.slice(0, -1)]) {
    return CBE_VOCABULARY[clean.slice(0, -1)];
  }
  if (clean.endsWith('ing') && CBE_VOCABULARY[clean.slice(0, -3)]) {
    return CBE_VOCABULARY[clean.slice(0, -3)];
  }
  return null;
}
