'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ref,
  push,
  query,
  onValue,
  limitToLast,
} from 'firebase/database';
import { database } from '../lib/firebase';

export default function WorldMap() {
  const [visitors, setVisitors] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [hoveredVisitor, setHoveredVisitor] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const ipapiToken = process.env.NEXT_PUBLIC_IPAPI_TOKEN;

  const fetchVisitorGeo = async () => {
    const ipapiBase = 'https://ipapi.co/json/';
    const ipapiUrl = ipapiToken ? `${ipapiBase}?token=${ipapiToken}` : ipapiBase;

    try {
      const response = await fetch(ipapiUrl, { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json();
        return {
          city: payload.city ?? null,
          country: payload.country_name ?? null,
          latitude: Number(payload.latitude),
          longitude: Number(payload.longitude),
          ip: payload.ip ?? null,
          source: 'ipapi',
        };
      }
    } catch (error) {
      console.warn('ipapi request failed, falling back to ipwho.is', error);
    }

    const fallbackUrl = 'https://ipwho.is/?fields=ip,success,city,country,latitude,longitude';
    try {
      const response = await fetch(fallbackUrl, { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json();
        if (payload.success !== false) {
          return {
            city: payload.city ?? null,
            country: payload.country ?? null,
            latitude: Number(payload.latitude),
            longitude: Number(payload.longitude),
            ip: payload.ip ?? null,
            source: 'ipwho',
          };
        }
      }
    } catch (error) {
      console.error('Fallback geolocation request failed', error);
    }

    throw new Error('Unable to resolve visitor location');
  };

  useEffect(() => {
    if (!database) {
      return;
    }

    const visitorsQuery = query(ref(database, 'visitors'), limitToLast(50));
    const stopVisitors = onValue(visitorsQuery, (snapshot) => {
      const entries = [];
      snapshot.forEach((child) => {
        entries.push({ id: child.key, ...child.val() });
      });
      setVisitors(entries);
      setTotalVisitors(entries.length);
    });

    const trackVisitor = async () => {
      try {
        const geo = await fetchVisitorGeo();
        const lat = Number(geo.latitude);
        const lng = Number(geo.longitude);

        const visitorRecord = {
          country: geo.country ?? null,
          city: geo.city ?? null,
          lat: Number.isFinite(lat) ? lat : null,
          lng: Number.isFinite(lng) ? lng : null,
          timestamp: new Date().toISOString(),
          source: geo.source,
          ip: geo.ip ?? null,
        };

        await push(ref(database, 'visitors'), visitorRecord);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();

    return () => {
      if (typeof stopVisitors === 'function') {
        stopVisitors();
      }
    };
  }, [database]);

  // Convert lat/lng to SVG coordinates (Mercator projection approximation)
  const projectToMap = (lat, lng) => {
    // Proper mercator projection for 800x400 viewBox
    const x = ((lng + 180) * (800 / 360));
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = 200 - (mercN * (400 / (2 * Math.PI)));
    return { x, y };
  };

  const uniqueCountries = useMemo(() => {
    return [...new Set(visitors.map((v) => v.country))].filter(Boolean).length;
  }, [visitors]);

  return (
    <div className="w-full max-w-5xl mx-auto my-20">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-3">
            Visitors
          </h3>
          <p className="text-gray-600 text-lg">Real-time visitor tracking from around the globe</p>
        </div>

        {/* Map Container */}
        <div className="relative w-full bg-[#2563eb] rounded-2xl overflow-hidden shadow-inner" style={{ height: '500px' }}>
          {/* Real World Map as background */}
          <div className="absolute inset-0 opacity-90">
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <image 
                href="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
                x="0" 
                y="0" 
                width="800" 
                height="400"
                preserveAspectRatio="xMidYMid slice"
                opacity="0.25"
              />
            </svg>
          </div>
          
          {/* Visitor dots overlay */}
          <svg
            viewBox="0 0 800 400"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            onMouseMove={(event) => {
              const boundingRect = event.currentTarget.getBoundingClientRect();
              const x = event.clientX - boundingRect.left;
              const y = event.clientY - boundingRect.top;
              setTooltipPosition({ x, y });
            }}
            onMouseLeave={() => {
              setHoveredVisitor(null);
            }}
          >
            {/* Visitor Dots with Ping Animation */}
            {visitors.map((visitor, index) => {
              if (!Number.isFinite(visitor.lat) || !Number.isFinite(visitor.lng)) {
                return null;
              }
              const pos = projectToMap(visitor.lat, visitor.lng);
              const delay = index * 0.1;
              
              return (
                <g
                  key={visitor.id || index}
                  onMouseEnter={() => {
                    setHoveredVisitor({
                      country: visitor.country ?? 'Unknown',
                      city: visitor.city ?? 'Unknown',
                      timestamp: visitor.timestamp,
                    });
                  }}
                >
                  {/* Outer ping circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="0"
                    fill="#FFA500"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      from="0"
                      to="15"
                      dur="2s"
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.8"
                      to="0"
                      dur="2s"
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Main dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="6"
                    fill="#FFA500"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    opacity="0"
                  >
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      dur="0.5s"
                      begin={`${delay}s`}
                      fill="freeze"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {hoveredVisitor && (
            <div
              className="pointer-events-none absolute rounded-xl bg-white/90 px-4 py-3 text-sm shadow-xl border border-purple-100"
              style={{
                left: Math.min(Math.max(tooltipPosition.x + 16, 16), 760),
                top: Math.min(Math.max(tooltipPosition.y + 16, 16), 360),
              }}
            >
              <p className="font-semibold text-gray-800">{hoveredVisitor.city}</p>
              <p className="text-gray-600">{hoveredVisitor.country}</p>
              {hoveredVisitor.timestamp && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(hoveredVisitor.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Zoom controls styled like the image */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-1 bg-white rounded shadow-lg">
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold text-lg border-b">
              +
            </button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold text-lg">
              −
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {uniqueCountries}
            </p>
            <p className="text-gray-600 mt-1">Countries Reached</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-cyan-50 p-6 rounded-xl">
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {totalVisitors}
            </p>
            <p className="text-gray-600 mt-1">Total Visitors</p>
          </div>
        </div>

        {/* Recent Visitors List */}
        {visitors.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Recent Visitors</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-32 overflow-y-auto">
              {visitors.slice().reverse().slice(0, 12).map((visitor, index) => (
                <div
                  key={visitor.id || index}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {visitor.city || visitor.country || 'Unknown'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
