// Package
import React, {Component} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Summoner from '../../containers/Summoners';
import { Header, Footer } from "../../components/Template";

class SummonerPage extends Component {
    render() {
        return (
            <>
                <Header />
                <Head>
                    <meta property="apptitle" content={`Summoner님의 - 게임 전적 - League of Legends`} />
                    <title>Summoner님의 - 게임 전적 - League of Legends</title>
                </Head>
                <Summoner />
                <Footer />
            </>
        )
    }
}

export default SummonerPage;

