import moment from 'moment-timezone';
import 'moment/locale/ko';
import COLOR from "./styles/colors";

export function KDACalculator(kills: number = 0, deaths: number = 0, assists: number = 0, games: number = 0) {
    const kda = deaths === 0 ? 0 : ((kills + assists) / deaths).toFixed(2);
    const averageKillRate = (kills / games).toFixed(1);
    const averageDeathRate = (deaths / games).toFixed(1);
    const averageAssistRate = (assists / games).toFixed(1);
    let kdaTextColor = COLOR.BROWNISH_GREY;

    if (kda >= 5) {
        kdaTextColor = COLOR.YELLOW_OCHRE;
    } else if (kda >= 4) {
        kdaTextColor = COLOR.BLUISH;
    } else if (kda >= 3) {
        kdaTextColor = COLOR.BLUEY_GREEN;
    }

    return {
        kda,
        averageKillRate,
        averageDeathRate,
        averageAssistRate,
        kdaTextColor,
    }
}

export function getWinRateWithColor(wins: number = 0, games: number = 1) {
    const winRate = ((wins / games) * 100);
    const color = winRate >= 60 ? COLOR.REDDISH : COLOR.GREYNISH_BROWN;

    return {
        winRate: winRate.toFixed(),
        color,
        isChange: winRate >= 60,
    }
}

moment.updateLocale('ko', {
    relativeTime: {
        s: '방금',
        ss: '%d초',
        m: '1분',
        mm: '%d분',
        h: '1시간',
        hh: '%d시간',
        d: '하루',
        dd: '%d일',
        M: '한달',
        MM: '%d개월',
        y: '1년',
        yy: '%d년',
    },
});

export function ago(time: number) {
    const realTiem = time * 1000;

    if (moment(realTiem).diff(moment.now()) >= 0) {
        return '방금 전';
    }

    return moment(realTiem).fromNow();
}

export function getFileName(url: string) {
    const regUrl = new RegExp(/\/\w+(?=.png)/);
    const matchResult = url.match(regUrl);

    if (matchResult === null) return '';

    return matchResult[0].replace(/\//, '');
}

export function getItemDescription(url: string) {
    const itemCode = getFileName(url);
    const tempItemInfo = JSON.parse(localStorage.getItem('itemInfo') || '{}');
    return tempItemInfo?.data[itemCode] || {
        name: '',
        description: '',
    }
}

export function removeSpecialCharacter(keyword: string) {
    const regChar = new RegExp(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi);
    return keyword.replace(regChar, "");
}