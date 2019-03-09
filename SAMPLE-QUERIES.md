# Sample Database Queries

> This document previews the two most common database queries to be performed for the product carousel module. PostgreSQL and MongoDB were considered.

## PostgreSQL

#### Get All Recommended Products

This query is performed on page load to fetch data for all products that are recommended for the currently viewed item.

Query: Get all information on products recommended for Product 1.

```sh
select products.* from products, recs where recs.product_id = 1 and recs.rec_id = products.id;
```

Result: All data on products recommended for Product 1 is returned.

```sh
   id    |      name       |  category   | price | avg_review | review_count | is_prime |             image             |        manufacturer
---------+-----------------+-------------+-------+------------+--------------+----------+-------------------------------+----------------------------
    4444 | Product 4444    | wearables   |    50 |          3 |          127 | f        | http://lorempixel.com/640/480 | Pagac - Stracke
 2864644 | Product 2864644 | wearables   |    39 |        3.5 |          128 | t        | http://lorempixel.com/640/480 | Pacocha Group
 8930255 | Product 8930255 | bath        |    16 |        4.5 |           63 | t        | http://lorempixel.com/640/480 | Kiehn, Labadie and Larson
 5006329 | Product 5006329 | toys        |    61 |        2.5 |           56 | f        | http://lorempixel.com/640/480 | Ankunding - Adams
 3525058 | Product 3525058 | food        |    44 |        3.5 |           65 | f        | http://lorempixel.com/640/480 | Bernhard - Jakubowski
 1497785 | Product 1497785 | bath        |    35 |        3.5 |            0 | t        | http://lorempixel.com/640/480 | Strosin LLC
 5810181 | Product 5810181 | electronics |    50 |          3 |          106 | f        | http://lorempixel.com/640/480 | Schroeder - Emmerich
 4243264 | Product 4243264 | wearables   |    21 |        4.5 |           14 | t        | http://lorempixel.com/640/480 | Kuhic - Hilll
 8345691 | Product 8345691 | electronics |    73 |          2 |          200 | f        | http://lorempixel.com/640/480 | Denesik Inc
 1849302 | Product 1849302 | beauty      |    83 |        1.5 |            9 | f        | http://lorempixel.com/640/480 | Stiedemann - Blanda
 5196278 | Product 5196278 | food        |    32 |          4 |          163 | t        | http://lorempixel.com/640/480 | Bauch Inc
 7913217 | Product 7913217 | board games |    15 |        4.5 |           14 | t        | http://lorempixel.com/640/480 | Sipes - Harvey
 1288062 | Product 1288062 | beauty      |    80 |        1.5 |          230 | f        | http://lorempixel.com/640/480 | Ankunding Group
 8192350 | Product 8192350 | jewelry     |    53 |          3 |           34 | f        | http://lorempixel.com/640/480 | Gulgowski - Cruickshank
 2988068 | Product 2988068 | food        |    47 |          3 |          102 | f        | http://lorempixel.com/640/480 | Kilback - Hilll
 2293097 | Product 2293097 | board games |    41 |        3.5 |          189 | f        | http://lorempixel.com/640/480 | Gottlieb and Sons
  891333 | Product 891333  | outdoor     |     8 |          5 |           21 | t        | http://lorempixel.com/640/480 | Wisozk, Nitzsche and Bruen
 7182274 | Product 7182274 | wearables   |     7 |          5 |          113 | t        | http://lorempixel.com/640/480 | Dickinson Inc
 4007572 | Product 4007572 | beauty      |    38 |        3.5 |          220 | t        | http://lorempixel.com/640/480 | Gibson - Harvey
 3215383 | Product 3215383 | outdoor     |    35 |        3.5 |           98 | t        | http://lorempixel.com/640/480 | Kunde - Gorczany
(20 rows)

```

#### Update Recommendation

This query is performed intermittently by a recommendations team. It will replace one currently recommended product id with a more relevant selection.

Query: For Product 10 Million, update one recommended id from 4444 to 9999.

```sh
update recs set rec_id = 4444 where product_id = 5000000 and rec_id = 5585886;
```

Result: Product 5 Million now has 4444 as a recommended product id.

