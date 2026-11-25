import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, Plus, Trash2, Clock, CalendarX } from 'lucide-react';
import { useTrips } from '../context/TripsContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { inr, fmtDate, nightsBetween, tripSpend, uid } from '../utils/format.js';

function ActivityForm({ onAdd }) {
  const [v, setV] = useState({ time: '09:00', text: '', cost: '' });
  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!v.text.trim()) return setError('Describe the activity.');
    if (v.cost !== '' && Number(v.cost) < 0) return setError('Cost cannot be negative.');
    onAdd({ id: uid(), time: v.time || '00:00', text: v.text.trim(), cost: Number(v.cost || 0) });
    setV({ time: v.time, text: '', cost: '' }); setError('');
  };
  return (
    <form className="act-form" onSubmit={submit}>
      <input type="time" value={v.time} onChange={(e) => setV({ ...v, time: e.target.value })} aria-label="Time" />
      <input placeholder="e.g. Lunch at a local dhaba" value={v.text} onChange={(e) => setV({ ...v, text: e.target.value })} aria-label="Activity" />
      <input type="number" min="0" placeholder="Cost ₹" value={v.cost} onChange={(e) => setV({ ...v, cost: e.target.value })} aria-label="Cost" />
      <button className="btn primary"><Plus size={16} /> Add</button>
      {error && <small className="err">{error}</small>}
    </form>
  );
}

export default function TripDetail() {
  const { id } = useParams();
  const { trips, updateTrip } = useTrips();
  const { notify } = useToast();
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return <EmptyState icon={CalendarX} title="Trip not found" text="It may have been deleted." action={<Link to="/trips" className="btn primary">Back to trips</Link>} />;
  }

  const setDays = (days) => updateTrip(trip.id, { days });
  const addDay = () => { setDays([...trip.days, { id: uid(), title: `Day ${trip.days.length + 1}`, activities: [] }]); notify('Day added'); };
  const removeDay = (dayId) => { setDays(trip.days.filter((d) => d.id !== dayId).map((d, i) => ({ ...d, title: `Day ${i + 1}` }))); notify('Day removed'); };
  const addActivity = (dayId, a) => setDays(trip.days.map((d) => d.id === dayId ? { ...d, activities: [...d.activities, a].sort((x, y) => x.time.localeCompare(y.time)) } : d));
  const removeActivity = (dayId, aId) => setDays(trip.days.map((d) => d.id === dayId ? { ...d, activities: d.activities.filter((a) => a.id !== aId) } : d));

  const spend = tripSpend(trip);
  const left = trip.budget - spend;
  const pct = Math.min(100, Math.round((spend / trip.budget) * 100));

  return (
    <>
      <Link to="/trips" className="back"><ArrowLeft size={16} /> All trips</Link>
      <header className="page-head"><div><h1>{trip.title}</h1>
        <p className="meta-row"><span><MapPin size={14} /> {trip.destination}, {trip.state}</span><span><Calendar size={14} /> {fmtDate(trip.startDate)} – {fmtDate(trip.endDate)} ({nightsBetween(trip.startDate, trip.endDate)} nights)</span><span><Users size={14} /> {trip.travellers}</span></p></div>
        <StatusBadge status={trip.status} /></header>

      <div className="card budget-card">
        <div><small>Planned spend</small><strong>{inr(spend)}</strong></div>
        <div><small>Budget</small><strong>{inr(trip.budget)}</strong></div>
        <div><small>{left >= 0 ? 'Remaining' : 'Over budget by'}</small><strong className={left < 0 ? 'neg' : ''}>{inr(Math.abs(left))}</strong></div>
        <div className="progress wide"><div style={{ width: `${pct}%` }} className={left < 0 ? 'over' : ''} /></div>
      </div>

      <div className="page-head sub"><h2>Itinerary</h2><button className="btn ghost" onClick={addDay}><Plus size={16} /> Add day</button></div>
      {trip.days.length === 0 ? (
        <EmptyState icon={Calendar} title="No itinerary yet" text="Add your first day, then fill it with activities and costs." action={<button className="btn primary" onClick={addDay}>Add day 1</button>} />
      ) : trip.days.map((day) => (
        <section className="card day" key={day.id}>
          <div className="day-head"><h3>{day.title}</h3><button className="icon-btn danger" title="Remove day" onClick={() => removeDay(day.id)}><Trash2 size={16} /></button></div>
          {day.activities.length === 0 && <p className="muted">No activities yet.</p>}
          <ul className="acts">
            {day.activities.map((a) => (
              <li key={a.id}><span className="time"><Clock size={14} /> {a.time}</span><span className="txt">{a.text}</span><span className="cost">{inr(a.cost)}</span>
                <button className="icon-btn danger" title="Remove activity" onClick={() => removeActivity(day.id, a.id)}><Trash2 size={14} /></button></li>
            ))}
          </ul>
          <ActivityForm onAdd={(a) => addActivity(day.id, a)} />
        </section>
      ))}
    </>
  );
}
