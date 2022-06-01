// Package
import React, { useEffect, memo } from 'react';
import Image from "next/image";
import styled from "styled-components";
// Api
import { Game } from "../../api/summoner";
// Lib
import COLOR from "../../lib/styles/colors";
import { ago, getChampionNameWithUrl } from "../../lib/utils";
import RED_WARD from '../../assets/icons/red-ward-icon.svg';
import BLUE_WARD from '../../assets/icons/blue-ward-icon.svg';
// Component
import { MatchTeams } from './';
import { Row, Col, Text, Button } from "../../components/Layout";

interface MatchListProps {
    games: any[];
}

const MatchItemRow = styled(Row)<{ isWin: boolean }>`
    width: 100%;
    height: 100px;
    margin: 0 0 8px;
    border: 1px solid ${({ isWin }) => isWin ? COLOR.LIGHT_GREY_BLUE : COLOR.PINKISH_GREY2};
    background: ${({ isWin }) => isWin ? COLOR.LIGHT_BLUE_GREY : COLOR.PINKISH_GREY};
    
    span {
        letter-spacing: -0.42px;
    }
    
    .round-image {
        border-radius: 50%;
    }
    
    .square-image {
        border-radius: 2px;
    }
    
    .background-image {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #000000;
    }
    
    .normal-text {
        color: ${COLOR.GREYNISH_BROWN};
        font-size: 11px;
        line-height: 13px;
    }
    
    .kda-text {
        ${Text} {
            font-size: 15px;
            line-height: 18px;
            letter-spacing: -0.58px;
        }
    }
    
    .item-row {
        width: 22px;
        height: 22px;
        margin: 1px;
        border-radius: 2px;
        background: ${({ isWin }) => isWin ? COLOR.GREY_BLUE : COLOR.PINKISH_GREY4};
    }
`;

