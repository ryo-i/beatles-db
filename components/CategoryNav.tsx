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
    border-bottom: 1px solid #ddd;
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
  const [categoryName, setCategoryName] = useState(null);

  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    if (category) {
      setCategoryName(category);
    }
  }, [router, category]);

  return (
    <Nav className="cagterogyNav">
      <ul className="categoryTab">
        <li className={!categoryName ? 'current' : ''}><Link href="/"><a>All</a></Link></li>
        <li className={categoryName === 'beatles' ? 'current' : ''}><Link href="/category/[category]" as="/category/beatles"><a>Beatles</a></Link></li>
        <li className={categoryName === 'john-yoko' ? 'current' : ''}><Link href="/category/[category]" as="/category/john-yoko"><a>John & Yoko</a></Link></li>
        <li className={categoryName === 'paul' ? 'current' : ''}><Link href="/category/[category]" as="/category/paul"><a>Paul McCartney</a></Link></li>
        <li className={categoryName === 'george' ? 'current' : ''}><Link href="/category/[category]" as="/category/george"><a>George Harrison</a></Link></li>
        <li className={categoryName === 'ringo' ? 'current' : ''}><Link href="/category/[category]" as="/category/ringo"><a>Ringo Starr</a></Link></li>
        <li className={categoryName === 'tony-beatles' ? 'current' : ''}><Link href="/category/[category]" as="/category/tony-beatles"><a>Tony & Beatles</a></Link></li>
      </ul>
    </Nav>
  );
}

export default CategoryNav;
