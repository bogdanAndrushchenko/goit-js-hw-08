"use strict";
/**
 * ******* Задание в файле README.md ********
 */
// import "gallery-items.js"
import galleryItems from "./gallery-items.js";
console.log(galleryItems[0].description);

const createGalleruTagImg = (arr) => {
    const imagesRef = document.createElement("img");
    imagesRef.setAttribute('data-source', arr.preview)
    imagesRef.src = arr.preview;
    imagesRef.alt = arr.description;
    // imagesRef.data.set.sourse = arr.preview;
    imagesRef.classList.add('img-style');
    return imagesRef;
};
const readyImgTag = galleryItems.map((jpg) => createGalleruTagImg(jpg));
console.log(readyImgTag[1], readyImgTag[2]);


const linkElem = document.createElement('a');
linkElem.classList.add('gallery__link');

// const ulGalleryRef = document.querySelector(".js-gallery");
// ulGalleryRef.append(...readyImgTag);

// console.log(ulGalleryRef);