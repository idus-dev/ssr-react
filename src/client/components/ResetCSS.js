import { createGlobalStyle } from 'styled-components';

const ResetCSS = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1.5;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}

html, body {
    height: 100%;
    min-height: 100%;
    width: 100%;
}

* {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    box-sizing: border-box;
    line-height: inherit;
}

a {
    text-decoration: none;
}

label {
    cursor: pointer;
}

button {
    border: 0 none;
    background: transparent;
    cursor: pointer;
    border-radius: 0;
    display: inline-block;

    /* chrome user agent disable */
    padding: 0;

    /* safari - remove browser default margin left right 2px */
    margin: 0;
}

fieldset {
    border: 0 none;
}

a, button, [tabindex], .tab, input {
    -webkit-tap-highlight-color: transparent;
}
/* end of reset */
/* project reset */
body {
    font:
        14px/1.5 'Noto Sans KR',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'
}

* {
    color: inherit;
}
`;

export default ResetCSS;
