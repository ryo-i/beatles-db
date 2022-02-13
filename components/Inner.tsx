import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';

// import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyBG1jiFZhzyw88ZnbyNXAeq0G6PzaajRzk",
  authDomain: "beatles-db.firebaseapp.com",
  databaseURL: "https://beatles-db-default-rtdb.firebaseio.com",
  projectId: "beatles-db",
  storageBucket: "beatles-db.appspot.com",
  messagingSenderId: "736457789706",
  appId: "1:736457789706:web:dc4a57762f35cf7494aaf3"
}; */

// const app = initializeApp(firebaseConfig); */


// CSS in JS
const Section = styled.section`
  ul {
    padding: 0;
    li {
      display: flex;
      align-items: center;
      border-bottom: #ccc 1px solid;
      padding: 14px 0;
      dd, figure, p {
        margin: 0;
        line-height: 1.5;
      }
      .icon {
        background: #A63744;
        color: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        margin: 0 16px 0 0;
      }
      dl {
        margin: 0;
        flex: 1;
        dt {
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          .num {
            margin: 0 8px 0 0;
            font-size: 10px;
            background: #ddd;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 3px;
          }
          .song {
            font-size: 18px;
            line-height: 1.25;
            flex: 1;
          }
        }
        dd {
          font-size: 12px;
          color: #333;
          .title-area {
            margin: 0 0 0px;
          }
          .title {
            font-weight: bold;
          }
          .format {
            background: #999;
            color: #fff;
            padding : 3px;
            font-size: 10px;
            border-radius: 3px;
          }
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
  const [search, setSearch] = useState('すべて');
  const [sellYear, setSellYear] = useState(0);
  const [sellDay, setSellDay] = useState(0);
  const [icon, setIcon] = useState(0);
  const [artist, setArtist] = useState(0);
  const [format, setFormat] = useState(0);
  const [title, setTitle] = useState(0);
  const [num, setNum] = useState(0);
  const [song, setSong] = useState(0);

  const url = 'data/beatles.json';


  const setKeyNo = (data) => {
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
        const data = resJson.values;
        // console.log('data', data);
        setBeatleKey(data[0]);
        setKeyNo(data[0]);

        const getVal = [];
        for (let i = 1; i < data.length; i++) {
          getVal.push(data[i]);
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
          <h2>「{search}」の楽曲一覧</h2>
          <ul>
            {beatleVal.map((data, index) =>
            <li key={index}>
              <figure><p className="icon">{data[icon]}</p></figure>
              <dl>
                <dt>
                  <p className="num">{data[num]}</p>
                  <p className="song">{data[song]}</p>
                </dt>
                <dd>
                  <p className="title-area"><span className="format">{data[format]}</span> <span className="title">{data[title]}</span> ({data[sellYear]})</p>
                  <p className="artist">{data[artist]}</p>
                </dd>
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
