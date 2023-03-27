//Dashboard

export const weather = [
  {
    icon: "wi-day-sunny",
    temp: "24",
    percent: "80",
    mm: "3",
  },
  {
    icon: "wi-day-sunny",
    temp: "24",
    percent: "80",
    mm: "3",
  },
  {
    icon: "wi-day-cloudy",
    temp: "24",
    percent: "80",
    mm: "3",
  },
];

export const accountStats = {
  tasksToday: 12,
  tasksTomorrow: 32,
  tasksOverdue: 4,
  plants: 22352,
};

export const progress = [
  { title: "SEEDING", progress: 75 },
  { title: "PINCHING", progress: 50 },
  { title: "POTTING ON", progress: 75 },
  { title: "TRANSPLANT", progress: 50 },
  { title: "HARVEST", progress: 30 },
];

//Master Plan

export const dummyList = {
  overdue: [
    { name: "Seed Lisianthus", date: "2022-07-12T17:28:34+00:00" },
    { name: "Seed Lisianthus", date: "2022-07-11T17:28:34+00:00" },
    { name: "Seed Lisianthus", date: "2022-07-11T17:28:34+00:00" },
    { name: "Seed Lisianthus", date: "2022-07-11T17:28:34+00:00" },
    { name: "Seed Lisianthus", date: "2022-07-11T17:28:34+00:00" },
  ],
  today: [
    {
      id: 1,
      title: "Harden Dahlia",
      description: "King Orange Helium",
      type: "start",
      note: {
        title: "Seed Note",
        text: "King Orange Helium is a classic Zinnia, with large and easy to handle seeds. Start two seeds per cell, and lightly cover with vermiculite before moistening. Zinnias are large seedlings and should sprout up in just a few days."
      },
      detail:{
        title: "Start 450 seeds",
        text: "Light is NOT required for germination.",
        day: 14
      }
    },
    {
      id: 2,
      title: "Seed Lisianthus",
      description: "King Orange Helium",
      type: "start",
      note: {
        title: "Seed Note",
        text: "King Orange Helium is a classic Zinnia, with large and easy to handle seeds. Start two seeds per cell, and lightly cover with vermiculite before moistening. Zinnias are large seedlings and should sprout up in just a few days."
      },
      detail:{
        title: "Start 450 seeds",
        text: "Light is NOT required for germination.",
        day: 14
      }
    }
  ],
  tomorrow: [{ name: "Harden Stock" }],
  thisWeek: [
    { name: "Harden Dahlia", date: "2022-07-05T17:31:19+00:00" },
    { name: "Harden Dahlia", date: "2022-07-05T17:31:19+00:00" },
    { name: "Harden Dahlia", date: "2022-07-06T17:31:19+00:00" },
    { name: "Harden Dahlia", date: "2022-07-08T17:31:19+00:00" },
    { name: "Harden Dahlia", date: "2022-07-09T17:31:19+00:00" },
    { name: "Harden Dahlia", date: "2022-07-10T17:31:19+00:00" },
  ],
};

export const byPlant = {
  currentPlant: {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  plantOptions: [
    {
      name: "Seed Date",
      date: "2022-04-12T17:28:34+00:00",
      day: 7,
      status: "complete",      
    },
    {
      name: "Potting-On Date",
      date: "2022-04-30T17:28:34+00:00",
      day: 1,
      status: "incomplete",
    },
    {
      name: "Pinch Date",
      date: "2022-04-30T17:28:34+00:00",
      day: 1,
      status: "complete",
    },
    {
      name: "Harden Date",
      date: "2022-05-12T17:28:34+00:00",
      day: 5,
      status: "complete",
    },
    {
      name: "Transplant Date",
      date: "2022-06-12T17:28:34+00:00",
      day: 8,
      status: "overdue",
    },
    {
      name: "Harvest Date",
      date: "2022-07-12T17:28:34+00:00",
      day: 3,
      status: "notdue",
    },
  ],
  plants: [
    {
      id: 139248,
      name: "Popcandy Mix",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
    {
      id: 269845,
      name: "Purple Haze",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
    {
      id: 139248,
      name: "Popcandy Mix",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
    {
      id: 269845,
      name: "Purple Haze",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
    {
      id: 139248,
      name: "Popcandy Mix",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
    {
      id: 269845,
      name: "Purple Haze",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
    {
      id: 139248,
      name: "Popcandy Mix",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
    {
      id: 269845,
      name: "Purple Haze",
      unit: "500",
      user: "Zinnia",
      description: "Delicate classic pink spin on the always beloved Cosmos."
    },
  ],
};

//Modify Plan

export const currentPlan = {
  name: "Cosmos",
  variety: "Variety Name Here",
  description:
    "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
};

export const availablePlans = [
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
];

export const yourPlan = [
  {
    name: "Variety Name",
    count: "324",
    species: "Species",
  },
  {
    name: "Variety Name",
    count: "324",
    species: "Species",
    notes: "5 plantings separated by 14 days",
  },
  {
    name: "Variety Name",
    count: "324",
    species: "Species",
  },
  {
    name: "Variety Name",
    count: "324",
    species: "Species",
  },
  {
    name: "Variety Name",
    count: "324",
    species: "Species",
  }
];

//Plant Settings

export const settingsPlants = [
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
  {
    name: "Cosmos",
    variety: "Variety Name Here",
    description:
      "Short Brief Description of that flower will go here, outlining some highlights of what it is.",
  },
];

//... Blooms next week
export const blooms = [
  {
    title: "Zinnia",
    description: "sunrise celebration",
    plants: 450,
    image: 'bloom1.jpg'
  },
  {
    title: "Zinnia",
    description: "mixed fireworks",
    plants: 800,
    image: 'bloom2.jpg'
  },
  {
    title: "Zinnia",
    description: "open center",
    plants: 50,
    image: 'bloom3.jpg'
  },
  {
    title: "Sunflower",
    description: "sunrise celebration",
    plants: 450,
    image: 'bloom4.jpg'
  },
  {
    title: "cosmos",
    description: "pale blue sky",
    plants: 450,
    image: 'bloom5.jpg'
  },
  {
    title: "cosmos",
    description: "rocket firestorm",
    plants: 450,
    image: 'bloom6.jpg'
  },
  {
    title: "dahlia",
    description: "sunset mix",
    plants: 600,
    image: 'bloom7.jpg'
  },
  {
    title: "dahlia",
    description: "fully double mix",
    plants: 450,
    image: 'bloom8.jpg'
  },
  {
    title: "aster",
    description: "pricess yellow",
    plants: 450,
    image: 'bloom9.jpg'
  },
];