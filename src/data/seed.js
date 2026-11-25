const act = (id, time, text, cost) => ({ id, time, text, cost });

// Demo trips shown to every new account so the app is never empty.
export const seedTrips = [
  { id: 't1', favourite: true, title: 'Pink City Heritage Break', destination: 'Jaipur', state: 'Rajasthan', startDate: '2026-12-18', endDate: '2026-12-22', travellers: 4, budget: 60000, status: 'Planned',
    days: [
      { id: 'd1', title: 'Day 1', activities: [act('a1', '10:00', 'Amber Fort and palace walk', 1600), act('a2', '19:30', 'Dinner at Chokhi Dhani', 3200)] },
      { id: 'd2', title: 'Day 2', activities: [act('a3', '09:30', 'City Palace and Jantar Mantar', 2400), act('a4', '16:00', 'Bapu Bazaar shopping', 8000)] } ] },
  { id: 't2', favourite: true, title: 'Kerala Backwaters Escape', destination: 'Alleppey', state: 'Kerala', startDate: '2027-01-10', endDate: '2027-01-15', travellers: 2, budget: 85000, status: 'Planned',
    days: [{ id: 'd3', title: 'Day 1', activities: [act('a5', '12:00', 'Private houseboat check-in', 14000), act('a6', '18:00', 'Sunset cruise on Vembanad Lake', 2500)] }] },
  { id: 't3', title: 'Goa Weekend with Friends', destination: 'Panaji', state: 'Goa', startDate: '2026-11-14', endDate: '2026-11-17', travellers: 5, budget: 55000, status: 'Ongoing',
    days: [{ id: 'd4', title: 'Day 1', activities: [act('a7', '11:00', 'Baga and Calangute beach hopping', 1500), act('a8', '21:00', 'Dinner in Fontainhas', 4200)] }] },
  { id: 't4', title: 'Leh–Ladakh Road Trip', destination: 'Leh', state: 'Ladakh', startDate: '2026-06-05', endDate: '2026-06-14', travellers: 3, budget: 120000, status: 'Completed',
    days: [{ id: 'd5', title: 'Day 1', activities: [act('a9', '08:00', 'Acclimatisation day and Leh Palace', 3000), act('a10', '17:00', 'Shanti Stupa sunset', 0)] }] },
  { id: 't5', title: 'Varanasi Ganga Aarti', destination: 'Varanasi', state: 'Uttar Pradesh', startDate: '2027-02-06', endDate: '2027-02-09', travellers: 2, budget: 30000, status: 'Planned',
    days: [{ id: 'd6', title: 'Day 1', activities: [act('a11', '18:00', 'Dashashwamedh Ghat evening aarti', 800)] }] },
  { id: 't6', title: 'Coorg Coffee Estate Stay', destination: 'Madikeri', state: 'Karnataka', startDate: '2026-09-12', endDate: '2026-09-14', travellers: 2, budget: 28000, status: 'Completed',
    days: [{ id: 'd7', title: 'Day 1', activities: [act('a12', '10:00', 'Plantation walk and coffee tasting', 1200), act('a13', '15:00', 'Abbey Falls visit', 400)] }] },
  { id: 't7', title: 'Munnar Tea Hills from Pune', destination: 'Munnar', state: 'Kerala', startDate: '2027-03-04', endDate: '2027-03-08', travellers: 4, budget: 70000, status: 'Planned', days: [] },
  { id: 't8', title: 'Hampi Ruins and Bouldering', destination: 'Hampi', state: 'Karnataka', startDate: '2026-08-01', endDate: '2026-08-04', travellers: 3, budget: 24000, status: 'Completed',
    days: [{ id: 'd8', title: 'Day 1', activities: [act('a14', '06:00', 'Virupaksha Temple at sunrise', 200)] }] },
];

export const demoUser = {
  id: 'u1', name: 'Aarav Deshmukh', email: 'demo@yatra.in', password: 'Demo@123', city: 'Pune', phone: '9876543210',
};
