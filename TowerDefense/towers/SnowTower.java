package towers;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import tile.TileManager;

public class SnowTower extends ATower {
    private BufferedImage sprite;
    private BufferedImage[] animationFrames;
    private int currentFrame;
    private int animationDelay;
    private int currentDelay;
    private TileManager tileManager;

    public SnowTower(int level, int damage, int range, int cost, int upgradeCost, BufferedImage sprite,
            TileManager tileManager, int slowFactor) {
        super(level, damage, range, cost, 10, sprite, 3, 1);
        this.sprite = sprite;
        this.tileManager = tileManager;
        // Initiate animation
        initializeAnimationFrames();

        currentFrame = 0;
        animationDelay = 15;
        currentDelay = 0;
    }

    private void initializeAnimationFrames() {
        animationFrames = new BufferedImage[10];
        int spriteRow = 0;

        if (this.level == 1) {
            spriteRow = 3;
        } else if (this.level == 2) {
            spriteRow = 3;
        } else {
            spriteRow = 3;
        }

        for (int frame = 0; frame < animationFrames.length; frame++) {
            animationFrames[frame] = tileManager.getSprite(4, spriteRow);
        }
    }

    @Override
    public void updateAnimations() {

        currentDelay++;
        if (currentDelay >= animationDelay) {
            currentDelay = 0;
            currentFrame = (currentFrame + 1) % animationFrames.length;
            sprite = animationFrames[currentFrame];
        }
    }

    @Override
    public int getTargetNumber() {
        return 0;
    }

    public void upgradeDamage() {
        this.damage += 1;
        initializeAnimationFrames();
    }

    public void upgradeRange() {
        this.range += 10;
        this.level += 1;
        initializeAnimationFrames();
    }

    @Override
    public int getSlowFactor() {
        return range;
    }

    @Override
    public void setSlowFactor(int slowFactor) {
        this.slowFactor = slowFactor;
    }
    @Override
    public int getUpgradeCost() {
        return upgradeCost * level;
    }

    @Override
    public void draw(Graphics g) {
        if (sprite != null) {
            g.drawImage(sprite, position.x, position.y, null); // Draw the sprite
        }
    }
}
