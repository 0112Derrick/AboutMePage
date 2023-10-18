import { HTML_IDS as $HTML_IDS_INDEX } from "../constants/htmlIds.js";
import Card from "./Card.js";
let homeBtn = document.getElementById("directory-logo");
class MissingElementError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Missing Html Element';
    }
}
var RockPaperScissors;
(function (RockPaperScissors) {
    RockPaperScissors["rock"] = "Rock";
    RockPaperScissors["paper"] = "Paper";
    RockPaperScissors["scissor"] = "Scissor";
    RockPaperScissors["rockIMG"] = "<img class=\"charmander\" id=\"charmander\" src=\"../images/charmander_happy.webp\" alt=\"Charmander\" width=\"100\" height=\"100\" style =\"border-radius:30% \">";
    RockPaperScissors["paperIMG"] = "<img class=\"squirtle\" id=\"squirtle\" src=\"../images/squirtle-happily-smiling.gif\" alt=\"Squirtle\" width=\"100\" height=\"100\" style =\"border-radius:30% \">";
    RockPaperScissors["scissorIMG"] = "<img class=\"bulbasaur\" id=\"bulbasaur\" src=\"../images/bulbasaur_smile.gif\" alt=\"Bulbasaur\" width=\"100\" height=\"100\" style =\"border-radius:30% \">";
    RockPaperScissors["rockIMG2"] = "<img class=\"charmander\" id=\"charmander_atk\" src=\"../images/charmander-big-flame-thrower.gif\" alt=\"Charmander\" width=\"100\" height=\"100\" style=\"border-radius:30%\">";
    RockPaperScissors["paperIMG2"] = "<img class=\"squirtle\" id=\"squirtle_atk\" src=\"../images/pokemon-squirtle-hydro-pump.gif\" alt=\"Squirtle\" width=\"100\" height=\"100\" style =\"border-radius:30% \">";
    RockPaperScissors["scissorIMG2"] = "<img class=\"bulbasaur\" id=\"bulbasaur_atk\" src=\"../images/pokemon-bulbasaur-atk.gif\" alt=\"Bulbasaur\" width=\"100\" height=\"100\" style =\"border-radius:30% \">";
    RockPaperScissors["paperIMG3"] = "<img class=\"squirtle\" src=\"../images/squirtle-bites-charmander-squirtle-bite.gif\" alt=\"Squirtle\" width=\"100\" height=\"100\" style =\"border-radius:30% \">";
    RockPaperScissors["scissorIMG3"] = "<img class=\"bulbasaur\" src=\"../images/bulbasaur-squitle.gif\" alt=\"Bulbasaur\" width=\"100\" height=\"100\" style =\"border-radius:30%\">";
})(RockPaperScissors || (RockPaperScissors = {}));
export class View {
    DOM = [];
    slideShowIndex = 1;
    inputBox = document.createElement('div');
    bg_color_1 = 'rgba(136, 223, 255, 0.9)';
    bg_color_2 = 'rgba(255, 230, 105, 0.8)';
    pg_color_1;
    pg_color_2;
    constructor() {
        for (let elem_id in $HTML_IDS_INDEX) {
            let elem = document.getElementById($HTML_IDS_INDEX[elem_id]);
            if (elem) {
                this.DOM[$HTML_IDS_INDEX[elem_id]] = elem;
            }
            else {
                throw new MissingElementError(`Element id: ${$HTML_IDS_INDEX}: ${$HTML_IDS_INDEX[elem_id]} .`);
            }
        }
        this.currentSlide(1);
        this.DOM[$HTML_IDS_INDEX.PORTFOLIO_BTN].addEventListener('click', () => {
            this.scrollToElement($HTML_IDS_INDEX.PORTFOLIO_SECTION);
        });
        this.DOM[$HTML_IDS_INDEX.HOME_BTN].addEventListener("click", () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
        this.DOM[$HTML_IDS_INDEX.CONTACT_BTN].addEventListener('click', () => {
            this.scrollToElement($HTML_IDS_INDEX.CONTACT_SESSION);
        });
        this.DOM[$HTML_IDS_INDEX.PREV_BTN_SLIDESHOW].addEventListener('click', () => {
            this.incrementSlideshow(-1);
        });
        this.DOM[$HTML_IDS_INDEX.NEXT_BTN_SLIDESHOW].addEventListener('click', () => {
            this.incrementSlideshow(1);
        });
        this.DOM[$HTML_IDS_INDEX.DOT_1].addEventListener('click', () => {
            this.currentSlide(1);
        });
        this.DOM[$HTML_IDS_INDEX.DOT_2].addEventListener('click', () => {
            this.currentSlide(2);
        });
        this.DOM[$HTML_IDS_INDEX.DOT_3].addEventListener('click', () => {
            this.currentSlide(3);
        });
        this.DOM[$HTML_IDS_INDEX.HOMEWORK_BTN].addEventListener('click', () => {
            this.DOM[$HTML_IDS_INDEX.MODAL_HW].style.display = "block";
            this.chooseAssignment();
        });
        let span = document.getElementsByClassName("close")[0];
        span.addEventListener('click', () => {
            this.DOM[$HTML_IDS_INDEX.MODAL_HW].style.display = "none";
        });
        window.onclick = (event) => {
            if (event.target == this.DOM[$HTML_IDS_INDEX.MODAL_HW]) {
                this.DOM[$HTML_IDS_INDEX.MODAL_HW].style.display = "none";
            }
        };
        this.inputBox.style.height = "min-content";
        this.inputBox.style.width = "100%";
        this.inputBox.style.display = 'flex';
        this.inputBox.style.flexDirection = 'column';
        this.inputBox.style.padding = '5px';
    }
    incrementSlideshow(n) {
        this.showSlides(this.slideShowIndex += n);
    }
    currentSlide(n) {
        this.showSlides(this.slideShowIndex = n);
    }
    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            this.slideShowIndex = 1;
        }
        if (n < 1) {
            this.slideShowIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideShowIndex - 1].style.display = "block";
        dots[this.slideShowIndex - 1].className += " active";
    }
    scrollToElement(elementId) {
        const element = document.querySelector('#' + elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    async chooseAssignment() {
        this.inputBox.innerHTML = '';
        this.DOM[$HTML_IDS_INDEX.USER_INPUT_MODAL].value = '';
        let inputNode;
        this.DOM[$HTML_IDS_INDEX.USER_INPUT_SUBMIT_BTN_MODAL].addEventListener('click', () => {
            this.processInput();
        });
        this.DOM[$HTML_IDS_INDEX.USER_INPUT_MODAL].addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                this.processInput();
            }
        });
        this.DOM[$HTML_IDS_INDEX.MODAL_CONTENT_HW].appendChild(this.inputBox);
    }
    addClearBTN() {
        this.inputBox.insertAdjacentHTML('afterbegin', "<button id='clearBTN' class='clearBTNModal'>Clear</button>");
        let clear = document.getElementById("clearBTN");
        clear.addEventListener("click", () => {
            this.inputBox.innerHTML = "";
        });
        let inputBoxStyle = this.inputBox.style;
        inputBoxStyle.justifyContent = 'center';
        inputBoxStyle.alignItems = 'center';
        inputBoxStyle.gap = '8px';
    }
    processInput() {
        let assignmentNumb = this.DOM[$HTML_IDS_INDEX.USER_INPUT_MODAL].value;
        this.inputBox.innerHTML = '';
        if (assignmentNumb == 1) {
            this.assignment1();
            this.addClearBTN();
        }
        else if (assignmentNumb == 2) {
            let name = prompt('What is your name?');
            this.assignment2(name);
            this.addClearBTN();
        }
        else if (assignmentNumb == 3) {
            let name = prompt('What is your name?');
            this.assignment3(name);
            this.addClearBTN();
        }
        else if (assignmentNumb == 4) {
            let playerName = prompt("Hello Trainer, What's your name?");
            playerName ? playerName : playerName = 'Player';
            let playerGender = prompt("What's your gender? " + playerName);
            if (playerGender.toLowerCase().trim() == "male" || playerGender.toLowerCase().trim() == "boy" || playerGender.toLowerCase().trim() == "guy" || playerGender.toLowerCase().trim() == "m") {
                playerGender = "male";
            }
            else {
                playerGender = "female";
            }
            this.inputBox.insertAdjacentHTML('afterbegin', "<p>Pick your starter, then we'll battle!</p>");
            this.inputBox.insertAdjacentHTML('afterbegin', `<p>Welcome ${playerName} to the exciting world of pokemon!</p>`);
            this.inputBox.style.textAlign = "center";
            let choice;
            this.inputBox.insertAdjacentHTML('beforeend', '<div id="buttonOptionsContainer" class="buttonOptions"></div>');
            const buttonOptionsContainer = document.getElementById("buttonOptionsContainer");
            this.inputBox.insertAdjacentHTML('beforeend', '<div id = "battlebox" ></div');
            const battlebox = document.getElementById('battlebox');
            battlebox.style.display = 'flex';
            let charmanderCard = new Card('Charmander', 'charmander_card', null, 'Charmander', RockPaperScissors.rockIMG, true, 'charmander');
            charmanderCard.appendCard(buttonOptionsContainer, 'beforeend', 'column', null, null, '10%');
            charmanderCard.editImageCSS(null, '30%', null, null);
            let charmanderCardElement = charmanderCard.getCard();
            charmanderCardElement.addEventListener('mouseover', () => {
                charmanderCardElement.style.cursor = 'pointer';
                charmanderCardElement.style.background = "linear-gradient(45deg, #fe9441,#e53800,#fbc204)";
                charmanderCardElement.style.boxShadow = "10px 10px 4px #010101";
                charmanderCard.getCardDescription().style.color = 'white';
                charmanderCard.getCardDescription().style.fontWeight = '500';
            });
            charmanderCardElement.addEventListener('mouseleave', () => {
                charmanderCardElement.style.boxShadow = "";
                charmanderCardElement.style.background = "none";
                charmanderCard.getCardDescription().style.color = 'black';
                charmanderCard.getCardDescription().style.fontWeight = '';
            });
            charmanderCardElement.addEventListener('click', () => {
                choice = RockPaperScissors.rock;
                battlebox.innerHTML = '';
                this.assignment4(choice, battlebox, playerName, playerGender);
            });
            let squirtleCard = new Card('Squirtle', 'squirtle_card', null, 'Squirtle', RockPaperScissors.paperIMG, true, 'squirtle');
            squirtleCard.appendCard(buttonOptionsContainer, 'beforeend', 'column', null, null, '10%');
            squirtleCard.editImageCSS(null, '30%', null, null, null);
            let squirtleCardElement = squirtleCard.getCard();
            squirtleCardElement.addEventListener('mouseover', () => {
                squirtleCardElement.style.cursor = 'pointer';
                squirtleCardElement.style.background = "linear-gradient(320deg,rgb(202,119,33), rgb(243,200,119),transparent)";
                squirtleCardElement.style.boxShadow = "10px 10px 4px #010101";
                squirtleCard.getCardDescription().style.color = 'white';
                squirtleCard.getCardDescription().style.fontWeight = '500';
            });
            squirtleCardElement.addEventListener('mouseleave', () => {
                squirtleCardElement.style.boxShadow = "";
                squirtleCardElement.style.background = "none";
                squirtleCard.getCardDescription().style.color = 'black';
                squirtleCard.getCardDescription().style.fontWeight = '';
            });
            squirtleCardElement.addEventListener('click', () => {
                choice = RockPaperScissors.paper;
                battlebox.innerHTML = '';
                this.assignment4(choice, battlebox, playerName, playerGender);
            });
            let bulbasaurCard = new Card('Bulbasaur_card', 'bulbasaur_card', null, 'Bulbasaur', RockPaperScissors.scissorIMG, true, 'bulbasaur');
            bulbasaurCard.appendCard(buttonOptionsContainer, 'beforeend', 'column', null, null, '10%');
            bulbasaurCard.editImageCSS(null, '30%', null, null, null);
            let bulbasaurCardElement = bulbasaurCard.getCard();
            bulbasaurCardElement.addEventListener('mouseover', () => {
                bulbasaurCardElement.style.cursor = 'pointer';
                bulbasaurCardElement.style.background = "linear-gradient(45deg, rgb(55,142,142), rgb(112,224,187),transparent)";
                bulbasaurCardElement.style.boxShadow = "10px 10px 4px #010101";
                bulbasaurCard.getCardDescription().style.color = 'white';
                bulbasaurCard.getCardDescription().style.fontWeight = '500';
            });
            bulbasaurCardElement.addEventListener('mouseleave', () => {
                bulbasaurCardElement.style.boxShadow = "";
                bulbasaurCardElement.style.background = "none";
                bulbasaurCard.getCardDescription().style.color = 'black';
                bulbasaurCard.getCardDescription().style.fontWeight = '';
            });
            bulbasaurCardElement.addEventListener('click', () => {
                choice = RockPaperScissors.scissor;
                battlebox.innerHTML = '';
                this.assignment4(choice, battlebox, playerName, playerGender);
            });
            this.addClearBTN();
        }
        else {
            alert("type a valid number.");
        }
    }
    assignment1() {
        this.inputBox.innerText = '';
        let prompt1 = document.createTextNode("Hello, What is your name?");
        this.inputBox.appendChild(prompt1);
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let input1 = document.createElement("input");
        input1.type = 'text';
        div.appendChild(input1);
        let submit = document.createElement("button");
        submit.textContent = "Submit name";
        submit.style.paddingBottom = '5px';
        div.appendChild(submit);
        this.inputBox.appendChild(div);
        let name;
        let input2;
        let age;
        let submit2 = document.createElement("button");
        let input3;
        let submit3 = document.createElement("button");
        submit.addEventListener('click', () => {
            name = input1.value;
            !name ? name = "Anonymous" : name;
            this.inputBox.style.gap = '20px';
            prompt1.textContent = `${name}, What is your age?`;
            input2 = document.createElement("input");
            input2.type = 'number';
            div2.appendChild(input2);
            submit2.textContent = "submit age";
            div2.appendChild(submit2);
            this.inputBox.appendChild(div2);
        });
        submit2.addEventListener('click', () => {
            age = Number.parseInt(input2.value);
            !age ? age = 0 : age;
            this.inputBox.style.gap = '20px';
            prompt1.textContent = `${name}, What is your favorite hobby?`;
            input3 = document.createElement("input");
            input3.type = 'text';
            div3.appendChild(input3);
            submit3.textContent = "submit hobby";
            div3.appendChild(submit3);
            this.inputBox.appendChild(div3);
        });
        submit3.addEventListener('click', () => {
            this.inputBox.style.gap = '20px';
            let p = document.createElement("p");
            p.textContent = `Hi, my name is ${name}, I am ${age} years old, and I like ${input3.value}.`;
            this.inputBox.appendChild(p);
        });
    }
    assignment2(name) {
        let numbOfGames = Number.parseInt(prompt("How many times do you want to play?"));
        for (let i = 0; i < numbOfGames; i++) {
            let randNumber = (Math.floor(Math.random() * 10)) + 1;
            let userGuess = Number.parseInt(prompt(`${name} guess a number between 1 and 10.`));
            randNumber === userGuess ? alert("Correct") : alert(`Incorrect guess. \n Your guess: ${userGuess}\nAnswer:${randNumber}`);
        }
    }
    assignment3(name) {
        let groceryList = [];
        let groceryItem = prompt(`${name}, Add a grocery item.`);
        if (!groceryItem) {
            alert("No item added");
            return;
        }
        else {
            groceryList.push(groceryItem);
        }
        let stopper = true;
        while (stopper) {
            alert(groceryList);
            let userReply = prompt("Would you like to add another item? type: yes or no");
            if (userReply.toLowerCase() === "no") {
                stopper = false;
            }
            else {
                let nextItem = prompt("Add another item.");
                groceryList.push(nextItem);
            }
        }
        groceryList.forEach((item, i) => {
            alert(`Item #${i + 1}: ` + item);
        });
    }
    assignment4(playerChoice, battlebox, playerName, playerGender) {
        let trainers = [{ name: 'Misty', img: '<img src="../images/misty_pkmn.gif" alt"" id="ai_trainer" width="100" height="100"/>' }, { name: 'Brock', img: '<img src="../images/brock_pkmn.gif" alt"" id="ai_trainer" width="100" height="100">' }, { name: 'Red', img: '<img src="../images/pokemon-trainer-red_pkmn.gif" alt"" id="ai_trainer" width="100" height="100"/>' }, { name: 'GaryOak', img: '<img src="../images/garyOak_pkmn.gif" alt"" id="ai_trainer" width="100" height="100"/>' }, { name: 'ProfessorOak', img: '<img src="../images/professorOak_pkmn.gif" alt"" id="ai_trainer" width="100" height="100"/>' }, { name: 'Blaine', img: '<img src="../images/blaine_pkmn.gif" alt"" id="ai_trainer" width="100" height="100"/>' }, { name: 'BugCatcherLilly', img: '<img src="../images/bug_catcher_pkmn.webp" alt"" id="ai_trainer" width="100" height="100"/>' }, { name: 'James', img: '<img src="../images/james_pkmn.gif" alt"" id="ai_trainer" width="100" height="100"/>' }];
        let getTrainer = Math.floor(Math.random() * trainers.length);
        let rock_Paper_Scissors_Array = [RockPaperScissors.paper, RockPaperScissors.rock, RockPaperScissors.scissor];
        let aiChoice = rock_Paper_Scissors_Array.at(Math.floor(Math.random() * 3));
        battlebox.insertAdjacentHTML('beforeend', '<div id="container2"></div>');
        let battlebox_images_container = document.getElementById('container2');
        let trainerCard;
        if (playerGender == 'male') {
            trainerCard = new Card(playerName, playerName, null, playerName, '<img src="../images/poke_male_gif_2.gif" alt"" id="trainer" width="100" height="100"/>', true, playerName);
        }
        else {
            trainerCard = new Card(playerName, playerName, null, playerName, '<img src="../images/pkmn_female.gif" alt"" id="trainer" width="100" height="100"/>', true, playerName);
        }
        trainerCard.appendCard(battlebox_images_container, 'beforeend', 'column', null, null, '10%');
        let trainer = document.getElementById('trainer');
        trainer.style.transform = 'scalex(-1)';
        let opponentCard = new Card(trainers[getTrainer].name, trainers[getTrainer].name, null, trainers[getTrainer].name, trainers[getTrainer].img, true, 'ai_trainer');
        opponentCard.appendCard(battlebox_images_container, 'beforeend', 'column', null, null, '10%');
        opponentCard.getCard().insertAdjacentHTML('beforebegin', `<div id="ai"></div>`);
        let ai = document.getElementById('ai');
        trainerCard.getCard().insertAdjacentHTML('afterend', `<div id="player"></div>`);
        let player = document.getElementById('player');
        battlebox.style.gap = "20px";
        battlebox.style.justifyContent = "center";
        battlebox.style.alignItems = "center";
        battlebox_images_container.style.display = "flex";
        battlebox_images_container.style.gap = "20px";
        battlebox_images_container.style.justifyContent = "center";
        battlebox_images_container.style.alignItems = "center";
        battlebox_images_container.style.flexDirection = "row";
        battlebox.insertAdjacentHTML('beforeend', '<div id = "container"></div>');
        let results_text_container = document.getElementById("container");
        let losingPhrases = [
            `${trainers[getTrainer].name}: You really should learn how to train your Pokémon! 😆👍`,
            `${trainers[getTrainer].name}: Your Pokémon are jealous of my superior trainer skills! 😆🏋️‍♂️`,
            `${trainers[getTrainer].name}: My team is unbeatable! 😅💪`,
            `${trainers[getTrainer].name}: Looks like you need more practice! 😂🎮`,
            `${trainers[getTrainer].name}: You'd be a Pokémon Master in the making! If you didn't suck so bad! 🌟🏆`,
            `${trainers[getTrainer].name}: You need me, to teach you some battle secrets? 😁🤫`,
            `${trainers[getTrainer].name}: I hope you comeback with stronger Pokémon next time! 💪🏻🚀`,
            `${trainers[getTrainer].name}: Bow to my superior Pokémon training! 🙇‍♂️🎩`,
        ];
        let losingPhrase = losingPhrases[Math.floor(Math.random() * losingPhrases.length)];
        if (playerChoice == RockPaperScissors.rock && aiChoice == RockPaperScissors.paper) {
            let rand = Math.floor(Math.random() * 2) + 1;
            console.log('rand:' + rand);
            if (rand == 2) {
                player.insertAdjacentHTML('beforeend', `${RockPaperScissors.rockIMG2}`);
                ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.paperIMG2}`);
            }
            else {
                trainerCard.getCard().insertAdjacentHTML('afterend', RockPaperScissors.paperIMG3);
            }
            let audio = this.inputBox.insertAdjacentHTML('afterbegin', '<audio controls autoplay id="pkmnMusicLost" class="hidden"> <source src="../music/1-32. Pokémon Tower.mp3" type="audio/mpeg"> </audio>');
            let lostMusic = document.getElementById('pkmnMusicLost');
            lostMusic.volume = 0.2;
            setTimeout(() => {
                lostMusic.remove();
                results_text_container.insertAdjacentHTML('beforeend', `<div id='results' class='expand fade resultsTXT'> ${losingPhrase} </div>`);
            }, 6000);
        }
        else if (playerChoice == RockPaperScissors.paper && aiChoice == RockPaperScissors.scissor) {
            player.insertAdjacentHTML('beforeend', `${RockPaperScissors.paperIMG2}`);
            ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.scissorIMG2}`);
            player.style.transform = 'scalex(-1)';
            let audio = this.inputBox.insertAdjacentHTML('afterbegin', '<audio controls autoplay id="pkmnMusicLost" class="hidden"> <source src="../music/1-32. Pokémon Tower.mp3"> </audio>');
            let lostMusic = document.getElementById('pkmnMusicLost');
            lostMusic.volume = 0.2;
            setTimeout(() => {
                lostMusic.remove();
                results_text_container.insertAdjacentHTML('beforeend', `<div id='results' class='expand fade resultsTXT'> ${losingPhrase} </div>`);
            }, 6000);
        }
        else if (playerChoice == RockPaperScissors.scissor && aiChoice == RockPaperScissors.rock) {
            player.insertAdjacentHTML('beforeend', `${RockPaperScissors.scissorIMG2}`);
            ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.rockIMG2}`);
            ai.style.transform = "scalex(-1)";
            let audio = this.inputBox.insertAdjacentHTML('afterbegin', '<audio controls autoplay id="pkmnMusicLost" class="hidden"> <source src="../music/1-32. Pokémon Tower.mp3" type="audio/mpeg"> </audio>');
            let lostMusic = document.getElementById('pkmnMusicLost');
            lostMusic.volume = 0.2;
            setTimeout(() => {
                lostMusic.remove();
                results_text_container.insertAdjacentHTML('beforeend', `<div id='results' class='expand fade resultsTXT'> ${losingPhrase} </div>`);
            }, 6000);
        }
        else if (playerChoice == aiChoice) {
            let img;
            switch (playerChoice) {
                case RockPaperScissors.rock:
                    ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.rockIMG2}`);
                    player.insertAdjacentHTML('beforeend', `${RockPaperScissors.rockIMG2}`);
                    ai.style.transform = "scalex(-1)";
                    break;
                case RockPaperScissors.paper:
                    ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.paperIMG2}`);
                    player.insertAdjacentHTML('beforeend', `${RockPaperScissors.paperIMG2}`);
                    img = document.getElementById('squirtle_atk');
                    img.style.transform = "scalex(-1)";
                    break;
                case RockPaperScissors.scissor:
                    ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.scissorIMG2}`);
                    player.insertAdjacentHTML('beforeend', `${RockPaperScissors.scissorIMG2}`);
                    img = document.getElementById('bulbasaur_atk');
                    img.style.transform = "scalex(-1)";
                    break;
            }
            let audio = this.inputBox.insertAdjacentHTML('afterbegin', '<audio controls autoplay id="pkmnMusicDraw" class="hidden"> <source src="../music/pkmn_gym_music.mp3" type="audio/mpeg"> </audio>');
            let drawMusic = document.getElementById('pkmnMusicDraw');
            drawMusic.volume = 0.2;
            setTimeout(() => {
                drawMusic.remove();
                results_text_container.insertAdjacentHTML('beforeend', "<div id='results' class='expand fade resultsTXT'> DRAW 😖</div>");
            }, 6000);
        }
        else {
            let rand = Math.floor(Math.random() * 2) + 1;
            console.log('rand:' + rand);
            switch (playerChoice) {
                case RockPaperScissors.rock:
                    ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.scissorIMG2}`);
                    player.insertAdjacentHTML('beforeend', `${RockPaperScissors.rockIMG2}`);
                    break;
                case RockPaperScissors.paper:
                    if (rand == 2) {
                        ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.rockIMG2}`);
                        player.insertAdjacentHTML('beforeend', `${RockPaperScissors.paperIMG2}`);
                        player.style.transform = "scalex(-1)";
                        ai.style.transform = "scalex(-1)";
                    }
                    else {
                        trainerCard.getCard().insertAdjacentHTML('afterend', RockPaperScissors.paperIMG3);
                    }
                    break;
                case RockPaperScissors.scissor:
                    if (rand == 2) {
                        player.insertAdjacentHTML('beforeend', `${RockPaperScissors.scissorIMG2}`);
                        ai.insertAdjacentHTML('beforeend', `${RockPaperScissors.paperIMG2}`);
                    }
                    else {
                        trainerCard.getCard().insertAdjacentHTML('afterend', RockPaperScissors.scissorIMG3);
                    }
                    break;
            }
            let text_option1 = "You Win! 😁";
            let text_option2 = `${trainers[getTrainer].name}: You Won??? Did you cheat? 🧐`;
            let text_option3 = `${trainers[getTrainer].name} Great job, you came out on top! 🥇`;
            let victoryPhrases = [
                text_option1,
                text_option2,
                text_option3,
                `${trainers[getTrainer].name}: You and your Pokémon are a winning team!`,
                `${trainers[getTrainer].name}: Way to go! Your Pokémon battled brilliantly!`,
                `${trainers[getTrainer].name}: You proved yourself as a top-notch Pokémon Trainer!`,
                `${trainers[getTrainer].name}: Victory is yours! You and your Pokémon earned it!`,
                `${trainers[getTrainer].name}: That was an impressive display of skill and strategy!`,
                `${trainers[getTrainer].name}: You outmatched your opponent with excellent tactics!`,
                `${trainers[getTrainer].name}: Congratulations on your well-deserved victory!`,
                `${trainers[getTrainer].name}: Your Pokémon are unbeatable! Keep up the fantastic work!`,
                `${trainers[getTrainer].name}: You're a true Pokémon Master in the making!`,
                `${trainers[getTrainer].name}: Your victory was electrifying, just like your Pokémon!`,
                `${trainers[getTrainer].name}: Wow, your Pokémon won today, but let's see if they can handle a real challenge next time!`
            ];
            let textOption = Math.floor(Math.random() * victoryPhrases.length);
            console.log(textOption);
            let victoryText = victoryPhrases[textOption];
            let audio = this.inputBox.insertAdjacentHTML('afterbegin', '<audio controls autoplay id="pkmnMusicVictory" class="hidden"> <source src="../music/1-29. Victory (Vs. Gym Leader).mp3" type="audio/mpeg"> </audio>');
            let victoryMusic = document.getElementById('pkmnMusicVictory');
            victoryMusic.volume = 0.2;
            setTimeout(() => {
                document.getElementById('pkmnMusicVictory').remove();
                results_text_container.insertAdjacentHTML('beforeend', `<div id='results' class="expand fade resultsTXT">${victoryText}</div>`);
            }, 7000);
        }
        console.log(`AI: ${aiChoice} , You: ${playerChoice}`);
        battlebox.style.flexDirection = "column";
    }
}
const view = new View();
export { view };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log('Element is now visible!');
            if (entry.target.id == "profileName") {
                homeBtn.style.display = 'none';
                homeBtn.style.opacity = '0';
            }
            entry.target.classList.add('visible');
        }
        else {
            console.log('Element is no longer visible!');
            if (entry.target.id == "profileName") {
                homeBtn.style.display = 'block';
                homeBtn.style.opacity = '1';
                homeBtn.style.transform = 'scale(1)';
            }
            entry.target.classList.remove('visible');
        }
    });
});
const targetElement = document.querySelector('#profileName');
observer.observe(targetElement);
//# sourceMappingURL=View.js.map