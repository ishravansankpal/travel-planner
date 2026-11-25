import { useMemo, useState } from 'react';
import { Plus, Search, Map, Star, LayoutGrid, List } from 'lucide-react';
import { useTrips } from '../context/TripsContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import TripCard from '../components/TripCard.jsx';
import TripForm from '../components/TripForm.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Modal from '../components/Modal.jsx';
import { STATUSES } from '../utils/format.js';

const PAGE_SIZE = 6;

export default function Trips() {
  const { trips, addTrip, updateTrip, deleteTrip } = useTrips();
  const { notify } = useToast();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('date');
  const [page, setPage] = useState(1);
  const [favOnly, setFavOnly] = useState(false);
  const [view, setView] = useState('grid');
  const [editing, setEditing] = useState(null); // null | 'new' | trip object
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = trips.filter((t) =>
      (status === 'All' || t.status === status) && (!favOnly || t.favourite) &&
      (!q || [t.title, t.destination, t.state].some((s) => s.toLowerCase().includes(q))));
    const sorters = {
      date: (a, b) => a.startDate.localeCompare(b.startDate),
      budget: (a, b) => b.budget - a.budget,
      name: (a, b) => a.title.localeCompare(b.title),
    };
    return list.sort(sorters[sort]);
  }, [trips, query, status, sort, favOnly]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const onFilter = (setter) => (e) => { setter(e.target.value); setPage(1); };

  const save = (data) => {
    if (editing === 'new') { addTrip(data); notify('Trip created'); }
    else { updateTrip(editing.id, data); notify('Trip updated'); }
    setEditing(null);
  };

  return (
    <>
      <header className="page-head"><div><h1>My trips</h1><p>{trips.length} trips across India</p></div>
        <button className="btn primary" onClick={() => setEditing('new')}><Plus size={18} /> New trip</button></header>
      <div className="toolbar">
        <div className="search"><Search size={16} /><input placeholder="Search by trip, city or state" value={query} onChange={onFilter(setQuery)} /></div>
        <select value={status} onChange={onFilter(setStatus)} aria-label="Filter by status"><option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <select value={sort} onChange={onFilter(setSort)} aria-label="Sort trips">
          <option value="date">Sort: Start date</option><option value="budget">Sort: Budget (high to low)</option><option value="name">Sort: Name (A–Z)</option>
        </select>
        <button className={`btn ghost${favOnly ? ' active' : ''}`} onClick={() => { setFavOnly(!favOnly); setPage(1); }} aria-pressed={favOnly}><Star size={16} /> Favourites</button>
        <div className="view-toggle">
          <button className={`icon-btn${view === 'grid' ? ' on' : ''}`} onClick={() => setView('grid')} title="Grid view" aria-label="Grid view"><LayoutGrid size={18} /></button>
          <button className={`icon-btn${view === 'list' ? ' on' : ''}`} onClick={() => setView('list')} title="List view" aria-label="List view"><List size={18} /></button>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={Map} title="No trips found" text={trips.length ? 'Try a different search or filter.' : 'Create your first trip to get started.'}
          action={<button className="btn primary" onClick={() => setEditing('new')}>New trip</button>} />
      ) : (
        <div className={`trip-grid ${view}`}>{visible.map((t) => <TripCard key={t.id} trip={t} onEdit={setEditing} onDelete={setDeleting} onFavourite={(t) => updateTrip(t.id, { favourite: !t.favourite })} />)}</div>
      )}

      {pages > 1 && (
        <div className="pager">
          <button className="btn ghost" disabled={current === 1} onClick={() => setPage(current - 1)}>Previous</button>
          <span>Page {current} of {pages}</span>
          <button className="btn ghost" disabled={current === pages} onClick={() => setPage(current + 1)}>Next</button>
        </div>
      )}

      {editing && <TripForm initial={editing === 'new' ? null : editing} onSave={save} onClose={() => setEditing(null)} />}
      {deleting && (
        <Modal title="Delete trip?" onClose={() => setDeleting(null)}>
          <p>“{deleting.title}” and its itinerary will be removed permanently.</p>
          <div className="actions"><button className="btn ghost" onClick={() => setDeleting(null)}>Keep trip</button>
            <button className="btn danger" onClick={() => { deleteTrip(deleting.id); notify('Trip deleted'); setDeleting(null); }}>Delete trip</button></div>
        </Modal>
      )}
    </>
  );
}
