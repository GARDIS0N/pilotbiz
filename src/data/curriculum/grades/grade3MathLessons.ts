// Grade 3 Mathematical Activities - Numbers Strand (KICD CBC Aligned)
// Generated from verified curriculum content data layer.
import { CurriculumSubStrand, CurriculumStrand } from '../types.js';

export const grade3NumbersSubStrands: CurriculumSubStrand[] = [
  {
    "id": "substrand-math-g3-add",
    "strandId": "strand-math-g3-numbers",
    "code": "MATH-G3-SUB-01",
    "title": {
      "en": "Addition within 1,000",
      "sw": "Kujumlisha hadi 1,000"
    },
    "description": {
      "en": "Adding 3-digit numbers with and without regrouping in Kenyan contexts.",
      "sw": "Kujumlisha nambari za tarakimu 3 bila na kwa kubadili."
    },
    "order": 1,
    "prerequisiteIds": [],
    "cbeCompetencies": [
      "Critical thinking and problem solving",
      "Financial literacy",
      "Learning to learn"
    ],
    "cbeValues": [
      "Responsibility",
      "Integrity",
      "Unity"
    ],
    "estimatedMinutes": 25,
    "quests": [
      {
        "id": "g3-math-num-01",
        "subStrandId": "substrand-math-g3-add",
        "order": 1,
        "title": {
          "en": "Addition within 1,000 without Regrouping",
          "sw": "Kujumlisha hadi 1,000 bila Kubadili"
        },
        "storyContext": {
          "en": "Add 3-digit numbers without regrouping using place value in real-life contexts. Guided by Baraka.",
          "sw": "Kujumlisha nambari zenye tarakimu 3 bila kubadili kwa kutumia thamani ya nafasi. Ukiongozwa na Baraka."
        },
        "characterName": "Baraka",
        "characterAvatar": "lion",
        "difficulty": 1,
        "estimatedMinutes": 6,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [],
        "teachCards": [
          {
            "heading": {
              "en": "Adding Using Place Value",
              "sw": "Kujumlisha kwa Thamani ya Nafasi"
            },
            "body": {
              "en": "Line up hundreds, tens, and ones neatly. Add the ones first. Then add tens and hundreds.",
              "sw": "Panga mamia, makumi, na mamoja wima. Anza kujumlisha mamoja kwanza. Kisha jumlisha makumi na mamia."
            },
            "workedExample": {
              "en": "243 + 125 = ? First, 3 + 5 = 8 ones. Next, 4 + 2 = 6 tens. Last, 2 + 1 = 3 hundreds. Sum = 368.",
              "sw": "243 + 125 = ? Kwanza, mamoja 3 + 5 = 8. Kisha, makumi 4 + 2 = 6. Mwisho, mamia 2 + 1 = 3. Jumla = 368."
            },
            "imagePrompt": "A cheerful Kenyan boy named Baraka arranging green, yellow, and blue counting bottle tops on a wooden school desk."
          },
          {
            "heading": {
              "en": "Vertical Addition Method",
              "sw": "Njia ya Kujumlisha Wima"
            },
            "body": {
              "en": "Write the numbers directly under each other. Keep digits aligned in straight columns.",
              "sw": "Andika nambari moja chini ya nyingine. Weka tarakimu zote katika safu zilizonyooka."
            },
            "workedExample": {
              "en": "310 + 240: 0 + 0 = 0 ones. 1 + 4 = 5 tens. 3 + 2 = 5 hundreds. Answer = 550.",
              "sw": "310 + 240: Mamoja 0 + 0 = 0. Makumi 1 + 4 = 5. Mamia 3 + 2 = 5. Jibu ni 550."
            },
            "imagePrompt": "A classroom chalkboard in Kenya displaying 310 over 240 in neat place-value columns labeled H, T, O."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-01-q01",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "What is 320 + 140?",
              "sw": "Tafuta jumla ya 320 + 140."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "450",
                "explanation": {
                  "en": "You added 2 tens and 4 tens incorrectly as 5 tens.",
                  "sw": "Ulikosea kujumlisha makumi 2 na makumi 4 kuwa makumi 5."
                }
              },
              {
                "id": "b",
                "text": "460",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "360",
                "explanation": {
                  "en": "You forgot to add the 1 hundred to 3 hundreds.",
                  "sw": "Ulisahau kujumlisha mia 1 kwa mamia 3."
                }
              },
              {
                "id": "d",
                "text": "560",
                "explanation": {
                  "en": "You added too many hundreds.",
                  "sw": "Uliongeza mamia kupita kiasi."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "Add ones (0+0=0), tens (2+4=6), and hundreds (3+1=4) to get 460.",
              "sw": "Jumlisha mamoja (0+0=0), makumi (2+4=6), na mamia (3+1=4) kupata 460."
            },
            "socraticHint": {
              "en": "Start with the tens: 2 tens plus 4 tens equals 6 tens.",
              "sw": "Anza na makumi: makumi 2 jumlisha makumi 4 ni makumi 6."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q02",
            "subStrandId": "substrand-math-g3-add",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Work out: 114 + 52",
              "sw": "Fanya hesabu hii: 114 + 52"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 166,
              "unit": ""
            },
            "explanation": {
              "en": "4 ones + 2 ones = 6 ones. 1 ten + 5 tens = 6 tens. 1 hundred remains 1. The sum is 166.",
              "sw": "Mamoja 4 + 2 = 6. Makumi 1 + 5 = 6. Mia 1 inabaki 1. Jumla ni 166."
            },
            "socraticHint": {
              "en": "Add the ones digits first: 4 + 2.",
              "sw": "Jumlisha tarakimu za mamoja kwanza: 4 + 2."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q03",
            "subStrandId": "substrand-math-g3-add",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "True or False: 400 + 350 = 750.",
              "sw": "Kweli au Si Kweli: 400 + 350 = 750."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "4 hundreds + 3 hundreds = 7 hundreds, plus 50 gives 750.",
              "sw": "Mamia 4 jumlisha mamia 3 ni mamia 7, ukiongeza 50 unapata 750."
            },
            "socraticHint": {
              "en": "Add 400 and 300 first, then add the 50.",
              "sw": "Jumlisha 400 na 300 kwanza, kisha ongeza 50."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q04",
            "subStrandId": "substrand-math-g3-add",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "Fill in the blank: 215 + [BLANK] = 245.",
              "sw": "Jaza pengo: 215 + [BLANK] = 245."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "30"
            ],
            "explanation": {
              "en": "The hundreds and ones are unchanged. Tens change from 1 to 4, meaning 30 was added.",
              "sw": "Mamia na mamoja hayajabadilika. Makumi yameongezeka kutoka 1 hadi 4, ikimaanisha 30 iliongezwa."
            },
            "socraticHint": {
              "en": "How many tens must you add to 1 ten to get 4 tens?",
              "sw": "Unahitaji kuongeza makumi mangapi kwa kumi 1 ili kupata makumi 4?"
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q05",
            "subStrandId": "substrand-math-g3-add",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each addition problem with its correct sum.",
              "sw": "Oanisha kila swali la kujumlisha na jibu lake sahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "300 + 200",
                "rightId": "p0",
                "rightText": "500"
              },
              {
                "leftId": "p1",
                "leftText": "124 + 13",
                "rightId": "p1",
                "rightText": "137"
              },
              {
                "leftId": "p2",
                "leftText": "450 + 40",
                "rightId": "p2",
                "rightText": "490"
              },
              {
                "leftId": "p3",
                "leftText": "612 + 151",
                "rightId": "p3",
                "rightText": "763"
              }
            ],
            "explanation": {
              "en": "Each problem adds digits column by column without carrying any value.",
              "sw": "Kila hesabu inajumlisha tarakimu safu kwa safu bila kubadili."
            },
            "socraticHint": {
              "en": "3 hundreds plus 2 hundreds equals 5 hundreds.",
              "sw": "Mamia 3 jumlisha mamia 2 ni sawa na mamia 5."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q06",
            "subStrandId": "substrand-math-g3-add",
            "type": "ORDERING",
            "prompt": {
              "en": "Order the steps to add 234 + 142 vertically.",
              "sw": "Panga hatua za kujumlisha 234 + 142 kwa njia ya wima."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "s1",
                "text": "Align digits vertically into hundreds, tens, and ones."
              },
              {
                "id": "s2",
                "text": "Add the ones digits: 4 + 2 = 6."
              },
              {
                "id": "s3",
                "text": "Add the tens digits: 3 + 4 = 7."
              },
              {
                "id": "s4",
                "text": "Add the hundreds digits: 2 + 1 = 3 to get 376."
              }
            ],
            "correctOrderIds": [
              "s1",
              "s2",
              "s3",
              "s4"
            ],
            "explanation": {
              "en": "We always align place values first, then add ones, then tens, then hundreds.",
              "sw": "Kila mara tunapanga thamani za nafasi kwanza, kisha mamoja, makumi, na mwisho mamia."
            },
            "socraticHint": {
              "en": "Always begin by arranging the numbers in place-value columns.",
              "sw": "Anza daima kwa kupanga nambari katika safu za thamani ya nafasi."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q07",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Amina harvested 230 mangoes. Baraka harvested 145 mangoes. How many mangoes did they harvest altogether?",
              "sw": "Amina alivuna maembe 230. Baraka alivuna maembe 145. Je, walivuna jumla ya maembe mangapi?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "365",
                "explanation": {
                  "en": "You subtracted instead of adding in the tens column.",
                  "sw": "Ulitoa badala ya kujumlisha kwenye safu ya makumi."
                }
              },
              {
                "id": "b",
                "text": "375",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "385",
                "explanation": {
                  "en": "You added 1 ten too many.",
                  "sw": "Uliongeza kumi 1 zaidi kimakosa."
                }
              },
              {
                "id": "d",
                "text": "275",
                "explanation": {
                  "en": "You forgot Baraka's 1 hundred.",
                  "sw": "Ulisahau mia 1 ya Baraka."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "230 mangoes + 145 mangoes = 375 mangoes altogether.",
              "sw": "Maembe 230 + maembe 145 = jumla ya maembe 375."
            },
            "socraticHint": {
              "en": "Add 230 and 145 by combining ones, tens, and hundreds.",
              "sw": "Jumlisha 230 na 145 kwa kuunganisha mamoja, makumi, na mamia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q08",
            "subStrandId": "substrand-math-g3-add",
            "type": "LISTEN_CHOOSE",
            "prompt": {
              "en": "Listen to the math sentence and choose the correct sum.",
              "sw": "Sikiliza sentensi ya hisabati kisha uchague jumla sahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "540",
                "explanation": {
                  "en": "2 tens plus 3 tens is 5 tens, not 4 tens.",
                  "sw": "Makumi 2 jumlisha makumi 3 ni makumi 5, si 4."
                }
              },
              {
                "id": "b",
                "text": "550",
                "explanation": {
                  "en": "Correct!",
                  "sw": "Sahihi!"
                }
              },
              {
                "id": "c",
                "text": "560",
                "explanation": {
                  "en": "You added an extra ten.",
                  "sw": "Uliongeza kumi moja zaidi."
                }
              }
            ],
            "correctOptionId": "b",
            "audioSpeechPrompt": {
              "textToSpeak": "Four hundred and twenty plus one hundred and thirty.",
              "language": "en-KE"
            },
            "explanation": {
              "en": "420 + 130 = 550.",
              "sw": "420 + 130 = 550."
            },
            "socraticHint": {
              "en": "400 + 100 = 500, and 20 + 30 = 50.",
              "sw": "400 + 100 = 500, na 20 + 30 = 50."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q09",
            "subStrandId": "substrand-math-g3-add",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "Zawadi saved Ksh 300 on Monday and Ksh 120 on Tuesday. Make the total amount: Ksh 420.",
              "sw": "Zawadi aliweka akiba ya Ksh 300 Jumatatu na Ksh 120 Jumanne. Kusanya jumla hiyo: Ksh 420."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 420,
              "unit": "KES"
            },
            "explanation": {
              "en": "Ksh 300 + Ksh 120 = Ksh 420. Two 200 notes and one 20 coin make Ksh 420.",
              "sw": "Ksh 300 + Ksh 120 = Ksh 420. Noti mbili za 200 na sarafu moja ya 20 zinaleta Ksh 420."
            },
            "socraticHint": {
              "en": "Start with two Ksh 200 notes to get Ksh 400, then add one Ksh 20 coin.",
              "sw": "Anza na noti mbili za Ksh 200 kupata Ksh 400, kisha ongeza sarafu ya Ksh 20."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q10",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A school in Nakuru has 412 storybooks and 365 science books. How many books are there in total?",
              "sw": "Shule moja huko Nakuru ina vitabu vya hadithi 412 na vitabu vya sayansi 365. Je, kuna jumla ya vitabu vingapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "767",
                "explanation": {
                  "en": "1 ten plus 6 tens is 7 tens, not 6 tens.",
                  "sw": "Kumi 1 jumlisha makumi 6 ni makumi 7, si 6."
                }
              },
              {
                "id": "b",
                "text": "777",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "787",
                "explanation": {
                  "en": "You added 1 ten too many.",
                  "sw": "Uliongeza kumi moja zaidi kimakosa."
                }
              },
              {
                "id": "d",
                "text": "877",
                "explanation": {
                  "en": "4 hundreds plus 3 hundreds is 7 hundreds, not 8 hundreds.",
                  "sw": "Mamia 4 jumlisha mamia 3 ni mamia 7, si 8."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "412 + 365: 2+5=7 ones, 1+6=7 tens, 4+3=7 hundreds. Total is 777 books.",
              "sw": "412 + 365: 2+5=7 mamoja, 1+6=7 makumi, 4+3=7 mamia. Jumla ni vitabu 777."
            },
            "socraticHint": {
              "en": "Add the columns one by one: 2+5, 1+6, and 4+3.",
              "sw": "Jumlisha safu moja baada ya nyingine: 2+5, 1+6, na 4+3."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q11",
            "subStrandId": "substrand-math-g3-add",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Find the sum: 543 + 254",
              "sw": "Tafuta jumla: 543 + 254"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 797,
              "unit": ""
            },
            "explanation": {
              "en": "3 + 4 = 7 ones. 4 + 5 = 9 tens. 5 + 2 = 7 hundreds. The sum is 797.",
              "sw": "Mamoja 3 + 4 = 7. Makumi 4 + 5 = 9. Mamia 5 + 2 = 7. Jumla ni 797."
            },
            "socraticHint": {
              "en": "Add ones first: 3 + 4 = 7.",
              "sw": "Anza na mamoja: 3 + 4 = 7."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-01-q12",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Farmer Otieno counts 321 cows and 156 goats on his shamba. What is the total number of animals?",
              "sw": "Mkulima Otieno anahesabu ng'ombe 321 na mbuzi 156 shambani mwake. Je, kuna jumla ya wanyama wangapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "467",
                "explanation": {
                  "en": "2 tens plus 5 tens is 7 tens, not 6 tens.",
                  "sw": "Makumi 2 jumlisha makumi 5 ni makumi 7, si 6."
                }
              },
              {
                "id": "b",
                "text": "477",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "487",
                "explanation": {
                  "en": "You added too many tens.",
                  "sw": "Uliongeza makumi kupita kiasi."
                }
              },
              {
                "id": "d",
                "text": "377",
                "explanation": {
                  "en": "You forgot 1 hundred.",
                  "sw": "Ulisahau mia 1."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "321 + 156 = 477 animals.",
              "sw": "321 + 156 = jumla ya wanyama 477."
            },
            "socraticHint": {
              "en": "1+6=7 ones, 2+5=7 tens, and 3+1=4 hundreds.",
              "sw": "1+6=7 mamoja, 2+5=7 makumi, na 3+1=4 mamia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      },
      {
        "id": "g3-math-num-02",
        "subStrandId": "substrand-math-g3-add",
        "order": 2,
        "title": {
          "en": "Addition within 1,000 with Regrouping",
          "sw": "Kujumlisha hadi 1,000 kwa Kubadili"
        },
        "storyContext": {
          "en": "Add 3-digit numbers with regrouping ones to tens and tens to hundreds in practical tasks. Guided by Auma.",
          "sw": "Kujumlisha nambari zenye tarakimu 3 kwa kubadili mamoja kuwa makumi na makumi kuwa mamia. Ukiongozwa na Auma."
        },
        "characterName": "Auma",
        "characterAvatar": "cheetah",
        "difficulty": 2,
        "estimatedMinutes": 6,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-01"
        ],
        "teachCards": [
          {
            "heading": {
              "en": "Regrouping Ones to Tens",
              "sw": "Kubadili Mamoja kuwa Makumi"
            },
            "body": {
              "en": "When ones add up to 10 or more, exchange 10 ones for 1 ten. Carry 1 ten to the tens column.",
              "sw": "Mamoja yakifikia 10 au zaidi, badilisha mamoja 10 kuwa kumi 1. Peleka kumi 1 kwenye safu ya makumi."
            },
            "workedExample": {
              "en": "147 + 235: 7 + 5 = 12 ones. Write 2 in ones, carry 1 to tens. 4 + 3 + 1 = 8 tens. 1 + 2 = 3 hundreds. Total = 382.",
              "sw": "147 + 235: Mamoja 7 + 5 = 12. Andika 2, peleka 1 kwenye makumi. Makumi 4 + 3 + 1 = 8. Mamia 1 + 2 = 3. Jumla = 382."
            },
            "imagePrompt": "A friendly Kenyan teacher showing pupils how 10 single sticks are bundled together with sisal twine to make 1 bundle of ten."
          },
          {
            "heading": {
              "en": "Regrouping Tens to Hundreds",
              "sw": "Kubadili Makumi kuwa Mamia"
            },
            "body": {
              "en": "When tens add up to 10 or more, exchange 10 tens for 1 hundred. Carry 1 to the hundreds column.",
              "sw": "Makumi yakifikia 10 au zaidi, badilisha makumi 10 kuwa mia 1. Peleka mia 1 kwenye safu ya mamia."
            },
            "workedExample": {
              "en": "280 + 150: 0 + 0 = 0 ones. 8 + 5 = 13 tens. Write 3, carry 1 hundred. 2 + 1 + 1 = 4 hundreds. Total = 430.",
              "sw": "280 + 150: Mamoja 0 + 0 = 0. Makumi 8 + 5 = 13. Andika 3, peleka 1 kwenye mamia. Mamia 2 + 1 + 1 = 4. Jumla = 430."
            },
            "imagePrompt": "Ten bundles of ten sticks grouped into a large sack marked 100 on a clean classroom floor."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-02-q01",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Find the sum: 248 + 135",
              "sw": "Tafuta jumla: 248 + 135"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "373",
                "explanation": {
                  "en": "You forgot to add the carried 1 ten to the tens column.",
                  "sw": "Ulisahau kujumlisha kumi 1 uliyobeba kwenye safu ya makumi."
                }
              },
              {
                "id": "b",
                "text": "383",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "382",
                "explanation": {
                  "en": "8 + 5 is 13, not 12.",
                  "sw": "8 + 5 ni 13, siyo 12."
                }
              },
              {
                "id": "d",
                "text": "483",
                "explanation": {
                  "en": "You carried into the hundreds column by mistake.",
                  "sw": "Ulibeba mia moja kimakosa."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "8 + 5 = 13 (write 3, carry 1). Tens: 4 + 3 + 1 = 8. Hundreds: 2 + 1 = 3. Sum is 383.",
              "sw": "8 + 5 = 13 (andika 3, beba 1). Makumi: 4 + 3 + 1 = 8. Mamia: 2 + 1 = 3. Jumla ni 383."
            },
            "socraticHint": {
              "en": "8 + 5 gives 13 ones. Carry 1 ten to the tens column.",
              "sw": "8 + 5 inaleta mamoja 13. Beba kumi 1 upeleke kwenye makumi."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q02",
            "subStrandId": "substrand-math-g3-add",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "True or False: 156 + 127 = 283.",
              "sw": "Kweli au Si Kweli: 156 + 127 = 283."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "6 + 7 = 13 (carry 1). 5 + 2 + 1 = 8 tens. 1 + 1 = 2 hundreds. Total is 283.",
              "sw": "6 + 7 = 13 (beba 1). Makumi: 5 + 2 + 1 = 8. Mamia: 1 + 1 = 2. Jumla ni 283."
            },
            "socraticHint": {
              "en": "Check the ones first: 6 + 7 = 13.",
              "sw": "Kagua mamoja kwanza: 6 + 7 = 13."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q03",
            "subStrandId": "substrand-math-g3-add",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Calculate: 329 + 14",
              "sw": "Kokotoa: 329 + 14"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 343,
              "unit": ""
            },
            "explanation": {
              "en": "9 + 4 = 13 ones (write 3, carry 1 ten). 2 + 1 + 1 = 4 tens. Hundreds remain 3. Answer is 343.",
              "sw": "9 + 4 = 13 (andika 3, beba 1). Makumi: 2 + 1 + 1 = 4. Mamia yanabaki 3. Jibu ni 343."
            },
            "socraticHint": {
              "en": "Add 9 and 4. Remember to carry the 1 ten.",
              "sw": "Jumlisha 9 na 4. Kumbuka kubeba kumi 1."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q04",
            "subStrandId": "substrand-math-g3-add",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "In 148 + 225, ones 8 + 5 make 13. We write 3 and carry [BLANK] ten.",
              "sw": "Katika 148 + 225, mamoja 8 + 5 ni 13. Tunaandika 3 na kubeba kumi [BLANK]."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "1",
              "one",
              "moja"
            ],
            "explanation": {
              "en": "13 ones equals 1 ten and 3 ones, so we carry 1 ten.",
              "sw": "Mamoja 13 ni sawa na kumi 1 na mamoja 3, kwa hivyo tunabeba kumi 1."
            },
            "socraticHint": {
              "en": "Look at the tens digit in 13.",
              "sw": "Tazama tarakimu ya makumi katika 13."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q05",
            "subStrandId": "substrand-math-g3-add",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each addition question with its regrouped sum.",
              "sw": "Oanisha kila swali la kujumlisha na jibu lake sahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "157 + 26",
                "rightId": "p0",
                "rightText": "183"
              },
              {
                "leftId": "p1",
                "leftText": "245 + 170",
                "rightId": "p1",
                "rightText": "415"
              },
              {
                "leftId": "p2",
                "leftText": "380 + 140",
                "rightId": "p2",
                "rightText": "520"
              },
              {
                "leftId": "p3",
                "leftText": "468 + 125",
                "rightId": "p3",
                "rightText": "593"
              }
            ],
            "explanation": {
              "en": "Each calculation requires carrying either from ones to tens or tens to hundreds.",
              "sw": "Kila hesabu inahitaji kubeba kutoka mamoja kwenda makumi au makumi kwenda mamia."
            },
            "socraticHint": {
              "en": "For 380 + 140, 8 tens + 4 tens = 12 tens, giving 520.",
              "sw": "Kwa 380 + 140, makumi 8 + makumi 4 = makumi 12, ikileta 520."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q06",
            "subStrandId": "substrand-math-g3-add",
            "type": "ORDERING",
            "prompt": {
              "en": "Order the steps to calculate 365 + 158 correctly.",
              "sw": "Panga hatua za kukokotoa 365 + 158 kwa usahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "s1",
                "text": "Add ones: 5 + 8 = 13. Write 3, carry 1 ten."
              },
              {
                "id": "s2",
                "text": "Add tens: 6 + 5 + 1 = 12 tens. Write 2, carry 1 hundred."
              },
              {
                "id": "s3",
                "text": "Add hundreds: 3 + 1 + 1 = 5 hundreds."
              },
              {
                "id": "s4",
                "text": "Write the final sum: 523."
              }
            ],
            "correctOrderIds": [
              "s1",
              "s2",
              "s3",
              "s4"
            ],
            "explanation": {
              "en": "We work from right to left: regroup ones first, then regroup tens, then add hundreds.",
              "sw": "Tunafanya kazi kutoka kulia kuelekea kushoto: badili mamoja, kisha makumi, na mwisho mamia."
            },
            "socraticHint": {
              "en": "Start with the ones column (5 + 8).",
              "sw": "Anza na safu ya mamoja (5 + 8)."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q07",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Kiprono had Ksh 275. His mother gave him Ksh 150 for school books. How much money does he have now?",
              "sw": "Kiprono alikuwa na Ksh 275. Mama yake alimpa Ksh 150 za vitabu. Je, ana pesa ngapi sasa?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 415",
                "explanation": {
                  "en": "You forgot to carry the 1 hundred when adding 7 tens and 5 tens.",
                  "sw": "Ulisahau kubeba mia 1 ulipojumlisha makumi 7 na makumi 5."
                }
              },
              {
                "id": "b",
                "text": "Ksh 425",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "Ksh 435",
                "explanation": {
                  "en": "You added 10 shillings too many.",
                  "sw": "Uliongeza shilingi 10 zaidi kimakosa."
                }
              },
              {
                "id": "d",
                "text": "Ksh 325",
                "explanation": {
                  "en": "You forgot to add 1 hundred from the second number.",
                  "sw": "Ulisahau kujumlisha mia 1 kutoka kwa nambari ya pili."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "Ksh 275 + Ksh 150 = Ksh 425. 7 tens + 5 tens = 12 tens, which carries 1 hundred.",
              "sw": "Ksh 275 + Ksh 150 = Ksh 425. Makumi 7 + makumi 5 = 12, inayobeba mia 1."
            },
            "socraticHint": {
              "en": "Add ones (5+0), then tens (7+5 gives 12 tens).",
              "sw": "Jumlisha mamoja (5+0), kisha makumi (7+5 inaleta makumi 12)."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q08",
            "subStrandId": "substrand-math-g3-add",
            "type": "LISTEN_CHOOSE",
            "prompt": {
              "en": "Listen and select the correct regrouped total.",
              "sw": "Sikiliza kisha uchague jumla sahihi iliyobadilishwa."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "411",
                "explanation": {
                  "en": "You missed carrying into the tens and hundreds.",
                  "sw": "Ulikosa kubeba kwenye makumi na mamia."
                }
              },
              {
                "id": "b",
                "text": "421",
                "explanation": {
                  "en": "Correct!",
                  "sw": "Sahihi!"
                }
              },
              {
                "id": "c",
                "text": "521",
                "explanation": {
                  "en": "You added an extra hundred.",
                  "sw": "Uliongeza mia moja ya ziada."
                }
              }
            ],
            "correctOptionId": "b",
            "audioSpeechPrompt": {
              "textToSpeak": "Add two hundred and forty-six to one hundred and seventy-five.",
              "language": "en-KE"
            },
            "explanation": {
              "en": "246 + 175 = 421. 6+5=11 (carry 1); 4+7+1=12 (carry 1); 2+1+1=4.",
              "sw": "246 + 175 = 421. 6+5=11 (beba 1); 4+7+1=12 (beba 1); 2+1+1=4."
            },
            "socraticHint": {
              "en": "6 + 5 = 11 ones. The ones digit is 1.",
              "sw": "6 + 5 = mamoja 11. Tarakimu ya mwisho ya mamoja ni 1."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q09",
            "subStrandId": "substrand-math-g3-add",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "Mama Wanjiru sells sukuma wiki for Ksh 270 and tomatoes for Ksh 180. Make the total: Ksh 450.",
              "sw": "Mama Wanjiru anauza sukuma wiki kwa Ksh 270 na nyanya kwa Ksh 180. Kusanya jumla: Ksh 450."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 450,
              "unit": "KES"
            },
            "explanation": {
              "en": "270 + 180 = 450. You can make Ksh 450 using two 200 notes and one 50 note.",
              "sw": "270 + 180 = 450. Unaweza kutumia noti mbili za 200 na noti moja ya 50 kupata Ksh 450."
            },
            "socraticHint": {
              "en": "200 + 200 = 400. You need Ksh 50 more.",
              "sw": "200 + 200 = 400. Unahitaji Ksh 50 zaidi."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q10",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A matatu carried 385 passengers on Saturday and 268 passengers on Sunday. How many passengers in total?",
              "sw": "Matatu ilibeba abiria 385 Jumamosi na abiria 268 Jumapili. Je, ilibeba jumla ya abiria wangapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "643",
                "explanation": {
                  "en": "You forgot to add the 1 carried ten to the tens column.",
                  "sw": "Ulisahau kujumlisha kumi 1 uliyobeba kwenye makumi."
                }
              },
              {
                "id": "b",
                "text": "653",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "553",
                "explanation": {
                  "en": "You forgot to carry the 1 hundred to the hundreds column.",
                  "sw": "Ulisahau kubeba mia 1 kwenye safu ya mamia."
                }
              },
              {
                "id": "d",
                "text": "663",
                "explanation": {
                  "en": "You carried twice into the tens column.",
                  "sw": "Ulibeba mara mbili kwenye makumi kimakosa."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "385 + 268 = 653 passengers. 5+8=13 (carry 1); 8+6+1=15 (carry 1); 3+2+1=6.",
              "sw": "385 + 268 = abiria 653. 5+8=13 (beba 1); 8+6+1=15 (beba 1); 3+2+1=6."
            },
            "socraticHint": {
              "en": "Add ones (5+8=13), then tens (8+6+1=15).",
              "sw": "Jumlisha mamoja (5+8=13), kisha makumi (8+6+1=15)."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q11",
            "subStrandId": "substrand-math-g3-add",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Solve: 479 + 348",
              "sw": "Tafuta jibu: 479 + 348"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 827,
              "unit": ""
            },
            "explanation": {
              "en": "9 + 8 = 17 (carry 1). 7 + 4 + 1 = 12 tens (carry 1). 4 + 3 + 1 = 8 hundreds. Answer is 827.",
              "sw": "9 + 8 = 17 (beba 1). 7 + 4 + 1 = 12 (beba 1). 4 + 3 + 1 = 8. Jibu ni 827."
            },
            "socraticHint": {
              "en": "9 + 8 = 17. The ones digit is 7.",
              "sw": "9 + 8 = 17. Tarakimu ya mwisho ya mamoja ni 7."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-02-q12",
            "subStrandId": "substrand-math-g3-add",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "At Gikomba market, Mwangi sold 458 bags of cabbages and 374 bags of carrots. How many bags were sold altogether?",
              "sw": "Kwenye soko la Gikomba, Mwangi aliuza magunia 458 ya kabichi na 374 ya karoti. Je, aliuza jumla ya magunia mangapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "822",
                "explanation": {
                  "en": "You forgot to carry the 1 hundred.",
                  "sw": "Ulisahau kubeba mia 1."
                }
              },
              {
                "id": "b",
                "text": "832",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "732",
                "explanation": {
                  "en": "You did not add the carried hundred to 4+3.",
                  "sw": "Hukujumlisha mia uliyobeba kwa 4+3."
                }
              },
              {
                "id": "d",
                "text": "842",
                "explanation": {
                  "en": "You added 10 bags too many.",
                  "sw": "Uliongeza magunia 10 zaidi."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "458 + 374 = 832 bags. 8+4=12 (carry 1); 5+7+1=13 (carry 1); 4+3+1=8.",
              "sw": "458 + 374 = magunia 832. 8+4=12 (beba 1); 5+7+1=13 (beba 1); 4+3+1=8."
            },
            "socraticHint": {
              "en": "Both the ones and tens columns require regrouping.",
              "sw": "Safu zote mbili za mamoja na makumi zinahitaji kubadili."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      }
    ],
    "sourceStatus": "OFFICIAL_KICD"
  },
  {
    "id": "substrand-math-g3-sub",
    "strandId": "strand-math-g3-numbers",
    "code": "MATH-G3-SUB-02",
    "title": {
      "en": "Subtraction within 1,000",
      "sw": "Kutoa hadi 1,000"
    },
    "description": {
      "en": "Subtracting 3-digit numbers with place value decomposition and regrouping.",
      "sw": "Kutoa nambari zenye tarakimu 3 kwa kubadili thamani ya nafasi."
    },
    "order": 2,
    "prerequisiteIds": [
      "substrand-math-g3-add"
    ],
    "cbeCompetencies": [
      "Critical thinking and problem solving",
      "Financial literacy",
      "Learning to learn"
    ],
    "cbeValues": [
      "Responsibility",
      "Integrity",
      "Unity"
    ],
    "estimatedMinutes": 25,
    "quests": [
      {
        "id": "g3-math-num-03",
        "subStrandId": "substrand-math-g3-sub",
        "order": 1,
        "title": {
          "en": "Subtraction within 1,000 without Regrouping",
          "sw": "Kutoa hadi 1,000 bila Kubadili"
        },
        "storyContext": {
          "en": "Subtract 3-digit numbers without regrouping using place value in real-life problems. Guided by Mwangi.",
          "sw": "Kutoa nambari zenye tarakimu 3 bila kubadili kwa kutumia thamani ya nafasi. Ukiongozwa na Mwangi."
        },
        "characterName": "Mwangi",
        "characterAvatar": "elephant",
        "difficulty": 1,
        "estimatedMinutes": 6,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-02"
        ],
        "teachCards": [
          {
            "heading": {
              "en": "Subtracting by Place Value",
              "sw": "Kutoa kwa Thamani ya Nafasi"
            },
            "body": {
              "en": "Align digits vertically. Subtract ones from ones first. Next subtract tens, then hundreds.",
              "sw": "Panga tarakimu wima. Anza kwa kutoa mamoja kutoka mamoja. Kisha toa makumi na mamia."
            },
            "workedExample": {
              "en": "468 - 135: 8 - 5 = 3 ones. 6 - 3 = 3 tens. 4 - 1 = 3 hundreds. Difference = 333.",
              "sw": "468 - 135: Mamoja 8 - 5 = 3. Makumi 6 - 3 = 3. Mamia 4 - 1 = 3. Baki ni 333."
            },
            "imagePrompt": "A young Kenyan girl crossing out 3 counters from a group of 8 on a clean chalkboard."
          },
          {
            "heading": {
              "en": "Checking with Addition",
              "sw": "Kukagua kwa Kujumlisha"
            },
            "body": {
              "en": "You can check subtraction using addition. Add your answer to the smaller number.",
              "sw": "Unaweza kukagua kutoa kwa kujumlisha. Jumlisha jibu lako na nambari ndogo."
            },
            "workedExample": {
              "en": "To check 468 - 135 = 333: add 333 + 135. It gives 468, so the answer is correct!",
              "sw": "Kukagua 468 - 135 = 333: jumlisha 333 + 135. Inaleta 468, kwa hivyo jibu ni sahihi!"
            },
            "imagePrompt": "Two school children smiling and pointing to a double-sided chalkboard showing subtraction verified by addition."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-03-q01",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "What is 486 - 231?",
              "sw": "Tafuta baki: 486 - 231."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "255",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "245",
                "explanation": {
                  "en": "8 tens minus 3 tens is 5 tens, not 4.",
                  "sw": "Makumi 8 toa makumi 3 ni makumi 5, si 4."
                }
              },
              {
                "id": "c",
                "text": "265",
                "explanation": {
                  "en": "You added tens instead of subtracting.",
                  "sw": "Ulijumlisha makumi badala ya kutoa."
                }
              },
              {
                "id": "d",
                "text": "155",
                "explanation": {
                  "en": "4 hundreds minus 2 hundreds is 2 hundreds.",
                  "sw": "Mamia 4 toa mamia 2 ni mamia 2."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "6 - 1 = 5 ones, 8 - 3 = 5 tens, and 4 - 2 = 2 hundreds. Result is 255.",
              "sw": "6 - 1 = 5 mamoja, 8 - 3 = 5 makumi, na 4 - 2 = 2 mamia. Jibu ni 255."
            },
            "socraticHint": {
              "en": "Subtract column by column: 6-1, 8-3, 4-2.",
              "sw": "Toa safu kwa safu: 6-1, 8-3, 4-2."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q02",
            "subStrandId": "substrand-math-g3-sub",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Calculate: 375 - 142",
              "sw": "Kokotoa: 375 - 142"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 233,
              "unit": ""
            },
            "explanation": {
              "en": "5 - 2 = 3 ones. 7 - 4 = 3 tens. 3 - 1 = 2 hundreds. The answer is 233.",
              "sw": "Mamoja 5 - 2 = 3. Makumi 7 - 4 = 3. Mamia 3 - 1 = 2. Jibu ni 233."
            },
            "socraticHint": {
              "en": "Start with the ones: 5 - 2.",
              "sw": "Anza na mamoja: 5 - 2."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q03",
            "subStrandId": "substrand-math-g3-sub",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "True or False: 650 - 200 = 450.",
              "sw": "Kweli au Si Kweli: 650 - 200 = 450."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "6 hundreds minus 2 hundreds leaves 4 hundreds, so 650 - 200 = 450.",
              "sw": "Mamia 6 ukitoa mamia 2 unabakiwa na mamia 4, kwa hivyo 650 - 200 = 450."
            },
            "socraticHint": {
              "en": "Only the hundreds digit changes: 6 - 2 = 4.",
              "sw": "Tarakimu ya mamia pekee ndiyo inayobadilika: 6 - 2 = 4."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q04",
            "subStrandId": "substrand-math-g3-sub",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "Fill in the blank: 589 - [BLANK] = 509.",
              "sw": "Jaza pengo: 589 - [BLANK] = 509."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "80"
            ],
            "explanation": {
              "en": "The hundreds and ones stay the same. 8 tens were removed, so 80 was subtracted.",
              "sw": "Mamia na mamoja hayajabadilika. Makumi 8 yalitolewa, ikimaanisha 80 ilitolewa."
            },
            "socraticHint": {
              "en": "What must you subtract from 8 tens to get 0 tens?",
              "sw": "Unapaswa kutoa nini kutoka makumi 8 ili kubaki na makumi 0?"
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q05",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each subtraction problem with its difference.",
              "sw": "Oanisha kila swali la kutoa na jibu lake sahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "500 - 200",
                "rightId": "p0",
                "rightText": "300"
              },
              {
                "leftId": "p1",
                "leftText": "364 - 41",
                "rightId": "p1",
                "rightText": "323"
              },
              {
                "leftId": "p2",
                "leftText": "789 - 253",
                "rightId": "p2",
                "rightText": "536"
              },
              {
                "leftId": "p3",
                "leftText": "846 - 425",
                "rightId": "p3",
                "rightText": "421"
              }
            ],
            "explanation": {
              "en": "Each problem subtracts straight down without borrowing.",
              "sw": "Kila hesabu inatoa wima bila kuhitaji kukopa."
            },
            "socraticHint": {
              "en": "For 500 - 200, subtract 5 hundreds minus 2 hundreds.",
              "sw": "Kwa 500 - 200, toa mamia 5 kutoa mamia 2."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q06",
            "subStrandId": "substrand-math-g3-sub",
            "type": "ORDERING",
            "prompt": {
              "en": "Order the steps to subtract 578 - 243 vertically.",
              "sw": "Panga hatua za kutoa 578 - 243 kwa njia ya wima."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "s1",
                "text": "Align numbers neatly by place value."
              },
              {
                "id": "s2",
                "text": "Subtract the ones digits: 8 - 3 = 5."
              },
              {
                "id": "s3",
                "text": "Subtract the tens digits: 7 - 4 = 3."
              },
              {
                "id": "s4",
                "text": "Subtract the hundreds digits: 5 - 2 = 3 to get 335."
              }
            ],
            "correctOrderIds": [
              "s1",
              "s2",
              "s3",
              "s4"
            ],
            "explanation": {
              "en": "Align columns first, then subtract ones, tens, and hundreds.",
              "sw": "Panga safu kwanza, kisha toa mamoja, makumi, na mamia."
            },
            "socraticHint": {
              "en": "Always begin subtracting from the ones column on the right.",
              "sw": "Anza daima kutoa kuanzia safu ya mamoja upande wa kulia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q07",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A farmer in Meru harvested 495 watermelons. He sold 260 at the market. How many watermelons remain?",
              "sw": "Mkulima huko Meru alivuna tikiti maji 495. Aliuza 260 sokoni. Je, alibakiwa na tikiti maji ngapi?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "225",
                "explanation": {
                  "en": "9 tens minus 6 tens is 3 tens, not 2.",
                  "sw": "Makumi 9 toa makumi 6 ni makumi 3, si 2."
                }
              },
              {
                "id": "b",
                "text": "235",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "245",
                "explanation": {
                  "en": "You subtracted 5 tens instead of 6 tens.",
                  "sw": "Ulitoa makumi 5 badala ya makumi 6."
                }
              },
              {
                "id": "d",
                "text": "135",
                "explanation": {
                  "en": "4 hundreds minus 2 hundreds is 2 hundreds.",
                  "sw": "Mamia 4 toa mamia 2 ni mamia 2."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "495 - 260 = 235 watermelons remain.",
              "sw": "495 - 260 = tikiti maji 235 zimebaki."
            },
            "socraticHint": {
              "en": "5-0=5 ones, 9-6=3 tens, 4-2=2 hundreds.",
              "sw": "5-0=5 mamoja, 9-6=3 makumi, 4-2=2 mamia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q08",
            "subStrandId": "substrand-math-g3-sub",
            "type": "LISTEN_CHOOSE",
            "prompt": {
              "en": "Listen to the subtraction problem and pick the answer.",
              "sw": "Sikiliza swali la kutoa kisha uchague jibu."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "423",
                "explanation": {
                  "en": "7 tens minus 4 tens is 3 tens, not 2 tens.",
                  "sw": "Makumi 7 toa makumi 4 ni makumi 3, si 2."
                }
              },
              {
                "id": "b",
                "text": "433",
                "explanation": {
                  "en": "Correct!",
                  "sw": "Sahihi!"
                }
              },
              {
                "id": "c",
                "text": "443",
                "explanation": {
                  "en": "You subtracted only 3 tens.",
                  "sw": "Ulitoa makumi 3 pekee."
                }
              }
            ],
            "correctOptionId": "b",
            "audioSpeechPrompt": {
              "textToSpeak": "Six hundred and seventy-eight minus two hundred and forty-five.",
              "language": "en-KE"
            },
            "explanation": {
              "en": "678 - 245 = 433.",
              "sw": "678 - 245 = 433."
            },
            "socraticHint": {
              "en": "8 - 5 = 3 ones. 7 - 4 = 3 tens. 6 - 2 = 4 hundreds.",
              "sw": "8 - 5 = 3 mamoja. 7 - 4 = 3 makumi. 6 - 2 = 4 mamia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q09",
            "subStrandId": "substrand-math-g3-sub",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "Achieng had Ksh 500 and bought shoes for Ksh 300. Make the remaining amount: Ksh 200.",
              "sw": "Achieng alikuwa na Ksh 500 kisha akanunua viatu kwa Ksh 300. Kusanya pesa zilizobaki: Ksh 200."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 200,
              "unit": "KES"
            },
            "explanation": {
              "en": "Ksh 500 - Ksh 300 = Ksh 200. One Ksh 200 note makes the exact amount.",
              "sw": "Ksh 500 - Ksh 300 = Ksh 200. Noti moja ya Ksh 200 inaleta kiwango kamili."
            },
            "socraticHint": {
              "en": "5 hundreds minus 3 hundreds equals 2 hundreds.",
              "sw": "Mamia 5 toa mamia 3 ni sawa na mamia 2."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q10",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A school in Kisumu had 786 exercise books. They gave 452 books to Grade 3 pupils. How many books were left?",
              "sw": "Shule huko Kisumu ilikuwa na daftari 786. Waligawa daftari 452 kwa wanafunzi wa Gredi 3. Je, zilibaki daftari ngapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "324",
                "explanation": {
                  "en": "8 tens minus 5 tens is 3 tens, not 2.",
                  "sw": "Makumi 8 toa makumi 5 ni makumi 3, si 2."
                }
              },
              {
                "id": "b",
                "text": "334",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "344",
                "explanation": {
                  "en": "You subtracted 4 tens instead of 5 tens.",
                  "sw": "Ulitoa makumi 4 badala ya makumi 5."
                }
              },
              {
                "id": "d",
                "text": "234",
                "explanation": {
                  "en": "7 hundreds minus 4 hundreds is 3 hundreds, not 2.",
                  "sw": "Mamia 7 toa mamia 4 ni mamia 3, si 2."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "786 - 452 = 334 exercise books left.",
              "sw": "786 - 452 = daftari 334 zimebaki."
            },
            "socraticHint": {
              "en": "Subtract ones (6-2=4), tens (8-5=3), and hundreds (7-4=3).",
              "sw": "Toa mamoja (6-2=4), makumi (8-5=3), na mamia (7-4=3)."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q11",
            "subStrandId": "substrand-math-g3-sub",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Subtract: 897 - 563",
              "sw": "Toa: 897 - 563"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 334,
              "unit": ""
            },
            "explanation": {
              "en": "7 - 3 = 4 ones. 9 - 6 = 3 tens. 8 - 5 = 3 hundreds. Difference is 334.",
              "sw": "Mamoja 7 - 3 = 4. Makumi 9 - 6 = 3. Mamia 8 - 5 = 3. Baki ni 334."
            },
            "socraticHint": {
              "en": "Subtract from right to left: 7-3=4.",
              "sw": "Toa kutoka kulia kwenda kushoto: 7-3=4."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-03-q12",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "An artisan carved 678 wooden spoons and sold 346 at the cultural festival. How many spoons remain?",
              "sw": "Fundi alichonga vijiko 678 vya mti na kuuza 346 kwenye tamasha la utamaduni. Je, amebakiwa na vijiko vingapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "322",
                "explanation": {
                  "en": "7 tens minus 4 tens is 3 tens, not 2 tens.",
                  "sw": "Makumi 7 toa makumi 4 ni makumi 3, si 2."
                }
              },
              {
                "id": "b",
                "text": "332",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "342",
                "explanation": {
                  "en": "You subtracted 3 tens instead of 4 tens.",
                  "sw": "Ulitoa makumi 3 badala ya makumi 4."
                }
              },
              {
                "id": "d",
                "text": "432",
                "explanation": {
                  "en": "6 hundreds minus 3 hundreds is 3 hundreds.",
                  "sw": "Mamia 6 toa mamia 3 ni mamia 3."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "678 - 346 = 332 spoons remain.",
              "sw": "678 - 346 = vijiko 332 vimebaki."
            },
            "socraticHint": {
              "en": "8-6=2 ones, 7-4=3 tens, and 6-3=3 hundreds.",
              "sw": "8-6=2 mamoja, 7-4=3 makumi, na 6-3=3 mamia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      },
      {
        "id": "g3-math-num-04",
        "subStrandId": "substrand-math-g3-sub",
        "order": 2,
        "title": {
          "en": "Subtraction within 1,000 with Regrouping",
          "sw": "Kutoa hadi 1,000 kwa Kubadili"
        },
        "storyContext": {
          "en": "Subtract 3-digit numbers with regrouping tens to ones and hundreds to tens in practical tasks. Guided by Wanjiku.",
          "sw": "Kutoa nambari zenye tarakimu 3 kwa kubadili makumi kuwa mamoja na mamia kuwa makumi. Ukiongozwa na Wanjiku."
        },
        "characterName": "Wanjiku",
        "characterAvatar": "zebra",
        "difficulty": 2,
        "estimatedMinutes": 6,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-03"
        ],
        "teachCards": [
          {
            "heading": {
              "en": "Regrouping Tens to Ones",
              "sw": "Kubadili Kumi kuwa Mamoja"
            },
            "body": {
              "en": "When the top ones digit is smaller, borrow 1 ten. 1 ten becomes 10 ones.",
              "sw": "Tarakimu ya juu ya mamoja ikiwa ndogo, kopa kumi 1. Kumi 1 inakuwa mamoja 10."
            },
            "workedExample": {
              "en": "352 - 127: 2 cannot subtract 7. Borrow 1 ten: 12 - 7 = 5 ones. 4 - 2 = 2 tens. 3 - 1 = 2 hundreds. Total = 225.",
              "sw": "352 - 127: 2 huwezi kutoa 7. Kopa kumi 1: 12 - 7 = 5 mamoja. Makumi 4 - 2 = 2. Mamia 3 - 1 = 2. Jumla = 225."
            },
            "imagePrompt": "A friendly Kenyan teacher unbundling one bundle of 10 counting sticks into 10 single sticks to help a pupil subtract."
          },
          {
            "heading": {
              "en": "Regrouping Hundreds to Tens",
              "sw": "Kubadili Mia kuwa Makumi"
            },
            "body": {
              "en": "When the top tens digit is smaller, borrow 1 hundred. 1 hundred becomes 10 tens.",
              "sw": "Tarakimu ya juu ya makumi ikiwa ndogo, kopa mia 1. Mia 1 inakuwa makumi 10."
            },
            "workedExample": {
              "en": "528 - 264: 2 tens cannot subtract 6. Borrow 1 hundred: 12 tens - 6 = 6 tens. 4 - 2 = 2 hundreds. Total = 264.",
              "sw": "528 - 264: Makumi 2 huwezi kutoa 6. Kopa mia 1: makumi 12 - 6 = 6. Mamia 4 - 2 = 2. Jumla = 264."
            },
            "imagePrompt": "A colourful place-value mat showing 1 hundred flat block exchanged for 10 ten-rods in a classroom."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-04-q01",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "What is 342 - 128?",
              "sw": "Tafuta baki: 342 - 128."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "224",
                "explanation": {
                  "en": "You forgot to reduce 4 tens to 3 tens after borrowing.",
                  "sw": "Ulisahau kupunguza makumi 4 kuwa makumi 3 baada ya kukopa."
                }
              },
              {
                "id": "b",
                "text": "214",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "216",
                "explanation": {
                  "en": "You subtracted the top digit from the bottom digit (8 - 2 = 6).",
                  "sw": "Ulitoa nambari ya juu kutoka nambari ya chini (8 - 2 = 6)."
                }
              },
              {
                "id": "d",
                "text": "114",
                "explanation": {
                  "en": "You subtracted an extra hundred.",
                  "sw": "Ulitoa mia moja zaidi kimakosa."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "Borrow 1 ten: 12 - 8 = 4 ones. 3 - 2 = 1 ten. 3 - 1 = 2 hundreds. Answer is 214.",
              "sw": "Kopa kumi 1: 12 - 8 = 4 mamoja. 3 - 2 = kumi 1. 3 - 1 = 2 mamia. Jibu ni 214."
            },
            "socraticHint": {
              "en": "You cannot subtract 8 from 2. Borrow 1 ten to make 12 ones.",
              "sw": "Huwezi kutoa 8 kutoka 2. Kopa kumi 1 ili upate mamoja 12."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q02",
            "subStrandId": "substrand-math-g3-sub",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "True or False: In 453 - 128, since 3 is smaller than 8, we borrow 1 ten from 5 tens.",
              "sw": "Kweli au Si Kweli: Katika 453 - 128, kwa kuwa 3 ni ndogo kuliko 8, tunakopa kumi 1 kutoka makumi 5."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "Yes, we must regroup 1 ten into 10 ones so we can subtract 8 from 13.",
              "sw": "Ndiyo, lazima tubadilishe kumi 1 kuwa mamoja 10 ili tuweze kutoa 8 kutoka 13."
            },
            "socraticHint": {
              "en": "Always check if the top ones digit is larger or smaller than the bottom digit.",
              "sw": "Angalia daima kama tarakimu ya juu ya mamoja ni kubwa au ndogo kuliko ya chini."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q03",
            "subStrandId": "substrand-math-g3-sub",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Calculate: 265 - 138",
              "sw": "Kokotoa: 265 - 138"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 127,
              "unit": ""
            },
            "explanation": {
              "en": "Borrow 1 ten: 15 - 8 = 7 ones. 5 - 3 = 2 tens. 2 - 1 = 1 hundred. Answer is 127.",
              "sw": "Kopa kumi 1: 15 - 8 = 7 mamoja. 5 - 3 = 2 makumi. 2 - 1 = mia 1. Jibu ni 127."
            },
            "socraticHint": {
              "en": "Borrow 1 ten from 6 tens to make 15 ones.",
              "sw": "Kopa kumi 1 kutoka makumi 6 ili kupata mamoja 15."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q04",
            "subStrandId": "substrand-math-g3-sub",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "Subtract: 430 - 15 = [BLANK].",
              "sw": "Toa: 430 - 15 = [BLANK]."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "415"
            ],
            "explanation": {
              "en": "Borrow 1 ten: 10 - 5 = 5 ones. 2 - 1 = 1 ten. Hundreds stay 4. Answer is 415.",
              "sw": "Kopa kumi 1: 10 - 5 = 5 mamoja. 2 - 1 = kumi 1. Mamia yanabaki 4. Jibu ni 415."
            },
            "socraticHint": {
              "en": "Borrow from 3 tens to make 10 ones.",
              "sw": "Kopa kutoka makumi 3 ili kupata mamoja 10."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q05",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each regrouped subtraction with its correct result.",
              "sw": "Oanisha kila hesabu ya kutoa kwa kubadili na jibu lake sahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "254 - 38",
                "rightId": "p0",
                "rightText": "216"
              },
              {
                "leftId": "p1",
                "leftText": "420 - 150",
                "rightId": "p1",
                "rightText": "270"
              },
              {
                "leftId": "p2",
                "leftText": "536 - 219",
                "rightId": "p2",
                "rightText": "317"
              },
              {
                "leftId": "p3",
                "leftText": "641 - 280",
                "rightId": "p3",
                "rightText": "361"
              }
            ],
            "explanation": {
              "en": "Each question requires regrouping either from tens or from hundreds.",
              "sw": "Kila swali linahitaji kubadili kutoka makumi au kutoka mamia."
            },
            "socraticHint": {
              "en": "For 420 - 150, borrow 1 hundred: 12 tens - 5 tens = 7 tens.",
              "sw": "Kwa 420 - 150, kopa mia 1: makumi 12 - makumi 5 = makumi 7."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q06",
            "subStrandId": "substrand-math-g3-sub",
            "type": "ORDERING",
            "prompt": {
              "en": "Order the steps to subtract 462 - 137 correctly.",
              "sw": "Panga hatua za kutoa 462 - 137 kwa usahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "s1",
                "text": "Notice that 2 is less than 7, so borrow 1 ten from 6 tens."
              },
              {
                "id": "s2",
                "text": "2 ones become 12 ones. Subtract: 12 - 7 = 5."
              },
              {
                "id": "s3",
                "text": "6 tens became 5 tens. Subtract: 5 - 3 = 2."
              },
              {
                "id": "s4",
                "text": "Subtract hundreds: 4 - 1 = 3 to give 325."
              }
            ],
            "correctOrderIds": [
              "s1",
              "s2",
              "s3",
              "s4"
            ],
            "explanation": {
              "en": "First recognize the need to borrow, regroup into ones, subtract tens, and then hundreds.",
              "sw": "Kwanza tambua haja ya kukopa, badili kuwa mamoja, toa makumi, kisha mamia."
            },
            "socraticHint": {
              "en": "Start by identifying that you need to borrow for the ones column.",
              "sw": "Anza kwa kutambua kuwa unahitaji kukopa kwa ajili ya safu ya mamoja."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q07",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Baraka had Ksh 650. He spent Ksh 280 on a school bag at Kongowea market. How much money remained?",
              "sw": "Baraka alikuwa na Ksh 650. Alinunua mkoba wa shule kwa Ksh 280 sokoni Kongowea. Alibakiwa na pesa ngapi?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 470",
                "explanation": {
                  "en": "You forgot to reduce 6 hundreds to 5 hundreds after borrowing.",
                  "sw": "Ulisahau kupunguza mamia 6 kuwa mamia 5 baada ya kukopa."
                }
              },
              {
                "id": "b",
                "text": "Ksh 370",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "Ksh 380",
                "explanation": {
                  "en": "15 tens minus 8 tens is 7 tens, not 8 tens.",
                  "sw": "Makumi 15 toa makumi 8 ni makumi 7, si 8."
                }
              },
              {
                "id": "d",
                "text": "Ksh 430",
                "explanation": {
                  "en": "You subtracted the smaller digit from the larger digit in the tens.",
                  "sw": "Ulitoa tarakimu ndogo kutoka kubwa kwenye makumi kimakosa."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "Ksh 650 - Ksh 280: borrow 1 hundred to make 15 tens. 15 - 8 = 7 tens. 5 - 2 = 3 hundreds. Remaining is Ksh 370.",
              "sw": "Ksh 650 - Ksh 280: kopa mia 1 kupata makumi 15. 15 - 8 = 7. 5 - 2 = 3. Zimebaki Ksh 370."
            },
            "socraticHint": {
              "en": "Borrow 1 hundred for the tens: 15 tens minus 8 tens.",
              "sw": "Kopa mia 1 kwa ajili ya makumi: makumi 15 toa makumi 8."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q08",
            "subStrandId": "substrand-math-g3-sub",
            "type": "LISTEN_CHOOSE",
            "prompt": {
              "en": "Listen and select the correct answer.",
              "sw": "Sikiliza kisha uchague jibu sahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "367",
                "explanation": {
                  "en": "11 tens minus 4 tens is 7 tens, not 6 tens.",
                  "sw": "Makumi 11 toa makumi 4 ni makumi 7, si 6."
                }
              },
              {
                "id": "b",
                "text": "377",
                "explanation": {
                  "en": "Correct!",
                  "sw": "Sahihi!"
                }
              },
              {
                "id": "c",
                "text": "477",
                "explanation": {
                  "en": "You forgot to reduce the hundreds digit.",
                  "sw": "Ulisahau kupunguza tarakimu ya mamia."
                }
              }
            ],
            "correctOptionId": "b",
            "audioSpeechPrompt": {
              "textToSpeak": "Subtract one hundred and forty-six from five hundred and twenty-three.",
              "language": "en-KE"
            },
            "explanation": {
              "en": "523 - 146 = 377. Borrow from tens: 13-6=7. Borrow from hundreds: 11-4=7. Hundreds: 4-1=3.",
              "sw": "523 - 146 = 377. Kopa kwa makumi: 13-6=7. Kopa kwa mamia: 11-4=7. Mamia: 4-1=3."
            },
            "socraticHint": {
              "en": "Both ones and tens columns require borrowing.",
              "sw": "Safu zote mbili za mamoja na makumi zinahitaji kukopa."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q09",
            "subStrandId": "substrand-math-g3-sub",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "Mama Amina had Ksh 500. She bought groceries for Ksh 340. Make the change: Ksh 160.",
              "sw": "Mama Amina alikuwa na Ksh 500. Alinunua vyakula kwa Ksh 340. Kusanya chenji yake: Ksh 160."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 160,
              "unit": "KES"
            },
            "explanation": {
              "en": "Ksh 500 - Ksh 340 = Ksh 160. One Ksh 100, one Ksh 50, and one Ksh 10 coin make Ksh 160.",
              "sw": "Ksh 500 - Ksh 340 = Ksh 160. Noti ya 100, noti ya 50, na sarafu ya 10 zinaleta Ksh 160."
            },
            "socraticHint": {
              "en": "Start with Ksh 100 note, add Ksh 50 note, then Ksh 10 coin.",
              "sw": "Anza na noti ya Ksh 100, ongeza noti ya Ksh 50, kisha sarafu ya Ksh 10."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q10",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A poultry farmer in Naivasha collected 724 eggs. She sold 158 eggs to a local bakery. How many eggs remained?",
              "sw": "Mfugaji wa kuku huko Naivasha alikusanya mayai 724. Aliuza mayai 158 kwa duka la mikate. Je, yalibaki mayai mangapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "576",
                "explanation": {
                  "en": "You forgot to reduce the hundreds digit after borrowing.",
                  "sw": "Ulisahau kupunguza tarakimu ya mamia baada ya kukopa."
                }
              },
              {
                "id": "b",
                "text": "566",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "676",
                "explanation": {
                  "en": "You subtracted without borrowing in the hundreds column.",
                  "sw": "Ulitoa bila kukopa kwenye safu ya mamia."
                }
              },
              {
                "id": "d",
                "text": "556",
                "explanation": {
                  "en": "11 tens minus 5 tens is 6 tens, not 5 tens.",
                  "sw": "Makumi 11 toa makumi 5 ni makumi 6, si 5."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "724 - 158 = 566 eggs. 14-8=6 ones; 11-5=6 tens; 6-1=5 hundreds.",
              "sw": "724 - 158 = mayai 566 yamebaki. 14-8=6 mamoja; 11-5=6 makumi; 6-1=5 mamia."
            },
            "socraticHint": {
              "en": "Borrow for the ones (14-8), then borrow for the tens (11-5).",
              "sw": "Kopa kwa ajili ya mamoja (14-8), kisha kopa kwa ajili ya makumi (11-5)."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q11",
            "subStrandId": "substrand-math-g3-sub",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Work out: 615 - 279",
              "sw": "Kokotoa: 615 - 279"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 336,
              "unit": ""
            },
            "explanation": {
              "en": "Borrow for ones: 15 - 9 = 6. Borrow for tens: 10 - 7 = 3. Hundreds: 5 - 2 = 3. Answer is 336.",
              "sw": "Kopa kwa mamoja: 15 - 9 = 6. Kopa kwa makumi: 10 - 7 = 3. Mamia: 5 - 2 = 3. Jibu ni 336."
            },
            "socraticHint": {
              "en": "Borrow from tens to make 15 ones, then borrow from hundreds for the tens column.",
              "sw": "Kopa kutoka makumi kupata mamoja 15, kisha kopa kutoka mamia kwa ajili ya makumi."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-04-q12",
            "subStrandId": "substrand-math-g3-sub",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "An elephant sanctuary had 542 visitors on Friday and 286 visitors on Saturday. How many more visitors came on Friday?",
              "sw": "Hifadhi ya tembo ilikuwa na wageni 542 Ijumaa na 286 Jumamosi. Je, Ijumaa ilikuwa na wageni wangapi zaidi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "266",
                "explanation": {
                  "en": "13 tens minus 8 tens is 5 tens, not 6 tens.",
                  "sw": "Makumi 13 toa makumi 8 ni makumi 5, si 6."
                }
              },
              {
                "id": "b",
                "text": "256",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "c",
                "text": "356",
                "explanation": {
                  "en": "You forgot to reduce 5 hundreds to 4 hundreds after borrowing.",
                  "sw": "Ulisahau kupunguza mamia 5 kuwa mamia 4 baada ya kukopa."
                }
              },
              {
                "id": "d",
                "text": "366",
                "explanation": {
                  "en": "You made errors in both hundreds and tens columns.",
                  "sw": "Ulikosea kwenye safu zote mbili za mamia na makumi."
                }
              }
            ],
            "correctOptionId": "b",
            "explanation": {
              "en": "542 - 286 = 256 more visitors on Friday. 12-6=6; 13-8=5; 4-2=2.",
              "sw": "542 - 286 = wageni 256 zaidi siku ya Ijumaa. 12-6=6; 13-8=5; 4-2=2."
            },
            "socraticHint": {
              "en": "Subtract 286 from 542 using two regrouping steps.",
              "sw": "Toa 286 kutoka 542 kwa kutumia hatua mbili za kubadili."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      }
    ],
    "sourceStatus": "OFFICIAL_KICD"
  },
  {
    "id": "substrand-math-g3-mult",
    "strandId": "strand-math-g3-numbers",
    "code": "MATH-G3-SUB-03",
    "title": {
      "en": "Simple Multiplication",
      "sw": "Kuzidisha Rahisi"
    },
    "description": {
      "en": "Repeated addition of equal groups and multiplication tables 2, 3, 4, 5, 10.",
      "sw": "Kujumlisha makundi sawa na jedwali za kuzidisha 2, 3, 4, 5, na 10."
    },
    "order": 3,
    "prerequisiteIds": [
      "substrand-math-g3-sub"
    ],
    "cbeCompetencies": [
      "Critical thinking and problem solving",
      "Financial literacy",
      "Learning to learn"
    ],
    "cbeValues": [
      "Responsibility",
      "Integrity",
      "Unity"
    ],
    "estimatedMinutes": 25,
    "quests": [
      {
        "id": "g3-math-num-05",
        "subStrandId": "substrand-math-g3-mult",
        "order": 1,
        "title": {
          "en": "Simple Multiplication as Repeated Addition",
          "sw": "Kuzidisha Rahisi kama Kujumlisha Kitaratibu"
        },
        "storyContext": {
          "en": "Represent multiplication as repeated addition of equal groups in practical everyday situations. Guided by Zawadi.",
          "sw": "Kuelewa na kuwakilisha kuzidisha kama kujumlisha makundi yaliyo sawa katika maisha ya kila siku. Ukiongozwa na Zawadi."
        },
        "characterName": "Zawadi",
        "characterAvatar": "giraffe",
        "difficulty": 1,
        "estimatedMinutes": 6,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-04"
        ],
        "teachCards": [
          {
            "heading": {
              "en": "Multiplication Means Equal Groups",
              "sw": "Kuzidisha ni Makundi Sawa"
            },
            "body": {
              "en": "Multiplication is adding equal groups together. Count how many groups and items in each group.",
              "sw": "Kuzidisha ni kujumlisha makundi yaliyo sawa. Hesabu makundi mangapi na idadi katika kila kundi."
            },
            "workedExample": {
              "en": "3 baskets with 4 mangoes each: 4 + 4 + 4 = 12 mangoes. 3 groups of 4 is 3 × 4 = 12.",
              "sw": "Vikapu 3 vyenye maembe 4 kila kimoja: 4 + 4 + 4 = 12. Makundi 3 ya 4 ni 3 × 4 = 12."
            },
            "imagePrompt": "Three woven kiondo baskets sitting on a sisal mat, each holding exactly four ripe yellow mangoes."
          },
          {
            "heading": {
              "en": "The Multiplication Sign (×)",
              "sw": "Alama ya Kuzidisha (×)"
            },
            "body": {
              "en": "The multiplication sign × means 'groups of' or 'times'. 4 × 2 means 4 groups of 2.",
              "sw": "Alama ya kuzidisha × inamaanisha 'makundi ya' au 'mara'. 4 × 2 inamaanisha makundi 4 ya 2."
            },
            "workedExample": {
              "en": "2 + 2 + 2 + 2 = 8. There are 4 groups of 2. So, 4 × 2 = 8.",
              "sw": "2 + 2 + 2 + 2 = 8. Kuna makundi 4 ya 2. Kwa hivyo, 4 × 2 = 8."
            },
            "imagePrompt": "A cheerful Kenyan teacher pointing to a blackboard showing four pairs of neat green counting sticks."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-05-q01",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Which repeated addition sentence means 3 groups of 5?",
              "sw": "Ni sentensi gani ya kujumlisha inayomaanisha makundi 3 ya 5?"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "5 + 5 + 5",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "3 + 3 + 3 + 3 + 3",
                "explanation": {
                  "en": "This shows 5 groups of 3, not 3 groups of 5.",
                  "sw": "Hii inaonyesha makundi 5 ya 3, si makundi 3 ya 5."
                }
              },
              {
                "id": "c",
                "text": "3 + 5",
                "explanation": {
                  "en": "This is simple addition of 3 and 5, not 3 groups of 5.",
                  "sw": "Huu ni ujumlishaji rahisi wa 3 na 5, si makundi 3 ya 5."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "3 groups of 5 means adding the number 5 three times: 5 + 5 + 5 = 15.",
              "sw": "Makundi 3 ya 5 yanamaanisha kuongeza nambari 5 mara tatu: 5 + 5 + 5 = 15."
            },
            "socraticHint": {
              "en": "Write 5 three times.",
              "sw": "Andika 5 mara tatu."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q02",
            "subStrandId": "substrand-math-g3-mult",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "2 + 2 + 2 + 2 gives the same total as 4 × 2.",
              "sw": "2 + 2 + 2 + 2 inatoa jumla sawa na 4 × 2."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "Adding 2 four times gives 8. 4 × 2 also gives 8.",
              "sw": "Kujumlisha 2 mara nne kunatoa 8. Pia 4 × 2 ni 8."
            },
            "socraticHint": {
              "en": "Count how many times 2 is added.",
              "sw": "Hesabu ni mara ngapi 2 imeongezwa."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q03",
            "subStrandId": "substrand-math-g3-mult",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "A farmer has 4 hens. Each hen lays 3 eggs. How many eggs in total? (3 + 3 + 3 + 3)",
              "sw": "Mkulima ana kuku 4. Kila kuku anataga mayai 3. Ni mayai mangapi kwa jumla? (3 + 3 + 3 + 3)"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 12,
              "unit": ""
            },
            "explanation": {
              "en": "4 groups of 3 eggs: 3 + 3 + 3 + 3 = 12 eggs.",
              "sw": "Makundi 4 ya mayai 3: 3 + 3 + 3 + 3 = mayai 12."
            },
            "socraticHint": {
              "en": "Add: 3 + 3 = 6, 6 + 3 = 9, 9 + 3 = 12.",
              "sw": "Jumlisha: 3 + 3 = 6, 6 + 3 = 9, 9 + 3 = 12."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q04",
            "subStrandId": "substrand-math-g3-mult",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "Complete the multiplication sentence: 5 + 5 + 5 = ___ × 5",
              "sw": "Kamilisha sentensi ya kuzidisha: 5 + 5 + 5 = ___ × 5"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "3",
              "tatu",
              "three"
            ],
            "explanation": {
              "en": "There are 3 groups of 5, so 5 + 5 + 5 = 3 × 5.",
              "sw": "Kuna makundi 3 ya 5, kwa hivyo 5 + 5 + 5 = 3 × 5."
            },
            "socraticHint": {
              "en": "Count how many times the number 5 is written.",
              "sw": "Hesabu idadi ya mara ambazo nambari 5 imeandikwa."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q05",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each multiplication fact to its repeated addition sentence.",
              "sw": "Oanisha kila zao la kuzidisha na sentensi yake ya kujumlisha mara kwa mara."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "2 × 6",
                "rightId": "p0",
                "rightText": "6 + 6"
              },
              {
                "leftId": "p1",
                "leftText": "4 × 3",
                "rightId": "p1",
                "rightText": "3 + 3 + 3 + 3"
              },
              {
                "leftId": "p2",
                "leftText": "3 × 4",
                "rightId": "p2",
                "rightText": "4 + 4 + 4"
              },
              {
                "leftId": "p3",
                "leftText": "5 × 2",
                "rightId": "p3",
                "rightText": "2 + 2 + 2 + 2 + 2"
              }
            ],
            "explanation": {
              "en": "The first number tells how many equal groups there are, and the second tells the size of each group.",
              "sw": "Nambari ya kwanza inaonyesha idadi ya makundi, na ya pili inaonyesha ukubwa wa kila kundi."
            },
            "socraticHint": {
              "en": "Look at how many times each number is repeated.",
              "sw": "Angalia idadi ya mara ambazo kila nambari inajirudia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q06",
            "subStrandId": "substrand-math-g3-mult",
            "type": "ORDERING",
            "prompt": {
              "en": "Put the steps in order to solve: 4 bunches with 3 sukuma wiki stalks each.",
              "sw": "Panga hatua kwa mpangilio sahihi kutatua: mafungu 4 yenye sukuma wiki 3 kila moja."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "step1",
                "text": {
                  "en": "Identify 4 equal bunches of sukuma wiki",
                  "sw": "Tambua mafungu 4 yaliyo sawa ya sukuma wiki"
                }
              },
              {
                "id": "step2",
                "text": {
                  "en": "Write repeated addition: 3 + 3 + 3 + 3",
                  "sw": "Andika kujumlisha: 3 + 3 + 3 + 3"
                }
              },
              {
                "id": "step3",
                "text": {
                  "en": "Write the multiplication sentence: 4 × 3",
                  "sw": "Andika sentensi ya kuzidisha: 4 × 3"
                }
              },
              {
                "id": "step4",
                "text": {
                  "en": "Calculate the total: 12 stalks",
                  "sw": "Kokotoa jumla: sukuma wiki 12"
                }
              }
            ],
            "correctOrderIds": [
              "step1",
              "step2",
              "step3",
              "step4"
            ],
            "explanation": {
              "en": "First spot the equal groups, write addition, turn it into multiplication, then find 12.",
              "sw": "Kwanza tambua makundi sawa, andika kujumlisha, badilisha kuwa kuzidisha, kisha pata 12."
            },
            "socraticHint": {
              "en": "Start by identifying the bunches.",
              "sw": "Anza kwa kutambua mafungu."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q07",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Wanjiku buys 3 packets of pencils. Each packet has 6 pencils. How many pencils does she have?",
              "sw": "Wanjiku ananunua pakiti 3 za penseli. Kila pakiti ina penseli 6. Ana penseli ngapi?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "18",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "9",
                "explanation": {
                  "en": "You added 3 + 6 instead of multiplying 3 × 6.",
                  "sw": "Ulijumlisha 3 + 6 badala ya kuzidisha 3 × 6."
                }
              },
              {
                "id": "c",
                "text": "15",
                "explanation": {
                  "en": "This is 3 × 5. Each packet has 6 pencils.",
                  "sw": "Hii ni 3 × 5. Kila pakiti ina penseli 6."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "3 groups of 6 pencils: 6 + 6 + 6 = 18 pencils (3 × 6 = 18).",
              "sw": "Makundi 3 ya penseli 6: 6 + 6 + 6 = penseli 18 (3 × 6 = 18)."
            },
            "socraticHint": {
              "en": "Add 6 three times.",
              "sw": "Jumlisha 6 mara tatu."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q08",
            "subStrandId": "substrand-math-g3-mult",
            "type": "LISTEN_CHOOSE",
            "prompt": {
              "en": "Listen carefully. Which multiplication sentence matches what you heard?",
              "sw": "Sikiliza kwa makini. Ni sentensi gani ya kuzidisha inayolingana na ulichosikia?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "5 × 4",
                "explanation": {
                  "en": "Correct!",
                  "sw": "Sahihi!"
                }
              },
              {
                "id": "b",
                "text": "5 + 4",
                "explanation": {
                  "en": "You chose addition instead of groups of multiplication.",
                  "sw": "Ulichagua kujumlisha badala ya kuzidisha makundi."
                }
              },
              {
                "id": "c",
                "text": "4 × 4",
                "explanation": {
                  "en": "The speaker said five groups, not four groups.",
                  "sw": "Msemaji alisema makundi matano, si makundi manne."
                }
              }
            ],
            "correctOptionId": "a",
            "audioSpeechPrompt": {
              "textToSpeak": "Five groups of four cows",
              "language": "en-KE"
            },
            "explanation": {
              "en": "'Five groups of four' is written as 5 × 4.",
              "sw": "'Makundi matano ya nne' huandikwa kama 5 × 4."
            },
            "socraticHint": {
              "en": "Listen for the number of groups first.",
              "sw": "Sikiliza idadi ya makundi kwanza."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q09",
            "subStrandId": "substrand-math-g3-mult",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "At Kongowea market, 5 fruit stalls each display 4 sweet pineapples. How many pineapples altogether?",
              "sw": "Katika soko la Kongowea, vibanda 5 vya matunda kila kimoja kina nanasi 4 tamu. Ni nanasi ngapi kwa jumla?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 20,
              "unit": ""
            },
            "explanation": {
              "en": "5 stalls with 4 pineapples each: 4 + 4 + 4 + 4 + 4 = 20 pineapples (5 × 4 = 20).",
              "sw": "Vibanda 5 vyenye nanasi 4 kila kimoja: 4 + 4 + 4 + 4 + 4 = nanasi 20 (5 × 4 = 20)."
            },
            "socraticHint": {
              "en": "Skip count by 4 five times: 4, 8, 12, 16, 20.",
              "sw": "Ruka kwa 4 mara tano: 4, 8, 12, 16, 20."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q10",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Which arrangement represents 3 rows with 4 tree seedlings in each row?",
              "sw": "Ni mpangilio gani unaowakilisha safu 3 zenye miche 4 ya miti katika kila safu?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "3 rows of 4 (Total 12)",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "4 rows of 4 (Total 16)",
                "explanation": {
                  "en": "There are only 3 rows, not 4 rows.",
                  "sw": "Kuna safu 3 tu, si safu 4."
                }
              },
              {
                "id": "c",
                "text": "3 rows of 3 (Total 9)",
                "explanation": {
                  "en": "Each row must have 4 seedlings, not 3.",
                  "sw": "Kila safu lazima iwe na miche 4, si 3."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "3 rows with 4 seedlings in each row means 3 × 4 = 12 seedlings.",
              "sw": "Safu 3 zenye miche 4 katika kila safu inamaanisha 3 × 4 = miche 12."
            },
            "socraticHint": {
              "en": "Multiply the number of rows by seedlings per row.",
              "sw": "Zidisha idadi ya safu kwa miche katika kila safu."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q11",
            "subStrandId": "substrand-math-g3-mult",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Find the total value: 7 + 7 + 7 = 3 × 7 = ?",
              "sw": "Pata jumla: 7 + 7 + 7 = 3 × 7 = ?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 21,
              "unit": ""
            },
            "explanation": {
              "en": "7 + 7 = 14, and 14 + 7 = 21. Therefore, 3 × 7 = 21.",
              "sw": "7 + 7 = 14, na 14 + 7 = 21. Hivyo, 3 × 7 = 21."
            },
            "socraticHint": {
              "en": "Add 7 three times.",
              "sw": "Jumlisha 7 mara tatu."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-05-q12",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A matatu has 4 rows of seats with 3 passengers in each row. At the stage, 2 passengers get off. How many passengers remain?",
              "sw": "Matatu ina safu 4 za viti zenye abiria 3 kila safu. Kwenye steji, abiria 2 wanashuka. Je, wamebaki abiria wangapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "10",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "12",
                "explanation": {
                  "en": "12 is the starting total; you forgot to subtract the 2 passengers who got off.",
                  "sw": "12 ni jumla ya mwanzo; ulisahau kutoa abiria 2 walioshuka."
                }
              },
              {
                "id": "c",
                "text": "14",
                "explanation": {
                  "en": "You added 2 passengers instead of subtracting those who got off.",
                  "sw": "Uliongeza abiria 2 badala ya kutoa wale walioshuka."
                }
              },
              {
                "id": "d",
                "text": "5",
                "explanation": {
                  "en": "You added 4 + 3 - 2 instead of multiplying 4 × 3 first.",
                  "sw": "Ulijumlisha 4 + 3 - 2 badala ya kuanza kuzidisha 4 × 3."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "First multiply rows and passengers: 4 × 3 = 12. Then subtract: 12 - 2 = 10 passengers remain.",
              "sw": "Kwanza zidisha safu na abiria: 4 × 3 = 12. Kisha toa: 12 - 2 = abiria 10 wamebaki."
            },
            "socraticHint": {
              "en": "Find 4 × 3 first, then take away 2.",
              "sw": "Pata 4 × 3 kwanza, kisha toa 2."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      },
      {
        "id": "g3-math-num-06",
        "subStrandId": "substrand-math-g3-mult",
        "order": 2,
        "title": {
          "en": "Multiplication Tables: 2, 3, 4, 5, and 10",
          "sw": "Jedwali za Kuzidisha: 2, 3, 4, 5, na 10"
        },
        "storyContext": {
          "en": "Multiply single-digit numbers by 2, 3, 4, 5, and 10 using skip counting and recall multiplication facts. Guided by Otieno.",
          "sw": "Kuzidisha nambari za tarakimu moja kwa 2, 3, 4, 5, na 10 kwa kuruka nambari na kukumbuka jedwali za kuzidisha. Ukiongozwa na Otieno."
        },
        "characterName": "Otieno",
        "characterAvatar": "lion",
        "difficulty": 2,
        "estimatedMinutes": 7,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-05"
        ],
        "teachCards": [
          {
            "heading": {
              "en": "Skip Counting by 5s and 10s",
              "sw": "Kuruka Nambari kwa 5 na 10"
            },
            "body": {
              "en": "Skip counting helps you multiply fast. Skip counting by 5 goes: 5, 10, 15, 20, 25.",
              "sw": "Kuruka nambari husaidia kuzidisha haraka. Kuruka kwa 5 huenda: 5, 10, 15, 20, 25."
            },
            "workedExample": {
              "en": "What is 4 × 5? Count by 5 four times: 5, 10, 15, 20. So, 4 × 5 = 20.",
              "sw": "4 × 5 ni ngapi? Ruka kwa 5 mara nne: 5, 10, 15, 20. Kwa hivyo, 4 × 5 = 20."
            },
            "imagePrompt": "A smiling Kenyan girl skipping along a numbered stepping stone path in a sunny school compound."
          },
          {
            "heading": {
              "en": "Multiplying by 10 is Easy",
              "sw": "Kuzidisha kwa 10 ni Rahisi"
            },
            "body": {
              "en": "When you multiply any whole number by 10, write a zero at the end.",
              "sw": "Unapozidisha nambari nzima kwa 10, weka sifuri mwishoni mwa nambari hiyo."
            },
            "workedExample": {
              "en": "7 × 10 = 70. 7 tens is seventy. 3 × 10 = 30.",
              "sw": "7 × 10 = 70. Makumi 7 ni sabini. 3 × 10 = 30."
            },
            "imagePrompt": "Bundles of 10 clean sugarcane stalks tied with sisal twine displayed in a Western Kenya roadside market."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-06-q01",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "What is 3 × 2?",
              "sw": "3 × 2 ni ngapi?"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "6",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "5",
                "explanation": {
                  "en": "You added 3 + 2 instead of multiplying.",
                  "sw": "Ulijumlisha 3 + 2 badala ya kuzidisha."
                }
              },
              {
                "id": "c",
                "text": "7",
                "explanation": {
                  "en": "Check your 2 times table: 2, 4, 6.",
                  "sw": "Angalia jedwali la 2: 2, 4, 6."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "3 × 2 = 6 (2 + 2 + 2 = 6).",
              "sw": "3 × 2 = 6 (2 + 2 + 2 = 6)."
            },
            "socraticHint": {
              "en": "Count by twos three times: 2, 4, 6.",
              "sw": "Hesabu kwa mbili mara tatu: 2, 4, 6."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q02",
            "subStrandId": "substrand-math-g3-mult",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "5 × 4 is equal to 20.",
              "sw": "5 × 4 ni sawa na 20."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "Skip counting by 5 four times gives 20.",
              "sw": "Kuruka kwa 5 mara nne kunaleta 20."
            },
            "socraticHint": {
              "en": "5, 10, 15, 20.",
              "sw": "5, 10, 15, 20."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q03",
            "subStrandId": "substrand-math-g3-mult",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Calculate: 7 × 10 = ?",
              "sw": "Hesabu: 7 × 10 = ?"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 70,
              "unit": ""
            },
            "explanation": {
              "en": "When multiplying 7 by 10, add a zero: 7 × 10 = 70.",
              "sw": "Unapozidisha 7 kwa 10, ongeza sifuri: 7 × 10 = 70."
            },
            "socraticHint": {
              "en": "What is 7 tens?",
              "sw": "Makumi 7 ni ngapi?"
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q04",
            "subStrandId": "substrand-math-g3-mult",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "Fill in the missing number in the 5s pattern: 5, 10, 15, ___, 25.",
              "sw": "Jaza nambari inayokosekana katika ruwaza ya 5: 5, 10, 15, ___, 25."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "20",
              "ishirini",
              "twenty"
            ],
            "explanation": {
              "en": "15 + 5 = 20. The missing number in the sequence is 20.",
              "sw": "15 + 5 = 20. Nambari inayokosekana katika mlolongo ni 20."
            },
            "socraticHint": {
              "en": "Add 5 to 15.",
              "sw": "Ongeza 5 kwa 15."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q05",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each multiplication question to its correct product.",
              "sw": "Oanisha kila swali la kuzidisha na zao lake sahihi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "4 × 3",
                "rightId": "p0",
                "rightText": "12"
              },
              {
                "leftId": "p1",
                "leftText": "5 × 5",
                "rightId": "p1",
                "rightText": "25"
              },
              {
                "leftId": "p2",
                "leftText": "3 × 3",
                "rightId": "p2",
                "rightText": "9"
              },
              {
                "leftId": "p3",
                "leftText": "8 × 10",
                "rightId": "p3",
                "rightText": "80"
              }
            ],
            "explanation": {
              "en": "4 × 3 = 12; 5 × 5 = 25; 3 × 3 = 9; 8 × 10 = 80.",
              "sw": "4 × 3 = 12; 5 × 5 = 25; 3 × 3 = 9; 8 × 10 = 80."
            },
            "socraticHint": {
              "en": "Use skip counting for 3, 5, and 10.",
              "sw": "Tumia kuruka nambari kwa 3, 5, na 10."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q06",
            "subStrandId": "substrand-math-g3-mult",
            "type": "ORDERING",
            "prompt": {
              "en": "Order these numbers in skip counting by 4 from smallest to largest.",
              "sw": "Panga nambari hizi kwa kuruka kwa 4 kuanzia ndogo hadi kubwa."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "n4",
                "text": {
                  "en": "4",
                  "sw": "4"
                }
              },
              {
                "id": "n8",
                "text": {
                  "en": "8",
                  "sw": "8"
                }
              },
              {
                "id": "n12",
                "text": {
                  "en": "12",
                  "sw": "12"
                }
              },
              {
                "id": "n16",
                "text": {
                  "en": "16",
                  "sw": "16"
                }
              },
              {
                "id": "n20",
                "text": {
                  "en": "20",
                  "sw": "20"
                }
              }
            ],
            "correctOrderIds": [
              "n4",
              "n8",
              "n12",
              "n16",
              "n20"
            ],
            "explanation": {
              "en": "Skip counting by 4: 4, 8, 12, 16, 20.",
              "sw": "Kuruka kwa 4: 4, 8, 12, 16, 20."
            },
            "socraticHint": {
              "en": "Start with 4 and add 4 each time.",
              "sw": "Anza na 4 kisha ongeza 4 kila mara."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q07",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Otieno serves samosas on 5 plates. Each plate has 4 samosas. How many samosas in total?",
              "sw": "Otieno anapakua sambusa kwenye sahani 5. Kila sahani ina sambusa 4. Ni sambusa ngapi kwa jumla?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "20",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "9",
                "explanation": {
                  "en": "You added 5 + 4 instead of multiplying 5 × 4.",
                  "sw": "Ulijumlisha 5 + 4 badala ya kuzidisha 5 × 4."
                }
              },
              {
                "id": "c",
                "text": "24",
                "explanation": {
                  "en": "This would be 6 plates of 4 samosas.",
                  "sw": "Hii ingekuwa sahani 6 za sambusa 4."
                }
              },
              {
                "id": "d",
                "text": "16",
                "explanation": {
                  "en": "This is only 4 plates of 4 samosas.",
                  "sw": "Hii ni sahani 4 tu za sambusa 4."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "5 plates × 4 samosas = 20 samosas in total.",
              "sw": "Sahani 5 × sambusa 4 = sambusa 20 kwa jumla."
            },
            "socraticHint": {
              "en": "Skip count by 4 five times: 4, 8, 12, 16, 20.",
              "sw": "Ruka kwa 4 mara tano: 4, 8, 12, 16, 20."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q08",
            "subStrandId": "substrand-math-g3-mult",
            "type": "LISTEN_CHOOSE",
            "prompt": {
              "en": "Listen and choose the matching number sentence.",
              "sw": "Sikiliza kisha chagua sentensi ya nambari inayolingana."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "4 × 5 = 20",
                "explanation": {
                  "en": "Correct!",
                  "sw": "Sahihi!"
                }
              },
              {
                "id": "b",
                "text": "4 + 5 = 9",
                "explanation": {
                  "en": "You chose addition instead of multiplication.",
                  "sw": "Ulichagua kujumlisha badala ya kuzidisha."
                }
              },
              {
                "id": "c",
                "text": "5 - 4 = 1",
                "explanation": {
                  "en": "You chose subtraction instead of multiplication.",
                  "sw": "Ulichagua kutoa badala ya kuzidisha."
                }
              }
            ],
            "correctOptionId": "a",
            "audioSpeechPrompt": {
              "textToSpeak": "Four times five equals twenty",
              "language": "en-KE"
            },
            "explanation": {
              "en": "The speaker said 'Four times five equals twenty', which is 4 × 5 = 20.",
              "sw": "Msemaji alisema 'Nne mara tano ni sawa na ishirini', ambayo ni 4 × 5 = 20."
            },
            "socraticHint": {
              "en": "Look for the multiplication symbol ×.",
              "sw": "Tafuta alama ya kuzidisha ×."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q09",
            "subStrandId": "substrand-math-g3-mult",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "A dairy cow gives 5 litres of fresh milk every day. How many litres does it give in 7 days?",
              "sw": "Ng'ombe wa maziwa anatoa lita 5 za maziwa safi kila siku. Anatoa lita ngapi kwa siku 7?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 35,
              "unit": ""
            },
            "explanation": {
              "en": "7 days × 5 litres per day = 35 litres (7 × 5 = 35).",
              "sw": "Siku 7 × lita 5 kwa siku = lita 35 (7 × 5 = 35)."
            },
            "socraticHint": {
              "en": "Count by 5 seven times: 5, 10, 15, 20, 25, 30, 35.",
              "sw": "Ruka kwa 5 mara saba: 5, 10, 15, 20, 25, 30, 35."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q10",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Which mathematical statement is true?",
              "sw": "Ni kauli gani ya kihisabati iliyo ya kweli?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "4 × 5 = 2 × 10",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "3 × 4 = 2 × 5",
                "explanation": {
                  "en": "3 × 4 is 12, but 2 × 5 is 10. They are not equal.",
                  "sw": "3 × 4 ni 12, lakini 2 × 5 ni 10. Hazilingani."
                }
              },
              {
                "id": "c",
                "text": "5 × 2 = 3 × 4",
                "explanation": {
                  "en": "5 × 2 is 10, but 3 × 4 is 12. They are not equal.",
                  "sw": "5 × 2 ni 10, lakini 3 × 4 ni 12. Hazilingani."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "4 × 5 = 20 and 2 × 10 = 20. Both expressions equal 20.",
              "sw": "4 × 5 = 20 na 2 × 10 = 20. Zote zina jibu sawa la 20."
            },
            "socraticHint": {
              "en": "Calculate the answer for each side of the equals sign.",
              "sw": "Hesabu jibu la kila upande wa alama ya sawasawa."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q11",
            "subStrandId": "substrand-math-g3-mult",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Find the combined total: (2 × 3) + (4 × 5) = ?",
              "sw": "Pata jumla ya pamoja: (2 × 3) + (4 × 5) = ?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 26,
              "unit": ""
            },
            "explanation": {
              "en": "First solve the multiplications: 2 × 3 = 6 and 4 × 5 = 20. Then add them: 6 + 20 = 26.",
              "sw": "Kwanza zidisha: 2 × 3 = 6 na 4 × 5 = 20. Kisha jumlisha: 6 + 20 = 26."
            },
            "socraticHint": {
              "en": "Find 6 and 20 first, then add them together.",
              "sw": "Pata 6 na 20 kwanza, kisha zijumlishe pamoja."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-06-q12",
            "subStrandId": "substrand-math-g3-mult",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A duka owner has 6 boxes with 10 exercise books each. She sells 15 books. How many books are left?",
              "sw": "Mwenye duka ana masanduku 6 yenye daftari 10 kila moja. Anauza daftari 15. Je, zimebaki daftari ngapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "45",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "50",
                "explanation": {
                  "en": "60 - 15 = 45, not 50.",
                  "sw": "60 - 15 = 45, si 50."
                }
              },
              {
                "id": "c",
                "text": "60",
                "explanation": {
                  "en": "60 is the starting number before selling 15 books.",
                  "sw": "60 ni idadi ya mwanzo kabla ya kuuza daftari 15."
                }
              },
              {
                "id": "d",
                "text": "55",
                "explanation": {
                  "en": "Check your subtraction: 60 - 15 = 45.",
                  "sw": "Angalia utoaji wako: 60 - 15 = 45."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Total books: 6 × 10 = 60 books. Books left: 60 - 15 = 45 books.",
              "sw": "Daftari zote: 6 × 10 = daftari 60. Zilizobaki: 60 - 15 = daftari 45."
            },
            "socraticHint": {
              "en": "Multiply 6 × 10 first, then subtract 15.",
              "sw": "Zidisha 6 × 10 kwanza, kisha toa 15."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      }
    ],
    "sourceStatus": "OFFICIAL_KICD"
  },
  {
    "id": "substrand-math-g3-money",
    "strandId": "strand-math-g3-numbers",
    "code": "MATH-G3-SUB-04",
    "title": {
      "en": "Kenyan Money & Shopping",
      "sw": "Pesa za Kenya na Ununuzi"
    },
    "description": {
      "en": "Coins and banknotes up to Ksh 1,000, calculating shopping totals and giving change.",
      "sw": "Sarafu na noti hadi Sh 1,000, kukokotoa jumla ya manunuzi na chenji."
    },
    "order": 4,
    "prerequisiteIds": [
      "substrand-math-g3-mult"
    ],
    "cbeCompetencies": [
      "Critical thinking and problem solving",
      "Financial literacy",
      "Learning to learn"
    ],
    "cbeValues": [
      "Responsibility",
      "Integrity",
      "Unity"
    ],
    "estimatedMinutes": 25,
    "quests": [
      {
        "id": "g3-math-num-07",
        "subStrandId": "substrand-math-g3-money",
        "order": 1,
        "title": {
          "en": "Kenyan Money: Coins and Notes up to Ksh 1,000",
          "sw": "Pesa za Kenya: Sarafu na Noti hadi Sh 1,000"
        },
        "storyContext": {
          "en": "Identify, differentiate, and compare Kenyan currency coins and notes up to Ksh 1,000 and calculate equivalent values. Guided by Moraa.",
          "sw": "Kutambua, kutofautisha, na kulinganisha sarafu na noti za Kenya hadi Sh 1,000 na kukokotoa thamani sawa. Ukiongozwa na Moraa."
        },
        "characterName": "Moraa",
        "characterAvatar": "cheetah",
        "difficulty": 1,
        "estimatedMinutes": 6,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-06"
        ],
        "teachCards": [
          {
            "heading": {
              "en": "Kenyan Coins",
              "sw": "Sarafu za Kenya"
            },
            "body": {
              "en": "Kenya uses 1 shilling, 5 shillings, 10 shillings, and 20 shillings coins. Each coin shows a Kenyan animal.",
              "sw": "Kenya inatumia sarafu za shilingi 1, shilingi 5, shilingi 10, na shilingi 20. Kila sarafu ina picha ya mnyama."
            },
            "workedExample": {
              "en": "Two 10-shilling coins equal one 20-shilling coin: 10 + 10 = Ksh 20.",
              "sw": "Sarafu mbili za shilingi 10 ni sawa na sarafu moja ya shilingi 20: 10 + 10 = Sh 20."
            },
            "imagePrompt": "Four clean Kenyan coins (Ksh 1 giraffe, Ksh 5 rhino, Ksh 10 lion, Ksh 20 elephant) placed in a row on a wooden table."
          },
          {
            "heading": {
              "en": "Kenyan Banknotes up to Ksh 1,000",
              "sw": "Noti za Kenya hadi Sh 1,000"
            },
            "body": {
              "en": "Kenyan notes are Ksh 50, Ksh 100, Ksh 200, Ksh 500, and Ksh 1,000. Each note has its own color and national landmark.",
              "sw": "Noti za Kenya ni Sh 50, Sh 100, Sh 200, Sh 500, na Sh 1,000. Kila noti ina rangi yake na alama ya kitaifa."
            },
            "workedExample": {
              "en": "Two Ksh 50 notes equal one Ksh 100 note: 50 + 50 = Ksh 100.",
              "sw": "Noti mbili za Sh 50 ni sawa na noti moja ya Sh 100: 50 + 50 = Sh 100."
            },
            "imagePrompt": "Genuine Kenyan banknotes in vibrant colors (red 50, purple 100, blue 200, green 500, brown 1000) neatly fanned out."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-07-q01",
            "subStrandId": "substrand-math-g3-money",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Which of these is an official Kenyan coin denomination?",
              "sw": "Ni ipi kati ya hizi iliyo sarafu halali ya Kenya?"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 20 coin",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Ksh 15 coin",
                "explanation": {
                  "en": "There is no 15-shilling coin in Kenya.",
                  "sw": "Hakuna sarafu ya shilingi 15 nchini Kenya."
                }
              },
              {
                "id": "c",
                "text": "Ksh 30 coin",
                "explanation": {
                  "en": "There is no 30-shilling coin in Kenya.",
                  "sw": "Hakuna sarafu ya shilingi 30 nchini Kenya."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Kenyan coins are Ksh 1, Ksh 5, Ksh 10, and Ksh 20.",
              "sw": "Sarafu za Kenya ni Sh 1, Sh 5, Sh 10, na Sh 20."
            },
            "socraticHint": {
              "en": "Kenya has 1, 5, 10, and 20 shilling coins.",
              "sw": "Kenya ina sarafu za shilingi 1, 5, 10, na 20."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q02",
            "subStrandId": "substrand-math-g3-money",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "Five 10-shilling coins have the same value as one 50-shilling note.",
              "sw": "Sarafu tano za shilingi 10 zina thamani sawa na noti moja ya shilingi 50."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "5 coins of 10 shillings = 10 + 10 + 10 + 10 + 10 = Ksh 50.",
              "sw": "Sarafu 5 za shilingi 10 = 10 + 10 + 10 + 10 + 10 = Sh 50."
            },
            "socraticHint": {
              "en": "Skip count by 10 five times.",
              "sw": "Ruka kwa 10 mara tano."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q03",
            "subStrandId": "substrand-math-g3-money",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Moraa has three Ksh 20 coins. How much money does she have in total shillings?",
              "sw": "Moraa ana sarafu tatu za Sh 20. Ana pesa ngapi kwa jumla ya shilingi?"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 60,
              "unit": ""
            },
            "explanation": {
              "en": "3 × Ksh 20 = 20 + 20 + 20 = Ksh 60.",
              "sw": "3 × Sh 20 = 20 + 20 + 20 = Sh 60."
            },
            "socraticHint": {
              "en": "Add 20 + 20 + 20.",
              "sw": "Jumlisha 20 + 20 + 20."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q04",
            "subStrandId": "substrand-math-g3-money",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "Ten Ksh 100 notes are equal in value to one Ksh ___ note.",
              "sw": "Noti kumi za Sh 100 zina thamani sawa na noti moja ya Sh ___."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "1000",
              "1,000",
              "elfu moja",
              "one thousand"
            ],
            "explanation": {
              "en": "10 × Ksh 100 = Ksh 1,000.",
              "sw": "10 × Sh 100 = Sh 1,000."
            },
            "socraticHint": {
              "en": "What is ten hundreds in shillings?",
              "sw": "Mamia kumi ya shilingi ni ngapi?"
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q05",
            "subStrandId": "substrand-math-g3-money",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each group of money to its equal value.",
              "sw": "Oanisha kila kundi la pesa na thamani yake iliyo sawa."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "Two Ksh 50 notes",
                "rightId": "p0",
                "rightText": "Ksh 100"
              },
              {
                "leftId": "p1",
                "leftText": "Five Ksh 20 coins",
                "rightId": "p1",
                "rightText": "Ksh 100"
              },
              {
                "leftId": "p2",
                "leftText": "Two Ksh 500 notes",
                "rightId": "p2",
                "rightText": "Ksh 1000"
              },
              {
                "leftId": "p3",
                "leftText": "Five Ksh 10 coins",
                "rightId": "p3",
                "rightText": "Ksh 50"
              }
            ],
            "explanation": {
              "en": "2 × 50 = 100; 5 × 20 = 100; 2 × 500 = 1,000; 5 × 10 = 50.",
              "sw": "2 × 50 = 100; 5 × 20 = 100; 2 × 500 = 1,000; 5 × 10 = 50."
            },
            "socraticHint": {
              "en": "Multiply the number of coins or notes by their value.",
              "sw": "Zidisha idadi ya sarafu au noti kwa thamani yake."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q06",
            "subStrandId": "substrand-math-g3-money",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "Build exactly Ksh 85 using the coins and notes in your tray.",
              "sw": "Unda Sh 85 kamili kwa kutumia sarafu na noti zilizo kwenye sinia yako."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 85,
              "unit": "KES"
            },
            "explanation": {
              "en": "50 + 20 + 10 + 5 = Ksh 85.",
              "sw": "50 + 20 + 10 + 5 = Sh 85."
            },
            "socraticHint": {
              "en": "Start with 50, add 20 to get 70, then add 10 and 5.",
              "sw": "Anza na 50, ongeza 20 kupata 70, kisha ongeza 10 na 5."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q07",
            "subStrandId": "substrand-math-g3-money",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Auma has one Ksh 200 note and three Ksh 50 notes. What is her total money?",
              "sw": "Auma ana noti moja ya Sh 200 na noti tatu za Sh 50. Ana pesa ngapi kwa jumla?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 350",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Ksh 250",
                "explanation": {
                  "en": "You only added one 50 note instead of three.",
                  "sw": "Uliongeza noti moja tu ya 50 badala ya tatu."
                }
              },
              {
                "id": "c",
                "text": "Ksh 300",
                "explanation": {
                  "en": "Three 50 notes equal 150, so 200 + 150 = 350, not 300.",
                  "sw": "Noti tatu za 50 ni 150, hivyo 200 + 150 = 350, si 300."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Three Ksh 50 notes = Ksh 150. Ksh 200 + Ksh 150 = Ksh 350.",
              "sw": "Noti tatu za Sh 50 = Sh 150. Sh 200 + Sh 150 = Sh 350."
            },
            "socraticHint": {
              "en": "3 × 50 = 150. Now add 200.",
              "sw": "3 × 50 = 150. Sasa ongeza 200."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q08",
            "subStrandId": "substrand-math-g3-money",
            "type": "ORDERING",
            "prompt": {
              "en": "Order these Kenyan banknotes from lowest value to highest value.",
              "sw": "Panga noti hizi za Kenya kuanzia yenye thamani ya chini hadi ya juu."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "b50",
                "text": {
                  "en": "Ksh 50 note",
                  "sw": "Noti ya Sh 50"
                }
              },
              {
                "id": "b100",
                "text": {
                  "en": "Ksh 100 note",
                  "sw": "Noti ya Sh 100"
                }
              },
              {
                "id": "b200",
                "text": {
                  "en": "Ksh 200 note",
                  "sw": "Noti ya Sh 200"
                }
              },
              {
                "id": "b500",
                "text": {
                  "en": "Ksh 500 note",
                  "sw": "Noti ya Sh 500"
                }
              },
              {
                "id": "b1000",
                "text": {
                  "en": "Ksh 1000 note",
                  "sw": "Noti ya Sh 1000"
                }
              }
            ],
            "correctOrderIds": [
              "b50",
              "b100",
              "b200",
              "b500",
              "b1000"
            ],
            "explanation": {
              "en": "The correct ascending order is Ksh 50, Ksh 100, Ksh 200, Ksh 500, and Ksh 1,000.",
              "sw": "Mpangilio sahihi wa kupanda ni Sh 50, Sh 100, Sh 200, Sh 500, na Sh 1,000."
            },
            "socraticHint": {
              "en": "Start with 50 and finish with 1000.",
              "sw": "Anza na 50 kisha malizia na 1000."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q09",
            "subStrandId": "substrand-math-g3-money",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "How many Ksh 50 notes make Ksh 200?",
              "sw": "Ni noti ngapi za Sh 50 zinazounda Sh 200?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 4,
              "unit": ""
            },
            "explanation": {
              "en": "50 + 50 + 50 + 50 = 200, so 4 notes of Ksh 50 make Ksh 200.",
              "sw": "50 + 50 + 50 + 50 = 200, kwa hivyo noti 4 za Sh 50 zinaunda Sh 200."
            },
            "socraticHint": {
              "en": "Count by 50 up to 200: 50, 100, 150, 200.",
              "sw": "Hesabu kwa 50 hadi 200: 50, 100, 150, 200."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q10",
            "subStrandId": "substrand-math-g3-money",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Which set of Kenyan money has the greatest total value?",
              "sw": "Ni kundi gani la pesa za Kenya lenye thamani kubwa zaidi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Two Ksh 200 notes (Ksh 400)",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Seven Ksh 50 notes (Ksh 350)",
                "explanation": {
                  "en": "7 × 50 = 350, which is less than 400.",
                  "sw": "7 × 50 = 350, ambayo ni ndogo kuliko 400."
                }
              },
              {
                "id": "c",
                "text": "Three Ksh 100 notes (Ksh 300)",
                "explanation": {
                  "en": "3 × 100 = 300, which is less than 400.",
                  "sw": "3 × 100 = 300, ambayo ni ndogo kuliko 400."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Two Ksh 200 notes = Ksh 400. This is greater than Ksh 350 and Ksh 300.",
              "sw": "Noti mbili za Sh 200 = Sh 400. Hii ni zaidi ya Sh 350 na Sh 300."
            },
            "socraticHint": {
              "en": "Compare: 400, 350, and 300 shillings.",
              "sw": "Linganisha: shilingi 400, 350, na 300."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q11",
            "subStrandId": "substrand-math-g3-money",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "Make exactly Ksh 275 using notes and coins in your tray.",
              "sw": "Unda Sh 275 kamili kwa kutumia noti na sarafu kwenye sinia yako."
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 275,
              "unit": "KES"
            },
            "explanation": {
              "en": "200 + 50 + 20 + 5 = Ksh 275.",
              "sw": "200 + 50 + 20 + 5 = Sh 275."
            },
            "socraticHint": {
              "en": "Take 200, add 50 to get 250, add 20 to get 270, and add 5.",
              "sw": "Chukua 200, ongeza 50 kupata 250, ongeza 20 kupata 270, kisha ongeza 5."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-07-q12",
            "subStrandId": "substrand-math-g3-money",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Juma has one Ksh 500 note, two Ksh 100 notes, and four Ksh 20 coins. How much money in shillings does he have altogether?",
              "sw": "Juma ana noti moja ya Sh 500, noti mbili za Sh 100, na sarafu nne za Sh 20. Ana shilingi ngapi kwa jumla?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 780,
              "unit": ""
            },
            "explanation": {
              "en": "500 + (2 × 100) + (4 × 20) = 500 + 200 + 80 = Ksh 780.",
              "sw": "500 + (2 × 100) + (4 × 20) = 500 + 200 + 80 = Sh 780."
            },
            "socraticHint": {
              "en": "Add 500 + 200 + 80.",
              "sw": "Jumlisha 500 + 200 + 80."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      },
      {
        "id": "g3-math-num-08",
        "subStrandId": "substrand-math-g3-money",
        "order": 2,
        "title": {
          "en": "Shopping and Giving Change in Kenyan Shillings",
          "sw": "Kununua Vitu na Kutoa Chenji kwa Shilingi za Kenya"
        },
        "storyContext": {
          "en": "Calculate the total cost of items and determine the correct balance or change within Ksh 1,000 in practical shopping contexts. Guided by Juma.",
          "sw": "Kukokotoa jumla ya gharama za bidhaa na kubaini baki au chenji sahihi hadi Sh 1,000 katika shughuli za ununuzi. Ukiongozwa na Juma."
        },
        "characterName": "Juma",
        "characterAvatar": "elephant",
        "difficulty": 2,
        "estimatedMinutes": 7,
        "xpReward": 35,
        "coinReward": 15,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Financial literacy"
        ],
        "cbeValues": [
          "Responsibility",
          "Integrity"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-07"
        ],
        "teachCards": [
          {
            "heading": {
              "en": "Calculating Total Cost at a Duka",
              "sw": "Kukokotoa Jumla ya Gharama Dukani"
            },
            "body": {
              "en": "To find your shopping bill, add the prices of all the items you want to buy.",
              "sw": "Ili kupata gharama ya ununuzi wako, jumlisha bei za vitu vyote unavyotaka kununua."
            },
            "workedExample": {
              "en": "A loaf of bread costs Ksh 65 and a packet of milk costs Ksh 55. Total: 65 + 55 = Ksh 120.",
              "sw": "Mkate unagharimu Sh 65 na pakiti ya maziwa Sh 55. Jumla: 65 + 55 = Sh 120."
            },
            "imagePrompt": "A warm Kenyan village duka counter with neatly arranged packets of milk, loaves of bread, and fresh eggs."
          },
          {
            "heading": {
              "en": "Calculating Change (Balance)",
              "sw": "Kukokotoa Chenji au Baki"
            },
            "body": {
              "en": "Change is the money given minus the total cost of goods. Subtract the bill from the money paid.",
              "sw": "Chenji ni pesa ulizotoa kutoa bei ya bidhaa. Toa jumla ya gharama kutoka kwa pesa uliyompa muuzaji."
            },
            "workedExample": {
              "en": "You buy goods for Ksh 140 and pay with a Ksh 200 note. Change: 200 - 140 = Ksh 60.",
              "sw": "Umenunua vitu vya Sh 140 na kulipa noti ya Sh 200. Chenji: 200 - 140 = Sh 60."
            },
            "imagePrompt": "A friendly Kenyan shopkeeper smiling while handing three Ksh 20 coins across the wooden counter to a schoolboy."
          }
        ],
        "questions": [
          {
            "id": "g3-math-num-08-q01",
            "subStrandId": "substrand-math-g3-money",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Kariuki buys a pencil for Ksh 15 and an eraser for Ksh 10. How much does he spend in total?",
              "sw": "Kariuki ananunua penseli kwa Sh 15 na kifutio kwa Sh 10. Je, anatumia kiasi gani kwa jumla?"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 25",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Ksh 35",
                "explanation": {
                  "en": "Check your addition: 15 + 10 = 25.",
                  "sw": "Angalia kujumlisha kwako: 15 + 10 = 25."
                }
              },
              {
                "id": "c",
                "text": "Ksh 20",
                "explanation": {
                  "en": "15 + 10 = 25, not 20.",
                  "sw": "15 + 10 = 25, si 20."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Ksh 15 + Ksh 10 = Ksh 25.",
              "sw": "Sh 15 + Sh 10 = Sh 25."
            },
            "socraticHint": {
              "en": "Add 15 + 10.",
              "sw": "Jumlisha 15 + 10."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q02",
            "subStrandId": "substrand-math-g3-money",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "If you pay Ksh 50 for an exercise book costing Ksh 35, your change is Ksh 15.",
              "sw": "Ukitoa Sh 50 kununua daftari la Sh 35, chenji yako ni Sh 15."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "50 - 35 = Ksh 15.",
              "sw": "50 - 35 = Sh 15."
            },
            "socraticHint": {
              "en": "Subtract 35 from 50.",
              "sw": "Toa 35 kutoka 50."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q03",
            "subStrandId": "substrand-math-g3-money",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "At a fruit kiosk, an orange costs Ksh 30 and a ripe banana costs Ksh 15. What is the total cost?",
              "sw": "Kwenye kibanda cha matunda, chungwa linagharimu Sh 30 na ndizi mbivu Sh 15. Jumla ya gharama ni ngapi?"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 45,
              "unit": ""
            },
            "explanation": {
              "en": "30 + 15 = Ksh 45.",
              "sw": "30 + 15 = Sh 45."
            },
            "socraticHint": {
              "en": "Add 30 and 15.",
              "sw": "Jumlisha 30 na 15."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q04",
            "subStrandId": "substrand-math-g3-money",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "A packet of crayons costs Ksh 80. You pay with a Ksh 100 note. Your change is Ksh ___.",
              "sw": "Pakiti ya rangi inagharimu Sh 80. Unalipa kwa noti ya Sh 100. Chenji yako ni Sh ___."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "20",
              "ishirini",
              "twenty"
            ],
            "explanation": {
              "en": "100 - 80 = Ksh 20.",
              "sw": "100 - 80 = Sh 20."
            },
            "socraticHint": {
              "en": "Subtract 80 from 100.",
              "sw": "Toa 80 kutoka 100."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q05",
            "subStrandId": "substrand-math-g3-money",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each shopping purchase to the correct change received.",
              "sw": "Oanisha kila ununuzi na chenji sahihi inayorudishwa."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "Pay Ksh 100 for Ksh 70 item",
                "rightId": "p0",
                "rightText": "Change Ksh 30"
              },
              {
                "leftId": "p1",
                "leftText": "Pay Ksh 200 for Ksh 150 item",
                "rightId": "p1",
                "rightText": "Change Ksh 50"
              },
              {
                "leftId": "p2",
                "leftText": "Pay Ksh 500 for Ksh 420 item",
                "rightId": "p2",
                "rightText": "Change Ksh 80"
              },
              {
                "leftId": "p3",
                "leftText": "Pay Ksh 50 for Ksh 35 item",
                "rightId": "p3",
                "rightText": "Change Ksh 15"
              }
            ],
            "explanation": {
              "en": "100 - 70 = 30; 200 - 150 = 50; 500 - 420 = 80; 50 - 35 = 15.",
              "sw": "100 - 70 = 30; 200 - 150 = 50; 500 - 420 = 80; 50 - 35 = 15."
            },
            "socraticHint": {
              "en": "Subtract the cost of the item from the amount paid.",
              "sw": "Toa gharama ya bidhaa kutoka kwa pesa zilizolipwa."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q06",
            "subStrandId": "substrand-math-g3-money",
            "type": "ORDERING",
            "prompt": {
              "en": "Order the steps of buying items and receiving change at a market.",
              "sw": "Panga hatua za kununua bidhaa na kupokea chenji sokoni."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "step1",
                "text": {
                  "en": "Choose the items you need to buy",
                  "sw": "Chagua vitu unavyohitaji kununua"
                }
              },
              {
                "id": "step2",
                "text": {
                  "en": "Add the prices together to find the total bill",
                  "sw": "Jumlisha bei ili kupata jumla ya gharama"
                }
              },
              {
                "id": "step3",
                "text": {
                  "en": "Hand your money note to the shopkeeper",
                  "sw": "Mpe muuzaji noti yako ya pesa"
                }
              },
              {
                "id": "step4",
                "text": {
                  "en": "Subtract bill from money paid to check your change",
                  "sw": "Toa gharama kutoka pesa uliyolipa kuangalia chenji"
                }
              }
            ],
            "correctOrderIds": [
              "step1",
              "step2",
              "step3",
              "step4"
            ],
            "explanation": {
              "en": "Select goods, compute bill, give payment, and verify change.",
              "sw": "Chagua bidhaa, pata jumla, lipa pesa, kisha hakikisha chenji."
            },
            "socraticHint": {
              "en": "Start by picking your items.",
              "sw": "Anza kwa kuchagua bidhaa."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q07",
            "subStrandId": "substrand-math-g3-money",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Zawadi has Ksh 300. She buys a ruler for Ksh 40 and a notebook for Ksh 110. How much money does she have left?",
              "sw": "Zawadi ana Sh 300. Ananunua rula kwa Sh 40 na daftari kwa Sh 110. Je, amebakiwa na pesa ngapi?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 150",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Ksh 190",
                "explanation": {
                  "en": "You only subtracted the 110 notebook, forgetting the 40 ruler.",
                  "sw": "Ulikata daftari la 110 pekee, ukasahau rula ya 40."
                }
              },
              {
                "id": "c",
                "text": "Ksh 260",
                "explanation": {
                  "en": "You only subtracted the 40 ruler, forgetting the notebook.",
                  "sw": "Ulikata rula ya 40 pekee, ukasahau daftari."
                }
              },
              {
                "id": "d",
                "text": "Ksh 140",
                "explanation": {
                  "en": "300 - 150 = 150, not 140.",
                  "sw": "300 - 150 = 150, si 140."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Total spent: 40 + 110 = Ksh 150. Money left: 300 - 150 = Ksh 150.",
              "sw": "Jumla iliyotumika: 40 + 110 = Sh 150. Pesa iliyobaki: 300 - 150 = Sh 150."
            },
            "socraticHint": {
              "en": "Find 40 + 110 first, then subtract from 300.",
              "sw": "Pata 40 + 110 kwanza, kisha toa kutoka 300."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q08",
            "subStrandId": "substrand-math-g3-money",
            "type": "LISTEN_CHOOSE",
            "prompt": {
              "en": "Listen and select the price spoken.",
              "sw": "Sikiliza kisha chagua bei iliyotajwa."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 120",
                "explanation": {
                  "en": "Correct!",
                  "sw": "Sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Ksh 102",
                "explanation": {
                  "en": "The speaker said 120, not 102.",
                  "sw": "Msemaji alisema 120, si 102."
                }
              },
              {
                "id": "c",
                "text": "Ksh 210",
                "explanation": {
                  "en": "The speaker said 120, not 210.",
                  "sw": "Msemaji alisema 120, si 210."
                }
              }
            ],
            "correctOptionId": "a",
            "audioSpeechPrompt": {
              "textToSpeak": "A packet of maize flour costs one hundred and twenty shillings",
              "language": "en-KE"
            },
            "explanation": {
              "en": "One hundred and twenty shillings is written as Ksh 120.",
              "sw": "Shilingi mia moja na ishirini huandikwa kama Sh 120."
            },
            "socraticHint": {
              "en": "1 hundred and 2 tens.",
              "sw": "Mamia 1 na makumi 2."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q09",
            "subStrandId": "substrand-math-g3-money",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "A mother hands a Ksh 1,000 note to pay for a sack of potatoes costing Ksh 680. How much change does she receive?",
              "sw": "Mama anatoa noti ya Sh 1,000 kulipia gunia la viazi linalogharimu Sh 680. Je, anapokea chenji ya kiasi gani?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 320,
              "unit": ""
            },
            "explanation": {
              "en": "1,000 - 680 = Ksh 320.",
              "sw": "1,000 - 680 = Sh 320."
            },
            "socraticHint": {
              "en": "1,000 - 600 = 400; 400 - 80 = 320.",
              "sw": "1,000 - 600 = 400; 400 - 80 = 320."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q10",
            "subStrandId": "substrand-math-g3-money",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Baraka has Ksh 500. He buys a geometry set for Ksh 280 and 3 pens at Ksh 20 each. Does he have enough money?",
              "sw": "Baraka ana Sh 500. Ananunua seti ya vifaa vya hisabati kwa Sh 280 na kalamu 3 kwa Sh 20 kila moja. Je, ana pesa za kutosha?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Yes, and he has Ksh 160 left",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "No, he needs Ksh 40 more",
                "explanation": {
                  "en": "Total cost is 340, which is well within 500.",
                  "sw": "Jumla ya gharama ni 340, ambayo inatoshea ndani ya 500."
                }
              },
              {
                "id": "c",
                "text": "Yes, and he has Ksh 220 left",
                "explanation": {
                  "en": "You forgot the cost of the 3 pens (Ksh 60).",
                  "sw": "Ulisahau bei ya kalamu 3 (Sh 60)."
                }
              },
              {
                "id": "d",
                "text": "No, he needs Ksh 60 more",
                "explanation": {
                  "en": "He has more than enough money.",
                  "sw": "Ana pesa za kutosha kabisa."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "3 pens cost 3 × 20 = Ksh 60. Total bill: 280 + 60 = Ksh 340. Change: 500 - 340 = Ksh 160.",
              "sw": "Kalamu 3 zinagharimu 3 × 20 = Sh 60. Gharama yote: 280 + 60 = Sh 340. Chenji: 500 - 340 = Sh 160."
            },
            "socraticHint": {
              "en": "Calculate 3 × 20 = 60, add to 280, then subtract from 500.",
              "sw": "Kokotoa 3 × 20 = 60, jumlisha na 280, kisha toa kutoka 500."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q11",
            "subStrandId": "substrand-math-g3-money",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "You pay Ksh 500 for school sandals costing Ksh 360. Make your change of Ksh 140.",
              "sw": "Unalipa Sh 500 kwa ndara za shule za Sh 360. Unda chenji yako ya Sh 140."
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 140,
              "unit": "KES"
            },
            "explanation": {
              "en": "500 - 360 = Ksh 140. 100 + 20 + 20 = Ksh 140.",
              "sw": "500 - 360 = Sh 140. 100 + 20 + 20 = Sh 140."
            },
            "socraticHint": {
              "en": "Take one 100 note and two 20 coins.",
              "sw": "Chukua noti moja ya 100 na sarafu mbili za 20."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-08-q12",
            "subStrandId": "substrand-math-g3-money",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "A farmer sells 4 cabbages at Ksh 50 each. He spends Ksh 130 on farm twine. How much money does he keep?",
              "sw": "Mkulima anauza kabeji 4 kwa Sh 50 kila moja. Anatumia Sh 130 kununua kamba. Je, anabakiwa na shilingi ngapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 70,
              "unit": ""
            },
            "explanation": {
              "en": "Money made: 4 × 50 = Ksh 200. Money kept: 200 - 130 = Ksh 70.",
              "sw": "Pesa alizopata: 4 × 50 = Sh 200. Pesa alizobaki nazo: 200 - 130 = Sh 70."
            },
            "socraticHint": {
              "en": "4 × 50 = 200. Now subtract 130.",
              "sw": "4 × 50 = 200. Sasa toa 130."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      }
    ],
    "sourceStatus": "OFFICIAL_KICD"
  },
  {
    "id": "substrand-math-g3-mastery",
    "strandId": "strand-math-g3-numbers",
    "code": "MATH-G3-SUB-05",
    "title": {
      "en": "Numbers Mastery & Strand Test",
      "sw": "Mtihani wa Umilisi wa Nambari"
    },
    "description": {
      "en": "Grand 15-question mixed assessment across addition, subtraction, multiplication, and money.",
      "sw": "Tathmini kuu ya maswali 15 ya mchanganyiko wa kujumlisha, kutoa, kuzidisha, na pesa."
    },
    "order": 5,
    "prerequisiteIds": [
      "substrand-math-g3-money"
    ],
    "cbeCompetencies": [
      "Critical thinking and problem solving",
      "Self-efficacy"
    ],
    "cbeValues": [
      "Integrity",
      "Responsibility"
    ],
    "estimatedMinutes": 20,
    "quests": [
      {
        "id": "g3-math-num-test",
        "subStrandId": "substrand-math-g3-mastery",
        "order": 1,
        "title": {
          "en": "Numbers Strand Grand Challenge",
          "sw": "Changamoto Kuu ya Nambari"
        },
        "storyContext": {
          "en": "Test all your math skills with Rafiki to earn the Gold Numbers Badge!",
          "sw": "Jaribu stadi zako zote za hisabati na Rafiki upate Nishani ya Dhahabu ya Nambari!"
        },
        "characterName": "Rafiki",
        "characterAvatar": "lion",
        "difficulty": 3,
        "estimatedMinutes": 15,
        "xpReward": 100,
        "coinReward": 50,
        "cbeCompetencies": [
          "Critical thinking and problem solving",
          "Self-efficacy"
        ],
        "cbeValues": [
          "Integrity",
          "Responsibility"
        ],
        "prerequisiteQuestIds": [
          "g3-math-num-08"
        ],
        "badgeUnlockId": "badge-g3-math-mastery",
        "isBossChallenge": true,
        "teachCards": [],
        "questions": [
          {
            "id": "g3-math-num-test-q01",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Find the sum: 432 + 253",
              "sw": "Tafuta jumla: 432 + 253"
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "685",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "675",
                "explanation": {
                  "en": "3 tens + 5 tens = 8 tens, not 7 tens.",
                  "sw": "Makumi 3 + makumi 5 = makumi 8, si makumi 7."
                }
              },
              {
                "id": "c",
                "text": "695",
                "explanation": {
                  "en": "Check your addition in the tens column.",
                  "sw": "Angalia kujumlisha kwako katika safu ya makumi."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Ones: 2 + 3 = 5; Tens: 3 + 5 = 8; Hundreds: 4 + 2 = 6. Total = 685.",
              "sw": "Mamoja: 2 + 3 = 5; Makumi: 3 + 5 = 8; Mamia: 4 + 2 = 6. Jumla = 685."
            },
            "socraticHint": {
              "en": "Add column by column starting with ones.",
              "sw": "Jumlisha safu kwa safu ukianzia na mamoja."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q02",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Calculate: 368 + 275 = ?",
              "sw": "Hesabu: 368 + 275 = ?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 643,
              "unit": ""
            },
            "explanation": {
              "en": "8 + 5 = 13 (write 3, carry 1); 1 + 6 + 7 = 14 (write 4, carry 1); 1 + 3 + 2 = 6. Result is 643.",
              "sw": "8 + 5 = 13 (andika 3, peleka 1); 1 + 6 + 7 = 14 (andika 4, peleka 1); 1 + 3 + 2 = 6. Jibu ni 643."
            },
            "socraticHint": {
              "en": "Remember to carry to tens and hundreds.",
              "sw": "Kumbuka kubeba kwenye makumi na mamia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q03",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "TRUE_FALSE",
            "prompt": {
              "en": "876 - 342 = 534.",
              "sw": "876 - 342 = 534."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "correctBoolean": true,
            "explanation": {
              "en": "Ones: 6 - 2 = 4; Tens: 7 - 4 = 3; Hundreds: 8 - 3 = 5. Difference = 534.",
              "sw": "Mamoja: 6 - 2 = 4; Makumi: 7 - 4 = 3; Mamia: 8 - 3 = 5. Baki = 534."
            },
            "socraticHint": {
              "en": "Subtract ones, tens, and hundreds.",
              "sw": "Toa mamoja, makumi, na mamia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q04",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "What is 641 - 287?",
              "sw": "641 - 287 ni ngapi?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "354",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "364",
                "explanation": {
                  "en": "After borrowing from 4 tens, 3 tens remain. 13 - 8 = 5 tens, not 6 tens.",
                  "sw": "Baada ya kukopa kutoka makumi 4, yamebaki 3. 13 - 8 = makumi 5, si 6."
                }
              },
              {
                "id": "c",
                "text": "454",
                "explanation": {
                  "en": "Forgot to reduce 6 hundreds to 5 hundreds.",
                  "sw": "Ulisahau kupunguza mamia 6 kuwa mamia 5."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Borrow to make 11: 11 - 7 = 4. Borrow to make 13: 13 - 8 = 5. 5 - 2 = 3. Answer: 354.",
              "sw": "Kopa kufanya 11: 11 - 7 = 4. Kopa kufanya 13: 13 - 8 = 5. 5 - 2 = 3. Jibu: 354."
            },
            "socraticHint": {
              "en": "Regroup once for ones, and once for tens.",
              "sw": "Badili mara moja kwa mamoja, na mara moja kwa makumi."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q05",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "MATCHING",
            "prompt": {
              "en": "Match each multiplication to its repeated addition sentence.",
              "sw": "Oanisha kila kuzidisha na sentensi yake ya kujumlisha mara kwa mara."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "matchingPairs": [
              {
                "leftId": "p0",
                "leftText": "3 × 4",
                "rightId": "p0",
                "rightText": "4 + 4 + 4"
              },
              {
                "leftId": "p1",
                "leftText": "4 × 2",
                "rightId": "p1",
                "rightText": "2 + 2 + 2 + 2"
              },
              {
                "leftId": "p2",
                "leftText": "2 × 5",
                "rightId": "p2",
                "rightText": "5 + 5"
              },
              {
                "leftId": "p3",
                "leftText": "5 × 3",
                "rightId": "p3",
                "rightText": "3 + 3 + 3 + 3 + 3"
              }
            ],
            "explanation": {
              "en": "Each multiplication represents adding the second number repeatedly.",
              "sw": "Kila zao la kuzidisha linawakilisha kujumlisha nambari ya pili mara kadhaa."
            },
            "socraticHint": {
              "en": "Look at the repeated number.",
              "sw": "Angalia nambari inayojirudia."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q06",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "Calculate: 8 × 5 = ?",
              "sw": "Hesabu: 8 × 5 = ?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 40,
              "unit": ""
            },
            "explanation": {
              "en": "Skip counting by 5 eight times gives 40 (8 × 5 = 40).",
              "sw": "Kuruka kwa 5 mara nane kunaleta 40 (8 × 5 = 40)."
            },
            "socraticHint": {
              "en": "5, 10, 15, 20, 25, 30, 35, 40.",
              "sw": "5, 10, 15, 20, 25, 30, 35, 40."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q07",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "What is the total value of three Ksh 50 notes and two Ksh 20 coins?",
              "sw": "Ni thamani gani ya jumla ya noti tatu za Sh 50 na sarafu mbili za Sh 20?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 190",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Ksh 170",
                "explanation": {
                  "en": "Two 20-shilling coins equal 40, not 20.",
                  "sw": "Sarafu mbili za shilingi 20 ni 40, si 20."
                }
              },
              {
                "id": "c",
                "text": "Ksh 210",
                "explanation": {
                  "en": "Three 50 notes is 150, plus 40 is 190, not 210.",
                  "sw": "Noti tatu za 50 ni 150, ukijumlisha 40 unapata 190, si 210."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Three Ksh 50 notes = Ksh 150. Two Ksh 20 coins = Ksh 40. 150 + 40 = Ksh 190.",
              "sw": "Noti tatu za Sh 50 = Sh 150. Sarafu mbili za Sh 20 = Sh 40. 150 + 40 = Sh 190."
            },
            "socraticHint": {
              "en": "150 + 40 = 190.",
              "sw": "150 + 40 = 190."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q08",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "You pay with a Ksh 500 note for school shoes costing Ksh 325. How much change in shillings do you receive?",
              "sw": "Unalipa noti ya Sh 500 kwa viatu vya shule vya Sh 325. Unapokea chenji ya shilingi ngapi?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 175,
              "unit": ""
            },
            "explanation": {
              "en": "500 - 325 = Ksh 175.",
              "sw": "500 - 325 = Sh 175."
            },
            "socraticHint": {
              "en": "500 - 300 = 200, and 200 - 25 = 175.",
              "sw": "500 - 300 = 200, na 200 - 25 = 175."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q09",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A matatu carries 247 passengers in the morning and 185 passengers in the afternoon. How many passengers traveled in total?",
              "sw": "Matatu inabeba abiria 247 asubuhi na abiria 185 alasiri. Je, ni abiria wangapi waliosafiri kwa jumla?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "432",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "422",
                "explanation": {
                  "en": "Check your carrying in the tens place (1 + 4 + 8 = 13).",
                  "sw": "Angalia kubeba kwako kwenye makumi (1 + 4 + 8 = 13)."
                }
              },
              {
                "id": "c",
                "text": "332",
                "explanation": {
                  "en": "Forgot to carry 1 to the hundreds place (1 + 2 + 1 = 4).",
                  "sw": "Ulisahau kubeba 1 kwenye mamia (1 + 2 + 1 = 4)."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "7 + 5 = 12 (carry 1); 1 + 4 + 8 = 13 (carry 1); 1 + 2 + 1 = 4. Total = 432 passengers.",
              "sw": "7 + 5 = 12 (beba 1); 1 + 4 + 8 = 13 (beba 1); 1 + 2 + 1 = 4. Jumla = abiria 432."
            },
            "socraticHint": {
              "en": "Add 247 + 185 with regrouping.",
              "sw": "Jumlisha 247 + 185 kwa kubadili."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q10",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "A market vendor brought 750 cabbages to Gikomba. By evening, she had sold 385 cabbages. How many cabbages were remaining?",
              "sw": "Mfanyabiashara alileta kabeji 750 sokoni Gikomba. Kufikia jioni, alikuwa ameuza kabeji 385. Je, zilibaki kabeji ngapi?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "365",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "375",
                "explanation": {
                  "en": "14 tens minus 8 tens is 6 tens, not 7.",
                  "sw": "Makumi 14 toa makumi 8 ni makumi 6, si 7."
                }
              },
              {
                "id": "c",
                "text": "465",
                "explanation": {
                  "en": "Forgot to reduce 7 hundreds after borrowing (6 - 3 = 3).",
                  "sw": "Ulisahau kupunguza mamia 7 baada ya kukopa (6 - 3 = 3)."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "10 - 5 = 5; 14 - 8 = 6; 6 - 3 = 3. Remaining cabbages = 365.",
              "sw": "10 - 5 = 5; 14 - 8 = 6; 6 - 3 = 3. Kabeji zilizobaki = 365."
            },
            "socraticHint": {
              "en": "Regroup from tens to ones, then from hundreds to tens.",
              "sw": "Kopa kutoka makumi hadi mamoja, kisha kutoka mamia hadi makumi."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q11",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "NUMBER_ENTRY",
            "prompt": {
              "en": "A shopkeeper packs fruit juice into 6 cartons. Each carton holds 4 packets. How many juice packets are there in total?",
              "sw": "Mwenye duka anafunga juisi kwenye katoni 6. Kila katoni ina pakiti 4. Je, kuna pakiti ngapi za juisi kwa jumla?"
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 24,
              "unit": ""
            },
            "explanation": {
              "en": "6 cartons × 4 packets = 24 packets in total.",
              "sw": "Katoni 6 × pakiti 4 = pakiti 24 kwa jumla."
            },
            "socraticHint": {
              "en": "Skip count by 4 six times: 4, 8, 12, 16, 20, 24.",
              "sw": "Ruka kwa 4 mara sita: 4, 8, 12, 16, 20, 24."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q12",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "FILL_BLANK",
            "prompt": {
              "en": "Complete the 10s pattern: 10, 20, 30, ___, 50.",
              "sw": "Kamilisha ruwaza ya 10: 10, 20, 30, ___, 50."
            },
            "difficulty": 1,
            "strandTag": "MATH-G3-NUM",
            "fillBlankAnswers": [
              "40",
              "arobaini",
              "forty"
            ],
            "explanation": {
              "en": "30 + 10 = 40. The missing number is 40.",
              "sw": "30 + 10 = 40. Nambari inayokosekana ni 40."
            },
            "socraticHint": {
              "en": "Add 10 to 30.",
              "sw": "Ongeza 10 kwa 30."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q13",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "KENYAN_MONEY",
            "prompt": {
              "en": "Build exactly Ksh 380 using the money in your tray.",
              "sw": "Unda Sh 380 kamili kwa kutumia pesa zilizo kwenye sinia yako."
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "numericAnswer": {
              "value": 380,
              "unit": "KES"
            },
            "explanation": {
              "en": "200 + 100 + 50 + 20 + 10 = Ksh 380.",
              "sw": "200 + 100 + 50 + 20 + 10 = Sh 380."
            },
            "socraticHint": {
              "en": "200 + 100 makes 300, then add 50, 20, and 10.",
              "sw": "200 + 100 inaunda 300, kisha ongeza 50, 20, na 10."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q14",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "ORDERING",
            "prompt": {
              "en": "Arrange the steps to find the balance after shopping.",
              "sw": "Panga hatua za kupata baki baada ya ununuzi."
            },
            "difficulty": 2,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "s1",
                "text": {
                  "en": "List all items and their unit prices",
                  "sw": "Orodhesha vitu vyote na bei zake"
                }
              },
              {
                "id": "s2",
                "text": {
                  "en": "Add all prices to get total cost",
                  "sw": "Jumlisha bei zote kupata jumla ya gharama"
                }
              },
              {
                "id": "s3",
                "text": {
                  "en": "Give payment money to the seller",
                  "sw": "Mkabidhi muuzaji pesa za malipo"
                }
              },
              {
                "id": "s4",
                "text": {
                  "en": "Subtract total cost from money given to get change",
                  "sw": "Toa jumla ya gharama kutoka pesa ulizotoa kupata chenji"
                }
              }
            ],
            "correctOrderIds": [
              "s1",
              "s2",
              "s3",
              "s4"
            ],
            "explanation": {
              "en": "List prices, sum total cost, pay, and subtract for change.",
              "sw": "Orodhesha bei, jumlisha gharama, lipa, kisha toa kupata chenji."
            },
            "socraticHint": {
              "en": "Start by listing the items.",
              "sw": "Anza kwa kuorodhesha bidhaa."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          },
          {
            "id": "g3-math-num-test-q15",
            "subStrandId": "substrand-math-g3-mastery",
            "type": "MULTIPLE_CHOICE",
            "prompt": {
              "en": "Chebet buys 4 exercise books at Ksh 30 each. She pays with a Ksh 200 note. How much change does she get?",
              "sw": "Chebet ananunua daftari 4 kwa Sh 30 kila moja. Analipa kwa noti ya Sh 200. Je, anapata chenji ya kiasi gani?"
            },
            "difficulty": 3,
            "strandTag": "MATH-G3-NUM",
            "options": [
              {
                "id": "a",
                "text": "Ksh 80",
                "explanation": {
                  "en": "Correct answer!",
                  "sw": "Jibu sahihi!"
                }
              },
              {
                "id": "b",
                "text": "Ksh 120",
                "explanation": {
                  "en": "Ksh 120 is the cost of the books, not the change.",
                  "sw": "Sh 120 ni gharama ya daftari, si chenji."
                }
              },
              {
                "id": "c",
                "text": "Ksh 70",
                "explanation": {
                  "en": "200 - 120 = 80, not 70.",
                  "sw": "200 - 120 = 80, si 70."
                }
              },
              {
                "id": "d",
                "text": "Ksh 90",
                "explanation": {
                  "en": "Check your subtraction: 200 - 120 = 80.",
                  "sw": "Angalia utoaji wako: 200 - 120 = 80."
                }
              }
            ],
            "correctOptionId": "a",
            "explanation": {
              "en": "Cost of books: 4 × 30 = Ksh 120. Change: 200 - 120 = Ksh 80.",
              "sw": "Gharama ya daftari: 4 × 30 = Sh 120. Chenji: 200 - 120 = Sh 80."
            },
            "socraticHint": {
              "en": "Find 4 × 30 first, then subtract from 200.",
              "sw": "Pata 4 × 30 kwanza, kisha toa kutoka 200."
            },
            "kenyanCulturalContext": "Authentic Kenyan CBC Grade 3 Activity",
            "sourceStatus": "OFFICIAL_KICD"
          }
        ],
        "sourceStatus": "OFFICIAL_KICD"
      }
    ],
    "sourceStatus": "OFFICIAL_KICD"
  }
];

export const grade3NumbersStrand: CurriculumStrand = {
  id: 'strand-math-g3-numbers',
  subjectId: 'math-act-g3',
  code: 'MATH-G3-STR-01',
  title: { en: 'Numbers within 1,000 & Kenyan Money', sw: 'Nambari hadi 1,000 na Pesa za Kenya' },
  description: {
    en: 'Addition, subtraction, multiplication, and currency with 8 CBC lessons and strand mastery.',
    sw: 'Kujumlisha, kutoa, kuzidisha na sarafu kupitia masomo 8 ya CBC na mtihani wa umilisi.'
  },
  icon: 'Hash',
  order: 1,
  prerequisiteIds: [],
  sourceStatus: 'OFFICIAL_KICD',
  subStrands: grade3NumbersSubStrands
};
