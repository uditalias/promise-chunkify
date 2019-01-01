type PromiseFactory<T = any> = () => Promise<T>;

interface IChunkifyOptions {
    concurrency?: number;
    delayAfterEachChunk?: number;
}

function applyAllFactories<T>(factories: Array<PromiseFactory<T>>): Promise<T[]> {
    return Promise.all(factories.map((factory) => factory()));
}

function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function chunkify<T = any>(factories: Array<PromiseFactory<T>>, options: IChunkifyOptions = {}): Promise<T[]> {

    const { concurrency, delayAfterEachChunk } = options;

    if (!concurrency || concurrency < 0) {
        return applyAllFactories<T>(factories);
    }

    const chunksCount = Math.ceil(factories.length / concurrency)
        , results: T[] = [];

    let chunk: Array<PromiseFactory<T>>, cursor: number;

    for (let i = 0; i < chunksCount; i++) {

        cursor = i * concurrency;

        chunk = factories.slice(cursor, cursor + concurrency);

        results.push.apply(results, await applyAllFactories<T>(chunk));

        if (delayAfterEachChunk) {
            await delay(delayAfterEachChunk);
        }
    }

    return results;
}

export { PromiseFactory, IChunkifyOptions };
export default chunkify;
