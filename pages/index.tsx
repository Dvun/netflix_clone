import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import { memo, useEffect } from 'react';
import Banner from '../components/Banner';
import requests from '../utils/request';
import Row from '../components/Row';
import useAuth from '../hooks/AuthProvider';
import ModalWindow from '../components/modalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setCurrentMovie } from '../redux/movieSlice/movieSlice';
import { IMovie } from '../types/types';


interface Props {
  netflixOriginals: IMovie[];
  trendingNow: IMovie[];
  topRated: IMovie[];
  actionMovies: IMovie[];
  comedyMovies: IMovie[];
  horrorMovies: IMovie[];
  romanceMovies: IMovie[];
  documentaries: IMovie[];
}

const Home: NextPage<Props> = memo((props: Props) => {
  const dispatch = useAppDispatch();
  const {isShowModal} = useAppSelector(state => state.modalSlice);
  const {isLoading} = useAuth();

  useEffect(() => {
    !isShowModal && dispatch(setCurrentMovie(null));
  }, [isShowModal]);

  if (isLoading) return null;

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
      </Head>
      <Header/>
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={props.netflixOriginals}/>
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={props.trendingNow}/>
          <Row title="Top Rated" movies={props.topRated}/>
          <Row title="Action Thriller" movies={props.actionMovies}/>

          {/*{list.length > 0 && <Row title='My List' movies={props.list}/>}*/}

          <Row title="Comedies" movies={props.comedyMovies}/>
          <Row title="Scary Movies" movies={props.horrorMovies}/>
          <Row title="Romance Movies" movies={props.romanceMovies}/>
          <Row title="Documentaries" movies={props.documentaries}/>
        </section>
      </main>
      <ModalWindow/>

    </div>
  );
});

export default Home;

export const getServerSideProps = async () => {

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
