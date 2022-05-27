// Package
import React, {useEffect} from 'react';
// Component
import { Wrapper, GridWrapper, Row, Col, Text } from "../../components/Layout";
import {
    ContentHeader,
} from '../../components/Summoners';

function Summoner() {
    return (
        <>
            <ContentHeader />
            <Wrapper height={'calc(100vh - 200px)'}>
                <GridWrapper>
                    <Row className={'main'} padding={'10px 0 0'}>
                        <Col className={'tier-championRate'}>
                            <Row className={'tierBox'}>

                            </Row>
                            <Row className={'championRate'}>

                            </Row>
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

export default Summoner;
