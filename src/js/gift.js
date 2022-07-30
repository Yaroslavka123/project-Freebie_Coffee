const URL = "assets/json_files/gift.json";
loadURL = (url) => {
  var oRequest = new XMLHttpRequest();
  oRequest.open("GET", url, false);
  oRequest.send(null);
  return oRequest.responseText;
};
var sideList = JSON.parse(loadURL(URL));
const sideBar = document.querySelector(".slider_side");
let sideCount = 1;
if (sideList.length > 1) {
  for (let index = sideList.length; index > 0; index--) {
    const element = document.createElement("div");
    element.classList.toggle("side_button");
    element.innerHTML = sideCount + "";
    if (element.innerHTML == 1) {
      element.classList.toggle("side_active");
    }
    sideCount++;
    element.addEventListener("click", sliderScrolling);
    sideBar.append(element);
  }
}

function fillBlock(index) {
  const imgURL = document.querySelectorAll(".giftsets_block_img"),
    price = document.querySelectorAll(".slider_price"),
    title = document.querySelectorAll(".slider_name_item"),
    subtitle = document.querySelectorAll(".slider_subtitle"),
    view = document.querySelectorAll(".info_block_subtext"),
    height = document.querySelectorAll(".js_even");

  imgURL.src = this.imgURL;
  price[index].innerHTML = this.price;
  title[index].innerHTML = this.title;
  subtitle[index].innerHTML = this.subtitle;

  view[index].innerHTML = this.view;
  height[index].innerHTML = this.height;
}

const giftElementBox = document.querySelector(".gift_slider");
function createBlocks(elemet) {
  for (let index of sideList) {
    const giftBlock = document.createElement("div"),
      giftPrice = document.createElement("p"),
      giftItemName = document.createElement("h4"),
      giftSubtitle = document.createElement("p"),
      giftSliderInfoWrapper = document.createElement("div"),
      sliderButtonContainer = document.createElement("div"),
      sliderButton1 = document.createElement("a"),
      sliderButton2 = document.createElement("a");

    giftBlock.classList.add("gift_content_block");
    giftPrice.classList.add("slider_price", "price");
    giftItemName.classList.add("slider_name_item", "item_name");
    giftSubtitle.classList.add("slider_subtitle", "item_subtitle");
    giftSliderInfoWrapper.classList.add("slider_info_wrapper");
    sliderButtonContainer.classList.add("slider_button_container");
    sliderButton1.classList.add("slider_button_1");
    sliderButton2.classList.add("slider_button_info", "info_item");

    for (let index = 2; index > 0; index--) {
      let sliderInfoBlock = document.createElement("div");
      sliderInfoBlock.classList.add("slider_info_block");
      var infoBlockImg = document.createElement("img");
      infoBlockImg.classList.add("info_block_img");
      sliderInfoBlock.append(infoBlockImg);
      let infoBlockTextWrapper = document.createElement("div");
      infoBlockTextWrapper.classList.add("info_block_text_wrapper");
      let infoBlockText = document.createElement("p"),
        infoBlockSubtext = document.createElement("p");
      infoBlockText.classList.add("info_block_text");

      index == 1
        ? infoBlockSubtext.classList.add("js_even")
        : infoBlockSubtext.classList.add("info_block_subtext");
      infoBlockTextWrapper.append(infoBlockText);
      infoBlockTextWrapper.append(infoBlockSubtext);
      sliderInfoBlock.append(infoBlockTextWrapper);
      giftSliderInfoWrapper.append(sliderInfoBlock);
      sliderButtonContainer.append(sliderButton1);
      sliderButtonContainer.append(sliderButton2);

      index == 2
        ? (infoBlockImg.src = "../assets/img/slider_1.png")
        : (infoBlockImg.src = "../assets/img/slider_2.png");
      index == 2
        ? (infoBlockText.textContent = "Loại hạt")
        : (infoBlockText.textContent = "Độ cao");
    }
    sliderButton1.textContent = "MUA NGAY";
    sliderButton2.textContent = "CHI TIẾT";

    giftBlock.append(giftPrice);
    giftBlock.append(giftItemName);
    giftBlock.append(giftSubtitle);
    giftBlock.append(giftSliderInfoWrapper);
    giftBlock.append(sliderButtonContainer);

    elemet.prepend(giftBlock);
  }
}
createBlocks(giftElementBox);
for (let index = 0; index < sideList.length; index++) {
  fillBlock.call(sideList[index], index);
}

const blockList = document.querySelectorAll(".gift_content_block");
function sliderScrolling() {
    for(let index of blockList){
       index.style.top = -this.innerHTML*index.offsetHeight + index.offsetHeight - 46.2*this.innerHTML + 'px';
       if(this.innerHTML == 1){
        index.style.top = 0;
       }
      }
  const widthBlock = this.innerHTML;
  const sideElement = document.querySelectorAll(".side_button"),
    scrollCount = widthBlock * this.offsetHeight - 2 * this.offsetHeight,
    scrollCountAdaptive = widthBlock * this.offsetWidth - 2 * this.offsetWidth;
  sideElement.forEach((index) => {
    index.classList.contains("side_active")
      ? index.classList.remove("side_active")
      : null;
  });
  this.classList.contains("side_active")
    ? null
    : this.classList.toggle("side_active");

  if (window.innerWidth > 660) {
    if (widthBlock == 1 || widthBlock == sideElement.length) {
      return;
    } else {
      sideElement.forEach((index) => {
        index.style.top = -scrollCount + "px";
      });
    }
  } else {
    if (widthBlock == 1 || widthBlock == sideElement.length) {
      return;
    } else {
      sideElement.forEach((index) => {
        index.style.left = -scrollCountAdaptive + "px";
      });
    }
  }
  //scrollSide
}
