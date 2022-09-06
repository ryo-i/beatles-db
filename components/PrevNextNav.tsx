import React, { useState, useEffect, useContext }  from 'react';
import { numberContext } from '../context/numberContext';
import Link from 'next/link';
import styled from 'styled-components';


// CSS in JS
const Nav = styled.nav`
    ul {
        display: flex;
        justify-content: space-between;
        list-style: none;
        margin: 20px 0 0;
        padding: 15px;
        background: #eee;
        border-radius: 5px;
        .non {
        color: #aaa;
        }
    }
`;


// PrevNextNav
function PrevNextNav() {
    // Hooks
    const {trackNumber, setTrackNumber} = useContext(numberContext);
    const [prevNumber, setPrevNumber] = useState(0);
    const [nextNumber, setNextNumber] = useState(0);
    const [allTracksLength, setAllTracksLength] = useState(0);

    // Get All Tracks Length
    useEffect(() => {
        const url: string = '../api/beatles/tracklength';

        async function getAllTracksLength (url: string) {
        try {
            const res = await fetch(url);
            const resJson = await res.json();
            const data = resJson;
            const allTracksLength = data.trackInfo.allTrackLength;
            // console.log('data', data);
            setAllTracksLength(allTracksLength);
        } catch(error) {
            console.log('err', error);
        }
        };

        getAllTracksLength(url);

        if (trackNumber) {
            setNextNumber(Number(trackNumber) + 1);
            setPrevNumber(Number(trackNumber) - 1);
          }
    }, []);


    function PrevNextLink () {
        if (Number(trackNumber) <= 1) {
            return (
                <>
                    <li className="non">◀︎ 前の曲</li>
                    <li><Link href="/track/[nextNumber]" as={`/track/${nextNumber}`}><a>次の曲</a></Link> ▶︎</li>
                </>
            );
          } else if (Number(trackNumber) >= allTracksLength) {
            return (
                <>
                    <li>◀︎ <Link href="/track/[prevNumber]" as={`/track/${prevNumber}`}><a>前の曲</a></Link></li>
                    <li className="non">次の曲 ▶︎</li>
                </>
            );
          }

          return (
            <>
                <li>◀︎ <Link href="/track/[prevNumber]" as={`/track/${prevNumber}`}><a>前の曲</a></Link></li>
                <li><Link href="/track/[nextNumber]" as={`/track/${nextNumber}`}><a>次の曲</a></Link> ▶︎</li>
            </>
          );
        }


    return (
        <Nav>
            <ul>
                <PrevNextLink />
            </ul>
        </Nav>
    );
}



export default PrevNextNav;