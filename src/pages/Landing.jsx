import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { Compass, CalendarRange, Wallet, MapPinned } from 'lucide-react';

const features = [
  { icon: CalendarRange, title: 'Day-wise itineraries', text: 'Plan every day from sunrise aarti to late-night street food, with timings.' },
  { icon: Wallet, title: 'Budget in ₹', text: 'Every activity has a cost. See at a glance if you are under or over budget.' },
  { icon: MapPinned, title: 'All your trips together', text: 'Search by city or state and track trips as planned, ongoing or completed.' },
];
const places = ['Jaipur', 'Alleppey', 'Leh', 'Varanasi', 'Panaji', 'Hampi', 'Munnar', 'Madikeri'];

export default function Landing() {
  return (
    <div className="landing">
      <header className="top-bar">
        <div className="brand dark"><Compass size={24} /> Yatra</div>
        <div className="top-actions"><ThemeToggle /><Link className="btn ghost" to="/login">Log in</Link> <Link className="btn primary" to="/register">Get started</Link></div>
      </header>
      <section className="hero">
        <h1>Plan your India trip, day by day.</h1>
        <p>From the ghats of Varanasi to the backwaters of Kerala, build itineraries, track every rupee and keep your whole group on the same page.</p>
        <div className="hero-actions">
          <Link className="btn primary lg" to="/register">Plan my first trip</Link>
          <Link className="btn ghost lg" to="/login">Try the demo account</Link>
        </div>
        <ul className="places">{places.map((p) => <li key={p}>{p}</li>)}</ul>
      </section>
      <section className="features">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="feature"><Icon size={26} /><h3>{title}</h3><p>{text}</p></div>
        ))}
      </section>
      <footer className="foot">Built in Pune. Demo project.</footer>
    </div>
  );
}
