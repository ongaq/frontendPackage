# frontendPackage
gulp、HTML(ejs)、CSS(SCSS)、JS(ES2015)で書く事を想定された案件を始めるに当たってある程度まで準備を簡易的にするもの。

# 機能
- gulp
    - browserSync
    - EJS → HTML
        - パンくず入力補助
        - metaタグ入力補助
    - SCSS → CSS
        - 汎用mixin、classなどの定義
        - Media Queries packer (from gulp-pleeease)
        - autoprefixer (from gulp-pleeease)
        - styleguide (from [aigis](https://pxgrid.github.io/aigis/))
    - JavaScript minify
        - Babel
    - Desktop Notifications
    - ファイル(ejs, scss, js)監視
    - sprite画像作成
    - SVGフォント作成

# 初期設定
## gulp/config.jsの編集

```js:config.js
siteName: 'testsite',
paths: {
	browserSync: {
		port: 1000, 
		proxy: 'test.xxxxx.co.jp'
	},
	ejs: 'dev',
	sass: 'sass',
	font: {
		rootPath: '/common/font',
		dest: 'source/common/font',
	},
	all: {
		css: 'source/common/css',
		sass: 'sass',
		image: {
			rootPath: '/common/images',
			dest: 'source/common/images',
		},
		js: {
			concat: 'dev/common/js',
			dest: 'source/common/js'
		}
	}
},
```
- **siteName**:  
半角英字で必ず設定する(SVGフォント名などに使われる)
- **browserSync**:  
ApacheのVirtualHostとセットで使用する。  
proxyはhttpd-vhosts.confで設定したものと同じにする。
- **ejs**:  
ejsファイルやminify前のjsを格納する場所。特に指定が無ければデフォルトのままでOK。
- **sass**:  
scssファイルの置き場所。
- **font**:  
SVGフォントの置き場所。使わない場合はデフォルトのままでOK。
- **all**:  
レスポンシブサイトなど、汎用的なディレクトリ設定の場合はこのままでOK。pc/spでページを分ける場合などはobjectのプロパティを**all**から**pc**に変更したり工夫が必要。

## gulp/uglify.jsの編集
```js:uglify.js
all: {
	concat: [
		`${path.all.js.concat}/jquery-3.1.1.js`,
		`${path.all.js.concat}/jquery-easing.1.3.js`,
		`${path.all.js.concat}/jquery.mobile-events.js`,
		`${path.all.js.concat}/cssua.js`,
		`${path.all.js.concat}/common.es5.js`
	],
	destFile: 'import.js',
	destPath: path.all.js.dest,
	name: 'all',
	babel: {
		target: `${path.all.js.concat}/common.js`,
		fileName: 'common.es5.js',
		dest: path.all.js.concat
	}
},
```
- **concat**:  
minifyしたいjsをここに配列します。**`${path.all.js.concat}`**はconfig.jsで設定したパスです。
- **destFile**:  
minify後のファイル名を設定します。特別な理由がない限りimport.jsのままにして下さい。(後述する.gitignoreなどに影響があるため)
- **destPath**:  
destFileの出力先を設定します。
- **name**:  
Desktop Notificationsで表示されるminifyするJSを総称する名前です。
- **babel**:  
初期値は`object`ですがbabelを使わない場合は`null`を設定して下さい。
    - **target**: トランスパイルする対象のJSへのパスを記述します。
    - **fileName**: トランスパイル後のファイル名を設定します。
    - **dest**: トランスパイル後の出力先を設定します。

# タスク実行コマンド
- **`gulp`**:  
`gulp ejs`、`gulp js`、`gulp css`、`gulp w`を順番に実行する。
- **`gulp ejs`**:  
EJS → HTMLのコンパイルを実行。
- **`gulp js`**:  
JavaScript minifyの実行
- **`gulp css`**:  
SCSS → CSSのコンパイルを実行。
- **`gulp w`**:  
ファイルの監視とbrowserSync立ち上げを実行。

# EJSでHTMLを作成
## パンくず入力補助
rootに存在する`/meta.json`を参照し、オブジェクトの階層構造通りにパンくずを出力します。

```json:meta.json
"product": {
	"index": {
		"url": "/product/",
		"category_class": "product",
		"title": "商品を探す｜テストサイト",
		"breadcrumb": "商品を探す",
		"keywords": "商品,検索",
		"description": "機能や目的から商品を探すページです。質問形式の検索で目的の商品をスムーズに検索する事が可能です。"
	}
},
```
- **breadcrumb**:  
`type:` string or object  

```js:string
"breadcrumb": "商品を探す",
```
下記のaタグやspanタグにclassが不要な場合は上記のstringで問題無い。
```js:object
"breadcrumb": {
	"title": "$イベント名称$",
	"item_class": " vn_url",
	"name_class": " vn_title_str"
},
```
- **title**:  
パンくずで使われるテキスト部分
- **item_class**:  
パンくずで使われるリンク部分である`a`タグのclass指定（前方に要半角スペース）
- **name_class**:  
パンくずで使われるテキスト部分を覆う`span`タグのclass指定（前方に要半角スペース）

### 出力指定方法
```js:index.ejs
<%- include(`${env.root}/common/partial/_loadMetaJson`, { array: ['product', 'index'] }) -%>
.
.
.
<%- include(`${env.root}/common/partial/_breadcrumb`) -%>
```
loadMetaJsonに関しては[コチラを参照](/posts/1633)
arrayの配列で階層を表現し、`meta.json`側もその通りのオブジェクト構造になっていればその通りにパンくずを出力する。


## metaタグ入力補助
```json
{
  "product": {
    "index": {
      "url": "/product/",
      "category_class": "product",
      "title": "製品情報｜テストサイト",
      "keywords": "これはキーワードです",
      "description": "これはディスクリプションです"
    }
  }
}
```

### 出力指定方法
```js:index.ejs1行目
<%- include(`${env.root}/common/partial/_loadMetaJson`, { array: ['product', 'index'] }) -%>
```
arrayで階層を表現する。
上記の場合は`/product/index.html`という意になる。
arrayに代入される配列の値は原則**`ディレクトリ名`**もしくは**`ファイル名（拡張子を除く）`**とする。

```js:loadMetaJson.ejs
<%
pageDir = array;
page = null;
for(var i=0; i < pageDir.length; i++) {
	page = page ? page[pageDir[i]] : env.meta[pageDir[i]];
}
-%>
```
`pageDir`は各ページ内で変数として扱うためglobal化。
同様に`page`もmeta情報を出力する際に扱うためglobal化する。
for文を回し、オブジェクトを掘っていき代入を繰り返し、最後の階層を一つのオブジェクトで保持する。

```json:最後pageに代入される形のオブジェクト
{
  "url": "/product/",
  "category_class": "product",
  "title": "製品情報｜テストサイト",
  "keywords": "これはキーワードです",
  "description": "これはディスクリプションです"
}
```

# sprite画像の作成
```js:config.js
all: {
	sass: 'sass',
	image: {
		rootPath: '/common/images',
		dest: 'source/common/images',
	},
}
```
- **sass**:  
scssファイルを出力するフォルダを指定します。指定したフォルダ配下に存在する`include`フォルダに出力されます。
- **rootPath**:  
CSS上でsprite画像を読み込むパスを指定します。特別な理由が無い限りルートパスを指定して下さい。
- **dest**:  
生成されたsprite画像を出力するフォルダです。またこのパス配下に存在する`sprites`フォルダにsprite画像を作る透過pngを格納します。

`paths.all.image.dest`で指定されたパスの配下に`/sprites/`フォルダを作成し、その中に透過pngを格納しコマンドを実行する事によってdestフォルダに`sprites.png`を作成します。
出力したsprite画像のSass上での指定は`paths.all.sass`で指定されたパスの配下に存在する`include`フォルダに`_sprite.scss`が出力されるのでそちらを参照下さい。
retina対応用に倍率を指定するためのmixinなども備わっています( `@mixin r-sprite()` )

# SVGフォントの作成
```js:config.js
siteName: 'testsite',
paths: {
	sass: 'sass',
	font: {
		rootPath: '/common/font',
		dest: 'source/common/font',
	},
},
```
他のプラグインと違い`all`といったオブジェクトにネストしません。
SVGフォントはpcやspなどデバイス問わず共通で使われるもの、という認識からです。

- **siteName**:  
フォント名に使われます。(ex: testsite-fonts.eot)
- **sass**:  
scssファイルを出力するフォルダを指定します。指定したフォルダ配下に存在する`include`フォルダに出力されます。
- **rootPath**:  
CSS上でフォントを読み込むパスを指定します。特別な理由が無い限りルートパスを指定して下さい。
- **dest**:  
生成されたフォントを出力するフォルダです。またこのパス配下に存在する`concat`フォルダにフォントを作るsvgを格納します。

### SVGファイルについて
格納されるsvgのファイル名は「`uEA01-*****.svg`, `uEA02-*****.svg`...」とprefixに`uEA`と連番を必ず付与して下さい。`*****`で指定したファイル名でfontのscssファイル上でmixinが作成され、HTML上で使用する際にも用いられます。(ex: `<i class="icon icon-*****"></i>`)

また、作成するsvgファイルをIllustrator上で作成する場合は変形パネルでWHの値を大きいほうを**512px**に合わせ、「オブジェクト」メニューの「アートボード」を選択し、「選択オブジェクトに合わせる」を実行してからアートボードを**512x512(px)**に必ず広げて作成して下さい。

# SCSSファイルの汎用クラスやmixinについて
## _helper.scssについて
単体で機能するclassをまとめています。(ex: margin-topなど)
基本的には`!important`指定は行いません。
classを増やす場合は後述するスタイルガイドの記述も併せて作成して下さい。

## _parts.scssについて
汎用的なmixinやfunctionをまとめています。(ex: MediaQueriesの記述短縮mixinなど)

## _module.scssについて
そのプロジェクト特有の使い回せるclassをまとめます。(ex: `h1`, `h2`などで使用する見出し用クラスなど)
`.mod-*****`とprefixには`mod`を使用します。
classを増やす場合は後述するスタイルガイドの記述も併せて作成して下さい。

# スタイルガイドの作成
[gulp-aigis](https://pxgrid.github.io/aigis/)を利用してスタイルガイドを作成しています。

```css
/*
---
name: blockの指定
tag:
  - block
category:
  - helper
  - helper/block
---
ここに説明文などを挿入します。
ここに説明文などを挿入します。
｀｀｀html
<div class="di_block">display: block;</div>
<div class="di_iblock">display: inline-block;</div>
<div class="di_inline">display: inline;</div>
<div class="di_none">display: none;</div>
｀｀｀
*/
.di_block { display: block;}
.di_iblock { display: inline-block;}
.di_inline { display: inline;}
.di_none { display: none;}
```
`/* ～ */`でコメントアウトし、その中に必要な記述をした後にclassを作成します。
`.scss`上で作成し、コンパイル時にはコメントを削除するようにして下さい。

細かい箇所は[公式のドキュメント](https://pxgrid.github.io/aigis/docs/jp/)を参照下さい。

# .gitignoreの対象について
```text:.gitignore
/.git
/.sass-cache
/node_modules
/bower_components
/source/common/js/import.js
/source/common/js/import.js.map
/styleguide
/source/styleguide
*.css
*.html
*.bat
*.db
*.dll
*.svn-base
*.md
*.mno
!/templates/**/*.css
!/templates/**/*.html
```
frontendPackageにおいて、基本的にソースコードのやり取りがチーム内だけに限られる場合は`source`フォルダに出力されるhtml、css、jsファイルは**コミットしない。**（spriteやfontは除く）
と言うのは各々の作業環境によって改行コードが埋め込まれたり、削除されたり、minify結果が違ったりするとGitのログが全く参考にならないため。
最新のファイルはpullしてきた後に各々でコンパイルする。
