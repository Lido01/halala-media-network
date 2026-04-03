# API Contract: Accounts & Content

## Accounts API

### Register
- **POST** `/api/accounts/register/`
- **Request:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string",
    "phone": "string"
  }
  ```
- **Response:**
  - 201 Created
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "string",
    "phone": "string",
    "is_editor": false,
    "profile_image": null
  }
  ```

---

### Login (JWT)
- **POST** `/api/accounts/login/`
- **Request:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - 200 OK
  ```json
  {
    "refresh": "<refresh_token>",
    "access": "<access_token>"
  }
  ```

---

### Refresh Token
- **POST** `/api/accounts/token/refresh/`
- **Request:**
  ```json
  {
    "refresh": "<refresh_token>"
  }
  ```
- **Response:**
  ```json
  {
    "access": "<access_token>"
  }
  ```

---

### User Profile
- **GET** `/api/accounts/profile/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "string",
    "phone": "string",
    "is_editor": false,
    "profile_image": null
  }
  ```

---

## Content API

### List Posts
- **GET** `/api/content/posts/`
- **Query Params:** `category` (optional)
- **Response:**
  ```json
  [
    {
      "id": 1,
      "category": "news",
      "title": "string",
      "slug": "string",
      "thumbnail": "/media/content/thumbs/example.jpg",
      "views_count": 0,
      "created_at": "2026-04-04T12:00:00Z"
    },
    ...
  ]
  ```

---

### Retrieve Post
- **GET** `/api/content/posts/{id}/`
- **Response:**
  ```json
  {
    "id": 1,
    "category": "news",
    "title": "string",
    "slug": "string",
    "thumbnail": "/media/content/thumbs/example.jpg",
    "body": "string",
    "author": 1,
    "views_count": 0,
    "is_featured": false,
    "is_published": true,
    "created_at": "2026-04-04T12:00:00Z",
    "updated_at": "2026-04-04T12:00:00Z"
  }
  ```

---

### Create Post
- **POST** `/api/content/posts/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Request:**
  ```json
  {
    "category": "news",
    "title": "string",
    "thumbnail": "<uploaded_file>",
    "body": "string",
    "is_featured": false,
    "is_published": true
  }
  ```
- **Response:**
  ```json
  {
    "id": 2,
    "category": "news",
    "title": "string",
    "slug": "string",
    "thumbnail": "/media/content/thumbs/example.jpg",
    "body": "string",
    "author": 1,
    "views_count": 0,
    "is_featured": false,
    "is_published": true,
    "created_at": "2026-04-04T12:00:00Z",
    "updated_at": "2026-04-04T12:00:00Z"
  }
  ```

---

### Update Post
- **PUT/PATCH** `/api/content/posts/{id}/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Request:**
  ```json
  {
    "category": "news",
    "title": "string",
    "thumbnail": "<uploaded_file>",
    "body": "string",
    "is_featured": false,
    "is_published": true
  }
  ```
- **Response:**
  ```json
  {
    "id": 2,
    "category": "news",
    "title": "string",
    "slug": "string",
    "thumbnail": "/media/content/thumbs/example.jpg",
    "body": "string",
    "author": 1,
    "views_count": 0,
    "is_featured": false,
    "is_published": true,
    "created_at": "2026-04-04T12:00:00Z",
    "updated_at": "2026-04-04T12:00:00Z"
  }
  ```

---

### Delete Post
- **DELETE** `/api/content/posts/{id}/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
  - 204 No Content

---

## Notes
- All authenticated endpoints require JWT access token in the `Authorization` header.
- Only the author of a post can update or delete it.
- File uploads (e.g., `thumbnail`, `profile_image`) should use multipart/form-data.
