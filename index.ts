type PromiseFactory<T = any> = () => Promise<T>;

function applyAllFactories<T>(factories: Array<PromiseFactory<T>>): Promise<T[]> {
    return Promise.all(factories.map((factory) => factory()));
}

async function chunkify<T = any>(factories: Array<PromiseFactory<T>>, concurrency: number = 0): Promise<T[]> {
    if (!concurrency || concurrency < 0) {
        return applyAllFactories<T>(factories);
    }

    const chunksCount = Math.ceil(factories.length / concurrency)
        , results: T[] = [];

    let chunk: Array<PromiseFactory<T>>;

    for (let i = 0; i < chunksCount; i++) {

        chunk = factories.slice(i * concurrency, i * concurrency + concurrency);

        results.push.apply(results, await applyAllFactories<T>(chunk));
    }

    return results;
}

export { PromiseFactory };
export default chunkify;
