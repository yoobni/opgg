// Package
import React, { useEffect, useState, memo } from 'react';
import { useSelector } from "react-redux";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import styled from "styled-components";
// Api
import {getMatches, Champion, Position, Game} from "../../api/summoner";
// Store
import { AppState } from "../../stores";
// Lib
import { MAIN_CONTENT_WIDTH, LINE_POSITION } from "../../lib/values";
import { getWinRateWithColor, KDACalculator } from "../../lib/utils";
import COLOR from "../../lib/styles/colors";
import NONE_IMAGE from '../../assets/images/no-champion-image.svg';
// Component
import {
    MatchList
} from './';
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
        background: ${COLOR.BLUISH};
    }
    
    ${Text} {
        color: ${({ isSelected }) => isSelected ? COLOR.BLUISH : COLOR.GREYNISH_BROWN};
        font-weight: ${({ isSelected }) => isSelected ? 'bold' : 'normal'};
        line-height: 14px;
    }
`;

const MatchMenuRow = styled(Row)`
    width: ${MAIN_CONTENT_WIDTH}px;
    padding: 0 4px;
    border: 1px solid ${COLOR.SILVER3};
    border-bottom: none;
    background: ${COLOR.WHITE4};
`;

const InfoRow = styled(Row)`
    width: 276px;
    padding: 0 0 0 24px;
`;

const ChampionCol = styled(Col)`
    justify-content: center;
    width: 228px;
    border-left: 1px solid ${COLOR.SILVER3};
    border-right: 1px solid ${COLOR.SILVER3};
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

const ChartText = styled(Text)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    color: ${COLOR.GREYNISH_BROWN};
    font-size: 14px;
