// Вешаем на прикосновение функцию handleTouchStart
document.addEventListener('touchstart', handleTouchStart, false);  
// А на движение пальцем по экрану - handleTouchMove      
document.addEventListener('touchmove', handleTouchMove, false);
                                                     
let yDown = null;
let xDown = null;
let flagActivSwap = true;
let currentPage = 1;

let bgSpace = document.getElementById("spaceBGVSlider");
let elemSpace = document.getElementById("spaceElemVSlider");                                                     

function handleTouchStart(evt) {                                 
    yDown = evt.touches[0].clientY;
    xDown = evt.touches[0].clientX;
};                                                

function handleTouchMove(evt) {
    let idRange = document.getElementById("rangeHSliders");

    let topCord = getCoords(idRange).top;
    let leftCord = getCoords(idRange).left;

    if((yDown > topCord-20 && yDown < topCord+32) && (xDown > leftCord-22 && xDown < leftCord+662)){
        return;
    }

    if(flagActivSwap == true){
        flagActivSwap = false;

        let yUp = evt.touches[0].clientY;
        let yDiff = yDown - yUp;

        let bgSpace = document.getElementById("spaceBGVSlider");
        let elemSpace = document.getElementById("spaceElemVSlider"); 

        let nowTop = bgSpace.style.top.slice(0,-2);

        if ( yDiff > 0 && +nowTop > -1536) {

            bgSpace.style.top = (+nowTop - 768)+"px";
            elemSpace.style.top = (+nowTop - 768)+"px";
            document.getElementById("page"+currentPage).style.background = '';
            currentPage++;
            document.getElementById("page"+currentPage).style.background = 'rgb(247,139,31)';
            if (currentPage != 1) document.getElementById("nextPage").style.opacity = 0;

        } else if ( yDiff < 0 && +nowTop < 0 ){ 
            bgSpace.style.top = (+nowTop + 768)+"px";
            elemSpace.style.top = (+nowTop + 768)+"px";
            document.getElementById("page"+currentPage).style.background = '';
            currentPage--;
            document.getElementById("page"+currentPage).style.background = 'rgb(247,139,31)';
            if (currentPage == 1) document.getElementById("nextPage").style.opacity = 1;
        }                                                                 

        /* reset values */
        yDown = null; 

        setTimeout(function(){flagActivSwap = true}, 1000);
    }
                                            
};

function range(){
    let val = document.getElementById("rangeHSliders").value;
    if (val >= 95) val = 95;
    if (val <= 5) val = 5;
    document.getElementById("rangeHSliders").style.background = '-webkit-linear-gradient(left ,rgb(209,234,255) 5%,rgb(209,234,255) '+val+'%,rgb(67,80,99) '+val+'%, rgb(67,80,99) 95%)';
    if (val >= 0 && val < 10){
        document.getElementById("spaceElemHSlider").style.left = "0px";
    } else if (val >= 45 && val < 55){
        document.getElementById("spaceElemHSlider").style.left = "-1024px";
    } else if (val >= 90 && val < 100){
        document.getElementById("spaceElemHSlider").style.left = "-2048px";
    }
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}