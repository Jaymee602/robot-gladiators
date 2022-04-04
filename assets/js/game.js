// Game States
// "WIN" - Player robot has defeated all enemy-robots
//   * Fight all enemy-robots
//   * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// Function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// Function to get name
var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot name is " + name);
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    },
];

var fightOrSkip = function () {
    // Ask player if they'd like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."); 
    // Conditional recursive function call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip ();
    }
    promptFight = promptFight.toLowerCase();
    // If player picks 'skip' confirm and then stop the loop.
    if (promptFight === "skip") {
        // Confirm the player wants to skip.
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        // If yes (true), leave fight.
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // Subtract money from playerInfo.money for skipping.
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            // Return true if player wants to leave
            return true;
        }
    }
    return false;
};

var fight = function(enemy) {
    // Keep track of who goes first
    var isPlayerTurn = true;

    // Randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    // Repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                // If true, leave fight by breaking the loop
                break;
            }
            // Generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            // Subtract the value of 'playerInfo.attack' from the calue of 'enemy.health' & use that result to update the value in the 'enemy.health' variable.
            enemy.health = Math.max(0, enemy.health - damage);
            // Log a resulting message to the console so we know that it worked.
                console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
                );

            // Check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // Award player for winning.
                playerInfo.money = playerInfo.money + 20;

                // Leave the while loop since the enemy is dead.
                break;
            } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {
            // Generate random number based on enemy's attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' & use that result to update the value in the 'playerInfo.health' variable.
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // Check player's health 
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // Leave loop if player is dead.
                break;
            } else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
};
// Function to start a new game
var startGame = function() {
    // Reset player stats
    playerInfo.reset();
    // Fight each enemy-robot by looping over them and fighting them one at a time 
    for (var i = 0; i < enemyInfo.length; i++) {
        // If player is still alive then keep fighting
        if (playerInfo.health > 0) {
            // Let player know what round they're in
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

            // Pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // Reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber (40, 60);

            // Pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);
            // If we're not at the last enemy in the array
            if (playerInfo.health > 0  && i < enemyInfo.length - 1) {
                // Ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // If yes, take them to the store () function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        // If player isn't alive, stop the game
        else {
            window.alert('You have lost your robot in battle! Game over!');
            break;
        }
    }    
        // Play again
        endGame();
};

// Function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for highscore, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null){
        highScore = 0;
    }

    if (playerInfo.money > highScore) {
        localStorage.setItem("highScore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!")
    }

    // Ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    // Ask player what they'd like to do
    var shopOptionPromt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPromt = parseInt(shopOptionPromt);
    // Use switch to carry out action
    switch (shopOptionPromt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // Call shop () again to force player to pick a valid option
            shop();
            break;
    }
}; 

// Start the game when the page loads
startGame();
