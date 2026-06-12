const fetch = require('node-fetch');
async function run() {
  const res = await fetch('http://localhost:3000/api/health-bot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello', medicineName: 'Test' })
  });
  console.log(await res.json());
}
run();
