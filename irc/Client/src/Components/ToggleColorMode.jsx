import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ToggleColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            onClick={() => toggleColorMode()}
            pos="absolute"
            top="0"
            right="0"
            m="1rem"
        >
            {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
}