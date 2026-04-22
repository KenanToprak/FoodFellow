import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import RequestCard from '../components/RequestCard';
import { Map, List } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Home.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView = ({ requests, center }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers
    requests.forEach(req => {
      const marker = L.marker(req.location, { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="min-width: 150px">
          <h3 style="font-weight: bold; color: #ff5a5f; margin: 0 0 5px 0;">${req.restaurant}</h3>
          <p style="margin: 0; font-size: 14px;">Basket Amount: ${req.currentAmount}/${req.targetAmount} ₺</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Time: ${req.expiresIn}</p>
        </div>
      `);
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [requests, center]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

const Home = () => {
  const { requests, userLocation } = useContext(AppContext);
  const [view, setView] = useState('list');

  return (
    <div className="container py-4">
      <div className="flex justify-between items-center mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold">Nearby Opportunities</h1>
          <p className="text-muted">Save money with a shared basket</p>
        </div>

        <div className="view-toggle">
          <button
            className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            <List size={18} /> List
          </button>
          <button
            className={`toggle-btn ${view === 'map' ? 'active' : ''}`}
            onClick={() => setView('map')}
          >
            <Map size={18} /> Map
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="requests-grid">
          {requests.map(req => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      ) : (
        <div className="map-wrapper animate-slide-up" style={{ minHeight: '400px', height: '60vh' }}>
          <MapView requests={requests} center={userLocation} />
        </div>
      )}
    </div>
  );
};

export default Home;
