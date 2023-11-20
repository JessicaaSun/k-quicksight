import moment from 'moment';

const dateAsurRaaFormatOnlyDate = 'YYYY-MM-DD';
export const getTrimIntoColumnOnlyDate = (
    dateString
) => {
    if (!dateString) {
        return '';
    }
    const date = moment(dateString).format(dateAsurRaaFormatOnlyDate);

    if (date === 'Invalid date') {
        return '';
    }
    return date;
};

export const getTrimIntoColumnOnlyTime = (
    dateString
) => {
    return moment(dateString).format('h:mm:ss a');
};

export const getTrimIntoColumnOnlyTimeWithoutSecond = (
    dateString
) => {
    return moment(dateString).format('h:mm a');
};

export const getTrimIntoColumnDateAndTime = (
    dateString
) => {
    return moment(dateString).format('YYYY-MM-DD h:mm:ss a');
};