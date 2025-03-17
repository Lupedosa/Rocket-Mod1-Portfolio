const menuToggle = document.querySelector('.menuToggle');
const navegacao = document.querySelector('.navegacao');

menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    navegacao.classList.toggle('active');

    if(menuToggle.classList.contains('active')){
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    }else{
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

    }
});