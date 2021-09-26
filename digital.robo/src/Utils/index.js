module.exports.PegarDataHoraAtual = () => {

    let date = new Date();
    let day = date.getDate();
    let month = (date.getMonth() + 1);
    let year = date.getFullYear();
    let hour = date.getHours();

    return new Date(year, month, day, hour, 00, 00, 00)
}

module.exports.PegarDataHoraAtualToString = () => {

    let date = new Date();
    let day = date.getUTCDate() <= 9 ? `${0 + date.getUTCDate().toString()}` : date.getUTCDate().toString();
    let month = (date.getUTCMonth() + 1);
    let formattedMonth = month <= 9 ? `${0 + month.toString()}` : month.toString();
    let year = date.getUTCFullYear();
    let hour = date.getUTCHours() <= 9 ? `${0 + date.getUTCHours().toString()}` : date.getUTCHours().toString();


    return `${year}-${formattedMonth}-${day} ${hour}:00:00`

}

module.exports.ConvertTimeSpanInDateTime = timespan => {


    let date = new Date(timespan * 1000);
    let day = date.getDate();
    let month = (date.getMonth() + 1);
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return new Date(year, month, day, hour, minutes, seconds)
}

module.exports.ConvertTimeSpanInDateTimeString = timespan => {


    let date = new Date(timespan * 1000);
    let day = date.getDate() <= 9 ? `${0 + date.getDate().toString()}` : date.getDate().toString();
    let month = (date.getMonth() + 1);
    let formattedMonth = month <= 9 ? `${0 + month.toString()}` : month.toString();
    let year = date.getFullYear();
    let hour = date.getHours() <= 9 ? `${0 + date.getHours().toString()}` : date.getHours().toString();
    let minutes = date.getMinutes() <= 9 ? `${0 + date.getMinutes().toString()}` : date.getMinutes().toString();
    let seconds = date.getSeconds() <= 9 ? `${0 + date.getSeconds().toString()}` : date.getSeconds().toString();

    return `${year}-${formattedMonth}-${day} ${hour}:${minutes}:${seconds}`
}


module.exports.ConvertSecondsToTime = seconds => {
    let hrs = ~~(seconds / 3600);
    let mins = ~~((seconds % 3600) / 60);
    let secs = ~~seconds % 60;

    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}