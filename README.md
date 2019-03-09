# Product Advertisement Carousel

> This product page service displays recommended products which are relevant to the currently viewed item. Features include:

- A side-scrolling carousel with links to other products
- Tightly formatted displays of each product's name, thumbnail, and review data
- Consistent performance across screen resolutions
- Scaled and stress-tested database capable of handling webscale traffic
- API routes for a recommendation optimizer to collect user data and update product recommendations

## Related Projects

- https://github.com/marianas-blue/product-gallery.git
- https://github.com/marianas-blue/product-reviews.git
- https://github.com/marianas-blue/add-to-cart.git

## Table of Contents

1. [API](#API)
2. [Usage](#Usage)
3. [Requirements](#requirements)
4. [Development](#development)

## API

#### Get All Recommendations

> This call fetches information on all recommended products for rendering within the carousel upon page load.

- **URL**

  ```js
  /api/products/:id
  ```

- **Method: GET**

- **URL Params**

  **Required:**
  `id=[integer]`

- **Data Params**

  ```js
  {
    name: [string];
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
  - **Content:**

  ```js
  { "name": "Generic Steel Computer", "image": null, "price": "276.00", "category": "Automotive", "manufacturer": "Hoppe, Sporer and Fadel", "id": 1, "avgReview": "4.5", "reviewCount": 1428, "isPrime": false }
  ```

#### Post Client Click

> Upon the client clicking a recommended item, this call sends data about the event to another endpoint for future analysis.

- **URL**

  ```js
  /api/products/:id
  ```

- **Method: POST**

- **URL Params**

  **Required:**
  This id and name pertain to the item currently viewed in browser.
  `id=[integer]`

- **Data Params**
  This id and name pertain to the item which was clicked.

  ```js
  { name: [string], adId: [integer], adName: [string] }
  ```

- **Success Response:**

  - **Code:** 201 <br />
  - **Content:** `"Created"`

#### Update Recommendation

> This call allows another endpoint, such as a recommendation optimization server, to update one entry within one product's recommendations to a more relevant item.

- **URL**

  ```js
  /api/products/:id
  ```

- **Method: UPDATE**

- **URL Params**
  This id and name pertain to the item which will receive an updated recommendation.

  **Required:**
  `id=[integer]`

- **Data Params**
  This id and name pertain to the item which will no longer be a recommendation, and which item will replace it.

  ```js
  { name: [string], oldId: [integer], oldName: [string], newId: [integer], newName: [string] }
  ```

- **Success Response:**

  - **Code:** 204 <br />
  - **Content:** `[empty response]`

---

## Usage

## Requirements

1. Node v8.0 +
2. npm
3. postgreSQL

## Installing Dependencies

```sh
npm install
```

## Development

To run this program on your computer for development:

```sh
npm run seed
npm run dev-build
npm run dev-start
```

To build for production:

```sh
npm start
```
