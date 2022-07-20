import React, { useState, createContext }  from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import InnerIndex from '../components/InnerIndex';
import Footer from '../components/Footer';
import Data from '../data/data.json';


const headerTitle = Data.header.title;
const headerText = Data.header.text;
const pageTitle = '楽曲一覧';
const pageText = 'アーティスト名、アルバム名、人名などで絞り込みができます。';


export const Context = createContext({} as {
  isCategory: boolean
  setIsCategory: React.Dispatch<React.SetStateAction<boolean>>
  categoryName: string
  setCategoryName: React.Dispatch<React.SetStateAction<string>>
  categoryPath: string
  setCategoryPath: React.Dispatch<React.SetStateAction<string>>
});


function Home() {
  const [isCategory, setIsCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('すべて');
  const [categoryPath, setCategoryPath] = useState('');

  return (
    <>
      <Head>
        <title>{ headerTitle }</title>
        <meta name="description" content={ headerText } />
        <meta property="og:title" content={ headerTitle } />
        <meta property="og:description" content={ headerText } />
      </Head>
      <Header />
      <main>
        <h1>{ pageTitle }</h1>
        <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
        <Context.Provider value={{isCategory, setIsCategory, categoryName, setCategoryName, categoryPath, setCategoryPath}} >
          <InnerIndex />
        </Context.Provider>
      </main>
      <Footer />
    </>
  )
}

export default Home;