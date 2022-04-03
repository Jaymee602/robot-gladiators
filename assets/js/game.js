// Game States
// "WIN" - Player robot has defeated all enemy-robots
//   * Fight all enemy-robots
//   * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10
};

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fight = function(enemyName) {
    // Repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemyHealth > 0) {
        // Ask player if they'd like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."); 
        
        // If player picks 'skip' confirm and then stop the loop.
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm the player wants to skip.
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If yes (true), leave fight.
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // Subtract money from playerInfo.money for skipping.
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }    
        }  

        // Generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        // Subtract the value of 'playerInfo.attack' from the calue of 'enemyHealth' & use that result to update the value in the 'enemyHealth' variable.
        enemyHealth = Math.max(0, enemyHealth - damage);
        // Log a resulting message to the console so we know that it worked.
            console.log(
            playerInfo.name + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // Award player for winning.
            playerInfo.money = playerInfo.money + 20;

            // Leave the while loop since the enemy is dead.
            break;
        } else {
          window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
         
        // Generate random number based on enemy's attack power
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        // Subtract the value of 'enemyAttack' from the value of 'playerInfo.health' & use that result to update the value in the 'playerInfo.health' variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
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
};
// Function to start a new game
var startGame = function() {
    // Reset player stats
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 10;
    // Fight each enemy-robot by looping over them and fighting them one at a time 
    for (var i = 0; i < enemyNames.length; i++) {
        // If player is still alive then keep fighting
        if (playerInfo.health > 0) {
            // Let player know what round they're in
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

            // Pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // Reset enemyHealth before starting new fight
            enemyHealth = randomNumber (40, 60);

            // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
            // If we're not at the last enemy in the array
            if (playerInfo.health > 0  && i < enemyNames.length - 1) {
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

    // If player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // Use switch to carry out action
    switch (shopOptionPromt) {
        case "REFILL":
        case "refill":
            if (playerInfo.money >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // Increase health and decrease money
                playerInfo.health = playerInfo.health + 20;
                playerInfo.money = playerInfo.money - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerInfo.money >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerInfo.attack = playerInfo.attack + 6;
                playerInfo.money = playerInfo.money -7;
            } else {
                window.alert("You don't have enough money!")
            }
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            // Do nothing, so function will end
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
