import { useEffect, useState } from 'react';

export default function useKeywordList() {
    const [keywordList, setKeywordList] = useState<string[]>([]);

    useEffect(() => {
        const searchKeywordList = localStorage.getItem('searchKeywordList');

        if (searchKeywordList != null) {
            setKeywordList(JSON.parse(searchKeywordList));
        }
    }, []);

    const checkKeywordList = (newKeyword: string) => {
        return keywordList.filter((keyword) => keyword !== newKeyword);
    }

    const addKeywordList = (keyword: string) => {
        const filterKeywordList = checkKeywordList(keyword);
        const newKeywordList = [keyword].concat(filterKeywordList);
        console.log(newKeywordList);
        localStorage.setItem('searchKeywordList', JSON.stringify(newKeywordList));
        setKeywordList(newKeywordList);
    }

    const removeKeywordList = (keyword: string) => {
        const filterKeywordList = checkKeywordList(keyword);
        localStorage.setItem('searchKeywordList', JSON.stringify(filterKeywordList));
        setKeywordList(filterKeywordList);
    }

    return {
        keywordList,
        addKeywordList,
        removeKeywordList,
    };
}
