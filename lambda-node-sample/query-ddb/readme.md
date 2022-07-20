# DynamoDBのクエリをLambdaで実装するサンプル
API Gateway + Lambda + DynamoDBの組み合わせにおいて
DynamoDBにqueryリクエストを発行してitemを取得してくるサンプルコード

## デプロイ手順

index.jsの内容をそのまま貼り付けてもらえれば動くはず



## その他注意

- 本コードはaws-sdk v2系を前提としてコードになっています。
aws-sdkの最新はv3であり、2系と書き方が結構異なります。
なお現状のdefaultバージョン(ver指定せずinstallする落ちてくるやつ)はv2系です。

- 元のソース(python)は無駄な処理が多かった(L20のop変数の判定部分など)
あまりpythonのソースを忠実にnodeに移植した感じになっていません。
