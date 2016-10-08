/**
 * @file Plugin pour transitions de pages au clique d'un bouton
 * @author Mikael Boutin
 * @version 0.0.1
 */
(function($) {
  'use strict';
  $.fn.materialTransitions = function(options, callback) {

    //this selector
    const $thisEl = $(this);

    // options
    const settings = {
      target: null,
      zIndex: 1,
      heightType: 'outerHeight', // height, innerHeight, outerHeight, full (window)
      widthType: 'outerWidth', // height, innerHeight, outerHeight, full (window)
      targetOverflow: 'parent', // parent, window, selector
      animationTime: 400,
      easing: 'linear',
      redirectFn: null, // fonction "spéciale" pour la redirection
    };

    // append the settings array to options
    if (typeof options === 'object') {
      $.extend(settings, options);
    } else if (typeof options === 'string') {
      switch (options) {
        case 'destroy': destroy(); break;
        case 're-init': destroy(init); break;
      }
    }

    if (typeof callback === "function") {
      callback();
    }

    if (typeof options === 'object' && $(settings.target).length <= 0) {
      console.error('You must provide a valid target.');
      return;
    }

    function init() {
      $thisEl.each(function() {
        const $self = $(this);

        $self.off('.mt').attr('data-materialTransitions', true);

        $self.on('click.mt', function(e) {
          e.preventDefault();

          const $target = defineTarget();

          $self.addClass('inTransition');
          const linkDestination = $self.attr('href');
          let btnZIndex = settings.zIndex;

          if ($target.css('zIndex') !== 'auto') {
            btnZIndex = parseInt($target.css('zIndex'));
          }

          stabilizeButton($self.css('zIndex', btnZIndex), () => {
            const targetOffset = $target.offset();
            let targetSize = getOverflow($target);

            let destWidth = (settings.widthType !== 'full')? $target[settings.widthType]() : $(window).outerWidth();
            let destHeight = (settings.heightType !== 'full')? $target[settings.heightType]() : $(window).outerHeight();

            if (settings.widthType !== 'full' && destWidth > targetSize.w) {
              destWidth = targetSize.w;
            }

            if (settings.heightType !== 'full' && destHeight > targetSize.h) {
              destHeight = targetSize.h;
            }

            $target.transition({
              opacity: 0,
            }, settings.animationTime, settings.easing);

            $self
              .css('boxShadow', '0px 0px 0px 0px rgba(255, 255, 255, 0)')
              .transition({
                top: targetOffset.top,
                left: targetOffset.left,
                width: destWidth,
                height: destHeight,
                borderRadius: 0,
              }, settings.animationTime, settings.easing, function () {
                if (typeof settings.redirectFn === 'function') {
                  settings.redirectFn(linkDestination);
                } else {
                  window.location.path = linkDestination;
                }
              });

            $self.find('*').transition({
              opacity: 0,
            }, settings.animationTime, settings.easing);
          });
        });

        $self.on('finish.mt', function() {
          const $target = defineTarget();

          $self.transition({
            opacity: 0,
          }, settings.animationTime, settings.easing, function () {
            $self.css('display', 'none');
            $self.removeClass('inTransition');
          });

          $target.transition({
            opacity: 1,
          }, settings.animationTime, settings.easing);
        });

        $self.on('revert.mt', function() {
          $self.css('display', 'block').addClass('slowTransitions');

          setTimeout(function() {
            $self.removeAttr('style').find('*').removeAttr('style');

            setTimeout(function() {
              $self.removeClass('slowTransitions');
            }, 300);
          }, 50);
        });

      });
    }

    function stabilizeButton($btn, cb) {
      const btnOffset = $btn.offset();
      const transition = $btn.css('transition');

      $btn.css({
        position: 'fixed',
        top: btnOffset.top - parseInt($btn.css('margin-top')),
        left: btnOffset.left,
        transition: 'initial',
        width: $btn.outerWidth(),
        height: $btn.outerHeight(),
      });

      // empêcher la transition et remettre la transition originale
      setTimeout(function() {
        $btn.css({
          transition,
        });

        if (typeof cb === "function") {
          cb();
        }
      }, 10);
    }

    function getOverflow($target) {
      let targetSize = {};

      switch (settings.targetOverflow) {
        case 'parent':
          const $parent = $target.parent();
          targetSize.w = $parent.outerWidth();
          targetSize.h = $parent.outerHeight();
        break;
        case 'window':
          targetSize.w = $(window).outerWidth();
          targetSize.h = $(window).outerHeight();
        break;
        default:
          const $selector = $(settings.targetOverflow);
          targetSize.w = $selector.outerWidth();
          targetSize.h = $selector.outerHeight();
        break;
      }

      return targetSize;
    }

    function defineTarget() {
      let $target;

      if (typeof settings.target === 'string') {
        $target = $(settings.target);
      } else if (settings.target.constructor === Array) {
        settings.target.map((tar) => {
          const windowWidth = $(window).width();

          if (windowWidth >= tar.enter && windowWidth <= tar.leave) {
            $target = $(tar.selector);
          }
        });
      }

      return $target;
    }

    function destroy(cb) {
      $thisEl.each(function() {
        const $self = $(this);
        $self.removeAttr('data-materialTransitions');

        $self.trigger('revert.mt').off('.mt');
      });

      if (typeof cb === "function") {
        cb();
      }
    }

    if (typeof options === 'object') {
      init();
    }

  }
})(jQuery);
