import { Link } from 'react-router-dom';
import { Plane, Wallet, CalendarClock, CheckCircle2, Map } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext.jsx';
import { useTrips } from '../context/TripsContext.jsx';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { inr, fmtDate, tripSpend, STATUSES } from '../utils/format.js';

export default function Dashboard() {
  const { user } = useAuth();
  const { trips } = useTrips();

  const planned = trips.filter((t) => t.status === 'Planned');
  const stats = [
    { icon: Plane, label: 'Total trips', value: trips.length },
    { icon: CalendarClock, label: 'Upcoming', value: planned.length },
    { icon: CheckCircle2, label: 'Completed', value: trips.filter((t) => t.status === 'Completed').length },
    { icon: Wallet, label: 'Total budget', value: inr(trips.reduce((s, t) => s + t.budget, 0)) },
  ];
  const chartData = trips.slice(0, 6).map((t) => ({ name: t.destination, Budget: t.budget, Planned: tripSpend(t) }));
  const statusData = STATUSES.map((s) => ({ name: s, value: trips.filter((t) => t.status === s).length })).filter((d) => d.value > 0);
  const statusColors = { Planned: '#3b82b6', Ongoing: '#e08a1e', Completed: '#2e7d4f' };
  const favourites = trips.filter((t) => t.favourite);
  const upcoming = [...planned].sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 4);

  return (
    <>
      <header className="page-head"><div><h1>Namaste, {user.name.split(' ')[0]} 🙏</h1><p>Here is how your travel plans look today.</p></div>
        <Link to="/trips" className="btn primary">Plan a trip</Link></header>
      <section className="stats">
        {stats.map(({ icon: Icon, label, value }) => (
          <div className="card stat" key={label}><Icon size={20} /><span>{label}</span><strong>{value}</strong></div>
        ))}
      </section>
      {trips.length === 0 ? (
        <EmptyState icon={Map} title="No trips yet" text="Create your first trip to see budgets and charts here." action={<Link to="/trips" className="btn primary">Plan a trip</Link>} />
      ) : (
        <section className="grid-2">
          <div className="card">
            <h2>Budget vs planned spend</h2>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} fontSize={12} />
                  <YAxis tickFormatter={(v) => `₹${v / 1000}k`} tickLine={false} axisLine={false} fontSize={12} width={55} />
                  <Tooltip formatter={(v) => inr(v)} />
                  <Legend />
                  <Bar dataKey="Budget" fill="#1f5c5a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Planned" fill="#e08a1e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <h2>Coming up</h2>
            {upcoming.length === 0 ? <p className="muted">No upcoming trips.</p> : upcoming.map((t) => (
              <Link to={`/trips/${t.id}`} className="row-link" key={t.id}>
                <div><strong>{t.title}</strong><small>{t.destination} · {fmtDate(t.startDate)}</small></div><StatusBadge status={t.status} />
              </Link>
            ))}
          </div>
        </section>
      )}
      {trips.length > 0 && (
        <section className="grid-2 second">
          <div className="card">
            <h2>Trips by status</h2>
            <div className="chart small">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                    {statusData.map((d) => <Cell key={d.name} fill={statusColors[d.name]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <h2>Favourite trips</h2>
            {favourites.length === 0 ? <p className="muted">Star a trip to pin it here.</p> : favourites.slice(0, 4).map((t) => (
              <Link to={`/trips/${t.id}`} className="row-link" key={t.id}>
                <div><strong>{t.title}</strong><small>{t.destination}, {t.state}</small></div><span className="fav-star">★</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
