import { useState } from 'react';
import Modal from './Modal.jsx';
import { STATUSES } from '../utils/format.js';

const empty = { title: '', destination: '', state: '', startDate: '', endDate: '', travellers: 2, budget: '', status: 'Planned' };

export function validateTrip(v) {
  const e = {};
  if (!v.title.trim()) e.title = 'Give your trip a name.';
  if (!v.destination.trim()) e.destination = 'Enter a destination city.';
  if (!v.state.trim()) e.state = 'Enter the state.';
  if (!v.startDate) e.startDate = 'Pick a start date.';
  if (!v.endDate) e.endDate = 'Pick an end date.';
  else if (v.startDate && v.endDate < v.startDate) e.endDate = 'End date must be on or after the start date.';
  if (!(Number(v.travellers) >= 1)) e.travellers = 'At least 1 traveller.';
  if (!(Number(v.budget) > 0)) e.budget = 'Enter a budget in ₹.';
  return e;
}

export default function TripForm({ initial, onSave, onClose }) {
  const [values, setValues] = useState(initial || empty);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = validateTrip(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSave({ ...values, title: values.title.trim(), destination: values.destination.trim(), state: values.state.trim(), travellers: Number(values.travellers), budget: Number(values.budget) });
    }
  };

  // Plain function (not a component) so inputs keep focus while typing.
  const field = (name, label, props = {}) => (
    <label className="field">
      <span>{label}</span>
      <input value={values[name]} onChange={set(name)} className={errors[name] ? 'invalid' : ''} {...props} />
      {errors[name] && <small className="err">{errors[name]}</small>}
    </label>
  );

  return (
    <Modal title={initial ? 'Edit trip' : 'Plan a new trip'} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className="form-grid">
          {field('title', 'Trip name', { placeholder: 'e.g. Diwali in Udaipur' })}
          {field('destination', 'Destination', { placeholder: 'Udaipur' })}
          {field('state', 'State', { placeholder: 'Rajasthan' })}
          <label className="field"><span>Status</span>
            <select value={values.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
          {field('startDate', 'Start date', { type: 'date' })}
          {field('endDate', 'End date', { type: 'date' })}
          {field('travellers', 'Travellers', { type: 'number', min: 1 })}
          {field('budget', 'Budget (₹)', { type: 'number', min: 1, placeholder: '50000' })}
        </div>
        <div className="actions"><button type="button" className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary">{initial ? 'Save changes' : 'Create trip'}</button></div>
      </form>
    </Modal>
  );
}
