const comboButton = document.querySelector('.combo_button'),
    comboItems = document.querySelectorAll('.combo_block'),
    comboSlider = document.querySelector('.combo_slider');
    comboWidthItem = comboItems[1].clientWidth + 72;
    comboWidthItem == 432 ? comboWidthItem = 390: null;
let comboCount = comboWidthItem,
comboAllItemWidth = comboWidthItem * (comboItems.length),
comboLastDeltaX = 0;
if (comboItems && comboButton) {
    
    comboButton.addEventListener('click', function() {
        let comboEnumerator = 3;
        document.body.offsetWidth < 1280 ? comboEnumerator = 2 : null;
        document.body.offsetWidth < 920 ? comboEnumerator = 1 : null;
        comboCount > comboWidthItem * (comboItems.length - comboEnumerator) ? comboCount = 0 : null;
        comboItems.forEach(index => {
            index.style.left = -comboCount + 'px';
            comboLastDeltaX = -comboCount;
            index.classList.contains('combo_disabled') ? index.classList.remove('combo_disabled') : null;
        });
        comboCount += comboWidthItem;
    });
}
let comboX1,
    comboX2,
    comboItemvalueLeft,
    comboDeltaX;
comboSlider.addEventListener('touchstart', (event) =>{
    for(let index of comboItems){
        index.classList.add('no-transition');
        index.classList.contains('combo_disabled') ? index.classList.remove('combo_disabled'): null;
    }
    const fistTouch = event.touches[0];
    comboX1 = fistTouch.clientX;
})
comboSlider.addEventListener('touchmove', (event) =>{
    let comboX2 = event.touches[0].clientX;
    comboDeltaX = comboX2 -comboX1;
    for(let index of comboItems){
        index.style.left = comboLastDeltaX + comboDeltaX  + 'px';
    }
});
comboSlider.addEventListener('touchend', (event) =>{
    comboLastDeltaX += comboDeltaX;
    comboItemvalueLeft = Number(comboItems[1].style.left.slice(0,comboItems[1].style.left.length-2));
    for(let index of comboItems){
        if(comboDeltaX > 0){
            index.style.left = Math.ceil(  comboItemvalueLeft / comboWidthItem)  * comboWidthItem  + 'px';
        }
        else{
            index.style.left = Math.ceil( comboItemvalueLeft / comboWidthItem)  * comboWidthItem - comboWidthItem  + 'px';
        }
        if(comboLastDeltaX  >= 0){
            index.style.left = 0;
        }
        if( comboItemvalueLeft - comboWidthItem  <= -comboAllItemWidth){
            index.style.left = -comboAllItemWidth + comboWidthItem + 'px';
        }
    }
    console.log(comboLastDeltaX);
    for(let index of comboItems){
        index.classList.remove('no-transition');
    }
    comboLastDeltaX =  Number(comboItems[1].style.left.slice(0,comboItems[1].style.left.length-2));
    comboCount = -Number(comboItems[1].style.left.slice(0,comboItems[1].style.left.length-2))+ comboWidthItem;
});