"use strict";
/**
 * ******* Задание в файле README.md ********
 */

import galleryItems from "./gallery-items.js";

/** 
Creation and rendering of markup according to the data array and the provided template. */
const createElementTag = (tagName, className, attrs = {}) => {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    for (let key in attrs) {
        elem.setAttribute(key, attrs[key])
    }
    return elem;
}

const createGalleryBlockTag = (arr) => {

    const galleryImageRef = createElementTag("img", "gallery__image", {
        "data-source": arr.original,
        src:arr.preview,
        alt:arr.description,
    });

    const linkElem = createElementTag("a", "gallery__link", {
        "href": arr.original
    });

    linkElem.append(galleryImageRef);

    const liItemElem = createElementTag("li", "gallery__item")
    liItemElem.append(linkElem)

    return liItemElem;
};

const readyBlockTags = galleryItems.map((jpg) => createGalleryBlockTag(jpg));

const ulElemRef = document.querySelector('.js-gallery');
console.log(readyBlockTags); /////**** */

ulElemRef.append(...readyBlockTags);

const onClickImg = (event) => {
    if (event.target.nodeName !== "IMG") {
        return;
    }
    console.log(event.target.dataset.source);
};

ulElemRef.addEventListener('click', onClickImg);