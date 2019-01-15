var map;
var carouselOptions = {
    cellAlign: 'right',
    contain: true,
    pageDots: false,
    cellSelector: '.carousel-slide',
    hash: true
}
var slideTemplate = document.querySelector('#slide-template').innerHTML;
Mustache.parse(slideTemplate);

var slidesHtml = slideData.reduce(function(acc,slide,index) {
    slide.id = index;
    return acc += Mustache.render(slideTemplate, slide)
}, '');

document.querySelector('.carousel').insertAdjacentHTML('afterbegin', slidesHtml);

var carousel = new Flickity('.carousel', carouselOptions);
var progressBar = document.querySelector('.progress-bar');
carousel.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
var preventMapCenter = false;
carousel.on('change', function(index){
    if(preventMapCenter) {
        preventMapCenter = false;
    } else {
        newCoords = slideData[index].coords;
        map.panTo(newCoords);
    }
})

var btnReset = document.querySelector('.btn-restart');
btnReset.addEventListener('click', function () {
    carousel.select(0, false, false);
});

// google map

window.initMap = function () {
    map = new google.maps.Map(
    document.getElementById('map'), { zoom: 18, center: slideData[0].coords });

    slideData.forEach(function (slide, index) {
        var marker = new google.maps.Marker({
            position: slide.coords,
            map: map,
            title: slide.title
        });
        marker.addListener('click', function(){
            preventMapCenter = true;
            carousel.select(index, false, false);
        });
    });
};