import { useState, memo } from 'react';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

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
import { updateSummonerName } from '../../stores/summoner/actions/summoner';
import {summonerActions} from "../../stores/summoner/summoner";

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

function Header() {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const router = useRouter();
    const dispatch = useDispatch();

    const onSearchKeyword = () => {
        if (searchKeyword !== router.query.summoner && searchKeyword.length !== 0) {
            setSearchKeyword('');
            dispatch(updateSummonerName(searchKeyword));
            router.push(`/summoners/${searchKeyword}`);
        }
    }

    return (
        <Wrapper
            padding={'53px 0 12px'}
            background={COLOR.AZURE}
        >
            <GridWrapper>
                <SearchRow justify={'flex-end'}>
                    <Col width={'200px'}>
                        <Input
                            name={'searchKeyword'}
                            type={'text'}
                            placeholder={'소환사명, 챔피언...'}
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSearchKeyword();
                                }
                            }}
                            // onKeyUp={(e) => {
                            //     let searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
                            //     setTimeout(() => {
                            //         if (searchQuery === (e.target as HTMLInputElement).value.toLowerCase()) {
                            //             console.log("why 3 times");
                            //             setSearchKeyword(searchQuery);
                            //         }
                            //     }, 200);
                            // }}
                        />
                    </Col>
                    <Col>
                        <Button
                            className={'opgg-search-button'}
                            onClick={() => {
                                onSearchKeyword();
                            }}
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

export default memo(Header);