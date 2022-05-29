// Package
import React, { memo, useEffect } from 'react';
// Component
import { Wrapper, GridWrapper, Row, Col, Text } from "../../components/Layout";
import {
    ContentHeader,
    TierBox,
    MostInfo,
} from '../../components/Summoners';

function Summoner() {
    return (
        <>
            <ContentHeader />
            <Wrapper background={'#eaeaea'}>
                <GridWrapper >
                    <Row className={'main'} padding={'10px 0 0'}>
                        <Col>
                            <TierBox />
                            <MostInfo />
                        </Col>

                        <Col className={'rankGame-gameList'}>
                            <Row className={'rankGameMenu'}>
                                <Row className={'rank-menubar'}>

                                </Row>
                                <Row className={'rank-chart'}>

                                </Row>
                            </Row>
                            <Row className={'rankGameList'}>

                            </Row>
                        </Col>
                    </Row>
                </GridWrapper>
            </Wrapper>
        </>
    );
}

export default memo(Summoner);
