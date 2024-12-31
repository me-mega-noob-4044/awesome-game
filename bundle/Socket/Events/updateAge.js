import { ageDisplay } from "../../main.js";

export default function updateAge(age) {
    ageDisplay.innerText = `Level ${age}`;
}