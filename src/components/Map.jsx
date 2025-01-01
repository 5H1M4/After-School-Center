import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const position = [40.7128, -74.0060]; // Example coordinates

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Visit Us</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We're conveniently located in the heart of the city.
          </p>
        </div>
        <div className="mt-16 h-[400px] rounded-lg overflow-hidden">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                KinderJoy Kindergarten<br />
                123 Education Street<br />
                New York, NY 10001
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}