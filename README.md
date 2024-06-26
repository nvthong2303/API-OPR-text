# API Server
Đây là Server cung cấp ba API để đẩy dữ liệu mới hoàn toàn, đẩy thêm nhiều dòng vào data cũ và đọc toàn bộ data. Tất cả các API đều yêu cầu xác thực bằng Authorization trong header của mỗi request

### API Endpoints
#### Authorization
Tất cả các request API đều yêu cầu Authorization header:

```
Authorization: MI0GxEaeEWmdjvS2S8XFHb
```

#### POST /api/v1/update/:id
API cập nhật toàn bộ nội dung data bằng data mới được cung cấp trong body. Với data được đánh dấu là id (sử dụng số, VD: 1,2,3,4,5, ....)
ID là định dang của mỗi data khác nhau

- URL: http://localhost:3001/api/v1/update/:id
- Method: POST
- Headers:
    - Authorization: MI0GxEaeEWmdjvS2S8XFHb
- Body: Raw text (cho phép nhiều dòng)
##### Example Request:

```
curl -X POST http://localhost:3001/api/v1/update/1 \
-H "Authorization: MI0GxEaeEWmdjvS2S8XFHb" \
-H "Content-Type: text/plain" \
--data "This is the new content of the file."
```
##### Response:
```
{
  "message": "Updated successfully"
}
```


#### POST /api/v1/push/:id
API đẩy thêm data được cung cấp trong body của request vào cuối data đang có. Với data được đánh dấu là id (sử dụng số, VD: 1,2,3,4,5, ....)
ID là định dang của mỗi data khác nhau

- URL: http://localhost:3001/api/v1/push/:id
- Method: POST
- Headers:
    - Authorization: MI0GxEaeEWmdjvS2S8XFHb
- Body: Raw text (cho phép nhiều dòng)

##### Example Request:

```
curl -X POST http://localhost:3001/api/v1/push/1 \
-H "Authorization: MI0GxEaeEWmdjvS2S8XFHb" \
-H "Content-Type: text/plain" \
--data "This text will be appended to the file."
```
##### Response:

```
{
  "message": "Appended successfully"
}
```

#### GET /api/v1/read/:id
API đọc và trả về data theo ID đang có.
ID là định dang của mỗi data khác nhau

- URL: http://localhost:3001/api/v1/read/:id
- Method: GET
- Headers:
    - Authorization: MI0GxEaeEWmdjvS2S8XFHb

##### Example Request:

```
curl -X GET http://localhost:3001/api/v1/read/1 \
-H "Authorization: MI0GxEaeEWmdjvS2S8XFHb"
```

##### Response:

response sẽ là toàn bộ data đang có, ví dụ:

```
This is the new content of the file.
This text will be appended to the file.
```






