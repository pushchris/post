var dom = require('dom'),
    isArray = require('isArray');

module.exports = function(url, data, method) {
    if (method == null)
        method = 'POST';
    if (data == null)
        data = {};

    var form = dom('<form>').attr({
        method: method,
        action: url
     }).css({
        display: 'none'
     });

    var addData = function(name, data) {
        if (isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                addData(name + '[]', value);
            }
        } else if (typeof data === 'object') {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    addData(name + '[' + key + ']', data[key]);
                }
            }
        } else if (data != null) {
            form.append(dom('<input>').attr({
              type: 'hidden',
              name: String(name),
              value: String(data)
            }));
        }
    };

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            addData(key, data[key]);
        }
    }

    return form.appendTo('body');
}