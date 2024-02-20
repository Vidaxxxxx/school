import React from "react";
import { Grid, GridItem } from "@chakra-ui/react"
import RightSide from "../Components/Chat/RightSide";
import ChannelNavigation from "../Components/Channels/ChannelNavigation";
import UserList from "../Components/Channels/UserList";
import { useColorModeValue } from "@chakra-ui/color-mode";


export default function Home() {

  const color1 = useColorModeValue("gray.200", "whiteAlpha.100");
  const color2 = useColorModeValue("gray.300", "gray.800");
  const color3 = useColorModeValue("gray.400", "gray.900");

  return (
    <Grid
      h="100vh"
      w="100%"
      templateColumns={{ md: "repeat(13, 1fr)", xl: "repeat(20, 1fr)" }}
      templateRows={"1fr"}
      gap={1}
    >
      <GridItem colSpan={1} rowSpan={1} bg={color3}>
        <ChannelNavigation />
      </GridItem>

      <GridItem colSpan={3} rowSpan={1} bg={color2}>
        <UserList />
      </GridItem>

      {/* Right Side */}
      <GridItem colSpan={{ md: 9, xl: 16 }} rowSpan={1} maxHeight={"100vh"} bg={color1}>
        <RightSide />
      </GridItem>

    </Grid>
  );
}

