/* =====================================
   REAL TAP BOT
   Telegram Mini App
===================================== */


/* TELEGRAM */

const tg = window.Telegram?.WebApp;


/* INITIALIZE */

if (tg) {

    tg.ready();

    tg.expand();

}


/* USER */

let telegramUser = null;

if (tg && tg.initDataUnsafe) {

    telegramUser = tg.initDataUnsafe.user;

}


/* USER NAME */

function getUserName() {

    if (!telegramUser) {
        return "@Player";
    }

    if (telegramUser.username) {

        return "@" + telegramUser.username;

    }

    if (telegramUser.first_name) {

        return telegramUser.first_name;

    }

    return "@Player";
}


/* PROFILE NAME */

function getFullName() {

    if (!telegramUser) {
        return "Player";
    }

    let name = telegramUser.first_name || "";

    if (telegramUser.last_name) {

        name += " " + telegramUser.last_name;

    }

    return name.trim() || "Player";
}


/* DATA */

let coins =
    Number(localStorage.getItem("coins")) || 0;

let energy =
    Number(localStorage.getItem("energy"));

if (isNaN(energy)) {
    energy = 100;
}

let level =
    Number(localStorage.getItem("level")) || 1;

let tapPower =
    Number(localStorage.getItem("tapPower")) || 1;

let refCount =
    Number(localStorage.getItem("refCount")) || 0;

let taskCompleted =
    localStorage.getItem("taskCompleted") === "true";


/* CONSTANTS */

const MAX_ENERGY = 100;


/* UPGRADE COST */

function getUpgradeCost() {

    return 100 * level;

}


/* SAVE */

function saveData() {

    localStorage.setItem(
        "coins",
        coins
    );

    localStorage.setItem(
        "energy",
        energy
    );

    localStorage.setItem(
        "level",
        level
    );

    localStorage.setItem(
        "tapPower",
        tapPower
    );

    localStorage.setItem(
        "refCount",
        refCount
    );

    localStorage.setItem(
        "taskCompleted",
        taskCompleted
    );

}


/* UPDATE UI */

function updateUI() {

    document.getElementById("coins").textContent =
        coins.toLocaleString();

    document.getElementById("energy").textContent =
        energy;

    document.getElementById("level").textContent =
        level;

    document.getElementById("tapPower").textContent =
        tapPower;

    document.getElementById("upgradeCost").textContent =
        getUpgradeCost();

    document.getElementById("profileCoins").textContent =
        coins.toLocaleString();

    document.getElementById("profileLevel").textContent =
        level;

    document.getElementById("refCount").textContent =
        refCount;


    /* ENERGY BAR */

    let percentage =
        (energy / MAX_ENERGY) * 100;

    document.getElementById(
        "energyFill"
    ).style.width = percentage + "%";


    /* USER */

    document.getElementById(
        "username"
    ).textContent = getUserName();


    document.getElementById(
        "profileName"
    ).textContent = getFullName();


    document.getElementById(
        "profileUsername"
    ).textContent = getUserName();


    /* REFERRAL */

    let userId =
        telegramUser?.id || "player";

    document.getElementById(
        "refLink"
    ).textContent =
        "https://t.me/RealTapOfficialBot?start=" +
        userId;


    saveData();

}


/* TAP */

const tapButton =
    document.getElementById("tapButton");


tapButton.addEventListener(
    "click",
    function () {

        if (energy <= 0) {

            alert("⚡ Energy শেষ!");

            return;

        }


        coins += tapPower;

        energy -= 1;


        /* Telegram vibration */

        if (
            tg &&
            tg.HapticFeedback
        ) {

            tg.HapticFeedback.impactOccurred(
                "light"
            );

        }


        updateUI();

    }
);


/* UPGRADE */

const upgradeButton =
    document.getElementById(
        "upgradeButton"
    );


upgradeButton.addEventListener(
    "click",
    function () {

        let cost =
            getUpgradeCost();


        if (coins < cost) {

            alert(
                "🪙 আপনার পর্যাপ্ত Coin নেই!"
            );

            return;

        }


        coins -= cost;

        level += 1;

        tapPower += 1;


        if (
            tg &&
            tg.HapticFeedback
        ) {

            tg.HapticFeedback.notificationOccurred(
                "success"
            );

        }


        updateUI();

    }
);


/* ENERGY REGENERATION */

setInterval(
    function () {

        if (energy < MAX_ENERGY) {

            energy += 1;

            updateUI();

        }

    },
    3000
);


/* TASK */

const taskButton =
    document.getElementById(
        "taskButton"
    );


taskButton.addEventListener(
    "click",
    function () {

        if (taskCompleted) {

            alert(
                "✅ Task already completed!"
            );

            return;

        }


        /*
          Demo reward.

          Later this will be checked
          from the server.
        */

        coins += 100;

        taskCompleted = true;

        taskButton.textContent =
            "Completed";

        updateUI();


        alert(
            "🎉 আপনি 100 Coin পেয়েছেন!"
        );

    }
);


/* PAGE SYSTEM */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        function (page) {

            page.classList.remove(
                "active"
            );

        }
    );


    const selected =
        document.getElementById(
            pageId
        );


    if (selected) {

        selected.classList.add(
            "active"
        );

    }

}


/* REFERRAL SHARE */

function shareReferral() {

    let userId =
        telegramUser?.id || "player";


    let referralLink =
        "https://t.me/RealTapOfficialBot?start=" +
        userId;


    let text =
        "🔥 Join Real Tap Bot and start earning Coins!";


    let shareUrl =
        "https://t.me/share/url?url=" +
        encodeURIComponent(
            referralLink
        ) +
        "&text=" +
        encodeURIComponent(
            text
        );


    if (
        tg &&
        tg.openTelegramLink
    ) {

        tg.openTelegramLink(
            shareUrl
        );

    } else {

        window.open(
            shareUrl,
            "_blank"
        );

    }

}


/* START */

updateUI();