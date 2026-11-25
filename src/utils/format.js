export const inr = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export const nightsBetween = (start, end) =>
  Math.max(0, Math.round((new Date(end) - new Date(start)) / 86400000));

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export const tripSpend = (trip) =>
  trip.days.reduce((sum, d) => sum + d.activities.reduce((s, a) => s + Number(a.cost || 0), 0), 0);

export const STATUSES = ['Planned', 'Ongoing', 'Completed'];
