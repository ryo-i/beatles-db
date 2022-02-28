import React, { useEffect, useState, createContext }  from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import InnerCategory from '../../components/InnerCategory';
import Footer from '../../components/Footer';
import Data from '../../data/data.json';


export const Context = createContext({} as {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
});


function Home() {
  const [search, setSearch] = useState('楽曲一覧');

  const router = useRouter();
  const thisQuery = router.query.category;

  useEffect(() => {
    if (thisQuery) {
        const thisCategory: string = String(thisQuery);
        console.log('thisQuery', thisQuery);
        console.log('thisCategory', thisCategory);
        setSearch(thisCategory);
    }
  }, [thisQuery]);


  const headerTitle = Data.header.title;
  const headerText = Data.header.text;
  const headTitle = search + ' | ' + headerTitle;


  return (
    <>
      <Head>
        <title>{ headTitle }</title>
        <meta name="description" content={ search } />
        <meta property="og:title" content={ headTitle } />
        <meta property="og:description" content={ search } />
      </Head>
      <Header />
      <main>
        <h1>{ headerTitle }</h1>
        <p dangerouslySetInnerHTML={{ __html: headerText }}></p>
        <Context.Provider value={{search, setSearch}} >
          <InnerCategory />
        </Context.Provider>
      </main>
      <Footer />
    </>
  )
}

export default Home;