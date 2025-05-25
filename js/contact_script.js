// ------- button on Conctact Us page -------------------

const trigger = document.querySelector('.submit-btn');
const target = document.querySelector('.ContactUs');

if(trigger && target){
    // new class for the target when mouse on it
    trigger.addEventListener('mouseenter', () => {
    target.classList.add('active-button');
    });

    // remove the new class 
    trigger.addEventListener('mouseleave', () => {
    target.classList.remove('active-button');
    });

}