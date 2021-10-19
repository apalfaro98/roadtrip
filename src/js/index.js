import '../scss/styles.scss';


const hamburgerBtn = document.querySelector('.nav__toggle');
const modal = document.querySelector('.modal-nav');

const links = document.querySelectorAll('.links li');
const modalLinks = document.querySelectorAll('.modal__links li');

const header = document.querySelector('#header');
const sectionOne = document.querySelector('#one');
const sections = document.querySelectorAll('section');

const sectionOptions = {
    rootMargin: '-200px 0px 0px 0px'
};

const sectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            header.classList.add('onscroll');
        } else{
            header.classList.remove('onscroll');
        }
    })
}, sectionOptions);

sectionObserver.observe(sectionOne);



hamburgerBtn.addEventListener('click', ()=>{
    if(!hamburgerBtn.classList.contains('nav__open')){
        hamburgerBtn.classList.add('nav__open');
        modal.classList.add('nav__open');
    }
    else{
        hamburgerBtn.classList.remove('nav__open');
        modal.classList.remove('nav__open');
    }
});

modalLinks.forEach(li=>{
    li.addEventListener('click', ()=>{
        hamburgerBtn.classList.remove('nav__open');
        modal.classList.remove('nav__open');
    });
});

window.onscroll = () => {
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop ) {
          current = section.getAttribute("id"); 
        }
    });
    
    links.forEach((li) => {
    li.classList.remove("here");
    if (li.classList.contains(current)) {
        li.classList.add("here");
    }
    });
}
