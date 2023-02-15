const Units = (() => {
    let displayedUnit = "imperial";
    
    const changeUnit = () => {
        if (displayedUnit === "imperial") {
            displayedUnit = "metric";
        } else if (displayedUnit === "metric") {
            displayedUnit = "imperial";
        }
    };

    const getCurrentUnit = () => displayedUnit;

    return { changeUnit, getCurrentUnit }
})();

export default Units;