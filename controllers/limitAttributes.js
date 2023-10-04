module.exports = (data, attributes) => {
    var newData = {};
    attributes.forEach((attribute) => {
        if (typeof data[attribute] !== "undefined") {
            newData[attribute] = data[attribute];
        }
    })
    return newData;
}