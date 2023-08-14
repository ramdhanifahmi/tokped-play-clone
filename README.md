# tokped-play-clone
Project Description: A web application for sharing and viewing videos and related products.

## Features

- View a list of videos and their associated products.
- Click on a video to view its details and associated products.
- Search for products by title.



## Database Scheme

The database for this API uses MongoDB as the backend database. It consists of three main collections:

1. **Video Collection**:
    - `videoId` (String): Unique identifier for each video.
    - `urlImageThumbnail` (String): URL of the video thumbnail image.
    - `createdAt` (Number): Timestamp in milliseconds when the video was created.
    - `createdBy` (String): User who created the video.
    - `updatedAt` (Number): Timestamp in milliseconds when the video was last updated.
    - `updatedBy` (String): User who last updated the video.
```
{
  "videoId": "vid001",
  "urlImageThumbnail": "https://example.com/thumbnail1.jpg",
  "createdAt": 1679874856000,
  "createdBy": "user123",
  "updatedAt": 1679988531000,
  "updatedBy": "user456"
}
```

2. **Product Collection**:
    - `videoId` (String): Identifier of the video associated with the product.
    - `productId` (String): Unique identifier for each product.
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
  "productId": "product1",
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
