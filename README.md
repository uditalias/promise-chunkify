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
    ], { concurrency: 1 });

    console.log(results); // [1, 2, 3]
})();
```

### API
**chunkify(factories, options)**

| Name | Type | Required | Description |
| - | - | - | - |
| factories | Array | true | Array of factory methods wich returns a promise |
| options | Object | false | Chunkify options |

#### Options

##### concurrency  
Type: `number`

Define the concurrency chunk size, if not defined or 0 or negative value,
all promises will be resolved at once so just use `Promise.all([])` instead.

##### delayAfterEachChunk  
Type: `number`

Optional timeout (in milliseconds) to delay between each promises chunk

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details