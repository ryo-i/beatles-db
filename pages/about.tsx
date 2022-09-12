import styled from 'styled-components';
import Head from 'next/head';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Data from '../data/data.json';


const headerTitle = Data.header.title;
const pageTitle = 'このアプリについて';
const pageText = '「ビートルズDB」はビートルズが結成から解散までにリリースした楽曲（1961〜1970年）のデータベースです。同時期にリリースしたバックバンド活動、ソロ活動の作品も掲載しています。';
const headTitle = pageTitle + ' | ' + headerTitle;


// CSS in JS
const Main = styled.main`
    h2 {
        background: #eee;
        margin: 60px 0 20px;
        padding: 10px;
        border-radius: 3px;
    }
    h3 {
        margin: 40px 0 10px;
        padding: 0 0 10px;
        border-bottom: 1px solid #ddd;
    }
    figure {
        margin: 0 0 30px;
        img {
            max-width: 100%;
            box-shadow: 0 0 15px 2px rgb(0 0 0 / 10%);
        }
        figcaption {
            margin: 0 0 10px;
            font-size: 12px;
            font-weight: bold;
        }
    }
`;


// Component
function About() {
    return (
        <>
        <Head>
            <title>{ headTitle }</title>
            <meta name="description" content={ pageText } />
            <meta property="og:title" content={ headTitle } />
            <meta property="og:description" content={ pageText } />
        </Head>

        <Header />
        <Main>
            <h1>{ pageTitle }</h1>
            <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
            <section>
                <h2>進捗</h2>
                <ul>
                    <li>ブログのリンク追加 <a href="https://github.com/ryo-i/beatles-db/issues/3" target="_blank">#3</a></li>
                    <li>項目数のズレ？を更新 <a href="https://github.com/ryo-i/beatles-db/issues/1" target="_blank">#1</a></li>
                </ul>
            </section>
            <section>
                <h2>今後の予定</h2>
                <ul>
                    <li>曲解説を追加中 <a href="https://github.com/ryo-i/beatles-db/issues/1" target="_blank">#1</a></li>
                </ul>
            </section>
            <section>
                <h2>使い方</h2>
                <section>
                    <h3>楽曲一覧</h3>
                    <p>トップページを開くとビートルズDBに掲載されている楽曲一覧が表示されます。全部で370件あります。</p>
                    <figure>
                        <img src="img/bdb_001.jpg" alt="楽曲一覧" />
                    </figure>
                </section>
                <section>
                    <h3>フリーワード検索</h3>
                    <p>ヘッダーの検索窓にテキストを入力するとフリーワード検索ができます。</p>
                    <figure>
                        <img src="img/bdb_002.jpg" alt="フリーワード検索" />
                    </figure>
                    <figure>
                        <figcaption>「yoko」で検索した結果の画面</figcaption>
                        <img src="img/bdb_003.jpg" alt="「yoko」で検索した結果" />
                    </figure>
                </section>
                <section>
                    <h3>カテゴリ</h3>
                    <p>カテゴリタブを押すとカテゴリを変更できます。楽曲一覧のアイコンからも変更できます。</p>
                    <figure>
                        <figcaption>「Beatles」カテゴリに切り替えた画面</figcaption>
                        <img src="img/bdb_004.jpg" alt="「Beatles」カテゴリに切り替えた画面" />
                    </figure>
                    <p>カテゴリは下記になります</p>
                    <ul>
                        <li>All: 全カテゴリの楽曲、370曲（本アプリのトップページ）</li>
                        <li>Beatles: the Beatlesの楽曲、233曲</li>
                        <li>John & Yoko: Jonn LennonとYoko Onoのソロ作品や合作の楽曲、42曲</li>
                        <li>Paul McCartney: Paul McCartneyのソロ作品の楽曲、13曲</li>
                        <li>George Harrison: George Harrisonのソロ作品の楽曲、46曲</li>
                        <li>Ringo Starr: Ringo Starrのソロ作品の楽曲、26曲</li>
                        <li>Tony & Beatles: Tony Sheridanのバックバンドとして録音した楽曲、10曲</li>
                    </ul>
                </section>
                <section>
                    <h3>発売年</h3>
                    <p>カテゴリ名の下のタグから発売年（1961〜1970年）で絞り込みができます。楽曲一覧のタグからも絞り込みできます。</p>
                    <figure>
                        <figcaption>「1967」で絞り込みした結果の画面</figcaption>
                        <img src="img/bdb_005.jpg" alt="「1967」で絞り込みした結果の画面" />
                    </figure>
                </section>
                <section>
                    <h3>作品形態</h3>
                    <p>カテゴリ名の下のタグから作品形態で絞り込みができます。楽曲一覧のタグからも絞り込みできます。</p>
                    <figure>
                        <figcaption>「Album」で絞り込みした結果の画面</figcaption>
                        <img src="img/bdb_006.jpg" alt="「Album」で絞り込みした結果の画面" />
                    </figure>
                    <p>作品形態は下記になります</p>
                    <ul>
                        <li>Single: A面とB面に1曲ずつ、合計2曲程度の収録できるディスク</li>
                        <li>Album: シングルより長く12曲程度を収録できるディスク</li>
                        <li>EP: Singleより長く、Albumよりより短い4〜6曲程度を収録できるディスク</li>
                    </ul>
                </section>
                <section>
                    <h3>ページ切り替え</h3>
                    <p>楽曲一覧が複数ページに渡る場合、件数の下のページネーションで切り替えられます。</p>
                    <figure>
                        <img src="img/bdb_007.jpg" alt="ページ切り替え" />
                    </figure>
                </section>
                <section>
                    <h3>楽曲情報</h3>
                    <p>曲名のリンクを押すと楽曲情報が表示されます。（曲名の下のリンクは絞り込みです）</p>
                    <figure>
                        <img src="img/bdb_008.jpg" alt="楽曲情報" />
                    </figure>
                    <figure>
                        <figcaption>「My Bonnie」の楽曲情報の画面</figcaption>
                        <img src="img/bdb_009.jpg" alt="「My Bonnie」の楽曲情報の画面" />
                    </figure>
                    <figure>
                        <figcaption>演奏「Pete Best」で絞り込みした結果の画面</figcaption>
                        <img src="img/bdb_010.jpg" alt="「My Bonnie」の楽曲情報の画面" />
                    </figure>
                    <p>楽曲情報は下記になります</p>
                    <ul>
                        <li>アーティスト: 作品発売時にクレジットされたアーティスト名</li>
                        <li>オリジナル: カバーの曲の場合、オリジナル作品のアーティスト名</li>
                        <li>作者: 作品の作者名</li>
                        <li>リードボーカル: 作品のリードボーカルの名前</li>
                        <li>演奏: 作品の演奏者と演奏楽器のパート</li>
                        <li>プロデューサー: 作品のプロデューサー名</li>
                        <li>エンジニア: 作品のエンジニア名</li>
                        <li>アートワーク: 作品のジャケットやスリーブのデザイナー、写真のカメラマンなど</li>
                        <li>ディレクター（映画）: 映画のサントラの場合、映画作品の監督名</li>
                        <li>ディレクター（MV）: ミュージックビデオの監督名</li>
                        <li>収録作品: 楽曲を収録している作品名と作品形態</li>
                        <li>曲順: 楽曲が作品の中の何曲目か、と作品の枚数、面数</li>
                        <li>発売日: 作品の発売日と発売年</li>
                        <li>レーベル: 作品を発売したレーベルの名前と発売国</li>
                        <li>備考: イイダリョウがコツコツと書いている作品解説、感想など</li>
                        <li>出典: 楽曲情報の引用元となったページのurl</li>
                    </ul>
                    <p>楽曲情報のリンクを押すと絞り込みができます。</p>
                </section>
                <section>
                    <h3>前後の曲へのリンク</h3>
                    <p>楽曲一覧ページの最下部の「前の曲」「次の曲」リンクから前後の曲へ移動できます。</p>
                    <figure>
                        <img src="img/bdb_011.jpg" alt="前後の曲へのリンク" />
                    </figure>
                </section>
            </section>
            <section>
                <h2>出典</h2>
                <p>英語版Wikipediaのビートルズ関連のページから主に引用しています。情報が足りない部分は日本語版Wikipedia、公式サイト、CDライナーノートなどから補っています。</p>
                <ul>
                    <li><a href="https://en.wikipedia.org/wiki/The_Beatles_discography" target="_blank">The Beatles discography - Wikipedia</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/The_Beatles_in_film" target="_blank">The Beatles in film - Wikipedia</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/John_Lennon_discography" target="_blank">John Lennon discography - Wikipedia</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/Yoko_Ono_discography" target="_blank">Yoko Ono discography - Wikipedia</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/Paul_McCartney_discography" target="_blank">Paul McCartney discography - Wikipedia</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/George_Harrison_discography" target="_blank">George Harrison discography - Wikipedia</a></li>
                    <li><a href="https://en.wikipedia.org/wiki/Ringo_Starr_discography" target="_blank">Ringo Starr discography - Wikipedia</a></li>
                </ul>
            </section>
            <section>
                <h2>詳細</h2>
                <section>
                    <h3>ブログ</h3>
                    <p><a href="https://www.i-ryo.com/entry/2022/09/13/065345" target="_blank">【React/Next.js】「ビートルズDB」を作った（ビートルズの楽曲を検索できるアプリ） - クモのようにコツコツと</a></p>
                </section>
                <section>
                    <h3>ソースコード（GitHub）</h3>
                    <p><a href="https://github.com/ryo-i/beatles-db" target="_blank">リポジトリ</a></p>
                </section>
            </section>
            <Profile />
        </Main>
        <Footer />
        </>
    );
}

export default About;