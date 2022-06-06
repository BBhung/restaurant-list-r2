# 我的餐廳清單
一個用Node.js和Express的簡易上手之餐廳清單

![Cover](https://github.com/BBhung/restaurant-list-r2/blob/main/restaurant-list-r2.png)

## 功能

． 使用者可在首頁查看所有餐廳
． 使用者可點擊觀看單一餐廳詳細資訊，如類別, 地址, 電話和敘述
． 使用者可用關鍵字名稱或類別查詢特定餐廳
．使用者可在首頁新增餐廳
．使用者可在首頁和詳細資訊更新餐廳資料
．使用者可在首頁和詳細資訊刪除餐廳資料

## 安裝流程

1. 開啟終端機，Clone此專案至本地電腦

```
   https://github.com/BBhung/movie-list.git
```

2.  透過終端機進入資料夾

```
cd movie-list
```

3. 安裝npm套件

```
npm install
```

4. 資料庫設定變數，輸入：

```
export MONGODB_URI="mongodb+srv://alpha_bb:campbb@cluster0.nmvskdu.mongodb.net/restaurant-list?retryWrites=true&w=majority" >> ~/.bash_profile
```

5. 安裝完畢後，繼續輸入：

```
npm run dev
```

6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

```
Express is running on localhost:
```

6. 若欲暫停使用(MAC)

```
control + c
```

## 使用工具

．Node.js 14.16.0
．Express 4.16.4
．Express-Handlebars 3.0.0
．Mongoose 5.9.7
