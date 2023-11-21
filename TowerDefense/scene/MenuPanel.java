package scene;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.awt.event.MouseEvent; 

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JPanel;

import main.GamePanel;
import main.GameWindow;

public class MenuPanel extends JPanel {
    private BufferedImage menuImage;
    private JButton playButton;
    private JButton quitButton;
    private JButton scoreboardButton;
    private JButton restartButton;
    private GamePanel gamePanel;

    public MenuPanel(GameWindow gameWindow) {
        loadMenuImage();
        createButtons(gameWindow);
        setLayout(null);  // Disable layout manager for absolute positioning
        gamePanel = new GamePanel(gameWindow); 
        
    }

    private void loadMenuImage() {
        // Load the menu image
        try {
            menuImage = ImageIO.read(getClass().getResource("/res/menu.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void createButtons(GameWindow gameWindow) {
        playButton = new JButton();
        playButton.setIcon(new ImageIcon(getClass().getResource("/res/playBtnHover.png")));
        playButton.setBounds(100, 280, 200, 40); // position & width & height
        
        playButton.setBorderPainted(false);  // switch off relief
        playButton.setContentAreaFilled(false);  // init background opacity 0%
        
        playButton.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                playButton.setIcon(new ImageIcon(getClass().getResource("/res/playBtn.png")));
            }
    
            @Override
            public void mouseExited(MouseEvent e) {
                playButton.setIcon(new ImageIcon(getClass().getResource("/res/playBtnHover.png")));
            }
        });

        playButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                gameWindow.switchToGamePanel();
            }
        });

        // scoreboardButton = new JButton();
        // scoreboardButton.setIcon(new ImageIcon(getClass().getResource("/res/scoreboardBtn.png")));
        // scoreboardButton.setBounds(100, 280, 200, 40); // position & width & height
        
        // scoreboardButton.setBorderPainted(false);  // switch off relief
        // scoreboardButton.setContentAreaFilled(false);  // init background opacity 0%
        
        // scoreboardButton.addMouseListener(new MouseAdapter() {
        //     @Override
        //     public void mouseEntered(MouseEvent e) {
        //         scoreboardButton.setIcon(new ImageIcon(getClass().getResource("/res/scoreboardBtn.png")));
        //     }
    
        //     @Override
        //     public void mouseExited(MouseEvent e) {
        //         scoreboardButton.setIcon(new ImageIcon(getClass().getResource("/res/scoreboardBtnHover.png")));
        //     }
        // });
    
        // scoreboardButton.addActionListener(new ActionListener() {
        //     @Override
        //     public void actionPerformed(ActionEvent e) {
        //         gameWindow.switchToGamePanel();
        //     }
        // });
    
        quitButton = new JButton();
        quitButton.setIcon(new ImageIcon(getClass().getResource("/res/quitBtn.png")));
        quitButton.setBounds(100, 540, 200, 40); // position & width & height
        scoreboardButton = new JButton();
        scoreboardButton.setIcon(new ImageIcon(getClass().getResource("/res/scorebtn.png")));
        scoreboardButton.setBounds(100, 370, 200, 40); // position & width & height
        
        scoreboardButton.setBorderPainted(false);  // switch off relief
        scoreboardButton.setContentAreaFilled(false);  // init background opacity 0%
        
        scoreboardButton.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                scoreboardButton.setIcon(new ImageIcon(getClass().getResource("/res/scorebtnHover.png")));
            }
    
            @Override
            public void mouseExited(MouseEvent e) {
                scoreboardButton.setIcon(new ImageIcon(getClass().getResource("/res/scorebtn.png")));
            }
        });
    
        scoreboardButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                gameWindow.switchToScoreboardPanel();
            }
        });

        restartButton = new JButton();
        restartButton.setIcon(new ImageIcon(getClass().getResource("/res/restartBtn.png")));
        restartButton.setBounds(100, 460, 200, 40); // position & width & height
        
        restartButton.setBorderPainted(false);  // switch off relief
        restartButton.setContentAreaFilled(false);  // init background opacity 0%
        
        restartButton.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                restartButton.setIcon(new ImageIcon(getClass().getResource("/res/restartBtnHover.png")));
            }
    
            @Override
            public void mouseExited(MouseEvent e) {
                restartButton.setIcon(new ImageIcon(getClass().getResource("/res/restartBtn.png")));
            }
        });
        restartButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                gameWindow.restartGame(); // Appelle la méthode de redémarrage dans GameWindow
            }
        });
    
        quitButton = new JButton();
        quitButton.setIcon(new ImageIcon(getClass().getResource("/res/quitBtn.png")));
        quitButton.setBounds(100, 550, 200, 40); // position & width & height
        quitButton.setBorderPainted(false); 
        quitButton.setContentAreaFilled(false); 
    
            quitButton.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                quitButton.setIcon(new ImageIcon(getClass().getResource("/res/quitBtnHover.png")));
            }
    
            @Override
            public void mouseExited(MouseEvent e) {
                quitButton.setIcon(new ImageIcon(getClass().getResource("/res/quitBtn.png")));
            }
        });
        quitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
    
        add(playButton);
        // add(scoreboardButton);
        add(scoreboardButton);
        add(restartButton);
        add(quitButton);
    }


        // draw Menu image
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawImage(menuImage, 0, 0, this);
    }
}
