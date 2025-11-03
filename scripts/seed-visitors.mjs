const databaseUrl = 'https://game-690c4.firebaseio.com';

const visitors = [
  {
    country: 'United States',
    city: 'New York',
    lat: 40.7128,
    lng: -74.006,
    timestamp: new Date().toISOString(),
  },
  {
    country: 'Pakistan',
    city: 'Faisalabad',
    lat: 31.4504,
    lng: 73.135,
    timestamp: new Date().toISOString(),
  },
  {
    country: 'United Kingdom',
    city: 'London',
    lat: 51.5072,
    lng: -0.1276,
    timestamp: new Date().toISOString(),
  },
];

async function seedVisitor(visitor) {
  const response = await fetch(`${databaseUrl}/visitors.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(visitor),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to seed visitor (${response.status}): ${text}`);
  }

  return response.json();
}

async function run() {
  try {
    for (const visitor of visitors) {
      const result = await seedVisitor(visitor);
      console.log('Seeded visitor with key:', result.name);
    }
    console.log('Completed seeding visitors.');
  } catch (error) {
    console.error('Error seeding visitors:', error);
    process.exit(1);
  }
}

run();
