# json-server
 Dummy JSON web api

Routes

|            Rote          | Method  | Status |
| :----------------------- |:-------:| ------:|
| /                        |  GET    |   200  |
| /posts                   |  GET    |   200  |
| /posts?skip=0&limit=10   |  GET    |   200  |
| /posts?title=sunset      |  GET    |   200  |
| /posts/1                 |  GET    |   201  |
| /posts                   |  POST   |   200  |
| /posts/1                 |  PUT    |   200  |
| /posts/1                 |  PATCH  |   200  |
| /posts/1                 |  DELETE |   204  |
| /reset                   |  DELETE |   204  |
