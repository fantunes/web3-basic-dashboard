import type { NextPage } from "next";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { ConnectWallet, Transactions, UserDetails } from "../components";
import { useIsMounted } from "../hooks/useIsMounted";

const Home: NextPage = () => {
  // This state is required based on:
  // https://github.com/tmm/wagmi/issues/542
  const isMounted = useIsMounted();
  const { data: account, isError, isLoading } = useAccount();

  if (!isMounted) return <p></p>;
  if (isLoading) return <p>Connecting account...</p>;
  if (isError) return <p>There was error connecting to wallet</p>;

  return (
    <Container maxW="container.xl">
      <Heading as={"h1"} size="2xl" padding={5} textAlign="center">
        🦊 Web3 Dashboard
      </Heading>
      <Flex
        padding={3}
        alignItems="center"
        justifyContent={!account?.address ? "center" : "space-between"}
      >
        {account?.address && (
          <Box>
            <UserDetails />
          </Box>
        )}
        <Box>
          <ConnectWallet />
        </Box>
      </Flex>
      {account?.address && (
        <Flex padding={3}>
          <Box>
            <Transactions />
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default Home;
