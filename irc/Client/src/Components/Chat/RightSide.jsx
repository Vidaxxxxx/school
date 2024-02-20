import { Grid, GridItem } from "@chakra-ui/react";
import TopNavigation from "./TopNavigation";
import MessageZone from "./MessageZone";
import InputField from "../InputField/InputField";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function RightSide({ channelsListState }) {

    const color1 = useColorModeValue("gray.200", "whiteAlpha.100");
    const color2 = useColorModeValue("gray.300", "gray.800");
    const color3 = useColorModeValue("gray.400", "gray.900");

    return (
        <Grid
            w="100%"
            h="100%"
            templateColumns={"1fr"}
            templateRows={"repeat(11, 1fr) 70px"}
            gap={1}
        >
            {/* Top Navigation */}
            < GridItem colSpan={1} rowSpan={1} borderBottomColor="black" borderBottom={"1px"} >
                <TopNavigation />
            </GridItem >

            {/* Content */}
            < GridItem colSpan={1} rowSpan={10} overflowY={"scroll"} maxHeight={"100%"}>
                <MessageZone />
            </GridItem >

            {/* Input Field */}
            < GridItem colSpan={1} rowSpan={1}>
                <InputField />
            </GridItem >

        </Grid >
    );
}