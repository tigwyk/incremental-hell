import Vue from 'vue'

function numberFormat (value: number) {
    if (value == undefined) {
        return "";
    }
    return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function dateFormat (date: Date) {
    if (date == undefined) {
        return "";
    }

    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const month = new Intl.DateTimeFormat('en', {month: 'long'}).format(date);
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);

    const hours = date.getHours();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = date.getMinutes();
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${day} ${month} ${year} ${hoursString}:${minutesString}`;

}

function humanizeString (string: string) {
    if (string == undefined) {
        return "";
    }
    string = string.charAt(0).toUpperCase() + string.slice(1);
    string.replace("_", " ").replace("-", " ");
    return string;
}

function twoDigits (value: number) {
    return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
