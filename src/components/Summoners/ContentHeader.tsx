// Package
import React from 'react';
import styled from "styled-components";
import Image from "next/image";
// Component
import { Wrapper, GridWrapper, Row, Col, Text, Button } from "../../components/Layout";

const levelImage = 'https://s-lol-web.op.gg/static/images/site/summoner/bg-levelbox.png';

interface LeagueProps {
    division?: string;
    imageUrl?: string;
    lp?: number;
    name?: string;
    season?: number;
    shortString?: string;
    string?: string;
    tier?: string;
    tierDivision?: string;
    tierRankPoint?: number;
}

interface ImageProps {
    borderImage?: string;
    profileImage?: string;
}

const ThumbnailCol = styled(Col)<ImageProps>`
    width: 120px;
    height: 120px;
    margin: 0 17px 0 0;
    
    .border-image {
        position: absolute;
        width: 120px;
        height: 120px;
        ${({ borderImage }) => borderImage && `background-image: url('${borderImage}');`}
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
        ${({ profileImage }) => profileImage && `background-image: url('${profileImage}');`}
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
        background-image: url('${levelImage}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        color: #eabd56;
        font-size: 14px;
        text-align: center;
    }
`;

function ContentHeader() {
    const leagueList: LeagueProps[] = [
        {
            // division: string;
            // imageUrl: string;
            // lp: number;
            // name: ''
            season: 7,
            // shortString: string;
            // string: string;
            tier: 'Bronze',
            // tierDivision: string;
            // tierRankPoint: number;
        },
        {
            season: 8,
            tier: 'Silver',
        },
        {
            season: 9,
            tier: 'Gold',
        }
    ];

    const borderImage = 'https://opgg-static.akamaized.net/images/border_new/gold.png';
    const profileImage = 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon582.jpg?image=q_auto&image=q_auto,f_webp,w_auto&v=1653542313952';
    const summonerLevel = 234;
    const summonerName = '한글 이름 테스트';
    const summonerRanking = 363499;
    const summonerRankRate = 40.7;

    return (
        <Wrapper borderBottom={'1px solid #d8d8d8'}>
            <GridWrapper padding={'0 30px'}>
                {leagueList.length > 0 && (
                    <Row padding={'15px 0 0'}>
                        {leagueList.map((league: LeagueProps, index: number) => {
                            const {
                                season,
                                tier,
                            } = league;

                            return (
                                <Button
                                    padding={'4px 5px 3px'}
                                    border={'1px solid #d0d3d4'}
                                    borderRadius={'2px'}
                                    background={'#e0e3e3'}
                                    margin={'0 7px 0 0'}
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
                        borderImage={borderImage}
                        profileImage={profileImage}
                    >
                        <div className={'border-image'}></div>
                        <div className={'profile-image'}></div>
                        <div className={'level-image'}>
                            {summonerLevel}
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
                                {summonerName}
                            </Text>
                        </Row>
                        <Row>
                            <Text>
                                래더 랭킹 {summonerRanking.toLocaleString()}위 (상위 {summonerRankRate}%)
                            </Text>
                        </Row>
                    </Col>
                </Row>
            </GridWrapper>
        </Wrapper>
    );
}

export default ContentHeader;
