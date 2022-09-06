import React, { useState, useContext }  from 'react';
import Link from 'next/link';
import { numberContext } from '../context/numberContext';
import { trackContext } from '../context/trackContext';


// Track Bread Crumb
const TrackBreadcrumb = () => {
  // Hooks
  const {trackName, setTrackName} = useContext(numberContext);
  const {trackData, setTrackData} = useContext(trackContext);

  return (
    <ul className="breadcrumb">
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href={"/category/" + trackData.path}><a>{trackData.category}</a></Link></li>
      <li>{trackName}</li>
    </ul>
  );
};

export default TrackBreadcrumb;