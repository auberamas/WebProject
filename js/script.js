/*
var visible = false;

function move(visible) {
    const leftblocs = document.querySelectorAll('.left');
    const rightblocs = document.querySelectorAll('.right');
    
     if (visible) {
        // Hidde the blocs
        leftblocs.forEach(bloc => bloc.style.left = '-50%');
        rightblocs.forEach(bloc => bloc.style.right = '-50%');
        visible = false;

    } else {
        // Make the blocs visible
        leftblocs.forEach(bloc => bloc.style.left = '0');
        rightblocs.forEach(bloc => bloc.style.right = '0');
        visible = true;
    }
    
}
*/

// ---  animate the title -------------------------

window.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".title");
    const fullText = title.textContent;
    const table = fullText.split("|"); // ["BLUE", "Bringing Life to Underwater Ecosystems"]
    const container = title;
    let index = 0;
    let char = 0;
    let direction = "write"; // or "erase"

    container.textContent = ""; 

    function animateText() {
        const current = table[index];

        if (direction === "write") {

            // put the title in span tag to display it
            // add a letter until the end of the length of the
            if (char <= current.length) {                
                container.innerHTML = `<span>${current.slice(0, char)}</span>`;
                char++;
                setTimeout(animateText, 70);
            } 

            // end of title reached => earse the title
            else {
                direction = "erase";
                setTimeout(animateText, 1000); // pause to avoid a glitch
            }
        } 
        else if (direction === "erase") {
            
            // retrive letter by letter the elment of the table
            if (char >= 0) {
                container.innerHTML = `<span>${current.slice(0, char)}</span>`;
                char--;
                setTimeout(animateText, 70);

            } else {
                direction = "write";
                index = (index + 1) % table.length;
                char = 0;
                setTimeout(animateText, 500);
            }
        }
    }
    animateText();
});



// ---- to move the blocks when scrolling -----------------

window.addEventListener('scroll', () => {
    // get all the elments of the class bloc
    const blocs = document.querySelectorAll('.bloc');

    const screenPosition = window.innerHeight;

    // check for each bloc their position compared to the screen one
    blocs.forEach(bloc => {
        const position = bloc.getBoundingClientRect().top;

        // change the class to make the bloc visible
        if (position < screenPosition - 100) {
            bloc.classList.add('visible');
        } else {
            bloc.classList.remove('visible');
        }
    });
});


// ------- button on Conctact Us page -------------------

const trigger = document.querySelector('.submit-btn');
const target = document.querySelector('.ContactUs');

// new class for the target when mouse on it
trigger.addEventListener('mouseenter', () => {
  target.classList.add('active-button');
});

// remove the new class 
trigger.addEventListener('mouseleave', () => {
  target.classList.remove('active-button');
});

