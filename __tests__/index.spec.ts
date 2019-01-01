import chunkify from "../index";

const resolver = (result: any, timeout: number = 0) => new Promise((resolve) => timeout ? setTimeout(() => resolve(result), timeout) : resolve(result));

describe('Promise Chunkify', () => {

    it('should run promises with concurrency', async () => {

        const results = await chunkify([
            () => resolver(1),
            () => resolver(2, 200),
            () => resolver(3),
        ], { concurrency: 1 });

        expect(results).toMatchSnapshot();
    });

    it('should delay between each chunk', async () => {

        const now = performance.now()
            , delay = 200
            , factories = [
                () => resolver(1),
                () => resolver(2),
                () => resolver(3),
            ];

        await chunkify(factories, { concurrency: 1, delayAfterEachChunk: delay });

        expect(performance.now() - now).toBeGreaterThanOrEqual(delay * factories.length);
    });
});