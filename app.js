let coins = 0;

let energy = 100;

const maxEnergy = 100;

let tapPower = 1;

let upgradeCost = 100;

let level = 1;

let totalTaps = 0;

let referralCount = 0;

let referralBonus = 0;


const coinsText =
    document.getElementById("coins");

const energyText =
    document.getElementById("energy");

const energyFill =
    document.getElementById("energyFill");

const tapButton =
    document.getElementById("tapButton");

const levelText =
    document.getElementById("level");

const tapPowerText =
    document.getElementById("tapPowerText");

const upgradeCostText =
    document.getElementById("upgradeCost");


function updateScreen() {

    coinsText.innerText = coins;

    energyText.innerText = energy;

    levelText.innerText = level;

    tapPowerText.innerText = tapPower;

    upgradeCostText.innerText = upgradeCost;


    document.getElementById(
        "referralCount"
    ).innerText = referralCount;


    document.getElementById(
        "referralBonus"
    ).innerText = referralBonus;


    document.getElementById(
        "myRankCoins"
    ).innerText = coins;


    document.getElementById(
        "profileCoins"
    ).innerText = coins;


    document.getElementById(
        "totalTaps"
    ).innerText = totalTaps;


    document.getElementById(
        "profilePower"
    ).innerText = tapPower;


    document.getElementById(
        "profileRefs"
    ).innerText = referralCount;


    document.getElementById(
        "profileLevel"
    ).innerText = level;


    const percent =
        (energy / maxEnergy) * 100;

    energyFill.style.width =
        percent + "%";
}


/* TAP */

tapButton.addEventListener(
    "click",
    function () {

        if (energy < 1) {

            alert(
                "⚡ Energy শেষ!"
            );

            return;
        }


        coins += tapPower;

        energy -= 1;

        totalTaps += 1;


        updateScreen();

    }
);


/* ENERGY RECHARGE */

setInterval(
    function () {

        if (energy < maxEnergy) {

            energy += 1;

            updateScreen();

        }

    },
    1000
);


/* UPGRADE */

function upgradeTap() {

    if (coins < upgradeCost) {

        alert(
            "🪙 Upgrade করতে " +
            upgradeCost +
            " Coin লাগবে!"
        );

        return;
    }


    coins -= upgradeCost;

    tapPower += 1;

    level += 1;

    upgradeCost =
        Math.floor(
            upgradeCost * 1.5
        );


    updateScreen();


    alert(
        "🎉 Upgrade Successful!\n\n" +
        "⚡ Tap Power: +" +
        tapPower +
        "\n🏆 Level: " +
        level
    );
}


/* PAGE SWITCH */

function showPage(page) {

    document.getElementById(
        "homePage"
    ).style.display = "none";


    document.getElementById(
        "tasksPage"
    ).style.display = "none";


    document.getElementById(
        "referralPage"
    ).style.display = "none";


    document.getElementById(
        "leaderboardPage"
    ).style.display = "none";


    document.getElementById(
        "profilePage"
    ).style.display = "none";


    if (page === "home") {

        document.getElementById(
            "homePage"
        ).style.display = "block";
    }


    if (page === "tasks") {

        document.getElementById(
            "tasksPage"
        ).style.display = "block";
    }


    if (page === "referral") {

        document.getElementById(
            "referralPage"
        ).style.display = "block";
    }


    if (page === "leaderboard") {

        document.getElementById(
            "leaderboardPage"
        ).style.display = "block";
    }


    if (page === "profile") {

        document.getElementById(
            "profilePage"
        ).style.display = "block";
    }
}


/* TASK */

function claimTask(button, reward) {

    if (
        button.classList.contains(
            "completed"
        )
    ) {

        return;
    }


    coins += reward;


    button.innerText =
        "✓ DONE";


    button.classList.add(
        "completed"
    );


    updateScreen();


    alert(
        "🎉 Task Completed!\n\n+" +
        reward +
        " Coins"
    );
}


/* REFERRAL COPY */

function copyReferral() {

    const input =
        document.getElementById(
            "referralLink"
        );


    navigator.clipboard
        .writeText(input.value)
        .then(
            function () {

                alert(
                    "✅ Referral Link copied!"
                );

            }
        )
        .catch(
            function () {

                input.select();

                document.execCommand(
                    "copy"
                );

                alert(
                    "✅ Referral Link copied!"
                );

            }
        );
}


/* START */

updateScreen();