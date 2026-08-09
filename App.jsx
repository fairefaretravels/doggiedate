import React, { useState, useMemo } from 'react';
import {
  PawPrint, Heart, X, MapPin, Phone, Search, Stethoscope,
  Dog, Pencil, Check, Sparkles, User, Clock, ChevronRight
} from 'lucide-react';

const c = {
  bg: '#FFF8EC',
  card: '#FFFEFA',
  ink: '#2B2118',
  inkSoft: '#6B5D4F',
  tangerine: '#FF7A45',
  tangerineDark: '#C9531F',
  grass: '#3F9C6E',
  grassDark: '#215C3D',
  sunshine: '#FFC93C',
  sunshineDark: '#8A5F00',
  bubblegum: '#FF6FA0',
  bubblegumDark: '#A02B57',
  sky: '#4FA8D8',
  skyDark: '#1F5E82',
};

const dogsData = [
  { id: 'd1', name: 'Buddy', breed: 'Golden Retriever', age: 3, size: 'Large', energy: 'High', temperament: 'Friendly, playful, loves fetch', color: c.sunshine, dark: c.sunshineDark, owner: 'Alice', checkup: { date: 'Jan 15, 2025', status: 'Healthy — vaccinations current', details: 'Annual checkup clear. Rabies + DHPP done. Dewormed. Next visit Jan 2026.' } },
  { id: 'd2', name: 'Bella', breed: 'Poodle', age: 2, size: 'Medium', energy: 'Medium', temperament: 'Calm, smart, gentle with pups', color: c.bubblegum, dark: c.bubblegumDark, owner: 'Bob', checkup: { date: 'Nov 20, 2024', status: 'All clear', details: 'Regular checkup, no concerns. Rabies + Bordetella. Microchipped.' } },
  { id: 'd3', name: 'Max', breed: 'German Shepherd', age: 5, size: 'Large', energy: 'High', temperament: 'Protective, loyal, great runner', color: c.sky, dark: c.skyDark, owner: 'Charlie', checkup: { date: 'Mar 1, 2025', status: 'Good condition', details: 'Standard check. Rabies, DHPP, Lepto. Good weight and tone.' } },
  { id: 'd4', name: 'Daisy', breed: 'Beagle', age: 1, size: 'Small', energy: 'Medium', temperament: 'Curious, snuggly, food-motivated', color: c.grass, dark: c.grassDark, owner: 'Diana', checkup: { date: 'Feb 10, 2025', status: 'Healthy puppy growth', details: 'First annual visit. All puppy shots done. Good development.' } },
];

const businessesData = [
  { id: 'b1', name: 'Pawsitively Groomed', type: 'Grooming salon', address: '123 Pet St', phone: '555-1234', description: 'Full-service grooming for all breeds — baths, cuts, nail trims.', sponsored: true },
  { id: 'b2', name: 'Healthy Bites', type: 'Pet supply store', address: '456 Bone Ave', phone: '555-5678', description: 'Organic and natural pet foods, toys, and accessories.', sponsored: false },
  { id: 'b3', name: 'Bark Park Cafe', type: 'Pet-friendly cafe', address: '789 Leash Ln', phone: '555-9012', description: 'Coffee and treats with your dog on our outdoor patio.', sponsored: true },
];

const vetsData = [
  { id: 'v1', name: 'Community Animal Hospital', type: 'Veterinary clinic', address: '101 Healing Rd', phone: '555-0001', hours: 'Mon–Fri 9am–5pm', description: 'Comprehensive care, emergency services available.' },
  { id: 'v2', name: 'Petco Doggie Town', type: 'Pet supply store', address: '202 Furry Blvd', phone: '555-0002', hours: 'Mon–Sun 9am–9pm', description: 'Wide selection of food, toys, and grooming supplies.' },
  { id: 'v3', name: 'Happy Tails Vet', type: 'Veterinary clinic', address: '303 Wag Way', phone: '555-0003', hours: 'Mon–Sat 8am–6pm', description: 'Preventative care, dental services, and surgery.' },
  { id: 'v4', name: 'Doggie Depot', type: 'Pet supply store', address: '404 Chew St', phone: '555-0004', hours: 'Mon–Sat 10am–8pm', description: 'Local pet store with unique gifts and specialty foods.' },
];

