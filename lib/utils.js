module.exports = {
    format: function (params) {
        if (!params.current) {
            params.current = 1;
        }
        if (!params.size) {
            params.size = 10;
        }
        if (!params.type) {
            params.type = -1;
        }
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                if (key == "name")
                    continue;
                params[key] = parseInt(params[key] || 1);
            }
        }
        return params;
    }
}