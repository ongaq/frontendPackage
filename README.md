# frontendPackage
gulp�AHTML(ejs)�ACSS(SCSS)�AJS(ES2015)�ŏ�������z�肳�ꂽ�Č����n�߂�ɓ������Ă�����x�܂ŏ������ȈՓI�ɂ�����́B

# �@�\
- gulp
    - browserSync
    - EJS �� HTML
        - �p���������͕⏕
        - meta�^�O���͕⏕
    - SCSS �� CSS
        - �ėpmixin�Aclass�Ȃǂ̒�`
        - Media Queries packer (from gulp-pleeease)
        - autoprefixer (from gulp-pleeease)
        - styleguide (from [aigis](https://pxgrid.github.io/aigis/))
    - JavaScript minify
        - Babel
    - Desktop Notifications
    - �t�@�C��(ejs, scss, js)�Ď�
    - sprite�摜�쐬
    - SVG�t�H���g�쐬

# �����ݒ�
## gulp/config.js�̕ҏW

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
���p�p���ŕK���ݒ肷��(SVG�t�H���g���ȂǂɎg����)
- **browserSync**:  
Apache��VirtualHost�ƃZ�b�g�Ŏg�p����B  
proxy��httpd-vhosts.conf�Őݒ肵�����̂Ɠ����ɂ���B
- **ejs**:  
ejs�t�@�C����minify�O��js���i�[����ꏊ�B���Ɏw�肪������΃f�t�H���g�̂܂܂�OK�B
- **sass**:  
scss�t�@�C���̒u���ꏊ�B
- **font**:  
SVG�t�H���g�̒u���ꏊ�B�g��Ȃ��ꍇ�̓f�t�H���g�̂܂܂�OK�B
- **all**:  
���X�|���V�u�T�C�g�ȂǁA�ėp�I�ȃf�B���N�g���ݒ�̏ꍇ�͂��̂܂܂�OK�Bpc/sp�Ńy�[�W�𕪂���ꍇ�Ȃǂ�object�̃v���p�e�B��**all**����**pc**�ɕύX������H�v���K�v�B

## gulp/uglify.js�̕ҏW
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
minify������js�������ɔz�񂵂܂��B**`${path.all.js.concat}`**��config.js�Őݒ肵���p�X�ł��B
- **destFile**:  
minify��̃t�@�C������ݒ肵�܂��B���ʂȗ��R���Ȃ�����import.js�̂܂܂ɂ��ĉ������B(��q����.gitignore�Ȃǂɉe�������邽��)
- **destPath**:  
destFile�̏o�͐��ݒ肵�܂��B
- **name**:  
Desktop Notifications�ŕ\�������minify����JS�𑍏̂��閼�O�ł��B
- **babel**:  
�����l��`object`�ł���babel���g��Ȃ��ꍇ��`null`��ݒ肵�ĉ������B
    - **target**: �g�����X�p�C������Ώۂ�JS�ւ̃p�X���L�q���܂��B
    - **fileName**: �g�����X�p�C����̃t�@�C������ݒ肵�܂��B
    - **dest**: �g�����X�p�C����̏o�͐��ݒ肵�܂��B

# �^�X�N���s�R�}���h
- **`gulp`**:  
`gulp ejs`�A`gulp js`�A`gulp css`�A`gulp w`�����ԂɎ��s����B
- **`gulp ejs`**:  
EJS �� HTML�̃R���p�C�������s�B
- **`gulp js`**:  
JavaScript minify�̎��s
- **`gulp css`**:  
SCSS �� CSS�̃R���p�C�������s�B
- **`gulp w`**:  
�t�@�C���̊Ď���browserSync�����グ�����s�B

# EJS��HTML���쐬
## �p���������͕⏕
root�ɑ��݂���`/meta.json`���Q�Ƃ��A�I�u�W�F�N�g�̊K�w�\���ʂ�Ƀp���������o�͂��܂��B

```json:meta.json
"product": {
	"index": {
		"url": "/product/",
		"category_class": "product",
		"title": "���i��T���b�e�X�g�T�C�g",
		"breadcrumb": "���i��T��",
		"keywords": "���i,����",
		"description": "�@�\��ړI���珤�i��T���y�[�W�ł��B����`���̌����ŖړI�̏��i���X���[�Y�Ɍ������鎖���\�ł��B"
	}
},
```
- **breadcrumb**:  
`type:` string or object  

```js:string
"breadcrumb": "���i��T��",
```
���L��a�^�O��span�^�O��class���s�v�ȏꍇ�͏�L��string�Ŗ�薳���B
```js:object
"breadcrumb": {
	"title": "$�C�x���g����$",
	"item_class": " vn_url",
	"name_class": " vn_title_str"
},
```
- **title**:  
�p�������Ŏg����e�L�X�g����
- **item_class**:  
�p�������Ŏg���郊���N�����ł���`a`�^�O��class�w��i�O���ɗv���p�X�y�[�X�j
- **name_class**:  
�p�������Ŏg����e�L�X�g�����𕢂�`span`�^�O��class�w��i�O���ɗv���p�X�y�[�X�j

### �o�͎w����@
```js:index.ejs
<%- include(`${env.root}/common/partial/_loadMetaJson`, { array: ['product', 'index'] }) -%>
.
.
.
<%- include(`${env.root}/common/partial/_breadcrumb`) -%>
```
loadMetaJson�Ɋւ��Ă�[�R�`�����Q��](/posts/1633)
array�̔z��ŊK�w��\�����A`meta.json`�������̒ʂ�̃I�u�W�F�N�g�\���ɂȂ��Ă���΂��̒ʂ�Ƀp���������o�͂���B


