##Artillery GET Config:

```js
config:
  target: 'http://localhost:3007'
  phases:
    - duration: 180
      arrivalRate: 700
scenarios:
  - name: 'GET all recommended products'
    flow:
      - get:
          url: '/api/products/{{$randomNumber(1, 10000000)}}'

```

## GET Results

```sh
All virtual users finished
Summary report @ 14:16:25(-0800) 2019-03-08
  Scenarios launched:  126050
  Scenarios completed: 126050
  Requests completed:  126050
  RPS sent: 593.99
  Request latency:
    min: 4.4
    max: 316.5
    median: 8.2
    p95: 109.1
    p99: 216.3
  Scenario counts:
    GET all recommended products: 126050 (100%)
  Codes:
    200: 126050

```

---

##Artillery POST Config:

```js
config:
  target: 'http://localhost:3007'
  phases:
    - duration: 180
      arrivalRate: 700
scenarios:
  - name: 'POST all recommended products'
    flow:
      - post:
          url: '/api/products/{{$randomNumber(1, 10000000)}}'
          json:
            name: 'Product + {{$randomNumber(1, 10000000)}}'
            oldId: '{{$randomNumber(1, 10000000)}}'
            oldName: 'Product {{$randomNumber(1, 10000000)}}'
            newId: '{{$randomNumber(1, 10000000)}}'
            newName: 'Product {{$randomNumber(1, 10000000)}}'
```

## POST Results

```sh
All virtual users finished
Summary report @ 14:30:46(-0800) 2019-03-08
Scenarios launched: 126050
Scenarios completed: 126050
Requests completed: 126050
RPS sent: 696.18
Request latency:
min: 0.4
max: 110.6
median: 3.4
p95: 7.1
p99: 12.8
Scenario counts:
POST all recommended products: 126050 (100%)
Codes:
201: 126050
```
