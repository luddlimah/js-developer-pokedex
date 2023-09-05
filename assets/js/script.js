document.addEventListener("DOMContentLoaded", function() {
    // Make a request to the PokeAPI to get details of Bulbasaur
    fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur/")
    .then(response => response.json())
    .then(data => {
        // Update the elements with the data from the API response
        document.getElementById("pokemon-name").textContent = data.name;
        document.getElementById("pokemon-id").textContent = `#${data.id}`;
        const types = data.types.map(type => type.type.name).join(", ");
        document.querySelector(".pokemon-card p:nth-child(3)").textContent = `Type: ${types}`;
        document.querySelector(".pokemon-card p:nth-child(4)").textContent = `Height: ${data.height / 10}m`;
        document.querySelector(".pokemon-card p:nth-child(5)").textContent = `Weight: ${data.weight / 10}kg`;

        // Fetch abilities data from the given URL
        fetch(data.abilities[0].ability.url)
        .then(response => response.json())
        .then(abilityData => {
            const abilities = data.abilities.map(ability => abilityData.names.find(name => name.language.name === "en").name).join(", ");
            document.querySelector(".pokemon-card p:nth-child(6)").textContent = `Abilities: ${abilities}`;
        });

        // You can similarly fetch other data like weaknesses and stats here
    })
    .catch(error => console.error("Error fetching data:", error));
});
