var API = {
    get: (params, after) => {
        var pString = '?'
        Object.keys(params).forEach(key => {
            pString += key + '=' + encodeURIComponent(params[key]) + '&';
        });
        fetch('https://api.mittaldev.com/scheduler/main' + pString.slice(0, -1))
            .then((response) => response.text()).then((response) => {
                response = JSON.parse(response);

                if (typeof response === 'string' && response.startsWith('ERRORG-')) {
                    after({
                        err: true,
                        message: response.replace('ERRORG-', ''),
                    });
                } else {
                    after(response);
                }
            })
            .catch((error) => {
                console.error('API GET Error: ' + error);
            });
    },

    post: (params, after) => {
        Object.keys(params).forEach(key => {
            if (typeof params[key] === 'string') {
                params[key] = encodeURIComponent(params[key]);
            }
        });
        fetch('https://api.mittaldev.com/scheduler/main', {
            method: 'POST',
            headers: {},
            body: JSON.stringify(params),
        }).then((response) => response.text()).then((response) => {
            response = JSON.parse(response);
            if (typeof response === 'string' && response.startsWith('ERRORG-')) {
                after({
                    err: true,
                    message: response.replace('ERRORG-', ''),
                });
            } else {
                after(response);
            }
        })
            .catch((error) => {
                console.error('API POST Error: ' + error);
            });;
    },
}

export default API;