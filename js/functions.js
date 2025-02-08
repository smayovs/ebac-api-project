let initialPage = 1;
let initialCat = "character";
const apiURL = "https://rickandmortyapi.com/api/";

const loadAPI = async (cat, page = 1) => {
    initialPage = page;
    initialCat = cat;

    const mainGrid = document.getElementById("main-grid");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    try {
        const response = await axios.get(`${apiURL}${cat}?page=${page}`);
        const cards = response.data.results;
        
        mainGrid.innerHTML="";

        for(const card of cards) {
            let cardBG;
            if (cat === "character") {
                cardBG = createCharacterCard(card);
            } else if (cat === "location") {
                cardBG = createLocationCard(card);
            } else if (cat === "episode") {
                cardBG = createEpisodeCard(card);
            }
            mainGrid.appendChild(cardBG);
        }

        prevButton.disabled = !response.data.info.prev;
        prevButton.classList.toggle("disabled", prevButton.disabled);

        nextButton.disabled = !response.data.info.next;
        nextButton.classList.toggle("disabled", nextButton.disabled);

        document.getElementById("character-button").classList.toggle("button-active", cat === "character");
        document.getElementById("location-button").classList.toggle("button-active", cat === "location");
        document.getElementById("episodes-button").classList.toggle("button-active", cat === "episode");

    } catch (error) {
        console.log("Error: ", error);        
    }
}

document.getElementById("character-button").addEventListener("click", () => loadAPI("character"));
document.getElementById("location-button").addEventListener("click", () => loadAPI("location"));
document.getElementById("episodes-button").addEventListener("click", () => loadAPI("episode"));

const prevPage = () => {
    if(initialPage > 1){
        loadAPI(initialCat, initialPage - 1);
    }
}

const nextPage = () => {
    loadAPI(initialCat, initialPage + 1);
}

document.getElementById("prev-button").addEventListener("click", prevPage);
document.getElementById("next-button").addEventListener("click", nextPage);

document.addEventListener("DOMContentLoaded", () => loadAPI("character"));

const createCharacterCard = (character) => {
    const cardBG = document.createElement("div");
    cardBG.classList.add("character-card-bg");

    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");

    //---Image
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("character-img-container");

    const characterImg = document.createElement("img");
    characterImg.classList.add("character-img");
    characterImg.src = character.image;
    characterImg.alt = character.name;

    imgContainer.appendChild(characterImg);

    //---Info
    const characterInfo = document.createElement("div");
    characterInfo.classList.add("info-div");

    //---Name
    const characterName = document.createElement("p");
    characterName.classList.add("info-name");
    characterName.textContent = character.name;

    //---Species
    const speciesDiv = document.createElement("div");
    speciesDiv.classList.add("tag-div");
    
    const speciesTag = document.createElement("span");
    speciesTag.classList.add("tag");
    speciesTag.textContent = "Species: ";

    const characterSpecies = document.createElement("p");
    characterSpecies.classList.add("info");
    characterSpecies.textContent= character.species;

    speciesDiv.appendChild(speciesTag);
    speciesDiv.appendChild(characterSpecies);

    //---Status
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("tag-div");
    
    const statusTag = document.createElement("span");
    statusTag.classList.add("tag");
    statusTag.textContent = "Status: ";

    const characterStatus = document.createElement("p");
    characterStatus.classList.add("info");
    characterStatus.textContent= character.status;

    if (characterStatus.textContent === "Alive"){
        characterStatus.classList.add("info-alive");
    } else if (characterStatus.textContent === "Dead"){
        characterStatus.classList.add("info-dead");
    }

    statusDiv.appendChild(statusTag);
    statusDiv.appendChild(characterStatus);

    //---Origen
    const originDiv = document.createElement("div");
    originDiv.classList.add("tag-div");
    
    const originTag = document.createElement("span");
    originTag.classList.add("tag");
    originTag.textContent = "Origin: ";

    const characterOrigin = document.createElement("p");
    characterOrigin.classList.add("info");
    characterOrigin.textContent= character.origin.name;

    originDiv.appendChild(originTag);
    originDiv.appendChild(characterOrigin);

    //---Info Structure
    characterInfo.appendChild(characterName);
    characterInfo.appendChild(speciesDiv);
    characterInfo.appendChild(statusDiv);
    characterInfo.appendChild(originDiv);

    //---Card Structure
    characterCard.appendChild(imgContainer);
    characterCard.appendChild(characterInfo);

    cardBG.appendChild(characterCard);

    return cardBG;
};

