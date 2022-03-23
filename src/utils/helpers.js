
export const displayAddress = (address) => {
    return `${address.substring(0, 4)} ... ${address.substring(39)}`;
};

export const getFormattedText = (value) => {
    value = value + '';
    if (value.length === 1) {
        return '0' + value;
    } else {
        return value;
    }
}