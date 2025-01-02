import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const position = [40.7128, -74.0060]; // Example coordinates

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Na Vizitoni</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
          Ndodhemi në një vend të lehtë për t'u arritur, në zemër të qytetit.
          </p>
        </div>
        <div className="mt-16 h-[600px] rounded-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d187.2796558890792!2d19.812921624164336!3d41.32029440160557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAdresa%3ARruga%20.Sami%20Frasheri%20P.20%2F1%2Ckati%201!5e0!3m2!1sen!2s!4v1735774472555!5m2!1sen!2s"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}