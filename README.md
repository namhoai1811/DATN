# Cài đặt môi trường
- Cài đặt Java17 : https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
- Cài đặt công cụ Nodejs: https://nodejs.org/en/download
- Cài đặt các IDE (khuyến khích môi trường VS Code ( https://code.visualstudio.com/download) và Itelliji IDEA (https://www.jetbrains.com/idea/download/?section=windows)
# Cài đặt và chạy ứng dụng
- Clone repository :
  	```sh
  git clone https://github.com/namhoai1811/DATN.git
  	```
    ```sh
  cd DATN
	``
## Run BackEnd
```sh
- Chuột phải vào thư mục backend, chọn "open with Itelliji IDEA"
- Build project backend bằng công cụ Itelliji IDEA
- Itelliji IDEA sẽ tự động install thư viện bằng Maven
- Nhấn "run" chương trình backen
```
### Run BackEnd Nodejs ( FinSight )
#### Tạo môi trường env
- **Dùng venv** 
  - Tạo môi trường :
  ```sh
  python3 -m venv env
  ```
  - Active môi trường :
  
  *Window*
  ```sh
  env\Scripts\activate.bat
  ```
  *Linux*
  ```sh
  source env/bin/activate
  ```
  - Install thư viện :
  ```sh
  pip install -r requirements.txt
  ```
#### Run app
```sh
python app.y
```

## Run FrontEnd
```sh
cd WEB
```

- install package :
	```sh
	npm install
	```
- run reactjs frontend :
  	```sh
	npm start 
	```
## Brower show on localhost:3001

```sh
cd FE
```

- install package :
	```sh
	npm install
	```
- run nextjs frontend :
  	```sh
	npm run dev 
	```
## Brower show on localhost:3000
