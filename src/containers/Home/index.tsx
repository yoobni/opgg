// Package
import React from 'react';
// Component
import { Wrapper, GridWrapper, Text } from "../../components/Layout";

function Home() {
    return (
        <Wrapper height={'calc(100vh - 200px)'} padding={'100px 0'}>
            <GridWrapper>
                <Text>
                    Home
                </Text>
            </GridWrapper>
        </Wrapper>
    );
}

export default Home;
