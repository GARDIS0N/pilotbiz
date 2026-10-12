-- ==============================================================================
-- Migration 20261011_10_language_cleanup.sql
-- Phase 2: Strip Translation Suffixes & Language Segregation
-- Non-Kiswahili subjects: Pure English content (strip Swahili translation suffixes).
-- Kiswahili subject: Pure Kiswahili content.
-- ==============================================================================

UPDATE public.questions
SET prompt = 'Which of the following conditions is NOT essential for a bean seed to germinate in the petri dishes?',
    explanation = 'Seeds already contain stored food in their cotyledons. They need water, air, and warmth to germinate. Artificial fertilizer is not required for germination.',
    options = '[{"id":"opt-3","text":"Warmth"},{"id":"opt-4","text":"Artificial chemical fertilizer"},{"id":"opt-1","text":"Water"},{"id":"opt-2","text":"Oxygen / Air"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-germ-01';

UPDATE public.questions
SET prompt = 'What is the very first plant part that emerges downwards from a germinating maize seed to absorb moisture?',
    explanation = 'The radicle is the embryonic root that grows downward into the soil first to anchor the plant and absorb water.',
    options = '[{"id":"opt-4","text":"The dry seed coat"},{"id":"opt-1","text":"The flower"},{"id":"opt-2","text":"The radicle"},{"id":"opt-3","text":"The plumule"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-germ-02';

UPDATE public.questions
SET prompt = 'Arrange the stages of bean seed germination in the correct chronological order:',
    explanation = 'First the seed imbibes water and swells, the coat splits, the radicle emerges downwards, and finally the plumule shoots upwards.',
    options = '[{"id":"germ-1","text":"Seed absorbs water and swells up"},{"id":"germ-2","text":"Seed coat splits open"},{"id":"germ-3","text":"Radicle grows downwards"},{"id":"germ-4","text":"Plumule grows upwards into sunlight"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-germ-order-01';

UPDATE public.questions
SET prompt = 'Match each seed part with its biological function:',
    explanation = 'The seed coat protects, cotyledon feeds the embryo, and plumule becomes the leafy shoot.',
    options = options,
    matching_pairs = '[{"leftId":"part1","leftText":"Seed Coat","rightId":"func1","rightText":"Protects the delicate seed inside"},{"leftId":"part2","leftText":"Cotyledon","rightId":"func2","rightText":"Stores food for the baby plant"},{"leftId":"part3","leftText":"Plumule","rightId":"func3","rightText":"Grows into the stem and green leaves"}]'::jsonb
WHERE id = 'q-sci-germ-match-01';

UPDATE public.questions
SET prompt = 'In Maasai Mara National Reserve, which animal is a herbivore that feeds primarily on savanna grasses?',
    explanation = 'Zebras are herbivores because they feed exclusively on grasses and vegetation in the savanna.',
    options = '[{"id":"opt-1","text":"Lion"},{"id":"opt-2","text":"Zebra"},{"id":"opt-3","text":"Leopard"},{"id":"opt-4","text":"Crocodile"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-sci-hab-01';

UPDATE public.questions
SET prompt = 'Match each Kenyan animal to its natural primary habitat:',
    explanation = 'Flamingos inhabit Lake Nakuru, Bongos live in high mountain forests, and camels thrive in northern semi-arid counties.',
    options = options,
    matching_pairs = '[{"leftId":"an1","leftText":"Flamingo","rightId":"hb1","rightText":"Lake Nakuru alkaline water"},{"leftId":"an2","leftText":"Bongo Antelope","rightId":"hb2","rightText":"Mount Kenya dense bamboo forest"},{"leftId":"an3","leftText":"Camel","rightId":"hb3","rightText":"Semi-arid plains of Garissa and Turkana"}]'::jsonb
WHERE id = 'q-sci-hab-match-01';

UPDATE public.questions
SET prompt = 'Grandmaster Challenge: Choose the thank-you note that has ALL parts (Date, Greeting, Message, Sign-off, and Name) punctuated and formatted impeccably:',
    explanation = 'Option 1 features complete date, proper capitalization and commas in greeting and sign-off, and a detailed, polite message.',
    options = '[{"id":"opt-2","text":"dear Aunt Wambui\nThank you. Amani"},{"id":"opt-3","text":"Aunt Wambui,\nWe came to Nyeri and ate plums. Bye,\nAmani"},{"id":"opt-4","text":"12th November 2026\nDear aunt wambui\nThank you\nyour niece amani"},{"id":"opt-1","text":"12th November 2026 Dear Aunt Wambui, Thank you so much for hosting us in Nyeri. We enjoyed picking ripe plums and walking in the lush tea farm. I will always remember your warm hospitality. Your loving niece,\nAmani"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-eng-u10-024';

UPDATE public.questions
SET prompt = 'Which soil is used by potters to mold traditional cooking pots and flower vases?',
    explanation = 'Clay is sticky and elastic when wet, allowing it to be shaped into hollow pottery and fired hard.',
    options = '[{"id":"opt-4","text":"Dust"},{"id":"opt-1","text":"Clay soil"},{"id":"opt-2","text":"Coarse sand"},{"id":"opt-3","text":"Gravel"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u3-013';

