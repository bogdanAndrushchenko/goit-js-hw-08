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
    elem.setAttribute(key, attrs[key]);
  }
  return elem;
};

const createGalleryBlockTag = (arr) => {
  const galleryImageRef = createElementTag("img", "gallery__image", {
    "data-source": arr.original,
    src: arr.preview,
    alt: arr.description,
  });

  const linkElem = createElementTag("a", "gallery__link", {
    href: arr.original,
  });

  linkElem.append(galleryImageRef);

  const liItemElem = createElementTag("li", "gallery__item");
  liItemElem.append(linkElem);

  return liItemElem;
};

const readyBlockTags = galleryItems.map((jpg) => createGalleryBlockTag(jpg));

const refs = {
  ulElem: document.querySelector(".js-gallery"),
  openModal: document.querySelector(".js-lightbox"),
  btnClose: document.querySelector('[data-action="close-lightbox"]'),
};

refs.ulElem.append(...readyBlockTags);

/**
Implementing delegation on ul.js-gallery and getting url of large image
Opening a modal window by clicking on a gallery item. */

const onOpenModal = () => {
  // window.addEventListener("keydown", onPressEscape);
  refs.openModal.classList.add("is-open");
};

/* Change the value of the src attribute of the img.lightbox__image element.*/

const openImg = refs.openModal.querySelector(".lightbox__image");

const changeURL = () => {
  openImg.src = event.target.dataset.source;
  openImg.alt = event.target.alt;
};

const onClickImg = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  onOpenModal();
  changeURL();
};

/** 
Closing the modal window by clicking on the button [data-action = "close-modal"].
and clearing the src attribute value of the img.lightbox__image element
 */

const closeModal = (event) => {
  // window.removeEventListener("keydown", onPressEscape);
  refs.openModal.classList.remove("is-open");
  openImg.src = "";
  openImg.alt = " ";
  console.log(event.target);
};

refs.ulElem.addEventListener("click", onClickImg);
refs.btnClose.addEventListener("click", closeModal);

// const closeModalBtn = document.querySelector(
//   'button[data-action="close-modal"]'
// );
// const backDropRef = document.querySelector(".js-backdrop");
