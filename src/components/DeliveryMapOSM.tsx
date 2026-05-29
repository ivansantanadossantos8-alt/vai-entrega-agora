import "@/lib/ssr-leaflet-shim";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in leaflet with react
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons (could be replaced by nice SVGs later)
const originIcon = L.divIcon({
  html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const destinationIcon = L.divIcon({
  html: `<div style="background-color: #ff6400; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export type LatLng = { lat: number; lng: number };

interface RouteData {
  distance: number; // in meters
  duration: number; // in seconds
  coordinates: [number, number][]; // [lat, lng]
}

interface DeliveryMapOSMProps {
  origin: LatLng;
  destination: LatLng;
  onRouteCalculated?: (data: RouteData) => void;
  onRouteError?: () => void;
}

// Component to handle map bounds automatically
function MapBounds({ routeCoords, origin, destination }: { routeCoords: [number, number][], origin: LatLng, destination: LatLng }) {
  const map = useMap();

  useEffect(() => {
    if (routeCoords.length > 0) {
      const bounds = L.latLngBounds(routeCoords);
      map.fitBounds(bounds, { padding: [40, 40] });
    } else {
      const bounds = L.latLngBounds([origin, destination]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [map, routeCoords, origin, destination]);

  return null;
}

export function DeliveryMapOSM({ origin, destination, onRouteCalculated, onRouteError }: DeliveryMapOSMProps) {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !origin || !destination) return;

    const fetchRoute = async () => {
      try {
        // OSRM expects: longitude,latitude
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          
          // OSRM returns GeoJSON coordinates as [longitude, latitude]
          // Leaflet Polyline expects [latitude, longitude]
          const coords: [number, number][] = route.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          
          setRouteCoords(coords);
          setError(false);
          
          if (onRouteCalculated) {
            onRouteCalculated({
              distance: route.distance,
              duration: route.duration,
              coordinates: coords,
            });
          }
        } else {
          setError(true);
          if (onRouteError) onRouteError();
        }
      } catch (err) {
        console.error("Error fetching route from OSRM", err);
        setError(true);
        if (onRouteError) onRouteError();
      }
    };

    fetchRoute();
  }, [isClient, origin.lat, origin.lng, destination.lat, destination.lng]);

  const center: [number, number] = [
    (origin.lat + destination.lat) / 2,
    (origin.lng + destination.lng) / 2
  ];

  if (!isClient) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
        Carregando mapa...
      </div>
    );
  }

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-grayscale" // We can style this via CSS for a more modern look
        />
        
        <Marker position={[origin.lat, origin.lng]} icon={originIcon} />
        <Marker position={[destination.lat, destination.lng]} icon={destinationIcon} />
        
        {routeCoords.length > 0 && (
          <Polyline 
            positions={routeCoords} 
            pathOptions={{ color: "#ff6400", weight: 5, lineCap: "round", lineJoin: "round" }} 
          />
        )}

        <MapBounds routeCoords={routeCoords} origin={origin} destination={destination} />
      </MapContainer>
    </div>
  );
}
