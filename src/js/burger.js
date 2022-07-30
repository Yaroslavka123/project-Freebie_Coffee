//variable declaration
    const burgerrWrapper = document.querySelector('.buger_wrapper'),
    burgersSide = document.querySelector('.burger_container'),
    burgerButton = document.querySelector('.burger_menu');





function openBurger(){
    document.body.classList.add('body_fix');
    burgerrWrapper.classList.add('buger_wrapper_active_display');
    setTimeout(() => {
        burgerrWrapper.classList.add('buger_wrapper_active_background');
        burgersSide.classList.add('burger_container_active');
    }, 0);
    
}
function closeBurger(){
    burgerrWrapper.classList.remove('buger_wrapper_active_background');
    burgersSide.classList.remove('burger_container_active');
    setTimeout(() => {
        document.body.classList.remove('body_fix');
        burgerrWrapper.classList.remove('buger_wrapper_active_display');
    }, 600);
}
try{
    burgerButton.addEventListener('click', openBurger);
    burgerrWrapper.addEventListener('click', closeBurger);
}
catch(err){
    console.group('Error info:');
    console.error('event function execution error');
    console.log('error text:' + err);
    console.groupEnd();
}
    
    