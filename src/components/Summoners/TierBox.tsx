// Package
import React, { useState, useEffect, memo } from 'react';
// Component
import { Wrapper, GridWrapper, Row, Col, Text } from "../../components/Layout";
import {
    ContentHeader,
} from '../../components/Summoners';
import {useSelector} from "react-redux";
import {AppState} from "../../stores";
import { LeagueItemProps } from '../../stores/summoner';
import { TierItem } from './';


function TierBox() {
    const leagues = useSelector((state: AppState) => state.summoner.leagues || []);

    useEffect(() => {
        if (typeof window !== 'object') {
            return;
        }
    }, []);

    if (leagues.length === 0) {
        // TODO: add skeleton component
        return <></>;
    }

    return (
        <Col>
            {leagues.map((league: LeagueItemProps, index: number) => {
                return (
                    <TierItem key={`tier-item-${index}`} {...league}>
                        asd
                    </TierItem>
                )
            })}
        </Col>
    );
}

export default memo(TierBox);
