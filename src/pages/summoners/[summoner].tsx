// Package
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Summoner from '../../containers/Summoners';
import { Header, Footer } from "../../components/Template";

function SummonerPage() {
    const summonerName = "test";

    return (
        <>
            <Header />
            <Head>
                <meta property="apptitle" content={`${summonerName}님의 - 게임 전적 - League of Legends`} />
                <title>{summonerName}님의 - 게임 전적 - League of Legends</title>
            </Head>
            <Summoner />
            <Footer />
        </>
    )
}

export default SummonerPage;

