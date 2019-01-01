import chunkify from "../index";

const resolver = (result: any, timeout: number = 0) => new Promise((resolve) => timeout ? setTimeout(() => resolve(result), timeout) : resolve(result));

describe('Promise Chunkify', () => {

    it('should run promises with concurrency', async () => {

        const past = performance.now()
            , delay = 100

        const results = await chunkify([
            () => resolver(1, delay),
            () => resolver(2, delay),
            () => resolver(3, delay),
        ], { concurrency: 1 });

        expect(results).toMatchSnapshot();
        expect(performance.now() - past).toBeGreaterThanOrEqual(300);
    });

    it('should run all promises without concurrency', async () => {

        const past = performance.now()
            , delay = 100;

        await chunkify([
            () => resolver(1, delay),
            () => resolver(2, delay),
            () => resolver(3, delay),
        ]);

        expect(performance.now() - past).toBeLessThanOrEqual(110);
    });

    it('should delay between each chunk', async () => {

        const past = performance.now()
            , delay = 200
            , factories = [
                () => resolver(1),
                () => resolver(2),
                () => resolver(3),
            ];

        await chunkify(factories, { concurrency: 1, delayAfterEachChunk: delay });

        expect(performance.now() - past).toBeGreaterThanOrEqual(delay * factories.length);
    });
});