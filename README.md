# Chunkify
## Run Promises with concurrency 

Like Promise.all, but with concurrency.

### Install
`npm install --save promise-chunkify`

### Usage

```javascript
import chunkify from "promise-chunkify";

(async () => {
    const results = await chunkify([
        () => returnsAPromiseWichResolvesTo(1),
        () => returnsAPromiseWichResolvedTo(2),
        () => returnsAPromiseWichResolvedTo(3)
    ], 1);

    console.log(results); // [1, 2, 3]
})();
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details