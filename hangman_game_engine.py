# Let’s develop a hangman game engine.
# The objective is to guess a word (randomly picked from a list) as fast as possible.
# The player must suggest a letter at each turn.
# if the word contains this letter, the occurrences of the letter are revealed;
# if the word does not contain this letter, the player loses 1 point.
# No graphical interface here, the game must be playable in a terminal.
# At any time, the player can propose a full word.
# If the word is the one to be guessed, the player wins.
# Else, the player loses 1 point

import random

# Life's player


# Wordlists
word1 = [
    "Ane", "Axe", "Bel", "Bip", "Car", "Col", "Coq", "Cor", "Cou", "Cri",
    "Gag", "Gaz", "Gel", "Jus", "Net", "Nul", "Val", "Ski", "Sot", "Tas", "Tic"
]

word2 = [
    "Atre", "Beau", "Bete", "Boxe", "Brun", "Cerf", "Chez", "Cire", "Dame", "Dent",
    "Dock", "Dodo", "Drap", "Dune", "Emeu", "Fado", "Faux", "Ibis", "Jazz", "Joli",
    "Joue", "Kaki", "Logo", "Loin", "Long", "Lune", "Lynx", "Mine", "Mure", "Ouie",
    "Ours", "Pion", "Rhum", "Ride", "Rock", "Seau", "Test", "Thym", "Trou", "Truc",
    "User", "Vert", "Yogi", "Watt"
]

word3 = [
    "Acces", "Aimer", "Aloes", "Assez", "Avion", "Awale", "Balai", "Banjo", "Barbe", "Bonne",
    "Bruit", "Buche", "Cache", "Capot", "Carte", "Chien", "Crane", "Cycle", "Ebene", "Essai",
    "Gifle", "Honni", "Jambe", "Koala", "Livre", "Lourd", "Maman", "Moult", "Noeud", "Ortie",
    "Peche", "Poire", "Pomme", "Poste", "Prune", "Radar", "Radis", "Robot", "Route", "Rugby",
    "Seuil", "Taupe", "Tenue", "Texte", "Tyran", "Usuel", "Valse"
]

word4 = [
    "Acajou", "Agneau", "Alarme", "Ananas", "Angora", "Animal", "Arcade", "Aviron", "Azimut", "Babine",
    "Balade", "Bonzaï", "Basson", "Billet", "Bouche", "Boucle", "Bronze", "Cabane", "Caiman", "Cloche",
    "Cheque", "Cirage", "Coccyx", "Crayon", "Garage", "Gospel", "Goulot", "Gramme", "Grelot", "Guenon",
    "Hochet", "Hormis", "Humour", "Hurler", "Jargon", "Limite", "Lionne", "Menthe", "Oiseau", "Podium",
    "Poulpe", "Poumon", "Puzzle", "Quartz", "Rapide", "Seisme", "Tetine", "Tomate", "Walabi", "Whisky",
    "Zipper"
]

word5 = [
    "Abriter", "Ballast", "Baryton", "Bassine", "Batavia", "Billard", "Bretzel", "Cithare", "Chariot", "Clairon",
    "Corbeau", "Cortege", "Crapaud", "Cymbale", "Dentier", "Djembe", "Drapeau", "Exemple", "Fourmis", "Grandir",
    "Iceberg", "Javelot", "Jockey", "Journal", "Journee", "Jouxter", "Losange", "Macadam", "Mondial", "Notable",
    "Oxygene", "Panique", "Petro", "Poterie", "Pouvoir", "Renegat", "Scooter", "Senteur", "Sifflet", "Spirale",
    "Sucette", "Strophe", "Tonneau", "Trousse", "Tunique", "Ukulele", "Vautour", "Zozoter"
]

