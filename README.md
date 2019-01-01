# Chunkify
## Run Promises with concurrency 

Like Promise.all, but with concurrency.

<p>
  <a href="https://travis-ci.org/uditalias/promise-chunkify"><img alt="Travis Status" src="https://img.shields.io/travis/uditalias/promise-chunkify/master.svg?label=build&maxAge=43200"></a>
  <a href="https://www.npmjs.com/package/promise-chunkify"><img alt="NPM Version" src="https://img.shields.io/npm/v/promise-chunkify.svg?maxAge=43200"></a>
<img alt="Depencencies" src="https://img.shields.io/badge/dependency-free-ff69b4.svg?maxAge=43200">
  <a href="https://github.com/uditalias/promise-chunkify/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/uditalias/promise-chunkify.svg?label=license&maxAge=43200"></a>
</p>

---

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

Define the concurrency chunk size, if not defined, 0 or negative value,
all promises will be resolved at once so just use `Promise.all([])` instead.

##### delayAfterEachChunk  
Type: `number`

Optional timeout (in milliseconds) to delay between each promises chunk

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details