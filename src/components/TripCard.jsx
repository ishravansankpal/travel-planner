import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Pencil, Trash2, Star } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import { inr, fmtDate, nightsBetween, tripSpend } from '../utils/format.js';

export default function TripCard({ trip, onEdit, onDelete, onFavourite }) {
  const spend = tripSpend(trip);
  const pct = Math.min(100, Math.round((spend / trip.budget) * 100));
  return (
    <article className="card trip-card">
      <div className="trip-top"><StatusBadge status={trip.status} /><div>
        <button className={`icon-btn star${trip.favourite ? ' on' : ''}`} title={trip.favourite ? 'Remove favourite' : 'Add to favourites'} onClick={() => onFavourite(trip)}><Star size={16} /></button>
        <button className="icon-btn" title="Edit" onClick={() => onEdit(trip)}><Pencil size={16} /></button>
        <button className="icon-btn danger" title="Delete" onClick={() => onDelete(trip)}><Trash2 size={16} /></button></div></div>
      <h3><Link to={`/trips/${trip.id}`}>{trip.title}</Link></h3>
      <p className="meta"><MapPin size={14} /> {trip.destination}, {trip.state}</p>
      <p className="meta"><Calendar size={14} /> {fmtDate(trip.startDate)} · {nightsBetween(trip.startDate, trip.endDate)} nights</p>
      <p className="meta"><Users size={14} /> {trip.travellers} travellers</p>
      <div className="progress"><div style={{ width: `${pct}%` }} className={spend > trip.budget ? 'over' : ''} /></div>
      <p className="meta budget-line"><span>{inr(spend)} planned</span><span>of {inr(trip.budget)}</span></p>
    </article>
  );
}
