async function run() {
  const response = await fetch('https://ipapi.co/json/');
  const text = await response.text();
  console.log('Status:', response.status);
  console.log('Headers:', Object.fromEntries(response.headers));
  console.log('Body:', text);
}

run().catch((error) => {
  console.error('Failed to fetch IP info:', error);
});
