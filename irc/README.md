# T-JSF-600

<img src="https://github.com/EpitechMscProPromo2026/T-JSF-600-PAR_42/assets/91618272/a4b94aa2-1888-46cb-ac27-119628a4c86d" width="200" height="200"/>

## An Internet Relay Chat client and server

_Technical specifications :_

- Uses TCP and is compatible with TLS
- Uses the standard ports 6665-6669

### What is IRC ?

Internet Relay Chat is a text-based chat system for instant messaging.

> "_IRC is designed for group communication on forums, called **channels**, but also allows one-on-one communication via private messages as well as chat and data transfer including file sharing._"
> [_(Wikipedia)_](https:/`/en`.wikipedia.org/wiki/Internet_Relay_Chat)

### Technical informations

- IRC is an open protocol that uses TCP and, optionally, TLS.
- IANA port: **194`/TCP`**
- _de facto_ the standard is to RUN IRC on **6667`/TCP`** to avoid running the IRC daemon with root privileges.
- The protocol implementation is documented in the [RFC 1459](https:/`/datatracker`.ietf.org/doc/html/rfc1459)

### What was awaited ?

#### Features :

- [x] The servers accepts multiple connections.
- [x] The server implements channels.
- [x] It must be possible to join several channels simultaneously ;
- [ ] Must be able to create, rename and delete channels ;
- [x] A message must be displayed when a user joins or leaves a channel ;
- [x] Users must, of course, be able to speak in the channels they have joined.
- [x] Channels and messages must be persistently preserved.
- [x] Each user must give a nickname before they can use the application.
- [x] No authentication system is required, however it would be a welcome bonus

#### Commands:

- `/nick` nickname: define the nickname of the user on the server.
- `/list` [string]: list the available channels from the server. If string is specified, only displays
  those whose name contains the string.
- `/create` channel: create a channel with the specified name.
- `/delete` channel: delete the channel with the specified name.
- `/join` channel: join the specified channel.
- `/quit` channel: quit the specified channel.
- `/users` list the users currently in the channel
- `/msg` nickname message: send a private message to the specified nickname.
- `message` send a message to all the users on the channel

How to use it:

Server:
```bash
cd Server && npm start
```
Client:
```
cd Client && npm start
```

