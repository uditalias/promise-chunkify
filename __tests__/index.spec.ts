import chunkify from "../index";

const resolver = (result: any, timeout: number = 0) => new Promise((resolve) => timeout ? setTimeout(() => resolve(result), timeout) : resolve(result));

describe('Promise Chunkify', () => {

    it('should run promises with concurrency', async () => {

        const results = await chunkify([
            () => resolver(1),
            () => resolver(2, 200),
            () => resolver(3),
        ], 1);

        expect(results).toMatchSnapshot();

    });
});