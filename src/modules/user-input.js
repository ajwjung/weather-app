const UserInput = (() => {
    const searchForm = document.querySelector("form");
    let location;

    const updateLocation = (text) => {
        location = text;
    };

    const getLocation = () => location;
    
    const saveLocation = () => {
        const input = document.getElementById("user-input");

        searchForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            updateLocation(input.value);
            console.log(input.value);
        });
    };
    
    return { saveLocation, getLocation };
})();

export default UserInput;