function DogSticker({ dog, size = 'lg' }) {
  const dims = size === 'lg' ? { h: 240 } : { h: 140 };
  return (
    <div style={{ height: dims.h, background: dog.color, borderRadius: 20, border: `2px solid ${c.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <PawPrint size={size === 'lg' ? 84 : 52} color={dog.dark} strokeWidth={1.5} style={{ opacity: 0.9 }} />
      <div style={{ position: 'absolute', top: 10, left: 10, background: c.card, border: `2px solid ${c.ink}`, borderRadius: 999, padding: '2px 10px', fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 13, color: c.ink }}>
        {dog.name}
      </div>
    </div>
  );
}

function Chip({ label, value, bg, fg }) {
  return (
    <div style={{ background: bg, border: `1.5px solid ${c.ink}`, borderRadius: 999, padding: '6px 12px', fontFamily: "'Figtree', sans-serif" }}>
      <span style={{ fontSize: 11, color: fg, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}: </span>
      <span style={{ fontSize: 13, color: c.ink, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function Tab({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 999,
        border: `2px solid ${c.ink}`, background: active ? c.tangerine : c.card,
        color: active ? '#fff' : c.ink, fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 15,
        cursor: 'pointer', transition: 'transform 0.15s ease', flexShrink: 0,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}

function HealthModal({ dog, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(43,33,24,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 50 }} onClick={onClose}>
      <div
        style={{ background: c.card, borderRadius: 24, border: `3px solid ${c.ink}`, padding: 24, maxWidth: 380, width: '100%', position: 'relative', boxShadow: `6px 6px 0 ${c.ink}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: c.bg, border: `2px solid ${c.ink}`, borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <X size={16} color={c.ink} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Stethoscope size={22} color={c.grassDark} />
          <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 20, color: c.ink, margin: 0 }}>{dog.name}'s checkup</h3>
        </div>
        <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, color: c.inkSoft, margin: '6px 0' }}><b style={{ color: c.ink }}>Last visit:</b> {dog.checkup.date}</p>
        <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, color: c.inkSoft, margin: '6px 0' }}><b style={{ color: c.ink }}>Status:</b> {dog.checkup.status}</p>
        <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, color: c.inkSoft, margin: '6px 0 16px', lineHeight: 1.6 }}>{dog.checkup.details}</p>
        <p style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, color: c.inkSoft, fontStyle: 'italic', margin: 0 }}>Health info is owner-reported — verify independently.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  const [dogs] = useState(dogsData);
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(null);
  const [showHealth, setShowHealth] = useState(false);
  const [liked, setLiked] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(false);
  const [myDog, setMyDog] = useState({ name: '', breed: '', age: '', size: '', energy: '', temperament: '' });

  const current = dogs[idx % dogs.length];

  const swipe = (dir) => {
    setAnim(dir);
    setTimeout(() => {
      if (dir === 'right' && !liked.includes(current.id)) {
        setLiked((l) => [...l, current.id]);
      }
      setIdx((i) => (i + 1) % dogs.length);
      setAnim(null);
    }, 220);
  };

  const filteredVets = useMemo(
    () => vetsData.filter((v) =>
      (v.name + v.type + v.address).toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const field = (label, key, type = 'text', options) => (
    <div style={{ marginBottom: 14, textAlign: 'left' }}>
      <label style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, fontWeight: 700, color: c.inkSoft, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</label>
      {type === 'select' ? (
        <select
          value={myDog[key]}
          onChange={(e) => setMyDog((p) => ({ ...p, [key]: e.target.value }))}
          style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 12, border: `2px solid ${c.ink}`, background: c.card, fontFamily: "'Figtree', sans-serif", fontSize: 14, color: c.ink }}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={myDog[key]}
          onChange={(e) => setMyDog((p) => ({ ...p, [key]: e.target.value }))}
          rows={3}
          style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 12, border: `2px solid ${c.ink}`, background: c.card, fontFamily: "'Figtree', sans-serif", fontSize: 14, color: c.ink, resize: 'vertical' }}
        />
      ) : (
        <input
          type={type}
          value={myDog[key]}
          onChange={(e) => setMyDog((p) => ({ ...p, [key]: e.target.value }))}
          style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 12, border: `2px solid ${c.ink}`, background: c.card, fontFamily: "'Figtree', sans-serif", fontSize: 14, color: c.ink }}
        />
      )}
    </div>
  );

  return (
    <div style={{ background: c.bg, minHeight: '100%', fontFamily: "'Figtree', sans-serif", color: c.ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Figtree:wght@400;500;600;700&display=swap');`}</style>

      <header style={{ padding: '20px 20px 12px', borderBottom: `2px solid ${c.ink}`, background: c.card }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ background: c.tangerine, border: `2px solid ${c.ink}`, borderRadius: 12, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PawPrint size={20} color="#fff" />
          </div>
          <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 26, margin: 0, color: c.ink }}>Doggie Date</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          <Tab active={view === 'home'} onClick={() => setView('home')} icon={Heart} label="Playdates" />
          <Tab active={view === 'businesses'} onClick={() => setView('businesses')} icon={Sparkles} label="Businesses" />
          <Tab active={view === 'vets'} onClick={() => setView('vets')} icon={Stethoscope} label="Vets & supplies" />
          <Tab active={view === 'profile'} onClick={() => setView('profile')} icon={User} label="My dog" />
        </div>
      </header>

      <main style={{ padding: '24px 20px 40px', maxWidth: 560, margin: '0 auto' }}>

        {view === 'home' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 15, color: c.tangerineDark, fontWeight: 700, marginBottom: 4 }}>Find a playmate nearby</p>
            <div
              style={{
                background: c.card, border: `3px solid ${c.ink}`, borderRadius: 24, padding: 18, maxWidth: 340, margin: '10px auto 0',
                boxShadow: `6px 6px 0 ${c.ink}`, transform: anim === 'left' ? 'translateX(-120px) rotate(-12deg)' : anim === 'right' ? 'translateX(120px) rotate(12deg)' : 'rotate(-1deg)',
                opacity: anim ? 0 : 1, transition: 'all 0.22s ease',
              }}
            >
              <DogSticker dog={current} />
              <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 26, margin: '14px 0 2px' }}>{current.name}</h2>
              <p style={{ fontSize: 14, color: c.inkSoft, margin: '0 0 12px', fontWeight: 600 }}>{current.breed} · {current.age} {current.age === 1 ? 'year' : 'years'} old</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
                <Chip label="Size" value={current.size} bg="#FFF3E4" fg={c.tangerineDark} />
                <Chip label="Energy" value={current.energy} bg="#FFE9F1" fg={c.bubblegumDark} />
              </div>
              <p style={{ fontSize: 13, color: c.inkSoft, fontStyle: 'italic', margin: '0 0 14px' }}>{current.temperament}</p>
              <button
                onClick={() => setShowHealth(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: c.sky, border: `2px solid ${c.ink}`, borderRadius: 999, padding: '8px 16px', color: '#fff', fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                <Stethoscope size={15} /> Health checkup
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 22 }}>
              <button onClick={() => swipe('left')} aria-label="Pass" style={{ width: 58, height: 58, borderRadius: '50%', background: c.card, border: `3px solid ${c.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `3px 3px 0 ${c.ink}` }}>
                <X size={26} color={c.bubblegumDark} />
              </button>
              <button onClick={() => swipe('right')} aria-label="Like" style={{ width: 58, height: 58, borderRadius: '50%', background: c.grass, border: `3px solid ${c.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `3px 3px 0 ${c.ink}` }}>
                <Heart size={26} color="#fff" fill="#fff" />
              </button>
            </div>

            {showHealth && <HealthModal dog={current} onClose={() => setShowHealth(false)} />}
          </div>
        )}

        {view === 'businesses' && (
          <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 16, textAlign: 'center' }}>Local dog businesses</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {businessesData.map((b) => (
                <div key={b.id} style={{ background: c.card, border: `2.5px solid ${c.ink}`, borderRadius: 18, padding: 16, boxShadow: b.sponsored ? `4px 4px 0 ${c.sunshine}` : `4px 4px 0 ${c.ink}`, position: 'relative' }}>
                  {b.sponsored && (
                    <span style={{ position: 'absolute', top: -10, right: 14, background: c.sunshine, border: `2px solid ${c.ink}`, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700, fontFamily: "'Baloo 2', sans-serif", color: c.sunshineDark }}>Sponsored</span>
                  )}
                  <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 18, margin: '0 0 4px' }}>{b.name}</h3>
                  <p style={{ fontSize: 12, color: c.tangerineDark, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3, margin: '0 0 8px' }}>{b.type}</p>
                  <p style={{ fontSize: 14, color: c.inkSoft, margin: '0 0 10px', lineHeight: 1.5 }}>{b.description}</p>
                  <div style={{ display: 'flex', gap: 14, fontSize: 13, color: c.ink, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} />{b.address}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={14} />{b.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'vets' && (
          <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 16, textAlign: 'center' }}>Vets & supplies</h2>
            <div style={{ position: 'relative', marginBottom: 18 }}>
              <Search size={17} color={c.inkSoft} style={{ position: 'absolute', left: 14, top: 13 }} />
              <input
                placeholder="Search by name, type, or address"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '11px 14px 11px 38px', borderRadius: 999, border: `2px solid ${c.ink}`, background: c.card, fontFamily: "'Figtree', sans-serif", fontSize: 14, color: c.ink }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredVets.length ? filteredVets.map((v) => (
                <div key={v.id} style={{ background: c.card, border: `2px solid ${c.ink}`, borderRadius: 16, padding: 14 }}>
                  <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 16, margin: '0 0 4px' }}>{v.name}</h3>
                  <p style={{ fontSize: 12, color: c.grassDark, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px' }}>{v.type}</p>
                  <p style={{ fontSize: 13, color: c.inkSoft, margin: '0 0 8px' }}>{v.description}</p>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: c.ink, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} />{v.address}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={13} />{v.phone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} />{v.hours}</span>
                  </div>
                </div>
              )) : (
                <p style={{ textAlign: 'center', color: c.inkSoft, fontSize: 14 }}>No matches. Try a different search.</p>
              )}
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 16, textAlign: 'center' }}>My dog</h2>

            <div style={{ background: c.card, border: `2.5px solid ${c.ink}`, borderRadius: 20, padding: 20, boxShadow: `4px 4px 0 ${c.ink}`, marginBottom: 20 }}>
              {editing ? (
                <>
                  {field('Name', 'name')}
                  {field('Breed', 'breed')}
                  {field('Age (years)', 'age', 'number')}
                  {field('Size', 'size', 'select', ['Small', 'Medium', 'Large', 'Giant'])}
                  {field('Energy', 'energy', 'select', ['Low', 'Medium', 'High'])}
                  {field('Temperament', 'temperament', 'textarea')}
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button onClick={() => setEditing(false)} style={{ flex: 1, background: c.grass, border: `2px solid ${c.ink}`, borderRadius: 999, padding: '10px 0', color: '#fff', fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Check size={16} /> Save
                    </button>
                    <button onClick={() => setEditing(false)} style={{ flex: 1, background: c.card, border: `2px solid ${c.ink}`, borderRadius: 999, padding: '10px 0', color: c.ink, fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : myDog.name ? (
                <>
                  <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 20, margin: '0 0 8px' }}>{myDog.name}</h3>
                  <p style={{ fontSize: 14, color: c.inkSoft, margin: '0 0 10px' }}>{myDog.breed} · {myDog.age} years · {myDog.size} · {myDog.energy} energy</p>
                  <p style={{ fontSize: 13, color: c.inkSoft, fontStyle: 'italic', marginBottom: 16 }}>{myDog.temperament}</p>
                  <button onClick={() => setEditing(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: c.tangerine, border: `2px solid ${c.ink}`, borderRadius: 999, padding: '9px 16px', color: '#fff', fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    <Pencil size={14} /> Edit profile
                  </button>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Dog size={40} color={c.inkSoft} style={{ marginBottom: 8 }} />
                  <p style={{ color: c.inkSoft, marginBottom: 14, fontSize: 14 }}>You haven't set up your dog's profile yet.</p>
                  <button onClick={() => setEditing(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: c.tangerine, border: `2px solid ${c.ink}`, borderRadius: 999, padding: '10px 18px', color: '#fff', fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    <Sparkles size={15} /> Set up profile
                  </button>
                </div>
              )}
            </div>

            <div style={{ background: c.card, border: `2.5px solid ${c.ink}`, borderRadius: 20, padding: 20 }}>
              <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 17, margin: '0 0 12px' }}>Dogs you've liked</h3>
              {liked.length ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {liked.map((id) => {
                    const d = dogs.find((x) => x.id === id);
                    return (
                      <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: c.bg, border: `1.5px solid ${c.ink}`, borderRadius: 12, padding: '8px 12px' }}>
                        <Heart size={15} color={c.bubblegumDark} fill={c.bubblegumDark} />
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{d?.name}</span>
                        <span style={{ fontSize: 12, color: c.inkSoft }}>· {d?.breed}</span>
                        <ChevronRight size={14} color={c.inkSoft} style={{ marginLeft: 'auto' }} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ fontSize: 14, color: c.inkSoft }}>No matches yet — start swiping on the Playdates tab.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
