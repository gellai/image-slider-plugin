var $gs = jQuery.noConflict();

function GellaiSlider(vPC = true) 
{
    var _sliderId;
    var _sliderFrame;
    var _images;
    var _pos = 1;
    var _vPanCorrect = vPC;
    var _vPanFound = false;
    
    /*
     *  Slider initialization.
     *  Requires the ID of the frame container.
     */
    this.initSlider = function(id) {
        _sliderId = id;
        _sliderFrame = $gs('ul#' + id);
        _images = _sliderFrame.find('li figure img');
        
        _sliderFrame.addClass('gll-slider-frame');
        _sliderFrame.find('li:first-child').addClass('first');
        _sliderFrame.find('li:last-child').addClass('last');
        
        _setSliderImages();
        
        _sliderFrame.after("<div id=\"gllStepContainer\" class=\"gll-step-container\"><div id=\"gllPrev\" class=\"gll-prev\"><span>Previous</span></div><div id=\"gllStepCounter\" class=\"gll-counter\"></div><div id=\"gllNext\" class=\"gll-next\"><span>Next</span></div></div>");
        _setSliderNavigation();
        
        // Next button click action
        _sliderFrame.next().find('#gllNext').click(function(){
            if(_pos+1 <= _images.length)
                _pos++;
            else
                return false;
        
            _setSliderNavigation();
        
            var frameWidth = _sliderFrame.width();
            _sliderFrame.find('li').each(function(index){
                if((index+1) === _pos)
                    $gs(this).css('opacity', '1.0');
                else
                    $gs(this).css('opacity', '0');
            
                var leftPosition = $gs(this).css('left').replace("px", "");
                $gs(this).css('left', parseFloat(leftPosition) - parseFloat(frameWidth));
            });            
        });
        
        // Previous button click action
        _sliderFrame.next().find('#gllPrev').click(function(){
            if(_pos > 1)
                _pos--;
            else
                return false;
        
            _setSliderNavigation();
        
            var frameWidth = _sliderFrame.width();
            _sliderFrame.find('li').each(function(index){
                if((index+1) === _pos)
                    $gs(this).css('opacity', '1.0');
                else
                    $gs(this).css('opacity', '0');
            
                var leftPosition = $gs(this).css('left').replace("px", "");
                $gs(this).css('left', parseFloat(leftPosition) + parseFloat(frameWidth));
            });              
        });
        
        _setSliderNavigationStyle();
        
        // Reconfigure images after window resized.
        $gs(window).resize(function() {
            _setSliderImages();
            _setSliderNavigationStyle();
        }); 
    };   
    
    /*
     *  Resize the images and set the margin from the bottom.
     */
    var _setSliderImages = function() {
        var frameWidth = _sliderFrame.width();
            
        // Set non-vertical panoramic images width and find the maximum hight
        var highestImage = 0;
        $gs(_images).each(function(index){
            var imageWidth = $gs(this).width();
            var imageHeight = $gs(this).height();
                        
            if( (imageWidth >= imageHeight) || (!_vPanCorrect && imageWidth < imageHeight) ) {
                $gs(this).width(frameWidth);
                $gs(this).css('height', 'auto');
                
                if($gs(this).height() > highestImage) 
                    highestImage = $gs(this).height();
            }
        });     
        
        // Vertical panoramic image correction
        if(_vPanCorrect) {
            $gs(_images).each(function() {
                var imageWidth = $gs(this).width();
                var imageHeight = $gs(this).height(); 
                
                if(imageWidth < imageHeight) {
                    $gs(this).height(highestImage);
                    $gs(this).css('width', 'auto');
                    $gs(this).next('figcaption').css('width', _sliderFrame.width() + 'px');
                }
            });
        }
        
        // Find the highest figcaption
        var figcaptionMaxHeight = 0;
        _sliderFrame.find('li figure figcaption').each(function(){
            if($gs(this).height() > figcaptionMaxHeight)
                figcaptionMaxHeight = $gs(this).height() + parseInt($gs(this).css("padding-top"));
            
            // Fix figcaption width overflow issue
            if($gs(this).width() > frameWidth)
                $gs(this).css('width', '99%');
        });        

        // Set bottom margin for each images and their opacity
        var frameHeight = _sliderFrame.height();
        $gs(_images).each(function(){
            var imageHeight = $gs(this).height();       
            var marginBottom = (frameHeight - figcaptionMaxHeight - imageHeight) / 2; 
            $gs(this).css('margin', '0 auto ' + marginBottom + 'px auto');
        });         
    
        _imageReposition();
    };
    
    /*
     *  Manage the slider buttons visibility.
     */
    var _setSliderNavigation = function() {
        var prevBtn = _sliderFrame.next().children('#gllPrev');
        var stepCounter = _sliderFrame.next().children('#gllStepCounter');
        var nextBtn = _sliderFrame.next().children('#gllNext');
        
        var numberOfImages = _images.length;
        stepCounter.html(_pos + "/" + numberOfImages);
        var tmpCounter = stepCounter.html().split("/");
        
        if(tmpCounter[0] === "0" || tmpCounter[0] === "1")
            prevBtn.addClass('disabled');
        else
            prevBtn.removeClass('disabled');
        
        if(tmpCounter[0] === tmpCounter[1] || tmpCounter[1] ==="0")
            nextBtn.addClass('disabled');
        else
            nextBtn.removeClass('disabled');        
    };
    
        
    /*
     *  Responsive slider button
     */
    var _setSliderNavigationStyle = function() {
        var stepContainer = _sliderFrame.next();
        stepContainer.children('#gllPrev').children('span').css('font-size', '100%');
        stepContainer.children('#gllNext').children('span').css('font-size', '100%');  
        
        var prevContainer = stepContainer.children('#gllPrev').width();
        var prevText = stepContainer.children('#gllPrev').children('span').width();
        var nextContainer = stepContainer.children('#gllNext').width();
        var nextText = stepContainer.children('#gllNext').children('span').width();
        
        if(prevText >= prevContainer || nextText >= nextContainer) {
            stepContainer.children('#gllPrev').children('span').css('font-size', '0px');
            stepContainer.children('#gllNext').children('span').css('font-size', '0px');
        }
    };
    
    /*
     *  Image repositioning
     */
    var _imageReposition = function() {
        var frameWidth = _sliderFrame.width();
        
        _sliderFrame.find('li').each(function(){
            var rightPadding = $gs(this).css('padding-right').replace("px", "");
            $gs(this).css('left', -(_pos-1) * (frameWidth + parseFloat(rightPadding)));
        });
    };
}