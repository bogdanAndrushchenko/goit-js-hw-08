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

  const liItemElem = createElementTag("li", "gallery__item", {});
  liItemElem.append(linkElem);

  return liItemElem;
};

const readyBlockTags = galleryItems.map((jpg, i) =>
  createGalleryBlockTag(jpg, i)
);

const refs = {
  ulElem: document.querySelector(".js-gallery"),
  openModal: document.querySelector(".js-lightbox"),
  btnClose: document.querySelector('[data-action="close-lightbox"]'),
  lightBoxContent: document.querySelector(".lightbox__content"),
};

refs.ulElem.append(...readyBlockTags);

/**
Implementing delegation on ul.js-gallery and getting url of large image
Opening a modal window by clicking on a gallery item. */

const onPressHandler = (event) => {
  if (event.code === "Escape") closeModal();
  if (event.code === "ArrowLeft") onPressPrev(galleryItems);
  if (event.code === "ArrowRight") onPressNext(galleryItems)
};

const onOpenModal = () => {
  window.addEventListener("keydown", onPressHandler);

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

const closeModal = () => {
  window.removeEventListener("keydown", onPressHandler);

  refs.openModal.classList.remove("is-open");
  openImg.src = " ";
  openImg.alt = " ";
};

const closeOnBackDropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
    return;
  }
};

const onPressPrev = (arr) => {
  const activeIdx = arr.findIndex((el) => el.original === openImg.src);
  const prevImg = arr.find((el, i) => i === activeIdx - 1);
  if (activeIdx === 0) {
    return
  }

  openImg.src = prevImg.original
  openImg.alt = prevImg.alt;
};
const onPressNext = (arr) => {
  const activeIdx = arr.findIndex((el) => el.original === openImg.src);
  const nextImg = arr.find((el, i) => i === activeIdx + 1);
  if (activeIdx === arr.length - 1) {
    return
  }
  openImg.src = nextImg.original;
  openImg.alt = nextImg.alt;
};

refs.ulElem.addEventListener("click", onClickImg);
refs.btnClose.addEventListener("click", closeModal);
refs.lightBoxContent.addEventListener("click", closeOnBackDropClick);
window.addEventListener("keydown", onPressHandler);