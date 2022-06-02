import { Button, Center } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectWallet = () => {
  const { data: account, isError, isLoading } = useAccount();
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isLoading) return <p>Connecting account...</p>;
  if (isError) return <p>There was error connecting to wallet</p>;

  return isLoading ? (
    <p>Connecting...</p>
  ) : (
    <Center height={!account?.address ? "100vh" : "auto"}>
      {account?.address ? (
        <Button colorScheme="teal" onClick={() => disconnect()}>
          Disconnect
        </Button>
      ) : (
        connectors.map((connector) => (
          <Button
            colorScheme="teal"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect(connector)}
          >
            Connect to {connector.name}
            {!connector.ready && " (unsupported)"}
            {isConnecting &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </Button>
        ))
      )}

      {error && <div>{error.message}</div>}
    </Center>
  );
};

export default ConnectWallet;
