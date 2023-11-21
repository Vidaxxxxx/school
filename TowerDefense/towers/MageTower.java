package towers;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

import tile.TileManager;

public class MageTower extends ATower {
    private BufferedImage sprite;
    private BufferedImage[] animationFrames;
    private int currentFrame;
    private int animationDelay;
    private int currentDelay;
    private TileManager tileManager;

    public MageTower(int level, int damage, int range, int cost, int upgradeCost, BufferedImage sprite,
            TileManager tileManager, int slowFactor) {
        super(1, 2, 100, 100, 100, sprite, 3, 0);
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
            spriteRow = 16;
        } else if (this.level == 2) {
            spriteRow = 16;
        } else {
            spriteRow = 16;
        }

        for (int frame = 0; frame < animationFrames.length; frame++) {
            animationFrames[frame] = tileManager.getSprite(9 - frame, spriteRow);
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
        this.damage += 2;
        initializeAnimationFrames();
    }

    public void upgradeRange() {
        this.range += 0;
        this.level += 1;
        initializeAnimationFrames();
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

    @Override
    public int getSlowFactor() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSlowFactor'");
    }

    @Override
    public void setSlowFactor(int slowFactor) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setSlowFactor'");
    }
}
