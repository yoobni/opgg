// Package
import React, { memo } from 'react';
// Component
import { Wrapper, GridWrapper, Row, Col } from "../../components/Layout";
import {
    ContentHeader,
    TierBox,
    MostInfo,
    MatchSummary,
} from '../../components/Summoners';

function Summoner() {
    return (
        <>
            <ContentHeader />
            <Wrapper background={'#eaeaea'}>
                <GridWrapper >
                    <Row className={'main'} padding={'10px 0 0'}>
                        <Col margin={'0 10px 0 0'}>
                            <TierBox />
                            <MostInfo />
                        </Col>
                        <Col>
                            <MatchSummary />
                        </Col>
                    </Row>
                </GridWrapper>
            </Wrapper>
        </>
    );
}

export default memo(Summoner);