## meta�^�O���͕⏕
```json
{
  "product": {
    "index": {
      "url": "/product/",
      "category_class": "product",
      "title": "���i���b�e�X�g�T�C�g",
      "keywords": "����̓L�[���[�h�ł�",
      "description": "����̓f�B�X�N���v�V�����ł�"
    }
  }
}
```

### �o�͎w����@
```js:index.ejs1�s��
<%- include(`${env.root}/common/partial/_loadMetaJson`, { array: ['product', 'index'] }) -%>
```
array�ŊK�w��\������B
��L�̏ꍇ��`/product/index.html`�Ƃ����ӂɂȂ�B
array�ɑ�������z��̒l�͌���**`�f�B���N�g����`**��������**`�t�@�C�����i�g���q�������j`**�Ƃ���B

```js:loadMetaJson.ejs
<%
pageDir = array;
page = null;
for(var i=0; i < pageDir.length; i++) {
	page = page ? page[pageDir[i]] : env.meta[pageDir[i]];
}
-%>
```
`pageDir`�͊e�y�[�W���ŕϐ��Ƃ��Ĉ�������global���B
���l��`page`��meta�����o�͂���ۂɈ�������global������B
for�����񂵁A�I�u�W�F�N�g���@���Ă���������J��Ԃ��A�Ō�̊K�w����̃I�u�W�F�N�g�ŕێ�����B

```json:�Ō�page�ɑ�������`�̃I�u�W�F�N�g
{
  "url": "/product/",
  "category_class": "product",
  "title": "���i���b�e�X�g�T�C�g",
  "keywords": "����̓L�[���[�h�ł�",
  "description": "����̓f�B�X�N���v�V�����ł�"
}
```

# sprite�摜�̍쐬
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
scss�t�@�C�����o�͂���t�H���_���w�肵�܂��B�w�肵���t�H���_�z���ɑ��݂���`include`�t�H���_�ɏo�͂���܂��B
- **rootPath**:  
CSS���sprite�摜��ǂݍ��ރp�X���w�肵�܂��B���ʂȗ��R���������胋�[�g�p�X���w�肵�ĉ������B
- **dest**:  
�������ꂽsprite�摜���o�͂���t�H���_�ł��B�܂����̃p�X�z���ɑ��݂���`sprites`�t�H���_��sprite�摜����铧��png���i�[���܂��B

`paths.all.image.dest`�Ŏw�肳�ꂽ�p�X�̔z����`/sprites/`�t�H���_���쐬���A���̒��ɓ���png���i�[���R�}���h�����s���鎖�ɂ����dest�t�H���_��`sprites.png`���쐬���܂��B
�o�͂���sprite�摜��Sass��ł̎w���`paths.all.sass`�Ŏw�肳�ꂽ�p�X�̔z���ɑ��݂���`include`�t�H���_��`_sprite.scss`���o�͂����̂ł�������Q�Ɖ������B
retina�Ή��p�ɔ{�����w�肷�邽�߂�mixin�Ȃǂ�������Ă��܂�( `@mixin r-sprite()` )

# SVG�t�H���g�̍쐬
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
���̃v���O�C���ƈႢ`all`�Ƃ������I�u�W�F�N�g�Ƀl�X�g���܂���B
SVG�t�H���g��pc��sp�Ȃǃf�o�C�X��킸���ʂŎg������́A�Ƃ����F������ł��B

- **siteName**:  
�t�H���g���Ɏg���܂��B(ex: testsite-fonts.eot)
- **sass**:  
scss�t�@�C�����o�͂���t�H���_���w�肵�܂��B�w�肵���t�H���_�z���ɑ��݂���`include`�t�H���_�ɏo�͂���܂��B
- **rootPath**:  
CSS��Ńt�H���g��ǂݍ��ރp�X���w�肵�܂��B���ʂȗ��R���������胋�[�g�p�X���w�肵�ĉ������B
- **dest**:  
�������ꂽ�t�H���g���o�͂���t�H���_�ł��B�܂����̃p�X�z���ɑ��݂���`concat`�t�H���_�Ƀt�H���g�����svg���i�[���܂��B

### SVG�t�@�C���ɂ���
�i�[�����svg�̃t�@�C�����́u`uEA01-*****.svg`, `uEA02-*****.svg`...�v��prefix��`uEA`�ƘA�Ԃ�K���t�^���ĉ������B`*****`�Ŏw�肵���t�@�C������font��scss�t�@�C�����mixin���쐬����AHTML��Ŏg�p����ۂɂ��p�����܂��B(ex: `<i class="icon icon-*****"></i>`)

�܂��A�쐬����svg�t�@�C����Illustrator��ō쐬����ꍇ�͕ό`�p�l����WH�̒l��傫���ق���**512px**�ɍ��킹�A�u�I�u�W�F�N�g�v���j���[�́u�A�[�g�{�[�h�v��I�����A�u�I���I�u�W�F�N�g�ɍ��킹��v�����s���Ă���A�[�g�{�[�h��**512x512(px)**�ɕK���L���č쐬���ĉ������B

# SCSS�t�@�C���̔ėp�N���X��mixin�ɂ���
## _helper.scss�ɂ���
�P�̂ŋ@�\����class���܂Ƃ߂Ă��܂��B(ex: margin-top�Ȃ�)
��{�I�ɂ�`!important`�w��͍s���܂���B
class�𑝂₷�ꍇ�͌�q����X�^�C���K�C�h�̋L�q�������č쐬���ĉ������B

## _parts.scss�ɂ���
�ėp�I��mixin��function���܂Ƃ߂Ă��܂��B(ex: MediaQueries�̋L�q�Z�kmixin�Ȃ�)

## _module.scss�ɂ���
���̃v���W�F�N�g���L�̎g���񂹂�class���܂Ƃ߂܂��B(ex: `h1`, `h2`�ȂǂŎg�p���錩�o���p�N���X�Ȃ�)
`.mod-*****`��prefix�ɂ�`mod`���g�p���܂��B
class�𑝂₷�ꍇ�͌�q����X�^�C���K�C�h�̋L�q�������č쐬���ĉ������B

# �X�^�C���K�C�h�̍쐬
[gulp-aigis](https://pxgrid.github.io/aigis/)�𗘗p���ăX�^�C���K�C�h���쐬���Ă��܂��B

```css
/*
---
name: block�̎w��
tag:
  - block
category:
  - helper
  - helper/block
---
�����ɐ������Ȃǂ�}�����܂��B
�����ɐ������Ȃǂ�}�����܂��B
�M�M�Mhtml
<div class="di_block">display: block;</div>
<div class="di_iblock">display: inline-block;</div>
<div class="di_inline">display: inline;</div>
<div class="di_none">display: none;</div>
�M�M�M
*/
.di_block { display: block;}
.di_iblock { display: inline-block;}
.di_inline { display: inline;}
.di_none { display: none;}
```
`/* �` */`�ŃR�����g�A�E�g���A���̒��ɕK�v�ȋL�q���������class���쐬���܂��B
`.scss`��ō쐬���A�R���p�C�����ɂ̓R�����g���폜����悤�ɂ��ĉ������B

�ׂ����ӏ���[�����̃h�L�������g](https://pxgrid.github.io/aigis/docs/jp/)���Q�Ɖ������B

# .gitignore�̑Ώۂɂ���
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
frontendPackage�ɂ����āA��{�I�Ƀ\�[�X�R�[�h�̂���肪�`�[���������Ɍ�����ꍇ��`source`�t�H���_�ɏo�͂����html�Acss�Ajs�t�@�C����**�R�~�b�g���Ȃ��B**�isprite��font�͏����j
�ƌ����̂͊e�X�̍�Ɗ��ɂ���ĉ��s�R�[�h�����ߍ��܂ꂽ��A�폜���ꂽ��Aminify���ʂ�������肷���Git�̃��O���S���Q�l�ɂȂ�Ȃ����߁B
�ŐV�̃t�@�C����pull���Ă�����Ɋe�X�ŃR���p�C������B
