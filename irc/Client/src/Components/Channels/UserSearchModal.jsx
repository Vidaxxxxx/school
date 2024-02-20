import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    InputLeftElement,
    InputGroup,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { SearchIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { useSocket } from '../SocketIO/socket';


export default function UserSearchModal() {
    const socket = useSocket();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [allUsers, setAllUsers] = React.useState([]);
    const [searchedUsers, setSearchedUsers] = React.useState([]);


    React.useEffect(() => {

        socket.emit('get_all_users');

        socket.on("all_users_list", (users) => {
            setAllUsers(users);
            setSearchedUsers(allUsers);
        });

        return () => {
            socket.off('all_users_list');
        }

    }, [setAllUsers]);

    const filterUsers = (e) => {
        (!e.target.value)
            ? setSearchedUsers(allUsers)
            : setSearchedUsers(allUsers.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme='teal' size={'sm'} fontWeight={'semibold'} width={"100%"} shadow={"1px 1px 5px teal"}>Start new chat</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup paddingRight={"30px"} marginBottom={"10px"}>
                            <InputLeftElement pointerEvents={'none'} h={'full'}>
                                <SearchIcon color={'whiteAlpha.300'} />
                            </InputLeftElement>
                            <Input placeholder="Who do you want to chat with ?" bg={"blackAlpha.600"} size={"sm"} borderRadius={"md"} onChange={filterUsers} />
                        </InputGroup>
                        <VStack maxHeight={"300px"} overflowY={"scroll"} paddingRight={"15px"}>
                            {searchedUsers.map((user) => (
                                <Button
                                    key={user.id}
                                    leftIcon={<FaUser />}
                                    size={'sm'}
                                    maxHeight={"40px"}
                                    minHeight={"40px"}
                                    w={"full"}
                                    onClick={() => { socket.emit("create_private", { username: user.username }); onClose(); }}
                                >{user.username}</Button>
                            ))}
                        </VStack>
                    </ModalBody>

                </ModalContent>
            </Modal >
        </>
    );
}

