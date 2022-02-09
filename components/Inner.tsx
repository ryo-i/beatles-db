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
  const url = 'https://beatles-db-default-rtdb.firebaseio.com/values.json';


  const getKey = (data) => {
    console.log('data[0]', data[0]);
    const result = [];

    console.log('result', result);
    setBeatleKey(result);
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
                <dt>{beatleKey[10]}:</dt><dd>{data[10]}</dd>
                <dt>{beatleKey[7]}:</dt><dd>{data[7]}</dd>
                <dt>{beatleKey[1]}:</dt><dd>{data[1]}</dd>
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
