// Package
import React, { useEffect, useState, memo } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
// Api
import { getMostInfo } from "../../api/summoner";
// Store
import { AppState } from "../../stores";
// Lib
import { SIDE_CONTENT_WIDTH } from "../../lib/values";
import { KDACalculator } from "../../lib/utils";
// Component
import { Row, Col, Text } from "../../components/Layout";

interface ImageProps {
    width?: string | number;
    height?: string | number;
    backgroundImage?: string;
}

const Wrapper = styled.div`
    width: ${SIDE_CONTENT_WIDTH}px;
    margin: 0 0 100px;
    border: 1px solid #cdd2d2;
    border-bottom: none;
    border-radius: 2px;
    background: #ededed;
`;

const MostRow = styled(Row)<{ padding?: string }>`
    padding: ${({ padding }) => padding || '4px 15px'};
    border-bottom: 1px solid #cdd2d2;
`;

const ThumbnailCol = styled(Col)<ImageProps>`
    width: ${({ width }) => width || '45px'};
    height: ${({ height }) => height || '45px'};
    margin: 0 10px 0 0;
    border-radius: 50%;
    ${({ backgroundImage }) => backgroundImage && `background-image: url('${backgroundImage}');`}
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const MainText = styled(Text)`
    color: #5e5e5e;
    font-size: 13px;
    font-weight: bold;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const SubText = styled(Text)`
    color: #879292;
    font-size: 11px;
    line-height: 13px;
`;

const MenuCol = styled(Col)<{ isSelected: boolean }>`
    align-items: center;
    flex-grow: 1;
    padding: 15px;
    border-bottom: 1px solid ${({ isSelected }) => isSelected ? '#ededed' : '#cdd2d2'};
    cursor: pointer;
    
    ${Text} {
        color: ${({ isSelected }) => isSelected ? '#5e5e5e' : '#879292'};
        font-weight: ${({ isSelected }) => isSelected ? 'bold' : 'normal'};
        line-height: 15px;
    }
`;

const ProgressBar = styled(Row)`
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 24px;
    margin: 4px 0 0 10px;
    border-radius: 4px;
    overflow: hidden;
`;

function MostInfo() {
    const summonerName = useSelector((state: AppState) => state.summoner.summonerName || '');
    const [summonerMostInfo, setSummonerMostInfo] = useState<any>(null);
    const [mostViewMode, setMostViewMode] = useState<string>('all');

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        async function getMostInfoData() {
            const returnData = await getMostInfo({ summonerName });
            setSummonerMostInfo(returnData);
            // dispatch(updateSummonerLeagues(returnData.summoner.leagues));
        }

        getMostInfoData();
    }, []);

    if (summonerMostInfo === null) {
        // TODO: add skeleton component
        return <></>;
    }

    const {
        champions,
        recentWinRate,
    } = summonerMostInfo;

    return (
        <Wrapper>
            <Row>
                <MenuCol
                    isSelected={mostViewMode === 'all'}
                    onClick={() => setMostViewMode('all')}
                >
                    <Text>
                        챔피언 승률
                    </Text>
                </MenuCol>
                <Col width={'1px'} background={'#cdd2d2'}></Col>
                <MenuCol
                    isSelected={mostViewMode === 'recent'}
                    onClick={() => setMostViewMode('recent')}
                >
                    <Text>
                        7일간 랭크 승률
                    </Text>
                </MenuCol>
            </Row>
            {mostViewMode === 'all' ? (
                <>
                    {champions.map((data: any, index: number) => {
                        const {
                            imageUrl,
                            name,
                            cs,
                            kills,
                            deaths,
                            assists,
                            wins,
                            games,
                        } = data;

                        const {
                            kda,
                            averageKillRate,
                            averageDeathRate,
                            averageAssistRate,
                        } = KDACalculator(kills, deaths, assists, games);

                        const winPercent = ((wins / games) * 100).toFixed();

                        return (
                            <MostRow key={`summoner-most-champion-${index}`}>
                                <ThumbnailCol backgroundImage={imageUrl} />
                                <Col justify={'center'} width={'80px'}>
                                    <Row margin={'0 0 4px'}>
                                        <MainText>
                                            {name}
                                        </MainText>
                                    </Row>
                                    <Row>
                                        <SubText>
                                            CS {cs}
                                        </SubText>
                                    </Row>
                                </Col>
                                <Col align={'center'} justify={'center'} grow={1}>
                                    <Row margin={'0 0 4px'}>
                                        <MainText>
                                            {kda}:1 평점
                                        </MainText>
                                    </Row>
                                    <Row>
                                        <SubText>
                                            {averageKillRate} / {averageDeathRate} / {averageAssistRate}
                                        </SubText>
                                    </Row>
                                </Col>
                                <Col align={'center'} justify={'center'} width={'45px'}>
                                    <Row align={'center'} justify={'center'} margin={'0 0 4px'}>
                                        <MainText>
                                            {winPercent}%
                                        </MainText>
                                    </Row>
                                    <Row>
                                        <SubText>
                                            {games.toLocaleString()}게임
                                        </SubText>
                                    </Row>
                                </Col>
                            </MostRow>
                        )
                    })}
                </>
            ) : (
                <>
                    {recentWinRate.map((data: any, index: number) => {
                        const {
                            imageUrl,
                            wins,
                            losses,
                            name,
                        } = data;

                        const totalGameCount = wins + losses;
                        const winRate: any = wins > 0 ? ((wins / totalGameCount) * 100).toFixed() : 0;

                        return (
                            <MostRow key={`summoner-recent-champion-${index}`} padding={'8px 15px'}>
                                <ThumbnailCol
                                    width={'32px'}
                                    height={'32px'}
                                    backgroundImage={imageUrl}
                                />
                                <Col justify={'center'} width={'70px'}>
                                    <MainText>
                                        {name}
                                    </MainText>
                                </Col>
                                <Col align={'center'} justify={'center'} grow={1}>
                                   <Text
                                       color={'#879292'}
                                       fontSize={'13px'}
                                       fontWeight={'bold'}
                                       lineHeight={'16px'}
                                   >
                                       {(wins / totalGameCount * 100).toFixed()}%
                                   </Text>
                                </Col>
                                <ProgressBar>
                                    {wins > 0 && (
                                        <Col
                                            justify={'center'}
                                            width={`${winRate}%`}
                                            height={'24px'}
                                            background={'#1f8ecd'}
                                        >
                                            <Text
                                                color={'#ffffff'}
                                                fontWeight={'bold'}
                                                lineHeight={'15px'}
                                                margin={'0 0 0 4px'}
                                                zIndex={10}
                                            >
                                                {wins}승
                                            </Text>
                                        </Col>
                                    )}
                                    {losses > 0 && (
                                        <Col
                                            align={'flex-end'}
                                            justify={'center'}
                                            width={`${(100 - winRate)}%`}
                                            height={'24px'}
                                            background={'#ee5a52'}
                                        >
                                            <Text
                                                color={'#ffffff'}
                                                fontWeight={'bold'}
                                                lineHeight={'15px'}
                                                margin={'0 4px 0 0'}
                                            >
                                                {losses}패
                                            </Text>
                                        </Col>
                                    )}
                                </ProgressBar>
                            </MostRow>
                        )
                    })}
                </>
            )}

        </Wrapper>
    );
}

export default memo(MostInfo);
