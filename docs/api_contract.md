# API document for halala media

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
      "body": "string",
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

## Foundation API

### List Foundation Programs
- **GET** `/api/foundation/programs/`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "author": 1,
      "type": "child",
      "title": "One Child One Package",
      "description": "string",
      "image": "/media/foundation/example.jpg",
      "report_file": null,
      "is_active": true,
      "created_at": "2026-04-04T12:00:00Z",
      "updated_at": "2026-04-04T12:00:00Z"
    },
    ...
  ]
  ```

### Create Foundation Program
- **POST** `/api/foundation/programs/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Request:**
  ```json
  {
    "type": "child",
    "title": "One Child One Package",
    "description": "string",
    "image": "<uploaded_file>",
    "report_file": "<uploaded_file>",
    "is_active": true
  }
  ```
- **Response:**
  (same as list, with your values)

### Update/Delete Foundation Program
- **PUT/PATCH/DELETE** `/api/foundation/programs/{id}/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
  - 200 OK (for update)
  - 204 No Content (for delete)

---

### List Events
- **GET** `/api/foundation/events/`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "author": 1,
      "title": "Event Title",
      "date": "2026-04-04T18:00:00Z",
      "location": "string",
      "description": "string",
      "thumbnail": "/media/events/example.jpg",
      "created_at": "2026-04-04T12:00:00Z",
      "updated_at": "2026-04-04T12:00:00Z"
    },
    ...
  ]
  ```

### Create Event
- **POST** `/api/foundation/events/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Request:**
  ```json
  {
    "title": "Event Title",
    "date": "2026-04-04T18:00:00Z",
    "location": "string",
    "description": "string",
    "thumbnail": "<uploaded_file>"
  }
  ```
- **Response:**
  (same as list, with your values)

### Update/Delete Event
- **PUT/PATCH/DELETE** `/api/foundation/events/{id}/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
  - 200 OK (for update)
  - 204 No Content (for delete)

---

## Media Gallery API

### List Albums
- **GET** `/api/media/albums/`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Album Title",
      "description": "string",
      "cover_image": "/media/gallery/covers/example.jpg",
      "created_at": "2026-04-04T12:00:00Z"
    },
    ...
  ]
  ```

### Create Album
- **POST** `/api/media/albums/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Request:**
  ```json
  {
    "title": "Album Title",
    "description": "string",
    "cover_image": "<uploaded_file>"
  }
  ```
- **Response:**
  (same as list, with your values)

### Update/Delete Album
- **PUT/PATCH/DELETE** `/api/media/albums/{id}/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
  - 200 OK (for update)
  - 204 No Content (for delete)

---

### List Media Assets
- **GET** `/api/media/assets/`
- **Query Params:** `album` (optional)
- **Response:**
  ```json
  [
    {
      "id": 1,
      "album": 1,
      "title": "Media Title",
      "description": "string",
      "media_type": "image",
      "image_file": "/media/gallery/items/example.jpg",
      "story" : "",
      "video_url": "",
      "video_file": null,
      "is_featured": false,
      "created_at": "2026-04-04T12:00:00Z"
    },
    ...
  ]
  ```

### Create Media Asset
- **POST** `/api/media/assets/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Request:**
  ```json
  {
    "album": 1,
    "title": "Media Title",
    "description": "string",
    "media_type": "image",
    "image_file": "<uploaded_file>",
    "video_url": "",
    "video_file": null,
    "is_featured": false
  }
  ```
- **Response:**
  (same as list, with your values)

### Update/Delete Media Asset
- **PUT/PATCH/DELETE** `/api/media/assets/{id}/`
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
  - 200 OK (for update)
  - 204 No Content (for delete)

---

## Notes
- All authenticated endpoints require JWT access token in the `Authorization` header.
- File uploads (e.g., images, videos) should use multipart/form-data.
- Only the creator/author can update or delete their objects (if author field exists).
