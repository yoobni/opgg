// Package
import React, { useEffect, useState, memo } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
// Api
import { getMatches } from "../../api/summoner";
// Store
import { AppState } from "../../stores";
// Lib
import {MAIN_CONTENT_WIDTH, LINE_POSITION, POSITIONS} from "../../lib/values";
import { KDACalculator } from "../../lib/utils";
// Component
import { Row, Col, Text } from "../../components/Layout";

const MenuCol = styled(Col)<{ isSelected: boolean }>`
    padding: 12px 12px 0;
    cursor: pointer;
    
    &:after {
        content: '';
        display: ${({ isSelected }) => isSelected ? 'block' : 'none'};
        width: 100%;
        height: 2px;
        margin: 10px 0 0;
        background: #1f8ecd;
    }
    
    ${Text} {
        color: #555555;
        line-height: 14px;
    }
`;

const MatchMenuRow = styled(Row)`
    width: ${MAIN_CONTENT_WIDTH}px;
    padding: 0 4px;
    border: 1px solid #cdd2d2;
    border-bottom: none;
    background: #f2f2f2;
`;

const InfoRow = styled(Row)`
    width: 276px;
    padding: 0 0 0 24px;
`;

const ChampionCol = styled(Col)`
    justify-content: center;
    width: 228px;
    border-left: 1px solid #cdd2d2;
    border-right: 1px solid #cdd2d2;
`;

const RankCol = styled(Col)`
    padding: 16px;
`;

