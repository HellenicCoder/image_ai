const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarthumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    //handle scrollbar thumb drag
    scrollbarthumb.addEventListener("mousedown", (e) =>{
        const startX = e.clientX;
        const thumbPosition = scrollbarthumb.offsetLeft;

        //update thumb postion on mouse move 
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newthumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width -  scrollbarthumb.offsetWidth;

           const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newthumbPosition));
           const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarthumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
        // remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        //add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    //slide the photos by slide button clicks
    slideButtons.forEach(button => {
         button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
         });
    });
   const handleSlideButtons = () =>{
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block"; 
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block"; 
   }

   //update scrollbar thumb position bsed on image scroll
   const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarthumb.offsetWidth);
    scrollbarthumb.style.left = `${thumbPosition}px`;
   }

   imageList.addEventListener("scroll", () => {
       handleSlideButtons();
       updateScrollThumbPosition();
   })

}

window.addEventListener("load", initSlider);