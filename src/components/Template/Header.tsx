import styled from 'styled-components';
import { COLOR } from '../../lib/styles/colors';
import {
    Wrapper,
    GridWrapper,
    Row,
    Col,
    Button,
    Input,
    Text,
} from "../Layout";

const SearchRow = styled(Row)`
    justify-content: flex-end;
    height: 32px;
    
    ${Input} {
        height: 32px;
        padding: 9px 12px 8px 14px;
        border: none;
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        color: #181d1f;
        font-size: 12px;
    }
    
    .opgg-search-button {
        width: 60px;
        height: 32px;
        border-radius: 0;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
`;

export default function Header() {
    return (
        <Wrapper
            padding={'53px 0 12px'}
            background={COLOR.AZURE}
        >
            <GridWrapper>
                <SearchRow justify={'flex-end'}>
                    <Col width={'200px'}>
                        <Input
                            name={'search'}
                            type={'text'}
                            value={'소환사명, 챔피언...'}
                            placeholder={'asd'}
                        />
                    </Col>
                    <Col>
                        <Button
                            className={'opgg-search-button'}
                        >
                            {/* 이미지로 교체 */}
                            <Text
                                color={COLOR.AZURE}
                            >
                                .gg
                            </Text>
                        </Button>
                    </Col>
                </SearchRow>
            </GridWrapper>
        </Wrapper>
    )
}