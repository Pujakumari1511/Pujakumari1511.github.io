const mobileMenuButton = document.querySelector(".mobile-menu");
const navList = document.querySelector("nav ul");
const backToTop = document.querySelector("#backTop");

backToTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

window.onscroll = function (){scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('header').style.backdropFilter = "blur(10px)";
        document.querySelector('header .logo h1').style.fontSize = "22px";
        document.querySelector('header').style.backgroundColor = "#05590c5c";
        document.querySelector('header').style.height = "100px";
    } else {
        document.querySelector('header').style.backdropFilter = "none";
        document.querySelector('header .logo h1').style.fontSize = "32px";
        document.querySelector('header').style.backgroundColor = "transparent";
        document.querySelector('header').style.height = "100px";
    }
}

const toggleMenu = () => {
    navList.classList.toggle("responsive");   
}

mobileMenuButton.addEventListener("click", toggleMenu);