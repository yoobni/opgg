import { createGlobalStyle } from 'styled-components';

// language=LESS
export default createGlobalStyle`
    html, body {
        line-height: 1.3em;
        -webkit-tap-highlight-color: transparent;
    }
    
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, main, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {margin:0; padding:0; border:0; word-break: keep-all; outline: none;}

    * {
        box-sizing : border-box;
    }
    
    ol,
    ul,
    li,
    dl {
        list-style: none;
    }

    hr {
        width: 100%;
        height: 1px;
        margin: 0;
        padding: 0;
        border: none;
        background-color: #000000;
    }
    
    em {
        font-style: normal;
    }
    
    mark {
        background-color: transparent;
        font-style: normal;
    }
    
    button, input, optgroup, select, textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        -webkit-tap-highlight-color: transparent;
    }
    
    button {
        border: none;
        margin: 0;
        padding: 0;
        border-radius: 0;
        background-color: transparent;
        cursor: pointer;
    }
    
    button:hover {
        cursor: pointer;
    }
    
    button:focus {
        outline: none;
    }

    object {
        width:100%;
        vertical-align:top;
    }

    html {
        font-family: Noto Sans KR, "sans-serif";
        -webkit-font-smoothing: antialiased;
    }
    
    body {
        font-family: 'Nanum Gothic', AppleSDGothicNeo-Regular, 'Malgun Gothic', '맑은 고딕', dotum, '돋움', sans-serif;
        background-color: #fff;
        color: #333c45;
        font-weight: 400;
    }

    :lang(ko) {
        font-family: 'Nanum Gothic', AppleSDGothicNeo-Regular, 'Malgun Gothic', '맑은 고딕', dotum, '돋움', sans-serif;
    }
    
    :lang(en) {
        font-family: 'Nanum Gothic', AppleSDGothicNeo-Regular, 'Malgun Gothic', '맑은 고딕', dotum, '돋움', sans-serif;
    }

    a {
        color: inherit !important;
        text-decoration: none !important;
    }

    a:hover {
        text-decoration: none;
    }

    img {
        max-width: 100%;
        border: none;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    
    select:focus,
    a:focus,
    input:focus, 
    textarea:focus { 
        outline: 0 none; 
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        height: auto;
        -webkit-appearance: none;
        margin: 0;
    }
    
    input[type='search'] {
        -webkit-appearance: textfield;
        -moz-box-sizing: content-box;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
    }
    
    input[type='search']::-webkit-search-cancel-button,
    input[type='search']::-webkit-search-decoration {
        -webkit-appearance: none;
    }
    
    input[type="text"],
    input[type="password"],
    input[type="search"],
    input[type="tel"],
    input[type="date"],
    input[type="number"],
    input[type="email"] {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        margin: 0;
        padding: 0 10px;
        border: 1px solid #E4E1DE;
        border-radius: 4px;
        font-size: 14px;
    }

    input[type="text"],
    textarea {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    textarea {
        width: 100%;
        height: 155px;
        padding: 10px;
        border: 1px solid #E4E1DE;
        border-radius: 4px;
        box-sizing:border-box;
        font-size: 14px;
        resize: none;
    }
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    ::placeholder { 
        color: #C6C6C6;
        opacity: 1; /* Firefox */
    }
    /* Internet Explorer 10-11 */
    :-ms-input-placeholder {
        color: #C6C6C6;
    }
    /* Microsoft Edge */
    ::-ms-input-placeholder {
        color: #C6C6C6;
    }
`;
