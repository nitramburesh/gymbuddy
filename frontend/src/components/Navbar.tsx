import {
  Box,
  Heading,
  IconButton,
  Image,
  useMediaQuery,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Text,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { userState } from "../atoms";

const Navbar = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [user, setUser] = useRecoilState(userState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleLogout = () => {
    onClose();
    setUser(null);
    localStorage.clear();
  };
  const loggedInLinks = (
    <>
      <Link to="/createEvent" onClick={onClose}>
        NEW ARTICLE
      </Link>
      <Link to="/" onClick={handleLogout}>
        LOG OUT
      </Link>
    </>
  );
  const profilePicture = (
    <Image
      rounded="full"
      width="30px"
      height="30px"
      src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80"
    ></Image>
  );
  const mobileLinks = (
    <>
      <Box display="flex" flex="1" justifyContent="right" mr="20px">
        <IconButton
          variant="solid"
          colorScheme="teal"
          onClick={onOpen}
          icon={<FontAwesomeIcon icon={faBars} />}
          aria-label="open menu"
        >
          OPEN MENU
        </IconButton>
      </Box>
      <Drawer
        placement="top"
        size="30%"
        onClose={onClose}
        isOpen={isOpen}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay bgColor="white" />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            alignSelf="center"
            p="20px"
            fontSize="20px"
          >
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="6">
              <Link to="/" onClick={onClose}>
                HOME
              </Link>
              {user ? (
                loggedInLinks
              ) : (
                <>
                  <Link to="/signup" onClick={onClose}>
                    SIGN UP
                  </Link>
                  <Link to="/login" onClick={onClose}>
                    LOG IN
                  </Link>
                </>
              )}
              <IconButton
                onClick={onClose}
                variant="ghost"
                icon={<FontAwesomeIcon icon={faXmark} />}
                aria-label="close menu"
              >
                CLOSE
              </IconButton>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );

  const desktopLinks = (
    <Box display="flex" justifyContent="space-around" flex="1">
      <Link to="/">HOME</Link>

      {user ? (
        <>
          {loggedInLinks}
          {profilePicture}
        </>
      ) : (
        <>
          <Link to="/signup">SIGN UP</Link>
          <Link to="/login">LOG IN</Link>
        </>
      )}
    </Box>
  );

  return (
    <Box
      bgColor="beige"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      position="sticky"
      minHeight={isMobile ? "80px" : "85px"}
    >
      <Box flex="1">
        <Heading pl="20px" color={"green.400"}>
          Gym
          <Text as={"span"} color={"black"}>
            Bud
          </Text>
        </Heading>
      </Box>
      {isMobile ? mobileLinks : desktopLinks}
    </Box>
  );
};

export default Navbar;
