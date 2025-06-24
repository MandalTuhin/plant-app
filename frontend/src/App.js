import React, { useState, useEffect } from 'react';
import './App.css';

function Section({ name, img, description }) {
  return (
    <div className="sections">
      <img src={process.env.PUBLIC_URL + img} alt={name} />
      <h2>{name}</h2>
      <div className="text">{description}</div>
    </div>
  );
}

function App() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/plants')
      .then(res => res.json())
      .then(data => {
        setPlants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load plants:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading plants…</p>;

  return (
    <div className="container">
      <div className="title">Information!</div>
      <div className="section-wrapper">
        {plants.map(p => (
          <Section
            key={p.id}
            name={p.name}
            img={p.img}
            description={p.description}
          />
        ))}
      </div>
      <div className="footer">
        <div>
          Icons made by{' '}
          <a
            href="https://www.flaticon.com/authors/icongeek26"
            title="Icongeek26"
          >
            Icongeek26
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
