import { useState, memo } from 'react';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
// Lib
import { COLOR } from '../../lib/styles/colors';
import { removeSpecialCharacter } from "../../lib/utils";
import SearchIcon from '../../assets/icons/search-icon.svg';
// Store
import { summonerActions } from "../../stores/summoner/summoner";
// Hook
import useKeywordList from "../../hooks/useKeywordList";
// Component
import {
    Wrapper,
    GridWrapper,
    Row,
    Col,
    Text,
    Input,
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
`;

const SearchButtonCol = styled(Col)`
    align-items: flex-end;
    justify-content: center;
    width: 60px;
    height: 32px;
    padding: 8px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    background: white;
    cursor: pointer;
    
    ${Row} {
        width: 32px;
        height: 14px;
        background-image: url('${SearchIcon}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
`;

const FixedSearchKeywordList = styled.div`
    position: absolute;
    top: 85px;
    width: 260px;
    background: white;
    z-index: 1000;
    box-shadow: 0px 2px 4px rgba(24, 29, 31, 0.4);
`;

export const KeywordWrapper = (props: {
    keywordList: any[],
    onClickRemove: (keyword: string) => void,
    onClickKeyword: (keyword: string) => void,
}) => {
    const {
        keywordList,
        onClickRemove,
        onClickKeyword,
    } = props;

    return (
        <FixedSearchKeywordList>
            {keywordList.length > 0 ? (
                <>
                    {keywordList.map((keyword: string, index: number) => {
                        return (
                            <Row
                                width={'100%'}
                                padding={'14px 10px'}
                                key={`search-list-item-${index}`}
                            >
                                <Col
                                    width={'80%'}
                                    onClick={() => {
                                        onClickKeyword(keyword)
                                    }}
                                >
                                    <Text
                                        color={COLOR.GREYNISH_BROWN}
                                        fontSize={'13px'}
                                        fontWeight={'bold'}
                                        lineHeight={'15px'}
                                        displayOneLine={true}
                                    >
                                        {keyword}
                                    </Text>
                                </Col>
                                <Col
                                    width={'20%'}
                                    align={'flex-end'}
                                    onClick={() => onClickRemove(keyword)}
                                >
                                    <Text
                                        color={COLOR.GREYNISH_BROWN}
                                        fontSize={'11px'}
                                        lineHeight={'15px'}
                                        displayOneLine={true}
                                    >
                                        삭제
                                    </Text>
                                </Col>
                            </Row>
                        )
                    })}
                </>
            ) : (
                <Row padding={'30px'} justify={'center'}>
                    <Text
                        color={COLOR.SLATE_GREY}
                    >
                        검색 결과가 없습니다.
                    </Text>
                </Row>
            )}
        </FixedSearchKeywordList>
    );
}

function Header() {
    // searchKeywordList
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [showKeywordList, setShowKeywordList] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        keywordList,
        addKeywordList,
        removeKeywordList,
    } = useKeywordList();

    const onSearchKeyword = (keyword: string) => {
        if (keyword !== router.query.summoner && keyword.length !== 0) {
            const filterSearchKeyword = removeSpecialCharacter(keyword);
            dispatch(summonerActions.setSummonerName(filterSearchKeyword));
            addKeywordList(filterSearchKeyword);
            setSearchKeyword('');
            router.push(`/summoners/${filterSearchKeyword}`);
        }
    }

    const onClickSearchKeyword = (keyword: string) => {
        onSearchKeyword(keyword);
        setShowKeywordList(false);
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
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    onSearchKeyword(searchKeyword);
                                }
                            }}
                            onClick={() => setShowKeywordList(!showKeywordList)}
                        />
                        {showKeywordList && (
                            <KeywordWrapper
                                keywordList={keywordList}
                                onClickKeyword={onClickSearchKeyword}
                                onClickRemove={removeKeywordList}
                            />
                        )}
                    </Col>
                    <SearchButtonCol onClick={() => onSearchKeyword(searchKeyword)}>
                        <Row></Row>
                    </SearchButtonCol>
                </SearchRow>
            </GridWrapper>
        </Wrapper>
    )
}

export default memo(Header);