const ThumbnailCol = styled(Col)<{ backgroundImage: string }>`
    width: 34px;
    height: 34px;
    margin: 0 8px 0 0;
    border-radius: 50%;
    ${({ backgroundImage }) => backgroundImage && `background-image: url('${backgroundImage}');`}
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

function MatchSummary() {
    const summonerName = useSelector((state: AppState) => state.summoner.summonerName || '');
    const [summonerMatches, setSummonerMatches] = useState<any>(null);
    const [matchMode, setMatchMode] = useState<string>('all');

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        async function getSummonerMatches() {
            const matchData = await getMatches({ summonerName });
            setSummonerMatches(matchData);
        }

        getSummonerMatches();
    }, []);

    if (summonerMatches === null) {
        // TODO: add skeleton component
        return <></>;
    }

    console.log(summonerMatches);

    const {
        summary: {
            kills,
            deaths,
            assists,
            wins,
            losses,
        },
        champions,
        positions,
    } = summonerMatches;

    const totalGameCount = (wins + losses);
    const {
        kda,
        averageKillRate,
        averageDeathRate,
        averageAssistRate,
    } = KDACalculator(kills, deaths, assists, (wins + losses));

    return (
        <>
            <MatchMenuRow>
                <MenuCol
                    isSelected={matchMode === 'all'}
                    onClick={() => setMatchMode('all')}
                >
                    <Text>
                        전체
                    </Text>
                </MenuCol>
                <MenuCol
                    isSelected={matchMode === 'solo'}
                    onClick={() => setMatchMode('solo')}
                >
                    <Text>
                        솔로게임
                    </Text>
                </MenuCol>
                <MenuCol
                    isSelected={matchMode === 'team'}
                    onClick={() => setMatchMode('team')}
                >
                    <Text>
                        자유랭크
                    </Text>
                </MenuCol>
            </MatchMenuRow>
            <Row
                height={'158px'}
                border={'1px solid #cdd2d2'}
                background={'#ededed'}
            >
                <InfoRow>
                    <Col width={'90px'}>
                        <Row margin={'0 0 14px'}>
                            <Text
                                color={'#666666'}
                                lineHeight={'15px'}
                            >
                                {wins + losses}전 {wins}승 {losses}패
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                chart
                            </Text>
                        </Row>
                    </Col>
                    <Col
                        align={'center'}
                        justify={'center'}
                        grow={1}
                    >
                        <Row margin={'0 0 6px'}>
                            <Text
                                color={'#333333'}
                                fontSize={'11px'}
                                fontWeight={'bold'}
                                lineHeight={'13px'}
                            >
                                {averageKillRate} / {averageDeathRate} / {averageAssistRate}
                            </Text>
                        </Row>
                        <Row>
                            <Text
                                margin={'0 4px 0 0'}
                                color={'#2daf7f'}
                                fontSize={'16px'}
                                lineHeight={'19px'}
                            >
                                <b>{kda}</b>:1
                            </Text>
                            <Text
                                color={'#c6443e'}
                                fontSize={'16px'}
                                lineHeight={'19px'}
                            >
                                ({(wins / (wins + losses) * 100).toFixed()}%)
                            </Text>
                        </Row>
                    </Col>
                </InfoRow>
                <ChampionCol padding={'0 0 0 16px'}>
                    {champions.map((champion: any, index: number) => {
                        const {
                            name,
                            imageUrl,
                            games,
                            kills,
                            deaths,
                            assists,
                            wins,
                            losses,
                        } = champion;

                        const {
                            kda,
                        } = KDACalculator(kills, deaths, assists, games);

                        const winRate = ((wins / games) * 100).toFixed();

                        return (
                            <Row key={`champion-row-${index}`} margin={'6px 0'} align={'center'}>
                                <ThumbnailCol backgroundImage={imageUrl} />
                                <Col>
                                    <Row margin={'0 0 3px'}>
                                        <Text
                                            color={'#333333'}
                                            fontSize={'14px'}
                                            lineHeight={'16px'}
                                        >
                                            {name}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text
                                            margin={'0 4px 0 0'}
                                            color={'#c6443e'}
                                            fontSize={'11px'}
                                            lineHeight={'13px'}
                                        >
                                            <b>{winRate}</b>%
                                        </Text>
                                        <Text
                                            color={'#555555'}
                                            fontSize={'11px'}
                                            lineHeight={'13px'}
                                        >
                                            ({wins}승 {losses}패)
                                        </Text>
                                        <Text
                                            margin={'0 6px'}
                                            color={'#cdd2d2'}
                                            fontSize={'13px'}
                                            lineHeight={'13px'}
                                        >
                                            |
                                        </Text>
                                        <Text
                                            color={'#555555'}
                                            fontSize={'11px'}
                                            fontWeight={'bold'}
                                            lineHeight={'13px'}
                                        >
                                            {kda} 평점
                                        </Text>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })}
                </ChampionCol>
                <RankCol>
                    <Row>
                        <Text>
                            선호 포지션 (랭크)
                        </Text>
                    </Row>
                    {positions.map((item: { games: number, wins: number, position: POSITIONS }, index: number) => {
                        const {
                            games,
                            wins,
                            position,
                        } = item;

                        const {
                            icon,
                            name,
                        } = LINE_POSITION[position];

                        return (
                            <Row key={`summoner-position-${index}`} margin={'20px 0 0'}>
                                <Col
                                    width={'28px'}
                                    height={'28px'}
                                    margin={'0 8px 0 0'}
                                >
                                    <img
                                        src={icon}
                                        alt={`line-position-icon-${name}`}
                                        width={28}
                                        height={28}
                                    />
                                </Col>
                                <Col justify={'center'}>
                                    <Row margin={'0 0 3px'}>
                                        <Text
                                            color={'#333333'}
                                            fontSize={'14px'}
                                            lineHeight={'16px'}
                                        >
                                            {name}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text
                                                color={'#1f8ecd'}
                                                fontSize={'11px'}
                                                lineHeight={'13px'}
                                            >
                                                <b>{((games / totalGameCount) * 100).toFixed()}</b>%
                                            </Text>
                                        </Col>
                                        <Col width={'1px'} height={'12px'} margin={'0 6px'} background={'#cdd2d2'}></Col>
                                        <Col>
                                            <Text
                                                color={'#666666'}
                                                fontSize={'11px'}
                                                lineHeight={'13px'}
                                            >
                                                승률&nbsp;
                                                <Text
                                                    color={'#333333'}
                                                >
                                                    <b>{((wins / games) * 100).toFixed()}</b>%
                                                </Text>
                                            </Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    })}
                </RankCol>
            </Row>
        </>
    );
}

export default memo(MatchSummary);
