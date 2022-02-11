import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';


// CSS in JS
const Section = styled.section`
  dl {
    display: flex;
    flex-wrap: wrap;
    dt, dd {
      margin: 0 0 5px;
    }
    dt {
      width: 20%;
    }
    dd {
      width: 80%;
    }
  }
`;


// Component
function Inner() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beatleData, setBeatleData] = useState([]);
  const [beatleKey, setBeatleKey] = useState([]);
  const [beatleVal, setBeatleVal] = useState([]);
  const [sellDay, setSellDay] = useState(0);
  const [artist, setArtist] = useState(0);
  const [title, setTitle] = useState(0);
  const [num, setNum] = useState(0);
  const [song, setSong] = useState(0);

  const url = 'https://beatles-db-default-rtdb.firebaseio.com/values.json';


  const setKeyNo = (data) => {
    console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      if (data[i] === '発売日') {
        setSellDay(i);
      } else if (data[i] === 'アーティスト') {
        setArtist(i);
      } else if (data[i] === '収録作品') {
        setTitle(i);
      } else if (data[i] === 'No.') {
        setNum(i);
      } else if (data[i] === '曲名') {
        setSong(i);
      }
    }
  }


  useEffect(() => {
    async function getJsonData (url) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setIsLoaded(true);
        // console.log('resJson', resJson);
        setBeatleData(resJson);
        setBeatleKey(resJson[0]);
        setKeyNo(resJson[0]);

        const getVal = [];
        for (let i = 1; i < resJson.length; i++) {
          getVal.push(resJson[i]);
        }
        setBeatleVal(getVal);
      } catch(error) {
        setIsLoaded(true);
        setError(error);
        console.log('err', error);
      }
    };

    getJsonData(url);
  }, []);

  // JSX
  return (
    <>
      {
        <Section>
          <h2>楽曲一覧</h2>
          <ul>
            {beatleVal.map((data, index) =>
            <li key={index}>
              <dl>
                <dt>{beatleKey[num]}:</dt><dd>{data[num]}</dd>
                <dt>{beatleKey[song]}:</dt><dd>{data[song]}</dd>
                <dt>{beatleKey[sellDay]}:</dt><dd>{data[sellDay]}</dd>
              </dl>
            </li>
            )}
          </ul>
        </Section>

      }
    </>
  );
}

export default Inner;
