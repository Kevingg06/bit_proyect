let toggle = document.getElementById('switch');
let header = document.getElementById('header');
let background = document.getElementById('background');
let h1 = document.getElementById('h1');
let p = document.querySelector('p');
let span = document.querySelector('span');
let footer = document.querySelector('footer');
let button = document.getElementsByClassName('button');
let signIn = button.item(0)
let logIn = button.item(1)

toggle.onclick = function dark(){
    header.classList.toggle('active');
    background.classList.toggle('active');
    h1.classList.toggle('active');
    p.classList.toggle('active');
    span.classList.toggle('active');
    footer.classList.toggle('active');
    signIn.classList.toggle('active');
    logIn.classList.toggle('active');
    toggle.classList.toggle('active');
}