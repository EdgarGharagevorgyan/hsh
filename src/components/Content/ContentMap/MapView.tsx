"use client";

import dynamic from "next/dynamic";

// Dynamically import the map with SSR disabled
const LeafletMap = dynamic(() => import("./LeafletMap"), {
   ssr: false,
});

export default function MapView() {
   return <LeafletMap />;
}
