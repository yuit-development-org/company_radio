"use strict";

console.log("つながる放送局のサイトを読み込みました。");

document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach((element) => {
        observer.observe(element);
    });
});


/* 月別アーカイブモーダル */
document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.querySelector("[data-archive-open]");
    const modal = document.getElementById("archive-modal-september");

    if (!openButton || !modal) return;

    const closeButton = modal.querySelector(".archive-modal-close");
    let previousFocus = null;

    const openModal = () => {
        previousFocus = document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeButton.focus();
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = "";
        previousFocus?.focus();
    };

    openButton.addEventListener("click", openModal);

    modal.querySelectorAll("[data-archive-close]").forEach((element) => {
        element.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (modal.hidden) return;

        if (event.key === "Escape") {
            closeModal();
        }

        // Tabキーでフォーカスがモーダル外へ出ないようにする
        if (event.key === "Tab") {
            const focusable = Array.from(
                modal.querySelectorAll("button, a[href]")
            );

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });
});
