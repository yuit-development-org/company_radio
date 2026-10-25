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
    const openButtons = document.querySelectorAll("[data-archive-open]");
    let previousFocus = null;
    let activeModal = null;

    // モーダルを開く
    const openModal = (modal) => {
        if (!modal) return;

        previousFocus = document.activeElement;
        activeModal = modal;

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        const closeButton = modal.querySelector(".archive-modal-close");
        closeButton?.focus();
    };

    // モーダルを閉じる
    const closeModal = () => {
        if (!activeModal) return;

        activeModal.hidden = true;
        document.body.style.overflow = "";

        activeModal = null;
        previousFocus?.focus();
    };

    // 月別ボタン
    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("aria-controls");
            const modal = document.getElementById(modalId);

            openModal(modal);
        });
    });

    // 閉じるボタン・背景クリック
    document.querySelectorAll("[data-archive-close]").forEach((element) => {
        element.addEventListener("click", closeModal);
    });

    // キーボード操作
    document.addEventListener("keydown", (event) => {
        if (!activeModal) return;

        if (event.key === "Escape") {
            closeModal();
            return;
        }

        // Tabキーでフォーカスが外に出ないようにする
        if (event.key === "Tab") {
            const focusable = Array.from(
                activeModal.querySelectorAll(
                    'button:not([disabled]), a[href]'
                )
            );

            if (focusable.length === 0) {
                event.preventDefault();
                return;
            }

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
