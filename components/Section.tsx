import styled from 'styled-components';

const tabStyle = `{
  background: #888;
  color: #fff;
  margin: 0 5px 5px 0;
  padding : 3px;
  font-size: 10px;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
}`;


// CSS in JS
const Section = styled.section`
  h2 {
    color: #333;
    margin: 0 0 20px;
  }
  .tag {
    padding: 0;
    margin: 0 0 20px;
    dl {
      margin: 0;
      display: flex;
      dt {
        width: 55px;
        margin: 0;
        padding: 3px 0 0;
        font-size: 12px;
      }
      dd {
        flex: 1;
        margin: 0;
        .year a,
        .format a {
          ${tabStyle}
        }
      }
    }
  }
  .trackList {
    padding: 10px 0;
    li {
      display: flex;
      align-items: center;
      border-top: #eee 2px solid;
      padding: 20px 0;
      dd, figure, p {
        margin: 0;
        line-height: 1.5;
      }
      .icon a {
        display: block;
        text-decoration: none;
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
        dt a {
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          text-decoration: none;
          .num {
            margin: 0 8px 0 0;
            font-size: 10px;
            background: #ddd;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 3px;
            color: #000;
          }
          .song {
            font-size: 18px;
            line-height: 1.25;
            flex: 1;
            text-decoration: underline;
          }
        }
        dd {
          font-size: 12px;
          color: #333;
          .title-area {
            margin: 0;
          }
          .title {
            font-weight: bold;
          }
          .year a,
          .format a ${tabStyle}
        }
      }
    }
    li:last-child {
      border-bottom: 2px solid #ccc;
    }
    li:first-child, .topTrack {
      border-top: 2px solid #999;
    }
  }
  .pageInfo {
    font-size: 12px;
  }
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    li {
      border: none;
      margin: 0 10px 0 0;
      padding: 0;
      a {
        display: block;
        color: #333;
        text-decoration: none;
        background: #eee;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        border-radius: 3px;
      }
      .currentPage {
        color: #fff;
        background: #A63744;
      }
    }
  }
`;

export default Section;