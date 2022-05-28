// Package
import React, { useState, useEffect, memo } from 'react';
// Component
import { Wrapper, GridWrapper, Row, Col, Text } from "../../components/Layout";
import {
    ContentHeader,
} from '../../components/Summoners';
import {useSelector} from "react-redux";
import {AppState} from "../../stores";

const TIERBOX_WIDTH = 300;

function TierBox() {
    const summonerName = useSelector((state: AppState) => state.summoner.summonerName || '');
    const [summonerData, setSummonerData] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        // FIX: contentHeader 로 이관
        // async function getSummonerData() {
        //     const returnData = await getSummoner({ summonerName });
        //     setSummonerData(returnData);
        // }
        //
        // getSummonerData();
    }, []);

    if (!summonerData) {
        // TODO: add skeleton component
        return <></>;
    }

    console.log(summonerData);

    return (
        <>
            <Col width={`${TIERBOX_WIDTH}px`}>
                asd
            </Col>
        </>
    );
}

export default memo(TierBox);
