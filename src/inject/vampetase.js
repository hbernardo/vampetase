
(function ($) {

    var self = {
        vampetaseImg: [
            'https://i.imgur.com/Q8DAMbG.jpeg',
            'https://i.imgur.com/CEXGnb1.jpeg',
            'https://i.imgur.com/sEfTW2T.jpeg',
            'https://i.imgur.com/1GFdTtE.jpeg',
            'https://i.imgur.com/dHBJLSq.jpeg',
            'https://i.imgur.com/bImMVB8.jpeg',
            'https://i.imgur.com/7w1koGx.jpeg',
            'https://i.imgur.com/Xpza25z.jpeg',
            'https://i.imgur.com/JWTlHal.jpeg',
            'https://i.imgur.com/Z0bWp5x.jpeg',
            'https://i.imgur.com/Ha7roTe.jpeg',
            'https://i.imgur.com/KnGwtdP.jpeg',
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.vampetaseImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);
