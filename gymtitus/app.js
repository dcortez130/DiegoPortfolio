// Gym Titus — small enhancements for UX and validation

function setActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path){ a.setAttribute('aria-current','page'); }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();

  // contact form
  const contact = document.querySelector('#contact-form');
  if(contact){
    contact.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contact);
      for (const [k,v] of data.entries()){
        if(!String(v).trim()){
          showError(contact, 'Please complete all fields.');
          return;
        }
      }
      if(!validateEmail(data.get('email'))){
        showError(contact, 'Please enter a valid email address.');
        return;
      }
      showSuccess(contact, 'Thanks! We will reach out shortly.');
      contact.reset();
    });
  }

  // services signup
  const signup = document.querySelector('#signup-form');
  if(signup){
    signup.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(signup);
      const fname = data.get('fname')?.trim();
      const lname = data.get('lname')?.trim();
      const email = data.get('email')?.trim();
      if(!fname || !lname || !email){
        showError(signup, 'All fields are required.');
        return;
      }
      if(!validateEmail(email)){
        showError(signup, 'Please enter a valid email address.');
        return;
      }
      showSuccess(signup, `Thank you ${fname} ${lname}! We will contact you at ${email}.`);
      signup.reset();
    });
  }

  // login form (client-side only; server should validate with prepared statements)
  const login = document.querySelector('#login-form');
  if(login){
    login.addEventListener('submit', (e) => {
      const user = login.querySelector('input[name="uname"]').value.trim();
      const pass = login.querySelector('input[name="psw"]').value.trim();
      if(!user || !pass){
        e.preventDefault();
        showError(login, 'Username and Password are required.');
      }
    });
  }
});

function validateEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(form, msg){
  let box = form.querySelector('.notice.error');
  if(!box){
    box = document.createElement('div');
    box.className = 'notice error';
    form.prepend(box);
  }
  box.textContent = msg;
  box.style.background = '#ffecec';
  box.style.borderColor = '#ffc7c7';
  box.style.color = '#7a1616';
}

function showSuccess(form, msg){
  let box = form.querySelector('.notice.success');
  if(!box){
    box = document.createElement('div');
    box.className = 'notice success';
    form.prepend(box);
  }
  box.textContent = msg;
  box.style.background = '#ecffef';
  box.style.borderColor = '#b8f1c4';
  box.style.color = '#0d6a2b';
}
