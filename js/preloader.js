// Preloader

/** @type {HTMLDivElement?} */
let preloader = undefined;
/** @type {HTMLDivElement?} */
let preloaderProg = undefined;

let loadedCount = 0;
// 1 for the fonts and styles
let totalCount = 1;

const pageLoadedEvent = new Event("pageLoadedEvent");
const pageLoadFailEvent = new Event("pageLoadFailEvent");
const assetLoadFailEvent = new Event("assetLoadFailEvent");

function showProgress(xhr) {
    loadedCount++;
    if (xhr && xhr.status !== 200)
        dispatchEvent(assetLoadFailEvent);
    if (preloaderProg)
        preloaderProg.style.width =
            `${Math.round((loadedCount / totalCount) * 100)}%`;
    if (loadedCount === totalCount)
        dispatchEvent(pageLoadedEvent);
}

addEventListener("DOMContentLoaded", _ => {
    loadedCount = 0;
    totalCount = 1;
    preloader = document.querySelector(".preloader");
    preloaderProg =
        document.querySelector(".preloader-progress-bar-done");
    fetch("/navigation.json")
        .then(resp => resp.text())
        .then(resp => {
            /** @type {import("../navigation.json")} */
            const nav = JSON.parse(resp);
            const dest = (new URL(window.location.href)).pathname
                .replace(/index\.html$/, "");
            window.history.replaceState(null, "", dest);
            if (!(dest in nav)) {
                dispatchEvent(pageLoadFailEvent);
                return;
            }
            totalCount += nav[dest].length;
            nav[dest].forEach(asset => {
                const xhr = new XMLHttpRequest();
                xhr.onload = _ => showProgress(xhr);
                xhr.onerror = _ => dispatchEvent(pageLoadFailEvent);
                xhr.open("GET", asset, true);
                xhr.send();
            })
        });
}, { once: true });

addEventListener("load", _ => {
    showProgress();
})

addEventListener("pageLoadedEvent", _ => {
    setTimeout(() => {
        document.body.classList.remove("body-loading");
        setWeWorkHeight()
        preloader.classList.add("preloader-loaded");
        AOS.init({ useClassNames: true, once: true });
    }, 1000);
});

addEventListener("pageLoadFailEvent", _ => {
    const errDiv = document.createElement("div");
    const errMsg = document.createElement("em");
    errMsg.innerHTML = "Failed to load the webpage. Incorrect link or Network error."
    errDiv.classList.add("preloader-fail");
    errDiv.appendChild(errMsg);
    preloader.appendChild(errDiv);
}, { once: true });

addEventListener("assetLoadFailEvent", _ => {
    const errDiv = document.createElement("div");
    const errMsg = document.createElement("em");
    errMsg.innerHTML = "Failed to load an asset. Website might not work as expected."
    errDiv.classList.add("preloader-fail");
    errDiv.appendChild(errMsg);
    preloader.appendChild(errDiv);
}, { once: true });

addEventListener("pageshow", ev => {
    if (ev.persisted) {
        loadedCount = 0;
        totalCount = 1;
        preloaderProg.style.width = "1px";
        const animElements = document.querySelectorAll(".aos-animate");
        animElements.forEach(el => el.removeAttribute("data-aos"));
        AOS.refresh();
        preloader.classList.remove("preloader-loaded");
        document.body.classList.add("body-loading");
        animElements.forEach(el => {
            el.setAttribute("data-aos", "fade-up");
        });
        setTimeout(showProgress, 0);
        AOS.refresh();
    }
});
