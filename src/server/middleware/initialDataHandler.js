const prefetchApi = async (route, req) => {
    const keys = Object.keys(route.initialData);
    const requests = Object.values(route.initialData).map(promise => {
        // TODO : make this more flexible
        if (route.path === '/notes/:id') {
            const split = req.url.split('/');
            const param = split[split.length - 1];
            return promise(param);
        }
        return promise();
    });

    const initialData = {};

    return Promise.all(requests)
        .then(res => {
            res.forEach((data, i) => {
                initialData[keys[i]] = data;
            });

            return initialData;
        })
        .catch(err => {
            return err.response.data;
        });
};

export default async (route, req) => {
    const preloadedState = route.initialData
        ? await prefetchApi(route, req)
        : null;
    return preloadedState;
};
