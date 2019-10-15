# Image Slider Plugin

The plugin horizontally slides images which are controlled by the two navigation buttons. The font style and the size of the frame is inherited from the parent container and dynamically adjusted. 

## Features

- Multiple sliders on the same page
- Dynamically adjusted image size
- Easy to implement
- Enable / disable vertical panoramic image correction
- Font style is inheited from the parent wrapper

## Installation

jQuery library is required.

### Step 1.
Download and add the plugin to the appropriate page within the **<head>** element.

```html
<link href="css/GellaiSlider.css?ver=1.14" rel="stylesheet">
<script src="js/GellaiSlider.js?ver=1.14"></script>
```

You can also use external links.

```html
<link href="http://sources.gellai.com/plugins/gellai-slider/css/GellaiSlider.css?ver=1.14" rel="stylesheet">
<script src="http://sources.gellai.com/plugins/gellai-slider/js/GellaiSlider.js?ver=1.14"></script>
```

### Step 2.
Create the slider album within **<body>** element. Use the following template.

```html
<ul id="gllSliderFrame">
    <li>
        <figure>
             <img src="images/image1.jpg" />
             <figcaption>Caption text for image 1.</figcaption>
        </figure>    
    </li>
    <li>
        <figure>
            <img src="images/image2.jpg" />
            <figcaption>Caption text for image 2.</figcaption>
        </figure>    
    </li>
</ul>    
```

***<li>** element can be repeated many times.*

### Step 3.
Instantiate the GellaiSlider class before the **<\body>** tag with the **<ul>** id.

```html
<script type="text/javascript">
    window.onload = function() {  
        var gllSlider = new GellaiSlider();
        gllSlider.initSlider('gllSliderFrame');                   
    }
</script>
```

*For multiple sliders use different **<ul>** ids and variable names.*

### Step 4. (Optional)
To disable vertical panoramic image correction, use the following parameter during class instantiation.

```html
<script type="text/javascript">
    window.onload = function() {  
        var gllSlider = new GellaiSlider(false);
        gllSlider.initSlider('gllSliderFrame');                   
    }
</script>
```

The vertical panoramic images - the height is larger than the width - will be inflated to the width of the slider frame. This may increase the hight of the slider container.


## Demo

[Image Slider Plugin Demo](http://projects.gellai.com/image-slider) 