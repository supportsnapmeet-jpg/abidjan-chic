'use client';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function CarteMap({ lat, lng, nom }: { lat: number; lng: number; nom: string }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  if (!isLoaded) return <div className="h-48 bg-gray-100 animate-pulse rounded-2xl"/>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '200px' }}
      center={{ lat, lng }}
      zoom={15}
      options={{ disableDefaultUI: true, zoomControl: true }}
    >
      <Marker position={{ lat, lng }} title={nom} />
    </GoogleMap>
  );
}