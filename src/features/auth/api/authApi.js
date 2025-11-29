// Fake API for demo; replace with real fetch/axios later.
export async function registerDoctor(payload) {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 700));
  // In real life, POST to your backend here:
  // const res = await fetch('/api/doctor/register', { method:'POST', body: JSON.stringify(payload), headers:{'Content-Type':'application/json'} });
  // if (!res.ok) throw new Error('Registration failed');
  // return await res.json();
  return { ok: true, doctorId: 'D-' + Math.floor(Math.random() * 1e6) };
}
export async function registerPatient(payload) {
  await new Promise(r => setTimeout(r, 700));
  return { ok: true, patientId: 'P-' + Math.floor(Math.random() * 1e6) };
}
