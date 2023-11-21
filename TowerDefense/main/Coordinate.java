package main;

public class Coordinate {
    public int x;
    public int y;

    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public boolean isWithinBounds(int mouseX, int mouseY, int tileSize) {
        return mouseX >= x && mouseX < x + tileSize &&
               mouseY >= y && mouseY < y + tileSize;
    }

}
