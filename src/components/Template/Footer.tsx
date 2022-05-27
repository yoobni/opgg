import styled from "styled-components";
import { GridWrapper, Wrapper, Row, Col, Text } from '../Layout';

const MenuCol = styled(Col)`
    margin: 0 20px 0 0;
    
    ${Text} {
        color: #181d1f;
        font-weight: 400;
    }
`;

export default function Footer() {
    return (
        <Wrapper padding={'0 0 30px'}>
            <GridWrapper>
                <Row margin={'0 0 10px'}>
                    <MenuCol>
                        <Text>
                            About OP.GG
                        </Text>
                    </MenuCol>
                    <MenuCol>
                        <Text>
                            로고 히스토리
                        </Text>
                    </MenuCol>
                    <MenuCol>
                        <Text>
                            <b>
                                개인정보처리방침
                            </b>
                        </Text>
                    </MenuCol>
                    <MenuCol>
                        <Text>
                            도움말
                        </Text>
                    </MenuCol>
                    <MenuCol>
                        <Text>
                            제휴
                        </Text>
                    </MenuCol>
                    <MenuCol>
                        <Text>
                            광고
                        </Text>
                    </MenuCol>
                    <MenuCol>
                        <Text>
                            문의/피드백
                        </Text>
                    </MenuCol>
                    <MenuCol>
                        <Text>
                            채용
                        </Text>
                    </MenuCol>
                </Row>
                <Row>
                    <Text
                        color={'#181d1f'}
                        fontSize={'11px'}
                        lineHeight={'20px'}
                    >
                        © 2012-2022OP.GG. OP.GG isn’t endorsed
                        by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved
                        in producing or managing League of Legends. League of Legends and Riot Games are trademarks or
                        registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
                    </Text>
                </Row>
            </GridWrapper>
        </Wrapper>
    )
}