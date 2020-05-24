[Ссылка на видео](https://youtu.be/f8hSaf-Zhvs)
[Презентация](https://zealous-franklin-88822b.netlify.app)
[Текст](https://zealous-franklin-88822b.netlify.app/text.md)

Hi everyone this is my first stream and i will tell about web canvas technology
Canvas is a HTML five5 element for drawing and making animations in browser. We can create canvas right in HTML file by tag or dynamicaly by script.

It has three attributes: id, width and height. We use an id to get this element in script. Width and height are needs to set size of canvas and canvas bitmap. CSS width and height change only visible size, not bitmap size and can distort an image.
Canvas has many interfaces such as:
  HTMLCanvasElement
  CanvasRenderingContext2D
  CanvasGradient
  CanvasPattern
  ImageBitmap
  ImageData
  TextMetrics
At first we needs to use CanvasRenderingContext2D. It allows us to render primitives. They are rects and pathes. Any path can be stroked or filled. Also we can set stroke and fill styles to set color or pattern.

Let's look at first example. 
There are i get canvas element, 
then get canvas 2d context, 
set background color and fill all canvas by fillRect function and draw grid with 50(fifty) pixels period.
We can use simple CSS format to set colors through hash symbol or rgb/rgba functions. We need it to write as string.
Also i draw coordinates by fillText method, and canvas allows to strokeText too for draw it edges.

There are i use stadart canvas axis with zero point in top left corner. To change coordinate system we can use
transform methods such as rotate, translate or scale, also we can use setTransform method to set transformation as
matrix. Matrix alows to make any linear transform in two dimentions like translation, moving and scaling, but we need use multiplicantion to combine transform in right order. Also we can use getTransform method to get current transform that was changed by rotate, translate and scale functions.

Let's look how it works.
There are two grids. One is translated to center point, other is rotated to forty five (45) degrees after translation. 

It was static images but we can make animations with the canvas. In html we can animate elements by CSS transitions and keyframes. Canvas animations require to draw every frame and clear image before it. We can use setInterval function, but it's bad way. Window element has special method requestAnimanionFrame to make animations with screen sync, it calls limited by sixety(60) frames per second. Also we can use timeStamp variable in callback function and Date.now() to have time-synchronized animations with any FPS.

On this slide we can see rotating triangle with blur effect. This effect realized by build-in alpha blending, we can set fill color in rgba format like in CSS.

Lets look at another task to easy solve it by canvas. For example we have to make a browser graphic editor like figma or photopea and we need to save our image. So we can use canvas.getDataURL method and make link with this value in href attribute. Also we can use this link in image src. 

DrawImage method allows to put image from html img element to canvas. It have many properties to set origin point, scale and cut image. This method works as any fill method. Also we can draw image on the canvas by putImageData function, but it just replace all current data on the canvas. 

Let's look at next exapmles.
This demo script scale source image to thirty two(32) pixels size and draw it on the canvas by drawImage function. Next example allows to draw on canvas by mouse pointer.

Canvas is powerfull component with many functions, its takes a long time to tell about all. I have observed some functions for drawing like fillText, fillRect, lineTo, but canvas have many functions that make pathes to stroke or fill it. They are:
 arc
 ellipse,
 bezierCurveTo
 quadraticCurveTo
 They are work like simple lineTo function.

Canvas has lineCap and lineJoin properties to set shape of ends and connetions in pathes.
There are three possible values for lineJoin property: "round", "bevel", and "miter". The default is "miter".
"round"
    Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius for these rounded corners is equal to the line width.
"bevel"
    Fills an additional triangular area between the common endpoint of connected segments, and the separate outside rectangular corners of each segment.
"miter"
    Connected segments are joined by extending their outside edges to connect at a single point, with the effect of filling an additional lozenge-shaped area. This setting is affected by the miterLimit property. Default value. 

Also canvas have functions to make gradients and pattern such as 
  createImageData()
  createLinearGradient()
  createPattern()
  createRadialGradient() 
for use it in fillStyle. They work as CSS gradients.

Canvas have interesting methods save() and restore(). It allows to save current properties like matrix of fillStyle or other in stack and return to last state by restore() method.

Sometimes we need to process any pixel for making some effects. We can use getImageData to get full linear array with every color component.

So canvas is low level but powerful tool for making interesting web applications like editors, games, demo scenes. It allows to control every pixel in image and every frame in animation and canvas works in many kind of browsers. And i think it was the best new element in html 5. I will show also two of my applications with canvas.