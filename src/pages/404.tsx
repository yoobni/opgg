// Package
import React from 'react';
// Component
import { Header, Footer } from "../components/Template";
import { Wrapper, GridWrapper, Row, Text } from '../components/Layout';

export default function Custom404() {
    return (
        <>
            <Header />
            <Wrapper background={'#ebecee'}>
                <GridWrapper height={'calc(100vh - 200px)'}>
                    <Row width={'100%'} padding={'200px'} align={'center'} justify={'center'}>
                        <Text
                            color={'#40464c'}
                            fontSize={'20px'}
                            fontWeight={'bold'}
                            lineHeight={'70px'}
                            letterSpacing={'1px'}
                        >
                            잘못된 주소로 접근했습니다.<br />
                            뒤로가기 후 다시 시도해주세요.
                        </Text>
                    </Row>
                </GridWrapper>
            </Wrapper>
            <Footer />
        </>
    )
}