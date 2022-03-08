import React, { useState, useEffect }  from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// Style
const Nav = styled.nav`
  .categoryTab {
    display: flex;
    list-style: none;
    padding: 0;
    overflow: scroll;
    li a {
      text-decoration: none;
      display: block;
      padding: 0px 15px 8px;
      color: #666;
      white-space: nowrap;
    }
    .current a {
      color: #A63744;
      border-bottom: 2px solid #A63744;
    }
  }
`;


// Component
function CategoryNav() {
  // Hooks
  const [categoryName, setCaterogyName] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const { category } = router.query;
    setCaterogyName(category);
    console.log('categoryName', categoryName);
  }, [router]);

  return (
    <Nav className="cagterogyNav">
      <ul className="categoryTab">
        <li className={!categoryName ? 'current' : ''}><a href="/">All</a></li>
        <li className={categoryName === 'beatles' ? 'current' : ''}><a href="/category/beatles">Beatles</a></li>
        <li className={categoryName === 'john-yoko' ? 'current' : ''}><a href="/category/john-yoko">John & Yoko</a></li>
        <li className={categoryName === 'paul' ? 'current' : ''}><a href="/category/paul">Paul McCartney</a></li>
        <li className={categoryName === 'george' ? 'current' : ''}><a href="/category/george">George Harrison</a></li>
        <li className={categoryName === 'ringo' ? 'current' : ''}><a href="/category/ringo">Ringo Starr</a></li>
        <li className={categoryName === 'tony-beatles' ? 'current' : ''}><a href="/category/tony-beatles">Tony & Beatles</a></li>
      </ul>
    </Nav>
  );
}

export default CategoryNav;
