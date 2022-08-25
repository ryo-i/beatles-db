import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Data from '../data/data.json';
import styled from 'styled-components';
import { pageSize } from '../styles/mixin';
import cssVariables from '../styles/variables.json';


const variable = cssVariables.variable;
const title = Data.header.title;
const text = Data.header.text;


// Style
const HeaderTag = styled.header`
  text-align: center;
  background: ${variable.bgColor_g};
  .wrapper {
    ${pageSize}
    padding: 30px;
  }
  h1 {
    font-size: 2em;
  }
  nav span, nav a {
    padding-right: 0.5em;
  }
  .search {
    margin: 15px 0 0;
    display: flex;
    justify-content: center;
    input {
      width: 200px;
      margin: 0;
      padding: 0 6px;
      line-height: 30px;
      font-size: 14px;
      color: #333;
      border: 1px solid #999;
      border-right: 0px;
      border-radius: 5px 0 0 5px;
    }
    button {
      margin: 0;
      padding: 0 6px;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      border: 1px solid #999;
      border-radius: 0 5px 5px 0;
      background: #666;
      :hover {
        cursor: pointer;
      }
    }
  }
`;


// SearchForn
const SearchForn = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();


  const getSearchValue = (searchValue) => {
    let thisValue = searchValue;
    thisValue = thisValue.replace(/^\s+|\s+$/g, '');
    setSearchValue(thisValue);
    return thisValue;
  }


  const doSearch = () => {
    let thisValue = getSearchValue(searchValue);
    if (thisValue) {
      router.push({
        pathname: '/',
        query: { search: thisValue } ,
      });
    }
  };


  return (
    <form className="search"  onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == 'Enter') {
            e.preventDefault();
            doSearch();
          }
        }} />
      <button type="button" onClick={() => doSearch() }>検索</button>
    </form>
  );
};


// Component
function Header() {
  return (
    <HeaderTag>
      <div className="wrapper">
        <h1>{ title }</h1>
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
        <nav>
          <span>MENU:</span>
          <Link href="/"><a>Home</a></Link>
          <Link href="/about"><a>About</a></Link>
        </nav>
        <SearchForn />
      </div>
    </HeaderTag>
  );
}

export default Header;
