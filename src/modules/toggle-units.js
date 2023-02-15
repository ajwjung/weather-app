import Display from "./display-weather.js";

const Units = (() => {
    const toggleBtn = document.getElementById("units-btn");
    let displayedUnit = "imperial";
    
    const changeUnit = () => {
        if (displayedUnit === "imperial") {
            displayedUnit = "metric";
        } else if (displayedUnit === "metric") {
            displayedUnit = "imperial";
        }
    };

    const getCurrentUnit = () => displayedUnit;

    const updateDisplayUnits = () => {
        toggleBtn.addEventListener("click", () => {
            Units.changeUnit();
            const units = Units.getCurrentUnit();
            Display.setUnits(units);
        });
    }

    return { changeUnit, getCurrentUnit, updateDisplayUnits }
})();

export default Units;