function MatchList(props: MatchListProps) {
    const {
        games = [],
    } = props;

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }
    }, [props]);

    if (games.length === 0) {
        // TODO: add skeleton component
        return <></>;
    }

    const itemTempList = [0, 1, 2, 3, 4, 5];

    return (
        <>
            {games.map((game: Game, index: number) => {
                const {
                    champion: {
                        imageUrl,
                        level,
                    },
                    spells,
                    items,
                    peak,
                    isWin,
                    gameId,
                    gameType,
                    gameLength,
                    summonerName,
                    createDate,
                    stats: {
                        general: {
                            kill,
                            death,
                            assist,
                            kdaString,
                            largestMultiKillString = '',
                            opScoreBadge,
                            cs,
                            csPerMin,
                            contributionForKillRate,
                        },
                        ward: {
                            visionWardsBought,
                        },
                    },
                } = game;

                let wardImage: string = '';

                return (
                    <MatchItemRow key={`match-data-${gameId}`} isWin={isWin}>
                        {/* Info */}
                        <Col width={'70px'} align={'center'} justify={'center'} margin={'0 14px 0 0'}>
                            <Row margin={'0 0 4px'}>
                                <Text className={'normal-text'}>
                                    <b>{gameType}</b>
                                </Text>
                            </Row>
                            <Row>
                                <Text className={'normal-text'}>
                                    {ago(createDate)}
                                </Text>
                            </Row>
                            <Row width={'27px'} height={'1px'} margin={'3px 5px'} background={isWin ? COLOR.LIGHT_GREY_BLUE2 : COLOR.PINKISH_GREY3}></Row>
                            <Row margin={'0 0 4px'}>
                                <Text
                                    color={isWin ? COLOR.UGLY_BLUE : COLOR.SCARLET}
                                    fontSize={'11px'}
                                    fontWeight={700}
                                >
                                    <b>{isWin ? '승리' : '패배'}</b>
                                </Text>
                            </Row>
                            <Row>
                                <Text className={'normal-text'}>
                                    {Math.floor(gameLength / 60)}분 {gameLength % 60}초
                                </Text>
                            </Row>
                        </Col>
                        {/* champion */}
                        <Col width={'100px'} align={'center'} justify={'center'}>
                            <Row>
                                <Col margin={'0 6px 0 0'}>
                                    <Image
                                        unoptimized
                                        src={imageUrl}
                                        alt={'champion-thumbnail'}
                                        className={'round-image'}
                                        width={'46px'}
                                        height={'46px'}
                                    />
                                </Col>
                                <Col margin={'0 4px 7px 0'}>
                                    {spells.map((spellImage: { imageUrl: string }, spellIndex: number) => {
                                        const {
                                            imageUrl,
                                        } = spellImage;

                                        return (
                                            <Row key={`game-spell-${index}-${spellIndex}`} margin={'0 0 2px'}>
                                                <Image
                                                    unoptimized
                                                    src={imageUrl}
                                                    alt={'champion-spell-icon'}
                                                    className={'square-image'}
                                                    width={'22px'}
                                                    height={'22px'}
                                                />
                                            </Row>
                                        );
                                    })}
                                </Col>
                                <Col>
                                    {peak.map((rune: string, runeIndex: number) => {
                                        return (
                                            <Row
                                                key={`game-spell-${index}-${runeIndex}`}
                                                className={runeIndex === 0 ? 'background-image' : ''}
                                                margin={'0 0 2px'}
                                            >
                                                <Image
                                                    unoptimized
                                                    src={rune}
                                                    alt={'champion-rune-icon'}
                                                    className={'round-image'}
                                                    width={'22px'}
                                                    height={'22px'}
                                                />
                                            </Row>
                                        )
                                    })}
                                </Col>
                            </Row>
                            <Row align={'center'}>
                                <Text className={'normal-text'}>
                                    {getChampionNameWithUrl(imageUrl)}
                                </Text>
                            </Row>
                        </Col>
                        {/* kda */}
                        <Col grow={1} align={'center'} justify={'center'}>
                            <Row className={'kda-text'}>
                                <Text
                                    color={COLOR.WARM_GREY3}
                                    fontSize={'15px'}
                                    lineHeight={'18px'}
                                    letterSpacing={'-0.58px'}
                                >
                                    <Text color={COLOR.GUNMETAL}><b>{kill}</b></Text>
                                    &nbsp;/&nbsp;
                                    <Text color={COLOR.SCARLET}><b>{death}</b></Text>
                                    &nbsp;/&nbsp;
                                    <Text color={COLOR.GUNMETAL}><b>{assist}</b></Text>
                                </Text>
                            </Row>
                            <Row margin={'6px 0'}>
                                <Text className={'normal-text'} color={COLOR.BLACK} fontWeight={'bold'}>
                                    {kdaString} <Text color={COLOR.GUNMETAL} fontSize={'11px'}>평점</Text>
                                </Text>
                            </Row>
                            {(largestMultiKillString || opScoreBadge) && (
                                <Row>
                                    {largestMultiKillString && (
                                        <Col margin={'0 2px'}>
                                            <Button
                                                height={'18px'}
                                                border={`1px solid ${COLOR.REDDISH2}`}
                                                borderRadius={'9px'}
                                                padding={'3px 5px'}
                                                background={COLOR.TOMATO}
                                            >
                                                <Text
                                                    color={'#ffffff'}
                                                    fontSize={'10px'}
                                                    lineHeight={'12px'}
                                                    letterSpacing={'-0.38px'}
                                                >
                                                    {largestMultiKillString}
                                                </Text>
                                            </Button>
                                        </Col>
                                    )}
                                    {opScoreBadge && (
                                        <Col margin={'0 4.5px'}>
                                            <Button
                                                height={'18px'}
                                                border={`1px solid ${COLOR.WARM_PURPLE}`}
                                                borderRadius={'9px'}
                                                padding={'3px 5px'}
                                                background={COLOR.AMETHYST}
                                            >
                                                <Text
                                                    color={'#ffffff'}
                                                    fontSize={'10px'}
                                                    lineHeight={'12px'}
                                                    letterSpacing={'-0.38px'}
                                                >
                                                    {opScoreBadge}
                                                </Text>
                                            </Button>
                                        </Col>
                                    )}
                                </Row>
                            )}
                        </Col>
                        {/* stats */}
                        <Col width={'90px'} align={'center'} justify={'center'}>
                            <Row>
                                <Text className={'normal-text'}>
                                    레벨{level}
                                </Text>
                            </Row>
                            <Row margin={'6px 0'}>
                                <Text className={'normal-text'}>
                                    {cs} ({csPerMin}) CS
                                </Text>
                            </Row>
                            <Row>
                                <Text className={'normal-text'}>
                                    <Text color={COLOR.SCARLET} fontSize={'11px'}>킬관여 {contributionForKillRate}</Text>
                                </Text>
                            </Row>
                        </Col>
                        {/* items */}
                        <Col grow={1} align={'center'} justify={'center'}>
                            <Row>
                                <Row width={'72px'} wrap={'wrap'} align={'center'} justify={'center'} alignSelf={'center'} >
                                    {itemTempList.map((itemIndex) => {
                                        let itemImage = items[itemIndex] ? items[itemIndex].imageUrl : '';

                                        if (itemIndex === items.length - 1) {
                                            wardImage = itemImage;
                                            itemImage = '';
                                        }

                                        return (
                                            <Row
                                                key={`game-champion-item-${itemIndex}`}
                                                className={'item-row'}
                                            >
                                                {itemImage.length > 0 && (
                                                    <Image
                                                        unoptimized
                                                        src={itemImage}
                                                        alt={'champion-item-icon'}
                                                        className={'square-image'}
                                                        width={'22px'}
                                                        height={'22px'}
                                                    />
                                                )}
                                            </Row>
                                        )
                                    })}
                                </Row>
                                <Col>
                                    {wardImage.length > 0 && (
                                        <Col className={'item-row'}>
                                            <Image
                                                unoptimized
                                                src={wardImage}
                                                alt={'champion-ward-icon'}
                                                className={'square-image'}
                                                width={'22px'}
                                                height={'22px'}
                                            />
                                        </Col>
                                    )}
                                    {wardImage.length > 0 && (
                                        <Col
                                            width={'22px'}
                                            height={'22px'}
                                            margin={'1px'}
                                        >
                                            <Image
                                                unoptimized
                                                src={isWin ? BLUE_WARD : RED_WARD}
                                                alt={'champion-ward-icon'}
                                                className={'square-image'}
                                                width={'22px'}
                                                height={'22px'}
                                            />
                                        </Col>
                                    )}
                                </Col>
                            </Row>
                            <Row margin={'6px 0 0'} align={'center'}>
                                <Col margin={'0 4px 0 0'}>
                                    <Image
                                        unoptimized
                                        src={isWin ? BLUE_WARD : RED_WARD}
                                        alt={'champion-ward-icon'}
                                        className={'round-image'}
                                        width={'16px'}
                                        height={'16px'}
                                    />
                                </Col>
                                <Col>
                                    <Text
                                        color={'#000000'}
                                        fontSize={'11px'}
                                        lineHeight={'13px'}
                                        letterSpacing={'-0.42px'}
                                    >
                                        제어와드 {visionWardsBought}
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                        {/* participants */}
                        <Row width={'170px'}>
                            <MatchTeams gameId={gameId} summonerName={summonerName} />
                        </Row>
                        <Col
                            width={'30px'}
                            height={'100px'}
                            margin={'-1px -1px 0 0'}
                            border={`1px solid ${isWin ? COLOR.COOL_BLUE : COLOR.BROWNISH_PINK}`}
                            background={isWin ? COLOR.PERRYWINKLE : COLOR.PINKISH_TAN}
                        >
                        </Col>
                    </MatchItemRow>
                );
            })}
        </>
    );
}

export default memo(MatchList);
