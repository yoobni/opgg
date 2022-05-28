// Package
import React, { useEffect, memo } from 'react';
// Component
import { Row, Col, Text } from "../../components/Layout";
import { LeagueItemProps } from "../../stores/summoner/summoner";

const TIER_WIDTH = 300;

function TierItem(props: LeagueItemProps) {
    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }
    }, []);

    const {
        hasResults,
        wins,
        losses,
        tierRank: {
            name,
            imageUrl,
            string,
            lp,
        },
    } = props;

    const totalPlay = wins + losses;

    // TODO: 티어 번역필

    return (
        <>
            <Row
                width={`${TIER_WIDTH}px`}
                padding={hasResults ? '10px 8px' : '17px 28px'}
                margin={'0 0 10px'}
                border={`1px solid #cdd2d2`}
                borderRadius={'2px'}
                background={`#f2f2f2`}
                align={'center'}
            >
                <Col
                    align={'center'}
                    justify={'center'}
                    width={hasResults ? '104px' : '64px'}
                    height={hasResults ? '104px' : '64px'}
                    margin={hasResults ? '0 8px 0 0' : '0 28px 0 0'}
                >
                    <img src={imageUrl} alt=""/>
                </Col>
                <Col>
                    <Row margin={'0 0 4px'}>
                        <Text
                            color={'#879292'}
                            fontSize={'11px'}
                            lineHeight={'13px'}
                        >
                            {name}
                        </Text>
                    </Row>
                    {hasResults ? (
                        <>
                            <Row margin={'0 0 4px'}>
                                <Text
                                    color={'#353a3a'}
                                    fontSize={'12px'}
                                    lineHeight={'15px'}
                                >
                                    (총 <Text fontFamily={'Helvetica'}>{(totalPlay).toLocaleString()}</Text>게임)
                                </Text>
                            </Row>
                            <Row margin={'0 0 6px'}>
                                <Text
                                    color={'#1f8ecd'}
                                    fontSize={'15px'}
                                    fontWeight={'bold'}
                                    lineHeight={'18px'}
                                >
                                    {string}
                                </Text>
                            </Row>
                            <Row margin={'0 0 3px'}>
                                <Text
                                    color={'#555e5e'}
                                    fontWeight={'bold'}
                                    lineHeight={'14px'}
                                >
                                    {lp} LP
                                </Text>
                                <Text
                                    color={'#879292'}
                                    lineHeight={'14px'}
                                >
                                    &nbsp;/ {wins.toLocaleString()}승 {losses.toLocaleString()}패
                                </Text>
                            </Row>
                            <Row>
                                <Text
                                    color={'#879292'}
                                    lineHeight={'15px'}
                                >
                                    {/* TODO: util or hook */}
                                    승률 {Math.floor(wins / totalPlay * 100)}%
                                </Text>
                            </Row>
                        </>
                    ) : (
                        <Row>
                            <Text
                                color={'#879292'}
                                fontSize={'13px'}
                                fontWeight={'bold'}
                                lineHeight={'16px'}
                            >
                                Unranked
                            </Text>
                        </Row>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default memo(TierItem);
