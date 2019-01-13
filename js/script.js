var carouselOptions = {
    cellAlign: 'right',
    contain: true,
    pageDots: false,
    cellSelector: '.carousel-slide',
    hash: true
}
var slideTemplate = document.querySelector('#slide-template').innerHTML;
Mustache.parse(slideTemplate);

var slidesHtml = '';
slideData.forEach(function(slide, index) {
    slide.id = index;
    slidesHtml += Mustache.render(slideTemplate, slide);
});

document.querySelector('.carousel').insertAdjacentHTML('afterbegin',slidesHtml);

var carousel = new Flickity('.carousel', carouselOptions);
var progressBar = document.querySelector('.progress-bar');
carousel.on('scroll', function(progress){
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
})

var btnReset = document.querySelector('.btn-restart');
btnReset.addEventListener('click', function(){
    carousel.select(0, false, false);
})