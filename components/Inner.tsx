import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import { hello } from '../modules/hello/hello';
import data from '../data/data.json';


// CSS in JS
const H2 = styled.h2`
  color: red;
`;


// Component
function Inner() {
  // Hooks
  const [title, setTitle] = useState('内容が無いよう');
  const [text, setText] = useState('へんじがない、ただのしかばねのようだ。');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [beatlesData, setBeatlesData] = useState([]);
  const url = 'https://beatles-db-default-rtdb.firebaseio.com/values.json';

  useEffect(() => {
    hello();

    async function getJsonData (url) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setIsLoaded(true);
        console.log('resJson', resJson);
        setBeatlesData(resJson);
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
        <section>
          <H2>楽曲一覧</H2>
          <ul>
            {// data.inner.length >= 5 // test
              beatlesData.length >= 1
              ? beatlesData.map((inner, index) =>
                    <li key={ index }>{inner}</li>
              )
              : <li>不明</li>
            }
          </ul>
        </section>

      }
    </>
  );
}

export default Inner;