```sh
UPDATE 1
Time: 9.783 ms
carousel=> select * from recs where product_id = 5000000;
    id     | product_id | rec_id
-----------+------------+---------
  99999990 |    5000000 |    4444
  99999981 |    5000000 | 4058149
  99999982 |    5000000 | 4918094
  99999983 |    5000000 | 8686053
  99999984 |    5000000 | 5200900
  99999985 |    5000000 | 2724430
  99999986 |    5000000 | 7086156
  99999987 |    5000000 | 8790760
  99999988 |    5000000 | 3549060
  99999989 |    5000000 | 7569323
  99999991 |    5000000 | 8212462
  99999992 |    5000000 | 5491479
  99999993 |    5000000 | 4920379
  99999994 |    5000000 | 4414475
  99999995 |    5000000 | 9152617
  99999996 |    5000000 | 6206682
  99999997 |    5000000 | 3932245
  99999998 |    5000000 | 4906894
  99999999 |    5000000 | 4903090
 100000000 |    5000000 | 1691442
(20 rows)

```

## Mongo

#### Get All Recommended Products

This query is performed on page load to fetch data for all products that are recommended for the currently viewed item.

Query: Get all information on products recommended for Product 1.

```sh
db.products.find({id: {$in: db.products.find({id: 1}, {recs: 1, _id: 0})[0].recs} })
```

Result: All data on products recommended for Product 1 is returned.

