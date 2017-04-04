$(document).ready(function() {


    // --------------------------- smooth page scroll ----------------------------------
    Math.easeOutQuad = function(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    };

    (function() { // do not mess global space
        var
            interval, // scroll is being eased
            mult = 1, // how fast do we scroll
            dir = 0, // 1 = scroll down, -1 = scroll up
            steps = 50, // how many steps in animation
            length = 30; // how long to animate
        function MouseWheelHandler(e) {
            e.preventDefault(); // prevent default browser scroll
            clearInterval(interval); // cancel previous animation
            ++mult; // we are going to scroll faster
            var delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))); // cross-browser
            if (dir != delta) { // scroll direction changed
                mult = 1; // start slowly
                dir = delta;
            }
            // in this cycle, we determine which element to scroll
            for (var tgt = e.target; tgt != document.documentElement; tgt = tgt.parentNode) {
                var oldScroll = tgt.scrollTop;
                tgt.scrollTop += delta;
                if (oldScroll != tgt.scrollTop) break;
                // else the element can't be scrolled, try its parent in next iteration
            }
            var start = tgt.scrollTop;
            var end = start + length * mult * delta; // where to end the scroll
            var change = end - start; // base change in one step
            var step = 0; // current step
            interval = setInterval(function() {
                var pos = Math.easeOutQuad(step++, start, change, steps); // calculate next step
                tgt.scrollTop = pos; // scroll the target to next step
                if (step >= steps) { // scroll finished without speed up - stop animation
                    mult = 0; // next scroll will start slowly
                    clearInterval(interval);
                }
            }, 10);
        }

        // nonstandard: Chrome, IE, Opera, Safari
        window.addEventListener("mousewheel", MouseWheelHandler, false);
        // nonstandard: Firefox
        window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    })();




    //carousel options
    $('#quote-carousel').carousel({
        pause: true,
        interval: 10000,
    });


    // rating
    $('.rating input').change(function() {
        var $radio = $(this);
        $('.rating .selected').removeClass('selected');
        $radio.closest('label').addClass('selected');
    });


    // Starrr plugin (https://github.com/dobtco/starrr)
    var __slice = [].slice;

    (function($, window) {
        var Starrr;

        Starrr = (function() {
            Starrr.prototype.defaults = {
                rating: void 0,
                numStars: 5,
                change: function(e, value) {}
            };

            function Starrr($el, options) {
                var i, _, _ref,
                    _this = this;

                this.options = $.extend({}, this.defaults, options);
                this.$el = $el;
                _ref = this.defaults;
                for (i in _ref) {
                    _ = _ref[i];
                    if (this.$el.data(i) != null) {
                        this.options[i] = this.$el.data(i);
                    }
                }
                this.createStars();
                this.syncRating();
                this.$el.on('mouseover.starrr', 'span', function(e) {
                    return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
                });
                this.$el.on('mouseout.starrr', function() {
                    return _this.syncRating();
                });
                this.$el.on('click.starrr', 'span', function(e) {
                    return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
                });
                this.$el.on('starrr:change', this.options.change);
            }

            Starrr.prototype.createStars = function() {
                var _i, _ref, _results;

                _results = [];
                for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                    _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
                }
                return _results;
            };

            Starrr.prototype.setRating = function(rating) {
                if (this.options.rating === rating) {
                    rating = void 0;
                }
                this.options.rating = rating;
                this.syncRating();
                return this.$el.trigger('starrr:change', rating);
            };

            Starrr.prototype.syncRating = function(rating) {
                var i, _i, _j, _ref;

                rating || (rating = this.options.rating);
                if (rating) {
                    for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                        this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                    }
                }
                if (rating && rating < 5) {
                    for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                        this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                    }
                }
                if (!rating) {
                    return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                }
            };

            return Starrr;

        })();
        return $.fn.extend({
            starrr: function() {
                var args, option;

                option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                return this.each(function() {
                    var data;

                    data = $(this).data('star-rating');
                    if (!data) {
                        $(this).data('star-rating', (data = new Starrr($(this), option)));
                    }
                    if (typeof option === 'string') {
                        return data[option].apply(data, args);
                    }
                });
            }
        });
    })(window.jQuery, window);

    $(function() {
        return $(".starrr").starrr();
    });

    $(document).ready(function() {

        $('#stars').on('starrr:change', function(e, value) {
            $('#count').html(value);
        });

        $('#stars-existing').on('starrr:change', function(e, value) {
            $('#count-existing').html(value);
        });
    });

});


$(document).ready(function() {

    $('.owl-carousel').owlCarousel({
        rtl: true,
        loop: true,
        margin: 10,
        nav: true,
        autoHeight: true,

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })
});
$(document).ready(function() {
    $(".owl-stage").find('.active').eq(2).addClass('special');
    $(".owl-prev").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>');
    $(".owl-next").html('<i class="fa fa-chevron-right" aria-hidden="true"></i>');

    $(".owl-next, .owl-prev").click(function(event) {

        $(".owl-stage").find('.special').removeClass('special');
        $(".owl-stage").find('.active').eq(2).addClass('special');
    });
});
