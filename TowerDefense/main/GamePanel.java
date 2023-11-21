package main;

import javax.swing.JButton;
import javax.swing.JOptionPane;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.swing.JPanel;

import enemies.AEnemy;
import enemies.BombEnemy;
import enemies.BossEnemy;
import enemies.FlyFishEnemy;
import enemies.ScarabeEnemy;
import player.Player;
import scene.ImageButton;
import scores.LoadScore;
import tile.Tile;
import tile.TileManager;
import towers.ATower;
import towers.ArcherTower;
import towers.MageTower;
import towers.Projectile;
import towers.SnowTower;
import towers.TowerTower;

public class GamePanel extends JPanel {
    // Defaults Attributes
    private Player player; // Player instance
    private List<ATower> towers; // List to hold all towers
    private List<AEnemy> enemies; // List to hold all enemies
    private TileManager tileManager; // Manages the game tiles*
    private int[][] lvl; // 2D array representing the level layout
    private final int tileSize = 64; // Size of each tile in pixels
    private BufferedImage projectileSprite; // Sprite for the projectiles
    private boolean isGameOver = false; // Set the game statement for loosing

    // Attributes game specificity
    private int initialHealth = 20; // Initiate player health point
    private int economy = 90; // Initiate economy point

    private int currentWave = 0; // Current wave number
    private int enemiesInCurrentWave = 0; // Number of enemies spawned in the current wave
    private long lastSpawnTime = 0; // Time when the last enemy was spawned
    private int[] waveEnemyCounts = { 5, 10, 15, 0, 20 }; // Array defining the number of enemies in each wave
    private int spawnInterval = 1000; // Interval between spawns in milliseconds
    private int earnMoneyByKill = 10; // Set the money's value by kill
    private int earnMoneyByHit = 1; // Set the money's value by hit
    // private int earnMoneyByTime = 1; Set the money's value by time

    // Towers placements
    private BufferedImage towerPlacementSpriteArcher; // tower placement sprite
    private BufferedImage towerPlacementSpriteMage;
    private BufferedImage towerPlacementSpriteTower;
    private BufferedImage towerPlacementSpriteSnow;
    private boolean isPlacingArcher = false; // if archer tower button clicked
    private boolean isPlacingMage = false;
    private boolean isPlacingTower = false;
    private boolean isPlacingSnow = false;

    private int mouseX, mouseY; // mouse coordinate for placement
    // Buttons
    private JButton archerButton; // Button to place towers
    private JButton mageButton;
    private JButton towerButton;
    private JButton snowButton;

    private JButton menuButton;
    private JButton scoreboardButton;

    private long lastUpdate = System.currentTimeMillis();

    // Water animation attributes
    private int waterAnimationFrame = 0;
    private int waterAnimationDelay = 150;

