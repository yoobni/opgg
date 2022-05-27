// Package
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
// Lib
import GlobalStyle from '../lib/styles/GlobalStyle';

const theme = {
    colors: {
        primary: '#0070f3',
    },
};

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta property="og:title" content="롤 전적 검색 OP.GG - 전적 검색, 관전, 리플레이, 챔피언 공략, 카운터, 랭킹" />
                <meta property="og:description" content="롤 전적, 모든 게임의 전적, 챔프 평점, KDA, 승률을 볼 수 있고 리플을 보거나 자신의 게임을 녹화를 할 수 있습니다. 지금 바로 당신의 소환사명을 검색해보세요!" />
                <meta name="title" content="롤 전적 검색 OP.GG - 전적 검색, 관전, 리플레이, 챔피언 공략, 카운터, 랭킹" />
                <meta name="description" content="롤 전적, 모든 게임의 전적, 챔프 평점, KDA, 승률을 볼 수 있고 리플을 보거나 자신의 게임을 녹화를 할 수 있습니다. 지금 바로 당신의 소환사명을 검색해보세요!" />
                <meta property="og:site_name" content="OP.GG" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://s-lol-web.op.gg/images/reverse.rectangle.png" />
                <meta name="viewport" content="width=1000" />
                <title>롤 전적 검색 OP.GG - 전적 검색, 관전, 리플레이, 챔피언 공략, 카운터, 랭킹</title>
            </Head>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

export default App;
