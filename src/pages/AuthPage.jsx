import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function AuthPage({ mode }) {
  const isLogin = mode === 'login';
  const { login, register } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: isLogin ? 'demo@yatra.in' : '', password: isLogin ? 'Demo@123' : '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!isLogin && form.name.trim().length < 2) found.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address.';
    if (form.password.length < 6) found.password = 'Password must be at least 6 characters.';
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    try {
      if (isLogin) login(form.email, form.password); else register(form);
      notify(isLogin ? 'Welcome back!' : 'Account created. Happy planning!');
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: err.message });
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={submit} noValidate>
        <div className="brand dark"><Compass size={24} /> Yatra</div>
        <h1>{isLogin ? 'Log in' : 'Create your account'}</h1>
        {isLogin && <p className="hint">Demo account is pre-filled: demo@yatra.in / Demo@123</p>}
        {errors.form && <div className="alert">{errors.form}</div>}
        {!isLogin && (
          <label className="field"><span>Full name</span>
            <input value={form.name} onChange={set('name')} className={errors.name ? 'invalid' : ''} />
            {errors.name && <small className="err">{errors.name}</small>}</label>
        )}
        <label className="field"><span>Email</span>
          <input type="email" value={form.email} onChange={set('email')} className={errors.email ? 'invalid' : ''} />
          {errors.email && <small className="err">{errors.email}</small>}</label>
        <label className="field"><span>Password</span>
          <input type="password" value={form.password} onChange={set('password')} className={errors.password ? 'invalid' : ''} />
          {errors.password && <small className="err">{errors.password}</small>}</label>
        <button className="btn primary block" disabled={loading}>{loading ? 'Please wait…' : isLogin ? 'Log in' : 'Create account'}</button>
        <p className="switch">{isLogin ? <>New to Yatra? <Link to="/register">Create an account</Link></> : <>Already registered? <Link to="/login">Log in</Link></>}</p>
      </form>
    </div>
  );
}