`;

const CHART_SIZE = 90;

function MatchSummary() {
    const summonerName = useSelector((state: AppState) => state.summoner.summonerName || '');
    const [summonerMatches, setSummonerMatches] = useState<any>(null);
    const [matchMode, setMatchMode] = useState<string>('all');
    const [gameList, setGameList] = useState<Game[]>([]);

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        async function getSummonerMatches() {
            const matchData = await getMatches({ summonerName });
            setSummonerMatches(matchData);
            setMatchMode('all');

            if (matchData != null) {
                setGameList(matchData.games);
            }
        }

        getSummonerMatches();
    }, [summonerName]);

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        if (summonerMatches != null) {
            let newGameList = [];

            if (matchMode === 'solo') {
                newGameList = summonerMatches.games.filter((game: Game) => {
                    return game.gameType === '솔랭';
                })
            } else if (matchMode === 'team') {
                newGameList = summonerMatches.games.filter((game: Game) => {
                    return game.gameType === '자유 5:5 랭크';
                })
            } else {
                newGameList = summonerMatches.games;
            }

            setGameList(newGameList);
        }
    }, [matchMode]);

    if (summonerMatches === null) {
        // TODO: add skeleton component
        return <></>;
    }

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
    const championList = [0, 1, 2];
    const {
        kda,
        averageKillRate,
        averageDeathRate,
        averageAssistRate,
        kdaTextColor,
    } = KDACalculator(kills, deaths, assists, (wins + losses));
    const {
        winRate,
        color,
    } = getWinRateWithColor(wins, totalGameCount);

    const data = [
        { name: 'win', value: wins, fill: COLOR.BLUISH },
        { name: 'lose', value: losses, fill: COLOR.CORAL },
    ];

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
                margin={'0 0 16px'}
                border={`1px solid ${COLOR.SILVER3}`}
                background={COLOR.WHITE5}
            >
                <InfoRow>
                    <Col width={'90px'} align={'center'}>
                        <Row margin={'14px 0 14px'}>
                            <Text
                                color={COLOR.GREYNISH_BROWN2}
                                lineHeight={'15px'}
                            >
                                {wins + losses}전 {wins}승 {losses}패
                            </Text>
                        </Row>
                        <Row height={'90px'}>
                            <ChartText>
                                <b>{((wins / totalGameCount) * 100).toFixed()}</b>%
                            </ChartText>
                            <ResponsiveContainer width={CHART_SIZE} height={CHART_SIZE}>
                                <PieChart
                                    width={CHART_SIZE}
                                    height={CHART_SIZE}
                                    style={{ transform: 'rotate(-90deg)' }}
                                >
                                    <Pie
                                        data={data}
                                        innerRadius={CHART_SIZE / 2 - 13}
                                        outerRadius={CHART_SIZE / 2}
                                        dataKey={"value"}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </Row>
                    </Col>
                    <Col
                        align={'center'}
                        justify={'center'}
                        grow={1}
                    >
                        <Row margin={'0 0 6px'}>
                            <Text
                                color={COLOR.BLACK}
                                fontSize={'11px'}
                                fontWeight={'bold'}
                                lineHeight={'13px'}
                            >
                                {averageKillRate} / <Text color={COLOR.REDDISH}>{averageDeathRate}</Text> / {averageAssistRate}
                            </Text>
                        </Row>
                        <Row>
                            <Text
                                margin={'0 4px 0 0'}
                                color={kdaTextColor}
                                fontSize={'16px'}
                                lineHeight={'19px'}
                            >
                                <b>{kda}</b>:1
                            </Text>
                            <Text
                                color={color}
                                fontSize={'16px'}
                                lineHeight={'19px'}
                            >
                                ({winRate}%)
                            </Text>
                        </Row>
                    </Col>
                </InfoRow>
                <ChampionCol padding={'0 0 0 16px'}>
                    {championList.map((championIndex: number, index: number) => {
                        if (champions[championIndex] == undefined || champions[championIndex] == null) {
                            return (
                                <Row key={`champion-row-${index}`} margin={'6px 0'} align={'center'}>
                                    <ThumbnailCol backgroundImage={NONE_IMAGE} />
                                    <Col>
                                        <Text
                                            color={COLOR.WARM_GREY2}
                                            fontSize={'11px'}
                                            lineHeight={'12px'}
                                        >
                                            챔피언 정보가 없습니다.
                                        </Text>
                                    </Col>
                                </Row>
                            )
                        }

                        const {
                            name,
                            imageUrl,
                            games,
                            kills,
                            deaths,
                            assists,
                            wins,
                            losses,
                        } = champions[championIndex] as Champion;

                        const {
                            kda,
                            kdaTextColor,
                        } = KDACalculator(kills, deaths, assists, games);
                        const {
                            winRate,
                            color,
                        } = getWinRateWithColor(wins, totalGameCount);

                        return (
                            <Row key={`champion-row-${index}`} margin={'6px 0'} align={'center'}>
                                <ThumbnailCol backgroundImage={imageUrl} />
                                <Col>
                                    <Row margin={'0 0 3px'}>
                                        <Text
                                            color={COLOR.BLACK}
                                            fontSize={'14px'}
                                            lineHeight={'16px'}
                                        >
                                            {name}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Text
                                            margin={'0 4px 0 0'}
                                            color={color}
                                            fontSize={'11px'}
                                            lineHeight={'13px'}
                                        >
                                            <b>{winRate}</b>%
                                        </Text>
                                        <Text
                                            color={COLOR.GREYNISH_BROWN}
                                            fontSize={'11px'}
                                            lineHeight={'13px'}
                                        >
                                            ({wins}승 {losses}패)
                                        </Text>
                                        <Text
                                            margin={'0 6px'}
                                            color={COLOR.SILVER3}
                                            fontSize={'13px'}
                                            lineHeight={'13px'}
                                        >
                                            |
                                        </Text>
                                        <Text
                                            color={kdaTextColor}
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
                    {positions.map((item: Position, index: number) => {
                        const {
                            games,
                            wins,
                            position,
                        } = item;

                        const {
                            icon,
                            name,
                        } = LINE_POSITION[position];

                        const {
                            winRate,
                        } = getWinRateWithColor(wins, totalGameCount);

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
                                            color={COLOR.BLACK}
                                            fontSize={'14px'}
                                            lineHeight={'16px'}
                                        >
                                            {name}
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text
                                                color={COLOR.BLUISH}
                                                fontSize={'11px'}
                                                lineHeight={'13px'}
                                            >
                                                <b>{((games / totalGameCount) * 100).toFixed()}</b>%
                                            </Text>
                                        </Col>
                                        <Col width={'1px'} height={'12px'} margin={'0 6px'} background={COLOR.SILVER3}></Col>
                                        <Col>
                                            <Text
                                                color={COLOR.GREYNISH_BROWN2}
                                                fontSize={'11px'}
                                                lineHeight={'13px'}
                                            >
                                                승률&nbsp;
                                                <Text
                                                    color={COLOR.BLACK}
                                                >
                                                    <b>{winRate}</b>%
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
            <MatchList games={gameList} />
        </>
    );
}

export default memo(MatchSummary);
