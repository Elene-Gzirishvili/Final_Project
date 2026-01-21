//burgerbar
const burgerBtn = document.getElementById('burgerMenu');
const burgerIcon = burgerBtn.querySelector('i');
const nav = document.getElementById('navLinks');

burgerBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    const isOpen = nav.classList.contains('nav-active');
});

//live feed
const adviceDisplay = document.getElementById('advice-text');

async function getBadAdvice() {
    
    adviceDisplay.style.opacity = '0.5';
    adviceDisplay.innerText = "DOWNLOADING TERRIBLE IDEA...";

    try {
        const response = await fetch('https://api.adviceslip.com/advice?t=' + Math.random());
        const data = await response.json();
        adviceDisplay.innerText = `"${data.slip.advice}"`;
        adviceDisplay.style.opacity = '1';

    } catch (error) {
        console.error("Bureau Connection Failed");
        adviceDisplay.innerText = "ERROR: SYSTEM OVERLOAD. PLEASE MAKE A MISTAKE MANUALLY.";
        adviceDisplay.style.opacity = '1';
    }
}

getBadAdvice();


//form

const form = document.getElementById('sabotageForm');
const toggleBtn = document.getElementById('togglePassword');
const passInput = document.getElementById('accessCode');

toggleBtn.addEventListener('click', function () {
    const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById('suspectName');
    const email = document.getElementById('agentEmail');
    const offense = document.getElementById('offense');
    const password = document.getElementById('accessCode');

    function showError(input, id) {
        input.parentElement.closest('.form-group').classList.add('error');
        isValid = false;
    }

    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
    }

    clearErrors();

    if (name.value.trim() === '') {
        showError(name);
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!emailRegex.test(email.value.trim())) {
        showError(email);
        document.getElementById('emailError').innerText = 
            email.value.trim() === '' ? "Required" : "Invalid Bureau Email Format";
    }
    if (offense.value === '') {
        showError(offense);
    }
    if (password.value.trim() === '') {
        showError(password);
    }

    if (isValid) {
        form.reset();
        alert("Submission Received.");
    }
});

//scrollToTop
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



//cookies

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies-btn');

    if (!localStorage.getItem('bureauCookiesAccepted')) {
        banner.classList.remove('cookie-banner-hidden');
    }
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('bureauCookiesAccepted', 'true');
            banner.style.display = 'none';
        });
    }
});