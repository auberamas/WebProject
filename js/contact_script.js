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

// ------ send and clear the form --------------------
const form = document.getElementById("form");

if(form){
  form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent auto reload

  // send HTTP request
  fetch(form.action, {
    method: "POST",
    body: new FormData(form)
  })

  // manage the answer
  .then(res => res.ok ? res.json() : Promise.reject())
  .then(() => {
    alert("Message sent!");
    form.reset(); // reinitialize the form
  })
  .catch(() => {
    alert("Error sending message.");
  });
});
}

