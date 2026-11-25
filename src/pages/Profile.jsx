import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTrips } from '../context/TripsContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { resetTrips } = useTrips();
  const { notify } = useToast();
  const [form, setForm] = useState({ name: user.name, city: user.city, phone: user.phone });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    const found = {};
    if (form.name.trim().length < 2) found.name = 'Enter your full name.';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) found.phone = 'Enter a valid 10-digit Indian mobile number.';
    setErrors(found);
    if (Object.keys(found).length) return;
    updateProfile({ name: form.name.trim(), city: form.city.trim(), phone: form.phone });
    notify('Profile saved');
  };

  return (
    <>
      <header className="page-head"><div><h1>Profile</h1><p>Manage your account details.</p></div></header>
      <form className="card profile" onSubmit={save} noValidate>
        <label className="field"><span>Full name</span><input value={form.name} onChange={set('name')} className={errors.name ? 'invalid' : ''} />{errors.name && <small className="err">{errors.name}</small>}</label>
        <label className="field"><span>Email</span><input value={user.email} disabled /></label>
        <label className="field"><span>Home city</span><input value={form.city} onChange={set('city')} placeholder="Pune" /></label>
        <label className="field"><span>Mobile number</span><input value={form.phone} onChange={set('phone')} placeholder="98XXXXXXXX" maxLength={10} className={errors.phone ? 'invalid' : ''} />{errors.phone && <small className="err">{errors.phone}</small>}</label>
        <div className="actions"><button type="button" className="btn ghost" onClick={() => { resetTrips(); notify('Demo trips restored'); }}>Restore demo trips</button><button className="btn primary">Save changes</button></div>
      </form>
    </>
  );
}
