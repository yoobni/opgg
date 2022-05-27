import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Home from '../containers/Home';
import { Header, Footer } from "../components/Template";

const HomePage: NextPage = () => {
    return (
        <>
            <Header />
            <Home />
            <Footer />
        </>
    )
}

export default HomePage;
