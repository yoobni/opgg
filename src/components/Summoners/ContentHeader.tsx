// Package
import React, { useEffect, useState, memo } from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
// Api
import { getSummoner } from "../../api/summoner";
// Store
import { AppState } from "../../stores";
// Component
import { Wrapper, GridWrapper, Row, Col, Text, Button } from "../../components/Layout";
import {updateSummonerLeagues} from "../../stores/summoner/actions/summoner";

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
        color: #eabd56;
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
            const returnData = await getSummoner({ summonerName });
            setSummonerData(returnData);
            dispatch(updateSummonerLeagues(returnData.summoner.leagues));
        }

        getSummonerData();
    }, []);

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
        <Wrapper background={'#eaeaea'} borderBottom={'1px solid #d8d8d8'}>
            <GridWrapper padding={'0 30px'}>
                {previousTiers.length > 0 && (
                    <Row padding={'15px 0 0'}>
                        {previousTiers.slice(0).reverse().map((tiers: any, index: number) => {
                            const {
                                season,
                                tier,
                            } = tiers;

                            return (
                                <Button
                                    padding={'4px 5px 3px'}
                                    border={'1px solid #d0d3d4'}
                                    borderRadius={'2px'}
                                    background={'#e0e3e3'}
                                    margin={'0 7px 0 0'}
                                    key={`button-temp-${index}`}
                                >
                                    <Text
                                        color={'#657070'}
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
                                color={'#242929'}
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
