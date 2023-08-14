# tokped-play-clone
Project Description: A web application for sharing and viewing videos and related products.

## Features

- View a list of videos and their associated products.
- Click on a image in homepage to view its details video of products and associated products.
- Click 'Lihat produk' in detail product to open new tab that will direct you to the link product
- Search for products by title.

## How to Install & Run
1. Clone the repository
2. Go to a .env file and set the following environment variables of you want run locally, change this url to your server side url:
   ```
   VITE_CLIENT_URL=https://pear-thankful-llama.cyclic.app 
   ```
3. Install the required dependencies by running in terminal:
   ```
   npm install
   ```
   
4. Run the project by running this in terminal
   ```
   npm run dev
   ```
5. The Client should now be running locally on `http://localhost:5173`.

## Schema Database

The database for this API uses MongoDB as the backend database. It consists of three main collections:

1. **Video Collection**:
    - `videoId` (String): Unique identifier for each video.
    - `urlImageThumbnail` (String): URL of the video thumbnail image.
    - `embedYoutubeId` (String): ID of the YouTube video to embed for viewing.
    - `productName` (String): Name of the associated product.
    - `createdAt` (Number): Timestamp in milliseconds when the video was created.
    - `createdBy` (String): User who created the video.
    - `updatedAt` (Number): Timestamp in milliseconds when the video was last updated.
    - `updatedBy` (String): User who last updated the video.
```
{
  "videoId": "vid001",
  "urlImageThumbnail": "https://example.com/thumbnail1.jpg",
  "embedYoutubeId": "ZafrRDNNCR8",
  "productName": "Cool product",
  "createdAt": 1679874856000,
  "createdBy": "user123",
  "updatedAt": 1679988531000,
  "updatedBy": "user456"
}
```

2. **Product Collection**:
    - `videoId` (String): Identifier of the video associated with the product.
    - `productId` (String): Unique identifier for each product (UUID).
    - `linkProduct` (String): URL link to the product.
    - `title` (String): Title of the product.
    - `price` (Number): Price of the product.
    - `createdAt` (Number): Timestamp in milliseconds when the product was created.
    - `createdBy` (String): User who created the product.
    - `updatedAt` (Number): Timestamp in milliseconds when the product was last updated.
    - `updatedBy` (String): User who last updated the product.
```
{
  "videoId": "vid001",
  "productId": "1f6249b1-088e-4af4-a1c5-e6a9a4c1b362",
  "linkProduct": "https://www.example.com/product1",
  "title": "Sample Product 1",
  "price": 2000,
  "createdAt": 1679874856000,
  "createdBy": "user123",
  "updatedAt": 1679988531000,
  "updatedBy": "user456"
}
```

3. **Comment Collection**:
    - `videoId` (String): Identifier of the video associated with the comment.
    - `userName` (String): Username of the commenter.
    - `comment` (String): The comment text.
    - `createdAt` (Number): Timestamp in milliseconds when the comment was created.
    - `createdBy` (String): User who created the comment.
    - `updatedAt` (Number): Timestamp in milliseconds when the comment was last updated.
    - `updatedBy` (String): User who last updated the comment.
```
{
  "videoId": "vid001",
  "userName": "user789",
  "comment": "This is a great video!",
  "createdAt": 1679874856000,
  "createdBy": "user789",
  "updatedAt": 1679988531000,
  "updatedBy": "user789"
}
```
