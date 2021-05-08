# Name

MyEnglish　<br>
　
# Features

オリジナルのクイズが作れる英単語学習アプリ

▼ Demoはこちらです



Email: @email.com  
  
Password： 

　

### 現在の機能

- クイズを登録・編集・削除する機能
- クイズを出題する機能
- プロフィールの更新機能（名前、メールアドレス、パスワード、職業、性別、生年月日）
- ログイン機能
- ログアウト機能
- ユーザー登録機能　<br>
　
# Requirement

### 環境

- macOS Big Sur 11.0
- python(3.9.0)
- pip(21.0.1)
- Node(14.15.1)
- npm(6.14.8)  
　
### バックエンド
- Django (3.2)
- django-cors-headers (3.7.0)
- djangorestframework (3.12.4)
- djangorestframework-simplejwt (4.4.0)
- PyJWT (1.7.1)  
　
### フロントエンド
- react (17.0.2)
- react-scripts (4.0.3)
- react-dom (17.0.2)
- react-router-dom (5.2.0)
- redux (4.0.5)
- react-redux (7.2.3)
- redux-devtools-extension (2.13.9)
- redux-thunk (2.3.0)
- @material-ui/core (4.11.3)
- @material-ui/icons (4.11.2)
- @material-ui/lab (4.0.0-alpha.57)
- axios (0.21.1)
　
# Usage(Local環境)

1. MyEnglish をダウンロードする
```shell
$ git clone https://github.com/sijysn/MyEnglish.git
$ cd MyEnglish
```
　  

2. 仮想環境を構築する
```shell
MyEnglish $ pip install virtualenv
MyEnglish $ virtualenv myenv
MyEnglish $ source myenv/bin/activate #mac
```

　

注）　Windowsの場合はこちらを参照  

   https://qiita.com/daikidomon/items/03c82a61e3b3bef0e050  

　  

3. 必要なライブラリをインストールし、サーバを立てる
###### バックエンド

```shell
MyEnglish $ cd backend
backend $ pip install -r requirements.txt
backend $ python manage.py migrate
backend $ python manage.py runserver
```  
　
###### フロントエンド

```shell
MyEnglish $ cd frontend
frontend $ npm install
frontend $ npm start
```  
　  

4. URL にアクセスする  

   http://localhost:3000/#/register　<br>
　
# Note

今後やるべきこと

- レスポンシブデザイン
- 間違えた問題を元にクイズを作成する機能の追加
- スタイルの統一（style props, CSS, Material-UI の makeStyles など）
- テストを書く　<br>
　
# Author

- Seiji Yoshino
- sij.ysn25@gmail.com
