var dom = require('dom'),
    isArray = require('isArray');

module.exports = function(url, data, method) {
    if (method == null)
        method = 'POST';
    if (data == null)
        data = {};

    var form = document.createElement('form');
    dom(form)
        .attr('method', method)
        .attr('action', url);
    dom(form).css('display', 'none');

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
            var input = document.createElement('input');
            dom(input)
              .attr('type', 'hidden')
              .attr('name', String(name))
              .attr('value', String(data));
            dom(form).append(dom(input));
        }
    };

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            addData(key, data[key]);
        }
    }
    
    form.submit();
}