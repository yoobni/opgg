// Package
import React, { useEffect, useState, memo } from 'react';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
// Api
import { getMatchDetail } from "../../api/summoner";
// Store
import { summonerActions } from "../../stores/summoner/summoner";
// Lib
import COLOR from "../../lib/styles/colors";
// Component
import { Row, Col, Text } from "../../components/Layout";

interface MatchListProps {
    summonerName: string;
    gameId: string | number,
}

function MatchTeams(props: MatchListProps) {
    const {
        summonerName,
        gameId,
    } = props;

    const [gameMatchDetail, setGameMatchDetail] = useState<any>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        async function getMatchTeams() {
            const matchDetail = await getMatchDetail({ summonerName, gameId });
            setGameMatchDetail(matchDetail);
        }

        getMatchTeams();
    }, [summonerName]);

    const onClickSummonerName = (e: MouseEvent, summonerName: string) => {
        e.preventDefault();
        router.push(`/summoners/${summonerName}`);
        dispatch(summonerActions.setSummonerName(summonerName));
    }

    if (gameMatchDetail === null) {
        // TODO: add skeleton component
        return <></>;
    }

    const {
        teams,
    } = gameMatchDetail;

    return (
        <>
            {teams.map((team: any, index: number) => {
                const {
                    players = [],
                } = team;

                return (
                    <Col key={`match-team-${index}`} align={'center'} justify={'center'}>
                        {players.map((summoner: any, summonerIndex: number) => {
                            const {
                                champion: {
                                    imageUrl,
                                },
                            } = summoner;

                            return (
                                <Row key={`match-team-player-${summonerIndex}`} width={'85px'} margin={'1.5px 0'}>
                                    <Col width={'16px'} margin={'0 3px 0 0'}>
                                        <Image
                                            unoptimized
                                            src={imageUrl}
                                            alt={'champion-thumbnail'}
                                            className={'square-image'}
                                            width={'16px'}
                                            height={'16px'}
                                        />
                                    </Col>
                                    <Col
                                        width={'56px'}
                                        margin={'0 13px 0 0'}
                                        onClick={(e: MouseEvent) => onClickSummonerName(e, summoner.summonerName)}
                                        cursor={'pointer'}
                                    >
                                        <Text
                                            color={COLOR.GREYNISH_BROWN}
                                            fontSize={'11px'}
                                            fontWeight={summonerName === summoner.summonerName ? 'bold' : 'normal'}
                                            lineHeight={'13px'}
                                            displayOneLine={true}
                                        >
                                            {summoner.summonerName}
                                        </Text>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Col>
                )
            })}
        </>
    );
}

export default memo(MatchTeams);
