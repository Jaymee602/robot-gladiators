// Game States
// "WIN" - Player robot has defeated all enemy-robots
//   * Fight all enemy-robots
//   * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

var fight = function(enemyName) {
    // Repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        // Ask player if they'd like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."); 
        
        // If player picks 'skip' confirm and then stop the loop.
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm the player wants to skip.
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If yes (true), leave fight.
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // Subtract money from playerMoney for skipping.
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }    
        }  

        // Subtract the value of 'playerAttack' from the calue of 'enemyHealth' & use that result to update the value in the 'enemyHealth' variable.
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
            console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // Award player for winning.
            playerMoney = playerMoney + 20;

            // Leave the while loop since the enemy is dead.
            break;
        } else {
          window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
         
        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' & use that result to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health 
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // Leave loop if player is dead.
            break;
        } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

// Fight each enemy-robot by looping over them and fighting them one at a time 
for (var i = 0; i < enemyNames.length; i++) {
    // If player is still alive then keep fighting
    if (playerHealth > 0) {
        // Let player know what round they're in
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

        // Pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];

        // Reset enemyHealth before starting new fight
        enemyHealth = 50;

        // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
    }
    // If player isn't alive, stop the game
    else {
        window.alert('You have lost your robot in battle! Game over!');
        break;
    }
}