const createLocationCard = (location) => {
    const cardBG = document.createElement("div");
    cardBG.classList.add("card-bg");

    const locationCard = document.createElement("div");
    locationCard.classList.add("info-card");

    //--Info
    const locationInfo = document.createElement("div");
    locationInfo.classList.add("info-div");

    //---Name
    const locationName = document.createElement("p");
    locationName.classList.add("info-name");
    locationName.textContent = location.name;

    //---Type
    const typeDiv = document.createElement("div");
    typeDiv.classList.add("tag-div");
    
    const typeTag = document.createElement("span");
    typeTag.classList.add("tag");
    typeTag.textContent = "Type: ";

    const locationType = document.createElement("p");
    locationType.classList.add("info");
    locationType.textContent= location.type;

    typeDiv.appendChild(typeTag);
    typeDiv.appendChild(locationType);

    //---Dimension
    const dimensionDiv = document.createElement("div");
    dimensionDiv.classList.add("tag-div");
    
    const dimensionTag = document.createElement("span");
    dimensionTag.classList.add("tag");
    dimensionTag.textContent = "Dimension: ";

    const locationDimension = document.createElement("p");
    locationDimension.classList.add("info");
    locationDimension.textContent= location.dimension;

    dimensionDiv.appendChild(dimensionTag);
    dimensionDiv.appendChild(locationDimension);

    //---Info Structure
    locationInfo.appendChild(locationName);
    locationInfo.appendChild(typeDiv);
    locationInfo.appendChild(dimensionDiv);

    //---Card Structure
    locationCard.appendChild(locationInfo);

    cardBG.appendChild(locationCard);

    return cardBG;
};

const createEpisodeCard = (episode) => {
    const cardBG = document.createElement("div");
    cardBG.classList.add("card-bg");

    const episodeCard = document.createElement("div");
    episodeCard.classList.add("info-card");

    //--Info
    const episodeInfo = document.createElement("div");
    episodeInfo.classList.add("info-div");

    //---Name
    const episodeName = document.createElement("p");
    episodeName.classList.add("info-name");
    episodeName.textContent = episode.name;

    //---Air Date
    const airDiv = document.createElement("div");
    airDiv.classList.add("tag-div");
    
    const airTag = document.createElement("span");
    airTag.classList.add("tag");
    airTag.textContent = "Air Date: ";

    const episodeAirDate = document.createElement("p");
    episodeAirDate.classList.add("info");
    episodeAirDate.textContent= episode.air_date;

    airDiv.appendChild(airTag);
    airDiv.appendChild(episodeAirDate);

    //---Season
    const seasonDiv = document.createElement("div");
    seasonDiv.classList.add("tag-div");
    
    const seasonTag = document.createElement("span");
    seasonTag.classList.add("tag");
    seasonTag.textContent = "Season: ";

    const episodeSeason = document.createElement("p");
    episodeSeason.classList.add("info");
    episodeSeason.textContent= episode.episode;

    seasonDiv.appendChild(seasonTag);
    seasonDiv.appendChild(episodeSeason);

    //---Info Structure
    episodeInfo.appendChild(episodeName);
    episodeInfo.appendChild(airDiv);
    episodeInfo.appendChild(seasonDiv);

    //---Card Structure
    episodeCard.appendChild(episodeInfo);

    cardBG.appendChild(episodeCard);

    return cardBG;
};