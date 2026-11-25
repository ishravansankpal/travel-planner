import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { seedTrips } from '../data/seed.js';
import { uid } from '../utils/format.js';

const TripsCtx = createContext(null);

// Each user gets their own list of trips in LocalStorage.
export function TripsProvider({ userId, children }) {
  const [trips, setTrips] = useLocalStorage(`yatra_trips_${userId}`, seedTrips);

  const addTrip = (data) => setTrips((p) => [{ ...data, id: uid(), days: [] }, ...p]);
  const updateTrip = (id, patch) => setTrips((p) => p.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const deleteTrip = (id) => setTrips((p) => p.filter((t) => t.id !== id));
  const resetTrips = () => setTrips(seedTrips);

  return (
    <TripsCtx.Provider value={{ trips, addTrip, updateTrip, deleteTrip, resetTrips }}>{children}</TripsCtx.Provider>
  );
}

export const useTrips = () => useContext(TripsCtx);