UPDATE public.questions
SET prompt = 'A traditional clay cooking pot used for boiling food over firewood is called a ______.',
    explanation = 'In Swahili and local languages, an earthenware cooking pot is called a "nyungu".',
    options = options,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u3-016';

UPDATE public.questions
SET prompt = 'Chickens lay eggs that provide rich proteins for our breakfast and growth.',
    explanation = 'Domestic chickens produce fresh eggs that are a delicious and protein-packed food for children.',
    options = '[{"id":"opt-1","text":"True"},{"id":"opt-2","text":"False"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u5-002';

UPDATE public.questions
SET prompt = 'Wanjiku notices that the family goat is coughing, refuses to eat fresh potato vines, and is shivering in the shed. What should Wanjiku advise her father to do?',
    explanation = 'Sick animals require professional medical attention from a veterinary officer to recover safely.',
    options = '[{"id":"opt-1","text":"Call an animal health officer (veterinary officer) to examine and treat the goat"},{"id":"opt-2","text":"Beat the goat with a stick to force it to eat"},{"id":"opt-3","text":"Chase the goat out of the compound into the road"},{"id":"opt-4","text":"Ignore the goat completely for two weeks"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u5-010';

UPDATE public.questions
SET prompt = 'A skilled artisan who uses wood and hand tools to make school desks, chairs, and doors is a ____.',
    explanation = 'A carpenter shapes timber into durable furniture, roofing trusses, and classroom furniture.',
    options = '[{"id":"opt-1","text":"carpenter"},{"id":"opt-2","text":"fisherman"},{"id":"opt-3","text":"nurse"},{"id":"opt-4","text":"pilot"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-env-u9-003';

UPDATE public.questions
SET prompt = 'Match each Kenyan animal feature with how it is sculpted in clay:',
    explanation = 'Bulls have shoulder humps, chickens have combs and beaks, cows have udders, and tortoises have domed shells.',
    options = options,
    matching_pairs = '[{"leftId":"pair-1-l","leftText":"Zebu Bull","rightId":"pair-1-r","rightText":"Sculpt a pronounced hump on the shoulder and curved horns"},{"leftId":"pair-2-l","leftText":"Chicken","rightId":"pair-2-r","rightText":"Pinch out a pointed beak and model a serrated comb on top"},{"leftId":"pair-3-l","leftText":"Dairy Cow","rightId":"pair-3-r","rightText":"Model four sturdy cylinder legs and an udder underneath"},{"leftId":"pair-4-l","leftText":"Tortoise","rightId":"pair-4-r","rightText":"Shape a rounded domed shell and incise a geometric scute pattern"}]'::jsonb
WHERE id = 'q-g3-cr-u4-016';

UPDATE public.questions
SET prompt = 'Arrange the sequence for modeling and finishing a clay hen:',
    explanation = 'Shape body and head, attach with slip, pinch details like beak and comb, and incise feather textures.',
    options = options,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-cr-u4-019';

UPDATE public.questions
SET prompt = 'Which famous Christian hymn praises God for the beauty of the skies, mountains, and flowers ("How Great Thou Art")?',
    explanation = '"How Great Thou Art" celebrates the awe-inspiring majesty of God’s creation.',
    options = '[{"id":"opt-1","text":"O Lord my God, when I in awesome wonder consider all the worlds Thy hands have made"},{"id":"opt-2","text":"Twinkle twinkle little star"},{"id":"opt-3","text":"Old MacDonald had a farm"},{"id":"opt-4","text":"Row row row your boat"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-cre-u1-023';

UPDATE public.questions
SET prompt = 'What was the earthly profession of Joseph, the foster father of Jesus?',
    explanation = 'Matthew 13:55 identifies Joseph as a humble, hardworking carpenter in Nazareth.',
    options = '[{"id":"opt-2","text":"Fisherman"},{"id":"opt-3","text":"Soldier"},{"id":"opt-4","text":"Sailor"},{"id":"opt-1","text":"Carpenter"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g3-cre-u3-008';

UPDATE public.questions
SET prompt = 'Match each traditional artifact to its primary use:',
    explanation = 'Artifacts had diverse functions spanning domestic chores, agricultural processing, defense, and social leadership.',
    options = '[{"id":"opt-1","text":"Bow and arrows -> Hunting and self-defense"},{"id":"opt-2","text":"Clay pot -> Cooking and keeping water cool"},{"id":"opt-3","text":"Fly-whisk -> Symbol of leadership and authority for elders"},{"id":"opt-4","text":"Winnowing tray -> Separating chaff from harvested grain"}]'::jsonb,
    matching_pairs = '[{"leftId":"pair-1-l","leftText":"Bow and arrows","rightId":"pair-1-r","rightText":"Hunting and self-defense"},{"leftId":"pair-2-l","leftText":"Clay pot","rightId":"pair-2-r","rightText":"Cooking and keeping water cool"},{"leftId":"pair-3-l","leftText":"Fly-whisk","rightId":"pair-3-r","rightText":"Symbol of leadership and authority for elders"},{"leftId":"pair-4-l","leftText":"Winnowing tray","rightId":"pair-4-r","rightText":"Separating chaff from harvested grain"}]'::jsonb