word6 = [
    "Aquarium", "Araignee", "Arbalete", "Archipel", "Banquise", "Batterie", "Brocante", "Brouhaha", "Capeline", "Clavecin",
    "Cloporte", "Debutant", "Diapason", "Gangster", "Gothique", "Hautbois", "Heron", "Logiciel", "Objectif", "Paranoia",
    "Parcours", "Pastiche", "Question", "Quetsche", "Scarabee", "Scorpion", "Symptome", "Tabouret", "Tomahawk", "Toujours",
    "Tourisme", "Triangle", "Utopique", "Zeppelin"
]

word7 = [
    "Accordeon", "Ascenseur", "Ascension", "Aseptiser", "Autoroute", "Avalanche", "Balalaika", "Bilboquet", "Bourricot", "Brillance",
    "Cabriolet", "Contrario", "Cornemuse", "Dangereux", "Epluchage", "Feodalite", "Forteresse", "Gondolier", "Graphique", "Horoscope",
    "Intrepide", "Klaxonner", "Mascarade", "Metaphore", "Narrateur", "Peripetie", "Populaire", "Printemps", "Quemander", "Tambourin",
    "Vestiaire", "Xylophone"
]

word8 = [
    "Acrostiche", "Apocalypse", "Attraction", "Aventurier", "Bouillotte", "Citrouille", "Controverse", "Coquelicot", "Dissimuler", "Flibustier",
    "Forestiere", "Grenouille", "Impossible", "Labyrinthe", "Maharadjah", "Prudemment", "Quadriceps", "Soliloquer", "Subjective"
]





# Set difficulty

chosenWord = ""

difficulty = int(input("Choose difficulty between 1-8 : \n"))

while difficulty not in [1,2,3,4,5,6,7,8]:
    difficulty = int(input("Choose difficulty between 1-8 : \n"))


if difficulty == 1:
    chosenWord = word1

elif difficulty == 2:
    chosenWord = word2

elif difficulty == 3:
    chosenWord = word3

elif difficulty == 4:
    chosenWord = word4

elif difficulty == 5:
    chosenWord = word5

elif difficulty == 6:
    chosenWord = word6

elif difficulty == 7:
    chosenWord = word7

elif difficulty == 8:
    chosenWord = word8


# Select random


def select_random(chosenWord, n):
    random.shuffle(chosenWord)
    result = []
    for i in range(0, len(chosenWord), n):
        result.append(chosenWord[i:i + n])
    return result
        
        

select_random(chosenWord, 1)
chosenWord = str(chosenWord[0])
word = chosenWord.upper()



# Gameplay

# alphabet_lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
# alphabet_uppercase = [letter.upper() for letter in alphabet_lowercase]
# alphabet = alphabet_lowercase + alphabet_uppercase
# alphabet was an error but kept it just in case (too much effort) ahahah


def play(word):
    word_completion = "_ " * len(word)
    life = 6
    print(f"\nWelcome to the hangman ! You have {life} tries.\n") # welcome
    guessed = False
    
    
    print(word_completion)
    print("\n")
    while not guessed and life > 0: # Game's rules
        guess = input("\nChoose a letter or a Word : ").upper()

    

        if len(guess) == 1 and guess.isalpha(): # if one letter input
                count = word.count(guess)
                if count >= 1:
                    print(f"\nCongratulations! {count} match{'es' if count > 1 else ''}\n")
                    for letter in range(len(word)):
                        if word[letter] == guess:
                            word_completion = word_completion[:letter * 2] + guess + word_completion[letter * 2 + 1:] # *2 allow to skip spaces
                            print(word_completion)
                            

                elif guess not in word and life > 0:
                    life -= 1
                    if life > 0: 
                        print(f"Missmatch try again, {life} {'try' if life == 1 else 'tries'} left\n")
                        print(word_completion)

        if "_" not in word_completion:
            guessed = True
            print("\nCongratulations! You guessed the word.")
                   
       

        if len(guess) > 1 and guess.isalpha(): # if one word input
            if guess == word:
                guessed = True
                print("\nCongratulations! You guessed the entire word.")
                   
    if life == 0:
         print(f"\nYou lose ! the word was {chosenWord} ! ")


        



play(word)  

   
                    


  







 
    








