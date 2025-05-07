# Clover Server API Documentation

## Base URLs
- **Auth Routes**: `{base_url}/auth`
- **Data Routes**: `{base_url}/data`
- **Places Routes**: `{base_url}/places`

---

## Auth Routes (`{base_url}/auth`)

### `GET /`
**Description**: Check if a user exists by email.

**Query Parameters**:
- `email` (string, required): The email of the user to check.

**Responses**:
- `200 OK`: User found.
  ```json
  {
    "message": "User found"
  }
  ```
- `404 Not Found`: User not found.
  ```json
  {
    "message": "User not found"
  }
  ```

---

### `POST /login`
**Description**: Log in a user and retrieve their game history and stamps.

**Request Body**:
- `email` (string, required): The email of the user.

**Responses**:
- `200 OK`: User data retrieved successfully.
  ```json
  {
    "user_id": "string",
    "email": "string",
    "game_history": [/* game history data */],
    "stamps": [/* stamp data */]
  }
  ```
- `404 Not Found`: User not found.
  ```json
  {
    "error": "User not found",
    "typeError": "USER_NOT_FOUND"
  }
  ```

---

## Data Routes (`{base_url}/data`)

### `POST /`
**Description**: Add game data for a user.

**Request Body**:
- `code` (string, optional): The game code.
- `user_id` (string, optional): The user ID.
- `points` (number, required): The points scored.
- `time` (number, required): The time taken.
- `code_place_name` (string, required): The place name associated with the code.

**Responses**:
- `200 OK`: Game data added successfully.
  ```json
  {
    "message": "Game data added successfully",
    "gameDataId": "string"
  }
  ```
- `400 Bad Request`: Validation errors.
  ```json
  {
    "error": "Validation error message",
    "errors": ["Validation error details"],
    "typeError": "VALIDATION"
  }
  ```

---

### `POST /save`
**Description**: Save game data for a user by email and code.

**Request Body**:
- `email` (string, required): The email of the user.
- `code` (string, required): The game code.

**Responses**:
- `200 OK`: Game data saved successfully.
  ```json
  {
    "message": "Game data saved successfully",
    "gameDataId": "string"
  }
  ```
- `404 Not Found`: Game history not found.
  ```json
  {
    "error": "Game history not found",
    "typeError": "GAME_HISTORY_NOT_FOUND"
  }
  ```
---

## Places Routes (`{base_url}/places`)

### `GET /`
**Description**: get places information currently available

**Responses**:
- `200 OK`: Data fetched successfully.
  ```json
    {
        "message": "Places fetched successfully",
        "places":[/* places data */],
    }
  ```

## Notes
- Ensure that all required fields are provided in the request body.
- Validation errors will return a `400 Bad Request` response with details about the missing or invalid fields.
- Use the `{base_url}` placeholder to replace with your actual server URL.