```sh
{ "_id" : ObjectId("5c7c8e898e79443c0e98ee2e"), "id" : 4444, "name" : "Product 4444", "category" : "wearables", "price" : "44.00", "avg_review" : 3, "review_count" : 213, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Rolfson and Sons", "recs" : [ 3940554, 7106430, 2501081, 4198732, 4351783, 3012451, 4852674, 4801916, 1346273, 3121755, 3338828, 2028955, 2419485, 2038290, 1261936, 6580620, 1275997, 736794, 5638700, 3869841 ] }
{ "_id" : ObjectId("5c7c8e8a8e79443c0e9a1452"), "id" : 79669, "name" : "Product 79669", "category" : "toys", "price" : "45.00", "avg_review" : 3, "review_count" : 150, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Dooley - Wehner", "recs" : [ 3991186, 4983508, 4581185, 1668575, 1992953, 3471647, 8724425, 1408495, 3954708, 669911, 508927, 1953675, 2915397, 6361074, 688500, 1270416, 2526158, 3319413, 4356792, 2268487 ] }
{ "_id" : ObjectId("5c7c8e8b8e79443c0e9a6bb5"), "id" : 102018, "name" : "Product 102018", "category" : "food", "price" : "51.00", "avg_review" : 3, "review_count" : 80, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Schuster, Koelpin and Satterfield", "recs" : [ 4648440, 2655832, 1851427, 5185397, 1056913, 5884150, 284770, 2177990, 6231637, 338743, 2240985, 3900908, 6554914, 2766547, 2587856, 4787762, 2047102, 7084613, 1100466, 580145 ] }
{ "_id" : ObjectId("5c7c8e8f8e79443c0e9fc5cd"), "id" : 452411, "name" : "Product 452411", "category" : "electronics", "price" : "45.00", "avg_review" : 3, "review_count" : 45, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Crist, Hodkiewicz and Jones", "recs" : [ 4005473, 1507409, 8455351, 5301334, 2971598, 2982769, 759441, 42874, 1813346, 1072500, 9092554, 1129939, 7894519, 1612610, 1764498, 1182588, 1056917, 3711632, 6822046, 6466413 ] }
{ "_id" : ObjectId("5c7c8e928e79443c0ea2cb08"), "id" : 650159, "name" : "Product 650159", "category" : "toys", "price" : "8.00", "avg_review" : 5, "review_count" : 64, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Bartoletti - Russel", "recs" : [ 263601, 2120241, 1759018, 6397096, 1747254, 982109, 3922419, 174130, 106849, 1342633, 3114265, 2480375, 283839, 400839, 3119682, 5898577, 4354857, 2667070, 1917055, 2867422 ] }
{ "_id" : ObjectId("5c7c8e978e79443c0ea738df"), "id" : 940133, "name" : "Product 940133", "category" : "outdoor", "price" : "53.00", "avg_review" : 3, "review_count" : 23, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Robel - Jenkins", "recs" : [ 4809683, 772909, 6656603, 6784758, 8783888, 2587645, 994772, 1980847, 7745276, 6409205, 5499163, 330727, 5858015, 1032404, 3059872, 1414838, 6471761, 4651624, 549171, 1463715 ] }
{ "_id" : ObjectId("5c7c8e9f8e79443c0eac970d"), "id" : 1291570, "name" : "Product 1291570", "category" : "jewelry", "price" : "57.00", "avg_review" : 2.5, "review_count" : 188, "is_prime" : false, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Hintz and Sons", "recs" : [ 5188110, 6253038, 9467, 345717, 3169968, 8118416, 759937, 9269830, 1473840, 4240701, 8101489, 7070148, 515012, 2371607, 8852512, 8727136, 658664, 572492, 2826965, 351290 ] }
{ "_id" : ObjectId("5c7c8eaf8e79443c0eb8b295"), "id" : 2084255, "name" : "Product 2084255", "category" : "bath", "price" : "53.00", "avg_review" : 3, "review_count" : 112, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Reynolds, Davis and Herman", "recs" : [ 4752339, 3746653, 890022, 671387, 6109471, 831750, 1981434, 1032429, 8000249, 2040824, 325483, 5455231, 677903, 7544353, 4997410, 661190, 5175161, 4181022, 5640119, 8351764 ] }
{ "_id" : ObjectId("5c7c8eb48e79443c0ebc10e8"), "id" : 2304790, "name" : "Product 2304790", "category" : "jewelry", "price" : "12.00", "avg_review" : 4.5, "review_count" : 83, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Gleason, Larson and Murray", "recs" : [ 688450, 2783269, 3069652, 457917, 2455827, 2445248, 2992554, 406837, 5554902, 1225303, 5521033, 2929153, 2297101, 6401572, 4658133, 6384374, 7344381, 4475275, 3192363, 893514 ] }
{ "_id" : ObjectId("5c7c8eb98e79443c0ec0261c"), "id" : 2572092, "name" : "Product 2572092", "category" : "beauty", "price" : "39.00", "avg_review" : 3.5, "review_count" : 33, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Ruecker LLC", "recs" : [ 3416811, 1088919, 870058, 4801394, 999453, 7323979, 685901, 301303, 1025547, 3934981, 3645139, 2557360, 6794083, 2090449, 176578, 4446934, 3651304, 797284, 1222672, 804939 ] }
{ "_id" : ObjectId("5c7c8ebf8e79443c0ec47338"), "id" : 2853694, "name" : "Product 2853694", "category" : "wearables", "price" : "96.00", "avg_review" : 1, "review_count" : 204, "is_prime" : false, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Johnston, Rohan and Sipes", "recs" : [ 9147084, 6785125, 4870209, 3423309, 4139983, 2786426, 2709689, 3571590, 1124141, 515113, 968629, 1038628, 3015043, 4247386, 709037, 1088805, 1700794, 6378388, 876896, 1382276 ] }
{ "_id" : ObjectId("5c7c8ece8e79443c0ece8110"), "id" : 3511941, "name" : "Product 3511941", "category" : "electronics", "price" : "26.00", "avg_review" : 4, "review_count" : 20, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Connelly, Kutch and Rowe", "recs" : [ 2089790, 675836, 7249657, 7727690, 1674342, 1276089, 6698610, 1198530, 1721228, 2436459, 5890083, 3142595, 7842639, 5800545, 2966139, 6777412, 3933944, 1876554, 2431784, 2451969 ] }
{ "_id" : ObjectId("5c7c8ed08e79443c0ecfa8a1"), "id" : 3587533, "name" : "Product 3587533", "category" : "outdoor", "price" : "20.00", "avg_review" : 4.5, "review_count" : 39, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Abernathy, Ledner and Anderson", "recs" : [ 1527916, 1298742, 459055, 4064330, 179322, 2633712, 2231403, 1508819, 8270102, 987728, 2482033, 1757858, 2677407, 571414, 1552512, 1487516, 3739325, 2672408, 893366, 1662257 ] }
{ "_id" : ObjectId("5c7c8ed38e79443c0ed10530"), "id" : 3676671, "name" : "Product 3676671", "category" : "electronics", "price" : "31.00", "avg_review" : 4, "review_count" : 192, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Gusikowski - Wunsch", "recs" : [ 2626846, 6413303, 5712256, 292912, 629220, 1576605, 845582, 4047445, 1170091, 7260836, 2265273, 2184989, 2716657, 7694706, 2753218, 8039398, 219961, 5605762, 1348189, 1043340 ] }
{ "_id" : ObjectId("5c7c8ef28e79443c0ee1831b"), "id" : 4756399, "name" : "Product 4756399", "category" : "toys", "price" : "9.00", "avg_review" : 5, "review_count" : 164, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Wolf and Sons", "recs" : [ 421476, 5181566, 3112749, 2541570, 919661, 3459992, 2123769, 2599848, 4267810, 3452247, 911359, 6714868, 3059649, 6335013, 2595129, 792565, 1516605, 4723836, 5935533, 2547246 ] }
{ "_id" : ObjectId("5c7c8ef48e79443c0ee32843"), "id" : 4864106, "name" : "Product 4864106", "category" : "clothing", "price" : "53.00", "avg_review" : 3, "review_count" : 112, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Stark - Zboncak", "recs" : [ 4830819, 3746649, 588027, 7799389, 2310708, 959446, 1273749, 142572, 8545568, 5727886, 5786819, 65700, 561892, 1968978, 4047276, 356981, 1118005, 27667, 3291670, 1496737 ] }
{ "_id" : ObjectId("5c7c8ef58e79443c0ee39060"), "id" : 4890737, "name" : "Product 4890737", "category" : "board games", "price" : "41.00", "avg_review" : 3.5, "review_count" : 134, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Pfeffer - Daugherty", "recs" : [ 3619535, 4461406, 1491697, 1228840, 2792369, 1989377, 4443908, 5870984, 950513, 6972933, 1028465, 5627598, 7206265, 5853123, 1167144, 6763156, 331976, 4626753, 6462445, 4262043 ] }
{ "_id" : ObjectId("5c7c8eff8e79443c0ee9e141"), "id" : 5304240, "name" : "Product 5304240", "category" : "jewelry", "price" : "38.00", "avg_review" : 3.5, "review_count" : 139, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Bernier Group", "recs" : [ 3293847, 4624885, 5389564, 3915607, 2968535, 942323, 2841661, 953815, 3765403, 767153, 5751728, 14441, 205068, 3324567, 3528141, 53906, 2411738, 4264623, 1138447, 5034510 ] }
{ "_id" : ObjectId("5c7c8f038e79443c0eec7a2e"), "id" : 5474289, "name" : "Product 5474289", "category" : "toys", "price" : "48.00", "avg_review" : 3, "review_count" : 45, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Konopelski - Upton", "recs" : [ 4312971, 1503579, 1430158, 4036301, 1335943, 165927, 79912, 753496, 5416449, 6948809, 6736929, 3675954, 1301425, 3323573, 3989873, 581327, 1164624, 2587087, 2234867, 7795063 ] }
{ "_id" : ObjectId("5c7c8f138e79443c0ef61fe1"), "id" : 6105901, "name" : "Product 6105901", "category" : "electronics", "price" : "51.00", "avg_review" : 3, "review_count" : 33, "is_prime" : true, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Wehner - Kreiger", "recs" : [ 4606595, 1109985, 4895716, 408748, 871034, 1547215, 3977593, 2179154, 2695630, 3958633, 3745521, 8103653, 890902, 8535350, 550437, 7029980, 4533174, 430171, 40589, 28475 ] }

```

#### Update Recommendation

This query is performed intermittently by a recommendations team. It will replace one currently recommended product id with a more relevant selection.

Query: For Product 10 Million, update one recommended id from 4444 to 9999.

```sh
db.products.updateOne({id: 10000000, name: "Product 10000000", recs: { $eq: 4444}}, { $set: { "recs.$[element]": 9999 }}, { arrayFilters: [{ "element": { $eq: 4444 } }] })
```

Result: Product 10 Million now has 9999 as a recommended product id.

```sh
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.products.find({id: 10000000})
{ "_id" : ObjectId("5c7c8f6b8e79443c0e319a74"), "id" : 10000000, "name" : "Product 10000000", "category" : "jewelry", "price" : "56.00", "avg_review" : 2.5, "review_count" : 133, "is_prime" : false, "image" : "http://lorempixel.com/640/480", "manufacturer" : "Aufderhar, Leffler and Aufderhar", "recs" : [ 5079297, 4431449, 5145616, 608076, 88458, 4567169, 2387012, 818107, 4060786, 9999, 1095233, 1917007, 2336486, 4275046, 1228930, 2771499, 2951552, 3106113, 3028403, 3418084 ] }
```
