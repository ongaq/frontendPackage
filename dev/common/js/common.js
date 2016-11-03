(function($, cssua){
	let XXXXXX;
	const siteName = 'XXXXXX';
	const clickEvent = cssua.ua.desktop ? 'click' : 'tap';
	const a = 'is-active';
	const v = 'is-visible';

	XXXXXX = {
		va: {
			pathname: location.pathname,
			device: {
				desktop: 1024,
				sp: 768
			},
			window: {
				width: $(window).width(),
				height: $(window).height()
			}
		},
		localDecision: function(){
			var regExp = new RegExp(`(test\.${siteName}\.co\.jp|copre\.jp|localhost|192\.168\.0\.)`, 'g');
			return regExp.test(location.hostname);
		},
		localLoading: function(){
			var _this = this;
			// ローカル環境ならincludeをAjaxで読み込む
			var key = 'inc_';
			var ajaxArray = [];
			var ajaxArrayList = [];
			var i, j;
			var includeClass = document.querySelectorAll(`[class*="${key}"]`);
			var includeClassLen = includeClass.length;

			for(i=0; i < includeClassLen; i++) {
				var path = includeClass[i].innerHTML.split(' ')[1];
				ajaxArray.push(path);
			}
			var ajaxLen = ajaxArray.length;

			if(ajaxLen > 0) {
				for(i=0; i < ajaxLen; i++) {
					ajaxArrayList[i] = $.ajax({
						type: 'GET',
						url: ajaxArray[i]+'.html',
						dataType: 'html',
						timeout: 5000
					});
				}
				$.when.apply($, ajaxArrayList).done((...args) => {
					var regExp = new RegExp(key);

					for(i=0; i < args.length; i++) {
						var result = args[i];
						var position = $(result[0]).filter(':first').attr('class').split(' ');

						for(j=0; j < position.length; j++) {
							if(position[j].match(regExp)) {
								position = position[j];
								break;
							}
						}
						$('.'+position).html(result[0]).children().unwrap();

						console.log('Succeeded to read the include file!:', position);
					}
					_this.loadDelayScript();
				});
			} else {
				_this.loadDelayScript();
			}
		},
		nextToggle: function(){
			var _this = this;

			$('body').on(clickEvent, '.js-toggle', function(ev){
				var $this = $(this);
				var $next = $this.next('.js-toggleBlock');

				if($next.length > 0) {
					$this.toggleClass(v);
					$next.toggleClass(v);
				}
				ev.stopPropagation();
			});
			$('html').on(clickEvent, function(ev){
				var isTarget = $(ev.target).closest('.js-toggleBlock').length;
				var isClose = $(ev.target).closest('.no-close').length;

				if(isClose === 0 && isTarget === 0 && $('.js-toggle').hasClass(v)) {
					$('.js-toggle').removeClass(v);
					$('.js-toggleBlock').removeClass(v);
				}
			});
		},
		getQuery: function(){
			var vars = [];
			var hash = null;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		},
		easeScroll: function(){
			$('a[rel="scroll"]').on(clickEvent, (event) => {
				var speed = 1200;
				if(/#/.test(event.currentTarget.href)) {
					scrollToObject(event.currentTarget.href, speed);
				}
				return false;
			});
			function scrollToObject(_self, _speed){
				var hash = '#' + _self.split('#')[1];
				var pos = hash === '#pagetop' ? 0 : $(hash).offset().top;

				$('html,body').stop().animate({ scrollTop: pos }, _speed, 'easeOutExpo');
			}
		},
		loadDelayScript: function(){
			var _this = this;
			_this.easeScroll();
			_this.nextToggle();
		}
	};

	$(() => XXXXXX.localDecision() ? XXXXXX.localLoading() : XXXXXX.loadDelayScript());
})(window.jQuery, window.cssua);
