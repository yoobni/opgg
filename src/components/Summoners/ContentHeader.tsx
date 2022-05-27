// Package
import React from 'react';
import Image from "next/image";
// Component
import { GridWrapper, Row, Col, Text, Button } from "../../components/Layout";

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
            tier: 'bronze',
            // tierDivision: string;
            // tierRankPoint: number;
        },
        {
            season: 8,
            tier: 'silver',
        },
        {
            season: 9,
            tier: 'gold',
        }
    ];

    return (
        <GridWrapper>
            {leagueList.length > 0 && (
                <Row>
                    {leagueList.map((league: LeagueProps, index: number) => {
                        const {
                            season,
                            tier,
                        } = league;

                        return (
                            <Button
                                padding={'4px 5px'}
                                border={'1px solid #d0d3d4'}
                                borderRadius={'2px'}
                                background={'e0e3e3'}
                            >
                                <Text>
                                    <b>S{season}</b> {tier}
                                </Text>
                            </Button>
                        )
                    })}
                </Row>
            )}
        </GridWrapper>
    );
}

export default ContentHeader;