    public GamePanel(GameWindow gameWindow) {
        setDoubleBuffered(true); // Activates double buffering to reduce flickering
        lvl = Maps.getLevelData(); // Retrieves level data
        tileManager = new TileManager(); // Initializes the tile manager

        // Load scoreboard
        scores.LoadScore.CreateFile();

        // Load sprites for the bomb enemy and projectiles
        projectileSprite = tileManager.getSprite(5, 3);

        // Initialize player with health and money
        player = new Player(initialHealth, economy);
        System.out.println("Player health: " + player.getHealth() + " | Player money: " + player.getMoney());

        // Initialize lists for towers and enemies
        towers = new ArrayList<>();
        enemies = new ArrayList<>();

        // Initialize Button for menu
        menuButton = new JButton("Menu");
        scoreboardButton = new JButton("scoreboard");

        // menuButton.setBounds(10, 10, 80, 30);
        menuButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Switch to the menu panel when the "Menu" button is clicked
                gameWindow.switchToMenuPanel();
            }
        });
        add(menuButton); // Add the button to the panel

        // menuButton.setBounds(10, 10, 80, 30);
        // scoreboardButton.addActionListener(new ActionListener() {
        // @Override
        // public void actionPerformed(ActionEvent e) {
        // // Switch to the menu panel when the "Menu" button is clicked
        // gameWindow.switchToScoreboardPanel();
        // }
        // });
        // add(scoreboardButton); // Add the button to the panel
        // scoreboardButton = new JButton("scoreboard");

        // Load sprites and buttons for archer towers placements
        towerPlacementSpriteArcher = tileManager.getSprite(4, 10); // sprite
        archerButton = new ImageButton("/res/towerSelect.png"); // button
        archerButton.addActionListener(new ActionListener() { // if archer tower selected
            @Override
            public void actionPerformed(ActionEvent e) {
                isPlacingArcher = !isPlacingArcher;
                if (isPlacingArcher) {
                    isPlacingMage = false; // Disable mage tower placement if archer tower is being placed
                    isPlacingTower = false;
                    isPlacingSnow = false;
                }
            }
        });

        this.add(archerButton);

        // Load sprites and buttons for mage tower placements
        towerPlacementSpriteMage = tileManager.getSprite(0, 16); // sprite
        mageButton = new ImageButton("/res/mageSelect.png"); // button
        mageButton.addActionListener(new ActionListener() { // if mage tower selected
            @Override
            public void actionPerformed(ActionEvent e) {
                isPlacingMage = !isPlacingMage;
                if (isPlacingMage) {
                    isPlacingArcher = false; // Disable archer tower placement if mage tower is being placed
                    isPlacingTower = false;
                    isPlacingSnow = false;
                }
            }
        });

        this.add(mageButton);
        // Load sprites and buttons for tower tower placements
        towerPlacementSpriteTower = tileManager.getSprite(0, 19); // sprite
        towerButton = new ImageButton("/res/archerSelect.png"); // button
        towerButton.addActionListener(new ActionListener() { // if mage tower selected
            @Override
            public void actionPerformed(ActionEvent e) {
                isPlacingTower = !isPlacingTower;
                if (isPlacingTower) {
                    isPlacingArcher = false; // Disable archer tower placement if mage tower is being placed
                    isPlacingMage = false;
                    isPlacingSnow = false;
                }
            }
        });

        this.add(towerButton);

        // Load sprites and buttons for snow tower placements
        towerPlacementSpriteSnow = tileManager.getSprite(4, 3); // sprite
        snowButton = new ImageButton("/res/SnowTowerSelect.png"); // button
        snowButton.addActionListener(new ActionListener() { // if mage tower selected
            @Override
            public void actionPerformed(ActionEvent e) {
                isPlacingSnow = !isPlacingSnow;
                if (isPlacingSnow) {
                    isPlacingArcher = false; // Disable archer tower placement if mage tower is being placed
                    isPlacingTower = false;
                    isPlacingMage = false;
                }
            }
        });

        this.add(snowButton);
    }

    // UPDATE GAME MECANISM
    public void update() {

        if (isGameOver) {
            return;
        }

        if (player.getHealth() <= 0 && !isGameOver) {
            gameOver();
            return;
        }

        waves();
        manageEnemies();

        if (currentWave >= waveEnemyCounts.length && enemies.isEmpty() && !isGameOver) {
            gameWin();
        }

        // Mecanism to tower to detect and shoot ennemies
        for (ATower tower : towers) {
            tower.detection(enemies, projectileSprite);
            tower.projectileMovement();
            tower.updateAnimations();
        }

        // Update water animation
        updateWaterAnimation();
    }

    // GRAPHICS COMPONENTS
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // Draw the tiles
        for (int y = 0; y < lvl.length; y++) {
            for (int x = 0; x < lvl[y].length; x++) {
                int id = lvl[y][x];
                g.drawImage(tileManager.getSprite(id), x * tileSize, y * tileSize, null);

            }
        }
        // Draw the tiles
        for (int y = 0; y < lvl.length; y++) {
            for (int x = 0; x < lvl[y].length; x++) {
                int id = lvl[y][x];
                BufferedImage sprite;

                // Check if the tile is WATER and apply animation
                if (id == 22) {
                    sprite = tileManager.getWaterSprite(waterAnimationFrame);
                } else {
                    sprite = tileManager.getSprite(id);
                }

                g.drawImage(sprite, x * tileSize, y * tileSize, null);
            }
        }

        // draw towers
        for (ATower tower : towers) {
            tower.draw(g);
        }

        // draw tower's projectiles
        for (ATower tower : towers) {
            for (Projectile projectile : tower.getProjectiles()) {
                projectile.draw(g);
            }
        }

        // draw towers
        for (ATower tower : towers) {
            tower.draw(g);
        }

        // draw tower's projectiles
        for (ATower tower : towers) {
            for (Projectile projectile : tower.getProjectiles()) {
                projectile.draw(g);
            }
        }

        // Draw towers placements
        if (isPlacingArcher && towerPlacementSpriteArcher != null) {
            int spriteX = mouseX - towerPlacementSpriteArcher.getWidth() / 2;
            int spriteY = mouseY - towerPlacementSpriteArcher.getHeight() / 2;
            g.drawImage(towerPlacementSpriteArcher, spriteX, spriteY, null);
        }
        if (isPlacingMage && towerPlacementSpriteMage != null) {
            int spriteX = mouseX - towerPlacementSpriteMage.getWidth() / 2;
            int spriteY = mouseY - towerPlacementSpriteMage.getHeight() / 2;
            g.drawImage(towerPlacementSpriteMage, spriteX, spriteY, null);
        }
        if (isPlacingMage && towerPlacementSpriteMage != null) {
            int spriteX = mouseX - towerPlacementSpriteMage.getWidth() / 2;
            int spriteY = mouseY - towerPlacementSpriteMage.getHeight() / 2;
            g.drawImage(towerPlacementSpriteMage, spriteX, spriteY, null);
        }
        if (isPlacingTower && towerPlacementSpriteTower != null) {
            int spriteX = mouseX - towerPlacementSpriteTower.getWidth() / 2;
            int spriteY = mouseY - towerPlacementSpriteTower.getHeight() / 2;
            g.drawImage(towerPlacementSpriteTower, spriteX, spriteY, null);
        }
        if (isPlacingSnow && towerPlacementSpriteSnow != null) {
            int spriteX = mouseX - towerPlacementSpriteSnow.getWidth() / 2;
            int spriteY = mouseY - towerPlacementSpriteSnow.getHeight() / 2;
            g.drawImage(towerPlacementSpriteSnow, spriteX, spriteY, null);
        }

        // Draw Enemies
        for (AEnemy enemy : enemies) {
            enemy.draw(g);
            enemy.drawHealthBar(g); // Add this line to draw the health bar
        }
        // player.CastleHealthBar(g);
        player.CastleHealthBar(g);
        player.DrawMoney(g);
        drawScore(g);
    }

    // DIFFERENTS METHODS

    private void drawScore(Graphics g) {
        g.fillRect(1080, 0, 200, 60);
        g.setColor(Color.BLACK);
        g.drawString("Score: " + player.getScore(), 1100, 30);
        g.drawString("Vague: " + currentWave, 1100, 50);
        // g.drawString("Best Score: " + LoadScore.getBestScore(), 100, 120);
    }

    private void gameOver() {
        System.out.println("Game over");
        isGameOver = true;
        promptForSavingScore();
    }

    private void gameWin() {
        System.out.println("You win!");
        isGameOver = true;
        promptForSavingScore();
    }

    private void promptForSavingScore() {
        String playerName = null;
        while (playerName == null || playerName.length() > 3 || playerName.isEmpty()) {
            playerName = JOptionPane.showInputDialog(this, "Enter your name (max 3 letters):", "Scoreboard",
                    JOptionPane.PLAIN_MESSAGE);
        }

        if (playerName.length() > 3) {
            playerName = playerName.substring(0, 3);
        }

        LoadScore.WriteToFile(player.getScore(), playerName);
    }

    // Method to update water animation
    private void updateWaterAnimation() {
        if (System.currentTimeMillis() - lastUpdate >= waterAnimationDelay) {
            waterAnimationFrame = (waterAnimationFrame + 1) % 10;
            lastUpdate = System.currentTimeMillis();
        }
    }

    // Position for selected sprite towers
    public void updateMousePositionToDraw(int x, int y) {
        mouseX = x;
        mouseY = y;
        repaint();
    }

    // Method to begin tower placement
    public void startTowerPlacementArcher(BufferedImage sprite) {
        towerPlacementSpriteArcher = sprite;
        isPlacingArcher = true;
    }

    public void startTowerPlacementMage(BufferedImage sprite) {
        towerPlacementSpriteMage = sprite;
        isPlacingMage = true;
    }

    public void startTowerPlacementTower(BufferedImage sprite) {
        towerPlacementSpriteTower = sprite;
        isPlacingTower = true;
    }

    public void startTowerPlacementSnow(BufferedImage sprite) {
        towerPlacementSpriteSnow = sprite;
        isPlacingSnow = true;
    }

    // Method to check placement type
    public boolean isPlacingArcher() {
        return isPlacingArcher;
    }

    public boolean isPlacingMage() {
        return isPlacingMage;
    }

    public boolean isPlacingTower() {
        return isPlacingTower;
    }

    public boolean isPlacingSnow() {
        return isPlacingSnow;
    }

    public void isQuittingArcher(boolean isPlacingArcher) {
        this.isPlacingArcher = isPlacingArcher;
    }

    public void isQuittingMage(boolean isPlacingMage) {
        this.isPlacingMage = isPlacingMage;
    }

    public void isQuittingTower(boolean isPlacingTower) {
        this.isPlacingTower = isPlacingTower;
    }

    public void isQuittingSnow(boolean isPlacingSnow) {
        this.isPlacingSnow = isPlacingSnow;
    }

    // Method to place a tower
    public void placeTower(int mouseX, int mouseY) {
        int gridX = mouseX / tileSize; // snap placement
        int gridY = mouseY / tileSize;

        if (checkTowerClickedOnPlacing(gridX * tileSize, gridY * tileSize)) {
            System.out.println("A tower is already placed here.");
            return;
        }

        int tileID = lvl[gridY][gridX]; // Check if tile can be placed on id
        Tile tile = tileManager.tiles.get(tileID); // Get from list tiles in tilemanager objects tile which has a tileID
        // Check if the tile is correct and if a tower is not put yet
        if (tile.canPlaceTower()) {
            BufferedImage archerSprite = tileManager.getSprite(4, 10);
            BufferedImage mageSprite = tileManager.getSprite(0, 16);
            BufferedImage towerSprite = tileManager.getSprite(0, 19);
            BufferedImage snowSprite = tileManager.getSprite(3, 4);
            ArcherTower costArcherTower = new ArcherTower(1, 5, 150, 20, 30, archerSprite, tileManager, 0);
            MageTower costMageTower = new MageTower(1, 5, 150, 20, 30, mageSprite, tileManager, 0);
            TowerTower costTowerTower = new TowerTower(1, 5, 150, 20, 30, towerSprite, tileManager, 0);
            SnowTower costSnowTower = new SnowTower(1, 5, 150, 20, 30, snowSprite, tileManager, 0);

            // check the player money
            if (player.getMoney() >= costArcherTower.getCost() && isPlacingArcher == true) {
                ArcherTower archerTower = new ArcherTower(1, 5, 150, 20, 30, archerSprite, tileManager, 0);
                archerTower.setPosition(new Coordinate(gridX * tileSize, gridY * tileSize));
                towers.add(archerTower);
                player.spendMoney(archerTower.getCost());
            } else if (player.getMoney() >= costMageTower.getCost() && isPlacingMage == true) {
                MageTower mageTower = new MageTower(1, 5, 150, 20, 30, mageSprite, tileManager, 0);
                mageTower.setPosition(new Coordinate(gridX * tileSize, gridY * tileSize));
                towers.add(mageTower);
                player.spendMoney(mageTower.getCost());
            } else if (player.getMoney() >= costTowerTower.getCost() && isPlacingTower == true) {
                TowerTower towerTower = new TowerTower(1, 5, 150, 20, 30, towerSprite, tileManager, 0);
                towerTower.setPosition(new Coordinate(gridX * tileSize, gridY * tileSize));
                towers.add(towerTower);
                player.spendMoney(towerTower.getCost());
            } else if (player.getMoney() >= costSnowTower.getCost() && isPlacingSnow == true) {
                SnowTower snowTower = new SnowTower(1, 5, 150, 20, 30, snowSprite, tileManager, 1);
                snowTower.setPosition(new Coordinate(gridX * tileSize, gridY * tileSize));
                towers.add(snowTower);
                player.spendMoney(snowTower.getCost());

            }

            repaint();

        } else {
            System.out.println("No money !");
        }
    }

    // Method to check if tower selected
    public void checkTowerClicked(int x, int y) {
        for (ATower tower : towers) {
            if (tower.getPosition().isWithinBounds(x, y, tileSize)) {
                showUpgradeOptions(tower);
                break;
            }
        }
    }

    public boolean checkTowerClickedOnPlacing(int x, int y) {
        for (ATower tower : towers) {
            if (tower.getPosition().isWithinBounds(x, y, tileSize)) {
                return true;
            }
        }
        return false;
    }

    // Open a dialog to improve tower
    private void showUpgradeOptions(ATower tower) {
        if (tower.getLevel() < 3) {
            int upgradeChoice = JOptionPane.showConfirmDialog(this, "Upgrade this tower ?", "Upgrade Tower",
                    JOptionPane.YES_NO_OPTION);
            if (upgradeChoice == JOptionPane.YES_OPTION) {
                upgradeTower(tower);
            }
        } else {
            JOptionPane.showMessageDialog(this, "Max Level Reached", "Max Level Reached",
                    JOptionPane.INFORMATION_MESSAGE);
        }
    }

    // Upgrade tower update
    private void upgradeTower(ATower tower) {
        int upgradeCost = tower.getUpgradeCost();
        if (player.getMoney() >= upgradeCost) {

            tower.upgradeDamage();
            tower.upgradeRange();
            player.spendMoney(upgradeCost);
            System.out.println("Level : " + tower.getLevel());
            repaint();
        } else {

            System.out.println("Not enough money to upgrade");
        }
    }

    // Handle enemy waves spawning
    private void waves() {
        // Boss mecanism
        if (currentWave == 4) {
            spawnBossEnemy();
            currentWave++;
            return;
        }
        // Handle enemy waves spawning
        if (enemies.isEmpty() && enemiesInCurrentWave == 0 && currentWave < waveEnemyCounts.length) {
            // Prepare for the next wave
            enemiesInCurrentWave = waveEnemyCounts[currentWave]; // setup the number of enemies that will appear in
                                                                 // current wave (here means set enemy for the current
                                                                 // wave)
            lastSpawnTime = System.currentTimeMillis(); // return the current time in ms
            currentWave++; // Increment wave number for next wave
        }

        if (enemiesInCurrentWave > 0 && System.currentTimeMillis() - lastSpawnTime > spawnInterval) { // Spawn new
                                                                                                      // enemies for the
                                                                                                      // current wave
            // Spawn a new enemy ramdomly
            enemyTypeRandom();

            enemiesInCurrentWave--; // decrements the count of remaining enemies to be spawned in the current wave
            lastSpawnTime = System.currentTimeMillis();
            System.out.println("Updating game. Current wave: " + currentWave + ", Enemies: " + enemies.size());
            System.out.println("Money : " + player.getMoney());
        }
    }

    private void spawnBossEnemy() {
        // Create Boss
        BossEnemy boss = new BossEnemy(100, 1, tileManager);
        boss.setPosition(new Coordinate(0 * tileSize, 8 * tileSize));
        enemies.add(boss);
    }

    private void enemyTypeRandom() {
        Random random = new Random(); // Call random method
        int enemyType = random.nextInt(3); // generate number between 0 and 2 for enemy type

        AEnemy enemy;
        switch (enemyType) {
            case 0: // if case 0
                enemy = new BombEnemy(100, 1, tileManager); // spawn bomb enemies
                break;
            case 1:
                enemy = new ScarabeEnemy(100, 1, tileManager);
                break;
            default:
                enemy = new FlyFishEnemy(100, 1, tileManager);
                break;
        }
        enemy.setPosition(new Coordinate(0 * tileSize, 8 * tileSize));
        enemies.add(enemy);
    }

    // Method to manage enemy state and behavior
    private void manageEnemies() {
        // Iterator allows accessing elements in a collection type array
        Iterator<AEnemy> iterator = enemies.iterator();
        while (iterator.hasNext()) { // Loop as long as there are more enemies to process
            AEnemy enemy = iterator.next(); // For each enemy in enemies

            // Update enemy movements
            enemy.move(lvl);

            // Check if enemy has reached the destination
            if (enemy.hasReachedEnd(lvl)) {
                // Deduct player health
                player.loseHealth(1);
                System.out.println("Player health: " + player.getHealth());

                // Remove enemy after it has reached the destination
                iterator.remove();
                continue;
            }

            // Earn money by hit
            if (enemy.isHit()) {
                player.earnMoney(earnMoneyByHit); // player earn money each time an enemy is hitted
                enemy.setHit(false); // reinitiate the boolean isHit to false
                player.earnScore(1);
                System.out.println("Money: " + player.getMoney());
            }

            // Remove enemy if it's dead
            if (!enemy.isAlive()) {
                iterator.remove();
                player.earnMoney(earnMoneyByKill);
                player.earnScore(10);
                System.out.println("Enemy dead");
            }
        }
    }
}