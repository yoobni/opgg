// Package
import React, { useEffect } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';
// Store
import { AppState } from '../../stores';
import { updateSummonerName } from "../../stores/summoner/actions/summoner";
// Container
import Summoner from '../../containers/Summoners';
// Component
import { Header, Footer } from "../../components/Template";

function SummonerPage(props: any) {
    const summonerName = useSelector((state: AppState) => state.summoner.summonerName);

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        if (summonerName != props.summonerName) {
            props.updateSummonerName(props.summonerName);
        }
    }, []);

    if (summonerName == '' || summonerName == undefined) {
        // TODO: return another result
        return <></>;
    }

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

SummonerPage.getInitialProps = async (ctx: any) => {
    return {
        summonerName: ctx.query.summoner,
    };
}

function mapStateToProps(state: AppState) {
    const {
        summoner,
    } = state;

    return {
        summoner,
    };
}

export default connect(mapStateToProps, {
    updateSummonerName,
})(withRouter(SummonerPage));

// export default SummonerPage;
