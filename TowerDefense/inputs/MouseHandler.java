package inputs;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

import main.GamePanel;
import scene.ScoreboardPanel;

public class MouseHandler implements MouseListener, MouseMotionListener {

    private GamePanel gamePanel;

    public MouseHandler(GamePanel gamePanel2) {
        this.gamePanel = gamePanel2;
    }

    public MouseHandler(ScoreboardPanel scoreboardPanel) {
    }

    @Override
    public void mouseDragged(MouseEvent e) {

    }

    @Override
    public void mouseMoved(MouseEvent e) {
        gamePanel.updateMousePositionToDraw(e.getX(), e.getY()); // get x and y axis for updating sprite tower placement
                                                                 // display
    }

    @Override
    public void mouseClicked(MouseEvent e) {
        if (e.getButton() == MouseEvent.BUTTON1) {
            if (gamePanel.isPlacingArcher()) {
                gamePanel.placeTower(e.getX(), e.getY());
                gamePanel.checkTowerClickedOnPlacing(e.getX(), e.getY());
            } else if (gamePanel.isPlacingMage()) {
                gamePanel.placeTower(e.getX(), e.getY());
                gamePanel.checkTowerClickedOnPlacing(e.getX(), e.getY());
            } else if (gamePanel.isPlacingTower()) {
                gamePanel.placeTower(e.getX(), e.getY());
                gamePanel.checkTowerClickedOnPlacing(e.getX(), e.getY());
            } else if (gamePanel.isPlacingSnow()) {
                gamePanel.placeTower(e.getX(), e.getY());
                gamePanel.checkTowerClickedOnPlacing(e.getX(), e.getY());
            }

            else {
                // Check if tower being selected
                gamePanel.checkTowerClicked(e.getX(), e.getY());
            }
        }

        if (e.getButton() == MouseEvent.BUTTON3) {
            gamePanel.isQuittingArcher(false);
            gamePanel.isQuittingMage(false);
            gamePanel.isQuittingTower(false);
            gamePanel.isQuittingSnow(false);

        }
    }

    @Override
    public void mouseEntered(MouseEvent e) {

    }

    @Override
    public void mouseExited(MouseEvent e) {

    }

    @Override
    public void mousePressed(MouseEvent e) {

    }

    @Override
    public void mouseReleased(MouseEvent e) {

    }

    public void createTower() {

    }

}