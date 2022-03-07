import React, { useState, createContext }  from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import InnerCategory from '../../components/InnerCategory';
import Footer from '../../components/Footer';
import Data from '../../data/data.json';


export const Context = createContext({} as {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
});


function Home({ categoryInfo }) {
  const [category, setCategory] = useState(categoryInfo.name);
  console.log('categoryInfo', categoryInfo.name);

  const headerTitle = Data.header.title;
  const headerText = Data.header.text;
  const headTitle = category + 'の楽曲一覧 | ' + headerTitle;


  return (
    <>
      <Head>
        <title>{ headTitle }</title>
        <meta name="description" content={ category } />
        <meta property="og:title" content={ headTitle } />
        <meta property="og:description" content={ category } />
      </Head>
      <Header />
      <main>
        <h1>{ headerTitle }</h1>
        <p dangerouslySetInnerHTML={{ __html: headerText }}></p>
        <Context.Provider value={{category, setCategory}} >
          <InnerCategory />
        </Context.Provider>
      </main>
      <Footer />
    </>
  )
}


// Get Path
export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: 'all' } },
      { params: { category: 'beatles' } },
      { params: { category: 'john-yoko' } },
      { params: { category: 'paul' } },
      { params: { category: 'george' } },
      { params: { category: 'ringo' } },
      { params: { category: 'tony-beatles' } }
    ],
    fallback: false
  };
}


// This Category Info
const thisCaterogyInfo = (category) => {
  const categoryInfo = {
    path: '',
    name: ''
  };

  if (category === 'all') {
    categoryInfo.path = 'all';
    categoryInfo.name = 'すべて';
  } else if (category === 'beatles') {
    categoryInfo.path = 'beatles';
    categoryInfo.name = 'Beatles';
  } else if (category === 'john-yoko') {
    categoryInfo.path = 'john-yoko';
    categoryInfo.name = 'John & Yoko';
  } else if (category === 'paul') {
    categoryInfo.path = 'paul';
    categoryInfo.name = 'Paul McCartney';
  } else if (category === 'george') {
    categoryInfo.path = 'george';
    categoryInfo.name = 'George Harrison';
  } else if (category === 'ringo') {
    categoryInfo.path = 'ringo';
    categoryInfo.name = 'Ringo Starr';
  } else if (category === 'tonny-beatles') {
    categoryInfo.path = 'tony-beatles';
    categoryInfo.name = 'Tony  & Beatles';
  }
  return categoryInfo;
}


// Get CategoryInfo
export async function getStaticProps({ params }) {
  const category = params.category;
  const categoryInfo = thisCaterogyInfo(category);

  // console.log('category', category);
  console.log('categoryInfo', categoryInfo);
  return { props: { categoryInfo } };
}

export default Home;