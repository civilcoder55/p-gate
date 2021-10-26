## Headers

| Header key      | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `Authorization` | The authorized user’s token. This is used to gain access to protected endpoint. |

## API Endpoints

#### Merchant Endpoints

| Method | URL                          | Description                          |
| ------ | ---------------------------- | ------------------------------------ |
| `GET`  | `/api/merchant`              | Retrieve merchant basic details.     |
| `POST` | `/api/merchant`              | Create a new merchant.               |
| `GET`  | `/api/merchant/profile`      | Retrieve merchant all profile data.  |
| `GET`  | `/api/merchant/transactions` | Retrieve merchant transactions data. |

#### Apps Endpoints

| Method   | URL                       | Description                          |
| -------- | ------------------------- | ------------------------------------ |
| `GET`    | `/api/apps`               | Retrieve merchant apps.              |
| `POST`   | `api/apps`                | Create a new merchant app.           |
| `GET`    | `api/apps/:id`            | Retrieve merchant app details by id. |
| `PUT`    | `api/apps/:id`            | Update merchantapp details by id.    |
| `DELETE` | `api/apps/:id`            | Delete merchant app by id.           |
| `POST`   | `api/apps/:id/regenerate` | Regenerate merchant app secret key.  |

#### Auth Endpoints

| Method | URL               | Description                     |
| ------ | ----------------- | ------------------------------- |
| `POST` | `/api/auth/login` | Generate merchant access token. |

#### Checkout Endpoints

| Method | URL                     | Description                        |
| ------ | ----------------------- | ---------------------------------- |
| `POST` | `/api/checkout`         | Generate checkout session .        |
| `GET`  | `/api/checkout/:id`     | Retrieve checkout session details. |
| `POST` | `/api/checkout/:id/pay` | Make checkout payment.             |
