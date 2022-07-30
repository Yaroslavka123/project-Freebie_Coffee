const line = document.querySelectorAll('.shop_item'),
    sliderButton = document.querySelector('.shop_button'),
    sliderContainer = document.querySelector('.shop_container'),
    lineWidth = line[1].offsetWidth + Number(getComputedStyle(line[1]).marginRight.slice(0,getComputedStyle(line[1]).marginRight.length-2)),
    halfLine = line.length / 2;
let count = 0,
    x1 = 0,
    lastValueDeltaX = 0,
    widthIndex;
if (line && sliderButton) {
    sliderButton.addEventListener('click', () => {
       sliderContainer.offsetWidth < lineWidth * 2 ? widthIndex = 1 : widthIndex = 2;
        count -= lineWidth;
        count < (-(halfLine - widthIndex) * lineWidth) ? count = 0 : null;
        line.forEach(index => {
            index.style.left = count + 'px';
            index.classList.contains('shop_item_disabled') ? index.classList.remove('shop_item_disabled') : null;
        });
        let opacityCount = -count / lineWidth,
            firstOpacityNumber = (widthIndex + opacityCount),
            secondOpacityNumber = halfLine + widthIndex + opacityCount;
        if (line[firstOpacityNumber] && line[secondOpacityNumber]) {
            line[firstOpacityNumber].classList.toggle('shop_item_disabled');
            line[secondOpacityNumber].classList.toggle('shop_item_disabled');
        }
        lastValueDeltaX = Number(line[0].style.left.slice(0,line[0].style.left.length -2));
    });
}
let deltaX,
allItemWidth,
valueLeftBlock;
sliderContainer.offsetWidth < lineWidth*2? allItemWidth = -(lineWidth * (line.length/4) +lineWidth ): allItemWidth = -(lineWidth * (line.length/4) );
sliderContainer.addEventListener('touchstart',(event)=>{
    valueLeftBlock = line[1].style.left.slice(0,line[1].style.left.length -2);
    const fistTouch = event.touches[0];
    x1 = fistTouch.clientX;
    line.forEach(index =>{
        index.classList.contains('shop_item_disabled') ? index.classList.remove('shop_item_disabled') : null;
        index.classList.add('no-transition');
    });
    lastValueDeltaX = Number(valueLeftBlock);
});
sliderContainer.addEventListener('touchmove',(event)=>{
    valueLeftBlock = line[1].style.left.slice(0,line[1].style.left.length -2);
    if (!x1){
        return false;
    }
    let x2 = event.touches[0].clientX;
    deltaX = x2 - x1;
    line.forEach(index =>{
        index.style.left = lastValueDeltaX + deltaX + 'px';
    });
});
sliderContainer.addEventListener('touchend',()=>{
    lastValueDeltaX += deltaX;
    line.forEach(index =>{
        if(deltaX > 0){
            index.style.left = Math.ceil( valueLeftBlock / lineWidth)  * lineWidth  + 'px';
            count =  Number(valueLeftBlock);
        }
        else{   
            if (Number(valueLeftBlock) + deltaX < allItemWidth){
                index.style.left = allItemWidth +  'px';
            }
            else{
                index.style.left = Math.ceil(valueLeftBlock / lineWidth)  * lineWidth - lineWidth  + 'px';
                count =  Math.ceil(index.style.left.slice(0,index.style.left.length -2) / lineWidth)  * lineWidth + lineWidth;
            }
        }
        Number(valueLeftBlock) > 0 ? index.style.left = 0 : null;
    });
    line.forEach(index =>{
        index.classList.remove('no-transition');
    });
});