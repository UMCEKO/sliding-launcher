console.clear()
/** @type {{datas:{images:string[], links:string[], title:string[],description:string[]}}}*/
var data
var currImageLink = document.getElementById("currImageLink")
var currImage = document.getElementById("currImage")
var prevImage = document.getElementById("prevImage")
var nextImage = document.getElementById("nextImage")
var header = document.getElementById("header")
var paragraph = document.getElementById("paragraph")
var currImageIndex = 0
var nextImageIndex
var prevImageIndex
var reverseorder = true
var isFirstImageLoaded = false
function randUrl(){
  return  (Math.random()*10000)
}
console.log("https://raw.githubusercontent.com/UMCEKO/UmutLauncher-Data/main/ImgData.json?random=" + randUrl())
fetch("https://raw.githubusercontent.com/UMCEKO/UmutLauncher-Data/main/ImgData.json?random=" + randUrl())
.then(response => response.text())
.then(html => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    data = JSON.parse(doc.body.textContent)
    console.log(data)
})
.then(()=>{
    if(data.datas.images.length != 1){
      if(reverseorder){
        data.datas.images.reverse()
        data.datas.description.reverse()
        data.datas.title.reverse()
        data.datas.links.reverse()
      }
        preloadImages(data.datas.images).then(()=>{
            isFirstImageLoaded=true
            currImage.src = data.datas.images[0]
            nextImageIndex = 1
            prevImageIndex = data.datas.images.length-1
            nextImage.src = data.datas.images[1]
            prevImage.src = data.datas.images[data.datas.images.length-1]
            currImageLink.href = data.datas.links[0]
            paragraph.innerText = data.datas.description[0]
            header.innerText = data.datas.title[0]
            
        })
    }
    else{
        document.getElementById("rbutton").hidden = true
        document.getElementById("lbutton").hidden = true
        preloadImages(data.datas.images).then(()=>{
            isFirstImageLoaded=true
            currImage.src = data.datas.images[0]
            currImageLink.href = data.datas.links[0]
            paragraph.innerText = data.datas.description[0]
            header.innerText = data.datas.title[0]
            
        })
    }
})

document.getElementById("textSection").addEventListener("mouseenter",()=>{
  

})
document.getElementById("textSection").addEventListener("mouseleave",()=>{
  
  document.getElementById("textSection").scrollTo({top: 0, behavior: 'smooth'});
  
})


document.getElementById("rbutton").addEventListener("click", ()=>{
    rightButtonClicked()
})


document.getElementById("lbutton").addEventListener("click", ()=>{
    leftButtonClicked()
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let isFunctionExecuted = false;

function rightButtonClicked() {
  if (!isFunctionExecuted) {
    isFunctionExecuted = true;

    prevImageIndex=currImageIndex
    currImageIndex=nextImageIndex


    if(nextImageIndex+1 > data.datas.images.length-1){
      nextImageIndex=0
    } 
    else {
      nextImageIndex++
    }

    nextImage.className = "RightSlideToMiddle fitimg"
    currImage.className = "MiddleSlideToLeft fitimg"
    setTimeout(() => {
      nextImage.className = "NextDefault fitimg"
      currImage.className = "currDefault fitimg"

      nextImage.src = data.datas.images[nextImageIndex]
      prevImage.src = data.datas.images[prevImageIndex]
      currImage.src = data.datas.images[currImageIndex]
      currImageLink.href = data.datas.links[currImageIndex]
      paragraph.innerText = data.datas.description[currImageIndex]
      header.innerText = data.datas.title[currImageIndex]

      isFunctionExecuted = false;
    }, 1000);
  }
}

function leftButtonClicked() {
  if (!isFunctionExecuted) {
    isFunctionExecuted = true;

    nextImageIndex=currImageIndex
    currImageIndex=prevImageIndex

    if(prevImageIndex-1 < 0){
      prevImageIndex=data.datas.images.length-1
    } 
    else {
      prevImageIndex--
    }

    prevImage.className = "LeftSlideToMiddle fitimg"
    currImage.className = "MiddleSlideToRight fitimg"
    setTimeout(() => {
      prevImage.className = "PrevDefault fitimg"
      currImage.className = "currDefault fitimg"
      nextImage.src = data.datas.images[nextImageIndex]
      prevImage.src = data.datas.images[prevImageIndex]
      currImage.src = data.datas.images[currImageIndex]
      currImageLink.href = data.datas.links[currImageIndex]
      paragraph.innerText = data.datas.description[currImageIndex]
      header.innerText = data.datas.title[currImageIndex]

      isFunctionExecuted = false;
    }, 1000);
  }
}

const preloadImages = (imageUrls) => {
    const promises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
            resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    });
    return Promise.all(promises);
};
  
  
  // Call the preloadImages function to preload all images


async function SlideLeft(){

}



var ake = new FileReader()



