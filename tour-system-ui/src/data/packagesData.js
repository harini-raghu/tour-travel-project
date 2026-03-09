// src/data/packagesData.js

// 🔸 IMAGE IMPORTS (you will download & save these images)
import oneDay from "../assets/packages/one-day-coorg.jpg"
import sightseeing from "../assets/packages/coorg-sightseeing.jpg"
import honeymoon from "../assets/packages/honeymoon-coorg.jpg"
import family from "../assets/packages/family-coorg.jpg"
import mandapatti from "../assets/packages/mandapatti-jeep.jpg"
import dubare from "../assets/packages/dubare-elephant.jpg"
import talakaveri from "../assets/packages/talakaveri.jpg"
import abbey from "../assets/packages/abbey-falls.jpg"

const packagesData = [
  /* ================= POPULAR PACKAGES (HOME PAGE) ================= */

  {
    id: 1,
    title: "One Day Coorg Tour",
    location: "Madikeri, Coorg",
    duration: "1 Day",
    price: "On Request",
    image: oneDay,
    popular: true,

    description:
      "Perfect for short trips, covering the most popular attractions in Coorg within a single day.",

    highlights: [
      "Abbey Falls",
      "Raja’s Seat",
      "Omkareshwara Temple",
      "Coffee Plantation Visit",
    ],

    itinerary: [
      {
        day: "Same Day",
        details:
          "Pickup from hotel, sightseeing of major attractions, and drop-off by evening.",
      },
    ],

    includes: [
      "Private transport",
      "Experienced driver",
    ],

    excludes: [
      "Food",
      "Entry tickets",
    ],
  },

  {
    id: 2,
    title: "Coorg Sightseeing Package",
    location: "Coorg",
    duration: "2 Days / 1 Night",
    price: "On Request",
    image: sightseeing,
    popular: true,

    description:
      "Explore the scenic beauty of Coorg with waterfalls, viewpoints, temples, and coffee plantations.",

    highlights: [
      "Abbey Falls",
      "Dubare Elephant Camp",
      "Talacauvery",
      "Raja’s Seat",
    ],

    itinerary: [
      {
        day: "Day 1",
        details: "Arrival, local sightseeing, and hotel check-in.",
      },
      {
        day: "Day 2",
        details: "Temple visits, viewpoints, and departure.",
      },
    ],

    includes: [
      "Pickup & drop",
      "Sightseeing vehicle",
    ],

    excludes: [
      "Meals",
      "Entry fees",
    ],
  },

  {
    id: 3,
    title: "Honeymoon Tour Package",
    location: "Coorg",
    duration: "3 Days / 2 Nights",
    price: "On Request",
    image: honeymoon,
    popular: true,

    description:
      "A romantic getaway designed for couples to enjoy peaceful stays and scenic locations in Coorg.",

    highlights: [
      "Romantic stays",
      "Private sightseeing",
      "Scenic viewpoints",
    ],

    itinerary: [
      {
        day: "Day 1",
        details: "Arrival and leisure time.",
      },
      {
        day: "Day 2",
        details: "Sightseeing and romantic experiences.",
      },
      {
        day: "Day 3",
        details: "Checkout and departure.",
      },
    ],

    includes: [
      "Accommodation",
      "Private transport",
    ],

    excludes: [
      "Personal expenses",
      "Meals unless specified",
    ],
  },

  {
    id: 4,
    title: "Family Tour Package",
    location: "Coorg",
    duration: "3 Days / 2 Nights",
    price: "On Request",
    image: family,
    popular: true,

    description:
      "A family-friendly tour covering major attractions with comfort, safety, and flexible schedules.",

    highlights: [
      "Comfortable travel",
      "Family-friendly locations",
      "Relaxed itinerary",
    ],

    itinerary: [
      {
        day: "Day 1",
        details: "Arrival and local sightseeing.",
      },
      {
        day: "Day 2",
        details: "Major tourist attractions.",
      },
      {
        day: "Day 3",
        details: "Checkout and return.",
      },
    ],

    includes: [
      "Transport",
      "Driver allowance",
    ],

    excludes: [
      "Food",
      "Entry fees",
    ],
  },

  /* ================= OTHER PACKAGES ================= */

  {
    id: 5,
    title: "Mandapatti Jeep Safari",
    location: "Mandapatti, Coorg",
    duration: "Half Day",
    price: "On Request",
    image: mandapatti,
    popular: false,

    description:
      "Thrilling off-road jeep safari to Mandapatti viewpoint with breathtaking sunrise and sunset views.",

    highlights: [
      "4x4 Jeep Safari",
      "Off-road experience",
      "Hilltop viewpoints",
    ],

    itinerary: [
      {
        day: "Same Day",
        details: "Jeep safari to Mandapatti and return.",
      },
    ],

    includes: [
      "Jeep safari",
      "Experienced driver",
    ],

    excludes: [
      "Food",
      "Personal expenses",
    ],
  },

  {
    id: 6,
    title: "Dubare Elephant Camp Tour",
    location: "Dubare, Coorg",
    duration: "Half Day",
    price: "On Request",
    image: dubare,
    popular: false,

    description:
      "Visit the famous Dubare Elephant Camp to interact with elephants and enjoy river-side views.",

    highlights: [
      "Elephant interaction",
      "River crossing",
      "Forest experience",
    ],

    itinerary: [
      {
        day: "Same Day",
        details: "Visit Dubare Elephant Camp and return.",
      },
    ],

    includes: [
      "Transport",
    ],

    excludes: [
      "Entry fees",
      "Food",
    ],
  },

  {
    id: 7,
    title: "Talakaveri & Bhagamandala Tour",
    location: "Talakaveri, Coorg",
    duration: "1 Day",
    price: "On Request",
    image: talakaveri,
    popular: false,

    description:
      "Spiritual tour covering the origin of River Cauvery and nearby temples.",

    highlights: [
      "Talakaveri Temple",
      "Bhagamandala Sangama",
      "Hill views",
    ],

    itinerary: [
      {
        day: "Same Day",
        details: "Temple visits and sightseeing.",
      },
    ],

    includes: [
      "Transport",
    ],

    excludes: [
      "Food",
      "Entry tickets",
    ],
  },

  {
    id: 8,
    title: "Abbey Falls & Raja’s Seat Tour",
    location: "Madikeri, Coorg",
    duration: "Half Day",
    price: "On Request",
    image: abbey,
    popular: false,

    description:
      "Short sightseeing tour covering Coorg’s most iconic waterfall and sunset viewpoint.",

    highlights: [
      "Abbey Falls",
      "Raja’s Seat",
      "Photography spots",
    ],

    itinerary: [
      {
        day: "Same Day",
        details: "Sightseeing and return.",
      },
    ],

    includes: [
      "Transport",
    ],

    excludes: [
      "Food",
      "Entry fees",
    ],
  },
]

export default packagesData
