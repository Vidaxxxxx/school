# Lancer PokéJobs
- Lancer une venv (exécuter "source /venv/bin/activate")
- exécuter "pip3 install -r requirement.txt"
- se placer dans T-WEB-501-PAR_22
- exécuter "export FLASK_APP=pokejob.py"
- exécuter "flask run"
- taper "[localhost:5000](http://localhost:5000/)" dans le navigateur
- Bienvenue !


## Login (ALL PASSWORD ARE "admin")
> Candidate
- meilleur@dresseur.com
- joelle@infirmière.fr        (a postulé à 2 annonces)
- pierre@champion.com         (a postulé à 3 annonces)
- ondine@championne.com

> Company
- Joelle@centre-pokemon.com   (a créé 2 annonces)
- maitre@conseil4.com         (a créé 1 annonce)

> Admin
- admin@admin.com


## Step 01
La DBB est une database SQLite. Une DBB rempli de quelques éléments est disponible (data-dev.sqlite).  
Les colonnes notées "id_X" sont des clés étrangères.  
5 tables ont été créées :  

> Une table Role qui répertorie les rôles disponibles sur Pokéjobs (cabdidate, company, admin).  
Role  
| id | role |  

> Une table Company qui répertorie toutes les companies du site.  
Company  
| id | name |

> Une table User qui répertorie tous les utilisateurs de la plateforme (un id_company est associé à tous les id_role = 2).  
User  
| id | id_role | id_company | email | password_hash | lastname | firstname | phone | cv |  

> Une table Advertisement qui répertorie toutes les annonces des compagnies (id_user correspondant à l'user qui publie une annonce).  
Advertisement  
| id | picture | title | description | wages | working_time | place | date_posted | id_user |

> Une table Job_application qui répertorie toutes les associations de candidats et d'entreprises (créé lorsqu'un candidat veut postulé à une offre).  
Job_application  
| id | id_advertisement | id_user | date_posted | message |  


## Step 02
Deux options pour vérifier ce step :
- sur la page d'accueil : cliqué sur "Advertisements" dans la navbar  
  OU
- taper directement dans le navigateur "[localhost:5000/advertisement](http://localhost:5000/advertisement)"  


## Step 03
Pour cette étape nous avons choisi de n'afficher que la description en plus lorsqu'un clic sur "Learn More" est affectué.  

Pour info :  
- seuls les anonymes et les users possédant un role de candidat (id_role=1) peuvent voir le boutton "Apply"
- Seul les users Company ayant posté une certaine annonce peuvent voir les bouttons "Edit Post", "Candidates" et "Delete Post"  


## Step 04
See projet files


## Step 05
Rdv sur une annonce qui vous plait en étant non connecté ou connecté avec un compte candidat (cf rubrique Login)  
- En étant non connecté un formulaire vous demandant vos infos et un message apparait.  
- En étant connecté avec un compte candidat seul un message est demandé.  
- N'importe quel autre compte, le boutton Apply n'apparait pas.  

Pour vérifier, il faut se connecté en admin (cf rubrique Login) ou aller voir directement dans la BDD (i.e. sqlitebrowser)


## Step 06
(cf rubrique Login)
Dans l'onglet "Log In" de la navbar


## Step 07
login: admin@admin.com  
mdp: admin  

2 dashboards existent. Ils répertorient respectivement l'ensemble des compagnies avec leurs annonces et l'ensemble des candidats avec les offres pour les quelles ils postulent.  
Ces dashboard ont été conçus pour être très simple d'utilisation d'où le fait qu'ils ne respectent pas à la lettre le sujet.  
Nous sommes parti du principe qu'il s'agit d'un premier essai et que si le client voulait une autre interface son aspect peut être complètement changé.  
L'accés à ces 2 dashboards se trouve en haut à droite dans la navbar dans l'onglet "Activ session"


## Step 08
Just browse our website ;)
