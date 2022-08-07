import styled from 'styled-components';

const Nav = styled.nav`
  ul {
    padding: 0;
    display: flex;
    list-style: none;
    font-size: 12px;
    li {
      line-height: 1.5;
      :not(:last-child) {
        margin-right: 1.5em;
        position: relative;
        ::after {
          content: ">";
          position: absolute;
          top: 0;
          right: -1em;
        }
      }
    }
  }
`;

export default Nav;