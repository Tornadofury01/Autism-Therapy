const scenarios = {
  capitol: {
    id: "capitol",
    title: "Texas State Capitol",
    description: "A short practice look at the Texas State Capitol before a real visit.",
    details: [
      "Three parts: the outside, a quiet room, and the dome.",
      "Nothing starts until a child taps play.",
    ],
    icon: "door",
    intro: "You will watch three short parts of the Texas State Capitol in Austin.",
    practiceTitle: "Practice talking at the Capitol",
    practiceButton: "Practice Talking at the Capitol",
    practiceExamples: ["I need a break.", "Can I look down?", "What is this room?"],
    chapters: [
      {
        id: "exterior",
        title: "Arriving at the Capitol",
        videoFile: "/videos/capitol/chapter1_capitol_exterior.mp4",
        durationSeconds: 15,
        sensoryNotes: [
          { icon: "🚶", text: "You'll see people walking around outside." },
        ],
        starterQuestions: ["What is this building?", "Can I go inside?"],
        groundingFacts: [
          "Shows the outside of the Texas State Capitol building in Austin, Texas",
          "Tall stone columns at the front entrance",
          "Other visitors walking around outside, including someone with a stroller",
          "Narration said: 'This is the Texas State Capitol.'",
        ],
      },
      {
        id: "supreme-court",
        title: "Inside the Supreme Court",
        videoFile: "/videos/capitol/chapter2_supreme_court.mp4",
        durationSeconds: 19,
        sensoryNotes: [{ icon: "🔇", text: "This room is usually quiet." }],
        starterQuestions: ["What happens in this room?", "Do I have to go inside?"],
        groundingFacts: [
          "Shows a doorway looking into the old Supreme Court chamber",
          "The room has old wooden chairs, a long wooden table, and a wooden doorway frame",
          "This is where judges used to make important legal decisions",
          "The room is usually quiet",
          "You can look through the doorway without needing to walk inside",
        ],
      },
      {
        id: "rotunda",
        title: "The Rotunda",
        videoFile: "/videos/capitol/chapter3_rotunda.mp4",
        durationSeconds: 24,
        sensoryNotes: [
          {
            icon: "👀",
            text: "This part looks up high. You can look down if you need a break.",
          },
        ],
        starterQuestions: ["Why does it look like that?", "Is it safe up there?"],
        groundingFacts: [
          "Shows the inside of the dome, viewed from below looking up",
          "Multiple circular balconies stacked above each other, visible up to the top of the dome",
          "Other visitors may be seen standing on the balconies, looking down",
          "Looking straight up like this can feel disorienting or make the room seem like it's spinning a little — this is normal and okay",
        ],
      },
    ],
    generalFacts: [
      "The Texas State Capitol is located in downtown Austin, Texas",
      "It is the building where Texas state government works, including the Texas Legislature",
      "It is a public building that people can visit",
    ],
  },
  dc: {
    id: "dc",
    title: "Washington, DC",
    description: "Get used to public transport and finding the way around Washington, DC.",
    details: [
      "The point of these videos is to practice the Metro and walking between places, before the real day.",
      "You start at Reston Station, ride the train, and come up out of the station in the city.",
      "Then you walk outside to the White House, the Washington Monument, the water by the Jefferson Memorial, and the United States Capitol.",
      "At the end, you board the Metro at Capitol South, the station nearest the Capitol, and ride back toward Reston.",
    ],
    icon: "train",
    intro: "These parts show how to take public transport and find your way around Washington, DC.",
    introParagraphs: [
      "These parts show how to take public transport and find your way around Washington, DC.",
      "You start at Reston Station, ride the Metro, and come up out of the station.",
      "Then you walk to the White House, the Washington Monument, the water by the Jefferson Memorial, and the United States Capitol.",
      "At the end, you board the Metro at Capitol South, the station nearest the Capitol, and ride back toward Reston.",
    ],
    practiceTitle: "Practice talking on the trip",
    practiceButton: "Practice Talking on the Trip",
    practiceExamples: ["Is this our stop?", "Can I hold on?", "Which way do we walk?"],
    chapters: [
      {
        id: "reston",
        title: "Reston Station",
        icon: "ticket",
        videoFile: "/videos/dc/chapter1_reston_station.mp4",
        durationSeconds: 12,
        sensoryNotes: [
          { icon: "🚉", text: "This is the station where the train trip starts." },
          { icon: "👆", text: "A hand points at a blue ticket machine." },
        ],
        starterQuestions: ["What is this place?", "Do I have to use that machine?"],
        groundingFacts: [
          "This part is the start of the trip at Reston Station",
          "Shows a covered outdoor walkway with a roof and glass, and people walking through it",
          "Shows a blue ticket machine. A hand points at the screen",
          "Words visible on the machine include SELECT PURCHASE, COINS, and PUSH TO RETURN",
          "The video does not show the child having to buy a ticket. It only shows the machine",
        ],
      },
      {
        id: "train",
        title: "Riding the Train",
        icon: "train",
        videoFile: "/videos/dc/chapter2_riding_the_train.mp4",
        durationSeconds: 9,
        sensoryNotes: [
          { icon: "🚇", text: "This is the train ride. It can be loud. There are poles to hold." },
          { icon: "🪟", text: "The view out the window moves." },
        ],
        starterQuestions: ["Is the train loud?", "Can I hold on?"],
        groundingFacts: [
          "Shows the inside of a train car while it is moving",
          "There are metal poles to hold and long lights on the ceiling",
          "A large window looks outside. Trees, a road with cars, and a tall glass building with an American flag go by",
          "The train is up above the road",
          "The picture does not show a seat, so do not promise that there is a place to sit",
        ],
      },
      {
        id: "station-exit",
        title: "Up from the Station",
        icon: "door",
        videoFile: "/videos/dc/chapter3_up_from_station.mp4",
        durationSeconds: 14,
        sensoryNotes: [
          { icon: "🚶", text: "After the ride, people walk through the station." },
          { icon: "⬆️", text: "An escalator goes up into a brighter space." },
        ],
        starterQuestions: ["Where does the escalator go?", "Do I have to get off here?"],
        groundingFacts: [
          "This part is after the train ride, still inside a Metro station",
          "Shows a large underground hall with a high ceiling, repeating lights, and people walking",
          "Then two people ride an escalator up into a brighter concrete station ceiling",
          "This is how you leave the train and come up toward the street",
          "The video does not show a street name or a station name sign",
        ],
      },
      {
        id: "white-house",
        title: "The White House",
        icon: "columns",
        videoFile: "/videos/dc/chapter4_white_house.mp4",
        durationSeconds: 6,
        sensoryNotes: [
          { icon: "👥", text: "People walk outside toward a building." },
          { icon: "🚧", text: "A black fence is between you and the building." },
        ],
        starterQuestions: ["Can I go inside?", "Why is there a fence?"],
        groundingFacts: [
          "Shows the White House from outside, across a path with many people walking",
          "There are trees, a lawn, and a flag",
          "Later, two people stand at a black metal fence and look through it",
          "The White House stays behind the fence. This video does not show going inside",
          "The tall Washington Monument can be seen far away in this part",
          "The fence is there so visitors stay on the outside path",
        ],
      },
      {
        id: "to-monument",
        title: "To the Monument",
        icon: "monument",
        videoFile: "/videos/dc/chapter5_to_monument.mp4",
        durationSeconds: 12,
        sensoryNotes: [
          { icon: "⛲", text: "A fountain sits in a brick plaza, with a street and cars nearby." },
          { icon: "👀", text: "Then a path leads to the tall white tower. You can look at the ground if you need a break." },
        ],
        starterQuestions: ["What is that tall tower?", "Do we walk the whole way?"],
        groundingFacts: [
          "This is the walk from the White House side toward the Washington Monument",
          "Starts at a stone fountain in a brick plaza, with a street and cars nearby",
          "Then shows a path across a lawn toward the Washington Monument",
          "The monument is a very tall, thin, white stone tower",
          "Looking up at the tower can feel like a lot. Looking at the ground is okay",
          "The video does not show going inside the monument",
        ],
      },
      {
        id: "at-monument",
        title: "At the Monument",
        icon: "sun",
        videoFile: "/videos/dc/chapter6_at_monument.mp4",
        durationSeconds: 4,
        sensoryNotes: [
          { icon: "🚩", text: "Flags stand in a circle at the base of the monument." },
          { icon: "↔️", text: "One way you can see the Lincoln Memorial. The other way, the Capitol." },
        ],
        starterQuestions: ["What are the flags for?", "Which building is that?"],
        groundingFacts: [
          "This part is at the Washington Monument, looking out from the base",
          "A circle of flags stands around the stone base",
          "One view looks toward the Lincoln Memorial, a white building with columns, far away",
          "The other view looks toward the United States Capitol dome, far away",
          "This is looking from the monument. It does not show walking inside either building",
          "The United States Capitol is not the Texas State Capitol",
        ],
      },
      {
        id: "by-the-water",
        title: "Toward Jefferson",
        icon: "droplet",
        videoFile: "/videos/dc/chapter7_by_the_water.mp4",
        durationSeconds: 4,
        sensoryNotes: [
          { icon: "🌳", text: "A short walk outside, with trees and a road." },
          { icon: "💧", text: "Then water, with a few people sitting." },
        ],
        starterQuestions: ["Is that the Jefferson Memorial?", "Do we have to cross the road?"],
        groundingFacts: [
          "This short part is the walk from the monuments toward the Jefferson Memorial, beside the water",
          "First it shows two people walking under trees, red signs, and parked cars",
          "Then it shows water, trees, and a few people sitting",
          "The Jefferson Memorial building is not clearly shown in this short part",
          "Do not say the memorial dome is visible here",
        ],
      },
      {
        id: "along-the-mall",
        title: "Along the Mall",
        icon: "sun",
        videoFile: "/videos/dc/chapter8_along_the_mall.mp4",
        durationSeconds: 30,
        sensoryNotes: [
          { icon: "🚶", text: "A long walk on a wide path beside a lawn." },
          { icon: "🏛️", text: "The Jefferson Memorial is far away at the start. Later, the Capitol is ahead." },
        ],
        starterQuestions: ["Which building is far away?", "Can we stop and rest?"],
        groundingFacts: [
          "Starts with the Jefferson Memorial dome far away on one side and the Washington Monument tiny and far away",
          "Then people walk on a wide path beside a green lawn",
          "Later the United States Capitol dome is ahead",
          "This is the National Mall in Washington, DC, seen from outside",
          "The video does not show going inside the Jefferson Memorial or the Capitol",
        ],
      },
      {
        id: "capitol",
        title: "The Capitol",
        icon: "columns",
        videoFile: "/videos/dc/chapter9_the_capitol.mp4",
        durationSeconds: 30,
        sensoryNotes: [
          { icon: "🌳", text: "Another walk on the Mall, with trees and open sky." },
          { icon: "🏛️", text: "The United States Capitol gets closer across the lawn." },
        ],
        starterQuestions: ["Is this the same Capitol as Texas?", "Do we go inside?"],
        groundingFacts: [
          "Shows a walk toward the United States Capitol",
          "At the start, the Jefferson Memorial dome is far away on one side and the Washington Monument is far ahead. Smithsonian Castle towers are on the other side",
          "People walk toward the Capitol",
          "The end shows the Capitol dome closer, across the lawn",
          "This is not the Texas State Capitol. It is the Capitol in Washington, DC, seen from outside",
          "The video does not show going inside",
        ],
      },
      {
        id: "train-home",
        title: "The Train Home",
        icon: "train",
        videoFile: "/videos/dc/chapter10_train_home.mp4",
        durationSeconds: 28,
        sensoryNotes: [
          { icon: "🚇", text: "A train waits at an underground platform." },
          { icon: "🌙", text: "Later it is darker outside. An escalator goes up." },
        ],
        starterQuestions: ["Is this the train back?", "Where do we get on?"],
        groundingFacts: [
          "This is the ride back toward Reston",
          "The trip boards the Metro at Capitol South, the station nearest the United States Capitol",
          "The video shows a Metro train beside an underground platform with a patterned floor and a high ceiling",
          "Then it shows a sidewalk outside near a glass building when the sky is darker",
          "Then two people ride an escalator, one in a pale hoodie and a yellow hat",
          "A station-name sign is not clearly readable in the video, so do not invent words on a sign",
          "Do not promise a seat. The picture shows the train and the platform",
        ],
      },
    ],
    generalFacts: [
      "This practice visit is for getting used to public transport and finding the way around Washington, DC",
      "The trip starts at Reston Station, rides the Metro, comes up from the station, and then walks outside between monuments",
      "Places seen from outside include the White House, the Washington Monument, a view toward the Lincoln Memorial, the water by the Jefferson Memorial, and the United States Capitol",
      "The White House is a white building where the president of the United States lives and works. In this video, people stay outside the fence",
      "The Washington Monument is a tall white stone tower on a lawn",
      "The Lincoln Memorial and the Jefferson Memorial are other monuments nearby. These videos look toward them from outside",
      "The United States Capitol in Washington, DC is a different building from the Texas State Capitol in Austin",
      "The way back is the Metro from Capitol South, the station nearest the United States Capitol, toward Reston",
      "These videos do not show going inside the White House, the monuments, or the Capitol",
    ],
  },
};

export default scenarios;

export function getScenario(id) {
  return scenarios[id] ?? null;
}

export function findChapter(scenario, chapterId) {
  return (
    scenario?.chapters?.find((chapter) => chapter.id === chapterId) ??
    scenario?.chapters?.[0] ??
    null
  );
}

export function chapterTitle(chapter) {
  return chapter?.title || chapter?.label || "This part";
}
