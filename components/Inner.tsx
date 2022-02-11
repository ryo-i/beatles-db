import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';


// CSS in JS
const Section = styled.section`
  ul {
    padding: 0;
    li {
      display: flex;
      align-items: center;
      border-bottom: #ccc 1px solid;
      padding: 10px;
      figure, .icon {
        margin: 0;
      }
      .icon {
        background: #A63744;
        color: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        margin: 0 10px 0 0;
      }
      dl {
        margin: 0;
        dt {
          margin: 0 0 10px;
        }
        dd {
          font-size: 12px;
        }
        .format {
          background: #ddd;
          padding : 3px 5px;
          font-size: 10px;
          border-radius: 3px;
        }
      }
    }
  }


`;


// Component
function Inner() {
  // Hooks
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beatleKey, setBeatleKey] = useState([]);
  const [beatleVal, setBeatleVal] = useState([]);
  const [sellYear, setSellYear] = useState(0);
  const [sellDay, setSellDay] = useState(0);
  const [icon, setIcon] = useState(0);
  const [artist, setArtist] = useState(0);
  const [format, setFormat] = useState(0);
  const [title, setTitle] = useState(0);
  const [num, setNum] = useState(0);
  const [song, setSong] = useState(0);

  const url = 'https://beatles-db-default-rtdb.firebaseio.com/values.json';


  const setKeyNo = (data) => {
    console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      if (data[i] === '発売年') {
        setSellYear(i);
      } else if (data[i] === '発売日') {
        setSellDay(i);
      } else if (data[i] === 'アイコン') {
        setIcon(i);
      } else if (data[i] === 'アーティスト') {
        setArtist(i);
      } else if (data[i] === '形態') {
        setFormat(i);
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
              <figure><p className="icon">{data[icon]}</p></figure>
              <dl>
                <dt>{data[num]}. {data[song]}</dt>
                <dd><span className="format">{data[format]}</span> {data[artist]} ({data[title]} - {data[sellYear]})</dd>
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
