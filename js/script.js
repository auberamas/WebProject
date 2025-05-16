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

window.addEventListener('scroll', () => {
  const blocs = document.querySelectorAll('.bloc');
  const screenPosition = window.innerHeight;

  blocs.forEach(bloc => {
    const position = bloc.getBoundingClientRect().top;

    if (position < screenPosition - 100) {
      bloc.classList.add('visible');
    } else {
      bloc.classList.remove('visible');
    }
  });
});
