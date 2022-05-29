// Package
import React, { memo } from 'react';
import {useSelector} from "react-redux";
// Store
import { AppState } from "../../stores";
import { LeagueItemProps } from "../../stores/summoner/summoner";
// Lib
import { SIDE_CONTENT_WIDTH } from '../../lib/values';
// Component
import { Col } from "../../components/Layout";
import { TierItem } from './';

function TierBox() {
    const leagues = useSelector((state: AppState) => state.summoner.leagues || []);

    if (leagues.length === 0) {
        // TODO: add skeleton component
        return <></>;
    }

    return (
        <Col width={`${SIDE_CONTENT_WIDTH}px`}>
            {leagues.map((league: LeagueItemProps, index: number) => {
                return (
                    <TierItem key={`tier-item-${index}`} {...league} />
                )
            })}
        </Col>
    );
}

export default memo(TierBox);
