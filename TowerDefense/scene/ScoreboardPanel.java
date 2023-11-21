package scene;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.GraphicsEnvironment;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.awt.event.MouseEvent;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JPanel;

import main.GamePanel;
import main.GameWindow;

public class ScoreboardPanel extends JPanel {
    private BufferedImage scoreImage;
    private GamePanel gamePanel;
    private JButton menuButton;  
    private String scores;
    private Font scorefont;  

    public ScoreboardPanel(GameWindow gameWindow) {
        gamePanel = new GamePanel(gameWindow);
        menuButton = new JButton("Menu");
        loadScoreboardContent();
        loadScoreImage();

        menuButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                // Switch to the menu panel when the "Menu" button is clicked
                gameWindow.switchToMenuPanel();
            }
        });
        add(menuButton); // Add the button to the panel
    }
        private void loadScoreImage() {
        // Load the menu image
        try {
            scoreImage = ImageIO.read(getClass().getResource("/res/castleOfChimera.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
                try {
            Font font = Font.createFont(Font.TRUETYPE_FONT, new File("font/a.ttf")).deriveFont(Font.PLAIN, 20);
            GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
            ge.registerFont(font);
            scorefont = font;
        } catch (IOException | FontFormatException e) {
            e.printStackTrace();
        }
    }

    private String[] loadScoreboardContent() {
        try {
            String line;
            BufferedReader reader = new BufferedReader(new FileReader("res/scoreboard.txt"));
            StringBuilder scoresBuilder = new StringBuilder();
    
            while ((line = reader.readLine()) != null) {
                scoresBuilder.append(line).append("\n");
            }
    
            reader.close();
            return scoresBuilder.toString().split("\n");
        } catch (IOException e) {
            e.printStackTrace();
            return new String[0]; 
        }
    }
    

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawImage(scoreImage, 0, 0, this);
        g.setFont(scorefont);
        g.setColor(Color.BLACK);
    
        String title = "SCOREBOARD:";
        int xTitle = (getWidth() - g.getFontMetrics().stringWidth(title)) / 2;
        int yTitle = 100;
        g.drawString(title, xTitle, yTitle);
    
        int x = 0;
        int y = yTitle + 50;
    
        String[] scoreLines = loadScoreboardContent();
    
        for (String scoreLine : scoreLines) {
            int lineWidth = g.getFontMetrics().stringWidth(scoreLine);
            g.drawString(scoreLine, x + (getWidth() - lineWidth) / 2, y);
            y += 20;
        }
    }
}
