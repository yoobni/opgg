// Package
import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// Api
import { getSummoner, PreviousTiers } from "../../api/summoner";
// Store
import { AppState } from "../../stores";
import { summonerActions } from "../../stores/summoner/summoner";
// Component
import { Wrapper, GridWrapper, Row, Col, Text, Button } from "../../components/Layout";
import COLOR from "../../lib/styles/colors";

const LEVEL_IMAGE_URL = 'https://s-lol-web.op.gg/static/images/site/summoner/bg-levelbox.png';

interface ImageProps {
    profileImageUrl?: string;
    profileBorderImageUrl?: string;
}

const ThumbnailCol = styled(Col)<ImageProps>`
    width: 120px;
    height: 120px;
    margin: 0 17px 0 0;
    
    .border-image {
        position: absolute;
        width: 120px;
        height: 120px;
        ${({ profileBorderImageUrl }) => profileBorderImageUrl && `background-image: url('${profileBorderImageUrl}');`}
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        align-items: center;
        justify-content: center;
    }
    
    .profile-image {
        margin: 10px;
        width: 100px;
        height: 100px;
        ${({ profileImageUrl }) => profileImageUrl && `background-image: url('${profileImageUrl}');`}
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    
    .level-image {
        position: absolute;
        width: 44px;
        height: 24px;
        padding: 2px 0 0;
        margin-top: 95px;
        margin-left: 38px;
        background-image: url('${LEVEL_IMAGE_URL}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        color: ${COLOR.DULL_YELLOW};
        font-size: 14px;
        text-align: center;
    }
`;

function ContentHeader() {
    const summonerName = useSelector((state: AppState) => state.summoner.summonerName || '');
    const [summonerData, setSummonerData] = useState<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }

        async function getSummonerData() {
            const summonerData = await getSummoner({ summonerName });
            setSummonerData(summonerData);

            if (summonerData != null) {
                return summonerData;
            }

            return null;
        }

        getSummonerData()
            .then((data) => {
                if (data != null) {
                    dispatch(summonerActions.setSummonerLeagues(data?.summoner?.leagues));
                }
            })
        ;
    }, [summonerName]);

    if (summonerData === null) {
        // TODO: add skeleton component
        return <></>;
    }

    const {
        ladderRank: {
            rank,
            rankPercentOfTop,
        },
        level,
        name,
        previousTiers = [],
        profileBorderImageUrl,
        profileImageUrl,
    } = summonerData.summoner;

    return (
        <Wrapper background={COLOR.WHITE} borderBottom={`1px solid ${COLOR.WHITE3}`}>
            <GridWrapper padding={'0 30px'}>
                {previousTiers.length > 0 && (
                    <Row padding={'15px 0 0'}>
                        {previousTiers.slice(0).reverse().map((tiers: PreviousTiers, index: number) => {
                            const {
                                season,
                                tier,
                            } = tiers;

                            return (
                                <Button
                                    key={`button-temp-${index}`}
                                    padding={'4px 5px 3px'}
                                    margin={'0 7px 0 0'}
                                    border={`1px solid ${COLOR.SILVER2}`}
                                    borderRadius={'2px'}
                                    background={COLOR.SILVER}
                                >
                                    <Text
                                        color={COLOR.SLATE_GREY}
                                        fontSize={'11px'}
                                        lineHeight={'11px'}
                                        letterSpacing={'-0.42px'}
                                    >
                                        <b>S{season}</b> {tier}
                                    </Text>
                                </Button>
                            )
                        })}
                    </Row>
                )}
                <Row padding={'8px 0 14px'}>
                    <ThumbnailCol
                        profileBorderImageUrl={profileBorderImageUrl}
                        profileImageUrl={profileImageUrl}
                    >
                        <div className={'border-image'}></div>
                        <div className={'profile-image'}></div>
                        <div className={'level-image'}>
                            {level}
                        </div>
                    </ThumbnailCol>
                    <Col>
                        <Row padding={'10px 0 4px'}>
                            <Text
                                color={COLOR.CHARCOAL}
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                letterSpacing={'-0.77px'}
                            >
                                {name}
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                래더 랭킹 {rank.toLocaleString()}위 (상위 {rankPercentOfTop}%)
                            </Text>
                        </Row>
                    </Col>
                </Row>
            </GridWrapper>
        </Wrapper>
    );
}

export default memo(ContentHeader);
