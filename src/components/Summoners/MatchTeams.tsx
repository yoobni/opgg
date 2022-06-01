// Package
import React, { useEffect, useState, memo } from 'react';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
// Api
import { getMatchDetail, Player, Team } from "../../api/summoner";
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

    const onClickSummonerName = (summonerName: string) => {
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
            {teams.map((team: Team, index: number) => {
                const {
                    players = [],
                } = team;

                return (
                    <Col key={`match-team-${index}`} align={'center'} justify={'center'}>
                        {players.map((player: Player, summonerIndex: number) => {
                            const {
                                champion: {
                                    imageUrl,
                                },
                            } = player;

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
                                        onClick={() => onClickSummonerName(player.summonerName)}
                                        cursor={'pointer'}
                                    >
                                        <Text
                                            color={summonerName === player.summonerName ? COLOR.BLACK : COLOR.GREYNISH_BROWN}
                                            fontSize={'11px'}
                                            fontWeight={summonerName === player.summonerName ? 'bold' : 'normal'}
                                            lineHeight={'13px'}
                                            displayOneLine={true}
                                        >
                                            {player.summonerName}
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
