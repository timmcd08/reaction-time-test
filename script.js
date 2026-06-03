let startTime;
let waiting = false;

let trial = 0;
let totalTrials = 10;

let reactionTimes = [];

const box = document.getElementById("box");
const result = document.getElementById("result");

box.addEventListener("click", function () {

    // FALSE START
    if (waiting && box.style.backgroundColor !== "green") {
        result.textContent = "Too early! Wait for green.";
        return;
    }

    // START A NEW TRIAL
    if (!waiting) {

        box.style.backgroundColor = "red";
        box.textContent = "Wait...";
        result.textContent =
            "Trial " + (trial + 1) + " of " + totalTrials;

        waiting = true;

        // Random delay between 2–5 seconds
        let delay = Math.random() * 3000 + 2000;

        setTimeout(() => {

            box.style.backgroundColor = "green";
            box.textContent = "CLICK!";

            startTime = Date.now();

        }, delay);
    }

    // USER CLICKS AFTER GREEN
    else if (box.style.backgroundColor === "green") {

        let reactionTime = Date.now() - startTime;

        reactionTimes.push(reactionTime);

        trial++;

        // SHOW RESULT FOR THIS TRIAL
        result.textContent =
            "Trial " + trial +
            ": " + reactionTime + " ms";

        box.style.backgroundColor = "red";
        box.textContent = "Click for Next Trial";

        waiting = false;

        // AFTER 10 TRIALS
        if (trial === totalTrials) {

            // Calculate average
            let sum = 0;

            for (let time of reactionTimes) {
                sum += time;
            }

            let average = Math.round(sum / totalTrials);

            result.innerHTML =
                "Reaction Times: " +
                reactionTimes.join(", ") +
                " ms<br><br>" +
                "Average Reaction Time: " +
                average + " ms";

            box.textContent = "Test Complete";

            // Disable further clicking
            box.style.pointerEvents = "none";
        }
    }
});
