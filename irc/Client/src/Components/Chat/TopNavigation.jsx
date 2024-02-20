import { HStack, Heading } from "@chakra-ui/react";
import { useChannel } from "../Channels/ChannelProvider";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function TopNavigation() {
  const { activeChannel } = useChannel();

  const hashtagColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  return (
    <HStack w="100%" h="100%" paddingX={"10px"}>
      <Heading size="lg" color={hashtagColor}>#</Heading>
      <Heading size="md" color={textColor}>{activeChannel.title || "Home"}</Heading>
    </HStack>
  );
};