WHERE id = 'q-g4-soc-u5-018';

UPDATE public.questions
SET prompt = 'What physical feature should traditional raised wooden granaries have on their supporting posts to prevent rats from entering?',
    explanation = 'Downward-facing metal collars stop rodents from climbing around the lip, protecting stored grain from rodent damage and urine.',
    options = '[{"id":"opt-2","text":"Wooden ladders resting against the walls"},{"id":"opt-3","text":"Holes drilled into the granary floor"},{"id":"opt-4","text":"Strings of fresh maize tied to the posts"},{"id":"opt-1","text":"Metal deflector cones (rat guards) fitted around each post with the open cone facing downwards"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g5-agri-u9-021';

UPDATE public.questions
SET prompt = 'Which traditional grain storage structure in rural Kenya is raised on wooden stilts with rat-guards to keep grains dry and pest-free?',
    explanation = 'Traditional granaries are elevated above the ground on pillars fitted with rat baffles to provide ventilation, prevent moisture ingress, and block rodents.',
    options = '[{"id":"opt-1","text":"Granary"},{"id":"opt-2","text":"Underground pit filled with water"},{"id":"opt-3","text":"Open clay cooking pot"},{"id":"opt-4","text":"Cloth blanket placed under tree shade"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-sci-u5-024';

UPDATE public.questions
SET prompt = 'How can a family repurpose leftover boiled ugali from dinner into a delicious breakfast the following morning?',
    explanation = 'Pan-frying leftover ugali slices creates a delicious, crispy breakfast carb that eliminates food waste and saves money.',
    options = '[{"id":"opt-2","text":"Throw it into the outdoor pit latrine immediately"},{"id":"opt-3","text":"Bury it under the bedroom floor"},{"id":"opt-4","text":"Soak it in cold soapy dishwater"},{"id":"opt-1","text":"Cut into slices and pan-fry with a little oil or toast and serve hot with tea"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-agri-u8-019';

UPDATE public.questions
SET prompt = 'How does cooking in traditional earthen clay pots improve the flavor and quality of traditional stews?',
    explanation = 'Natural clay has high thermal mass; it heats slowly, retains gentle heat without hot spots, and allows subtle aromatic evaporation that deepens stew flavor.',
    options = '[{"id":"opt-2","text":"Clay adds chemical preservatives into the soup"},{"id":"opt-3","text":"Clay dissolves completely into the food to thicken it"},{"id":"opt-4","text":"Clay pots generate electrical currents that heat the food"},{"id":"opt-1","text":"Porous clay distributes heat slowly and evenly, preventing scorching and enhancing gentle simmering and moisture retention"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-agri-u9-011';

UPDATE public.questions
SET prompt = 'How should a courteous learner conclude their meal at the dining table?',
    explanation = 'Expressing sincere gratitude to the cook, assisting in clearing plates, and washing hands cleanly demonstrate mature, considerate citizenship.',
    options = '[{"id":"opt-2","text":"Belch loudly in someone''s face and walk away leaving dirty plates on the chair"},{"id":"opt-3","text":"Throw remaining food on the dining room floor"},{"id":"opt-4","text":"Wipe greasy hands on the curtains"},{"id":"opt-1","text":"Thank the person who prepared the meal, clear their plate, and wash their hands cleanly"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-agri-u10-023';

UPDATE public.questions
SET prompt = 'What tiny silver freshwater fish caught at night in Lake Victoria using kerosene pressure lamps is dried in the sun for food and animal feeds?',
    explanation = 'Omena (Rastrineobola argentea) are attracted by night lanterns, netted, and dried on beach mats, providing cheap protein and calcium.',
    options = '[{"id":"opt-3","text":"Nile Perch (Mbuta)"},{"id":"opt-4","text":"Catfish (Mumi)"},{"id":"opt-1","text":"Omena"},{"id":"opt-2","text":"Tilapia (Ngege)"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-soc-u8-006';

UPDATE public.questions
SET prompt = 'What was the name of the political party led by Ronald Ngala and Daniel arap Moi at independence that advocated for regional federalism?',
    explanation = 'KADU championed regional devolution to safeguard minority communities, while KANU favored a strong centralized national government.',
    options = '[{"id":"opt-2","text":"Kenya African National Union (KANU)"},{"id":"opt-3","text":"East African Association (EAA)"},{"id":"opt-4","text":"Liberal Democratic Party (LDP)"},{"id":"opt-1","text":"Kenya African Democratic Union (KADU)"}]'::jsonb,
    matching_pairs = matching_pairs
WHERE id = 'q-g6-soc-u9-019';
