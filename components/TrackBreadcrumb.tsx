import React, { useState, useContext }  from 'react';
import Link from 'next/link';
import { Context } from '../pages/track/[number]';


// Track Bread Crumb
const TrackBreadcrumb = (props) => {
  // Hooks
  const {trackName, setTrackName} = useContext(Context);
  const trackData = props.trackData;

  return (
    <ul className="breadcrumb">
      <li><Link href="/"><a>Home</a></Link></li>
      <li><Link href={"/category/" + trackData.path}><a>{trackData.category}</a></Link></li>
      <li>{trackName}</li>
    </ul>
  );
};

export default TrackBreadcrumb;