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
  const url = 'https://beatles-db-default-rtdb.firebaseio.com/values.json';

  useEffect(() => {
    hello();

    async function getJsonData (url) {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setIsLoaded(true);
        console.log('resJson', resJson);
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
        // data.inner.length >= 5 // test
        data.inner.length >= 1
          ? data.inner.map((inner, index) =>
            <section key={ index }>
              <H2>{ inner.title }</H2>
              <p dangerouslySetInnerHTML={{ __html: inner.text }}></p>
            </section>
          )
          : <section>
              <h2>{ title }</h2>
              <p>{ text }</p>
          </section>
      }
    </>
  );
}

export default Inner;
