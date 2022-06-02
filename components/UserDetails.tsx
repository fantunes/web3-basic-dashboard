import { Box, List, ListItem } from "@chakra-ui/react";
import { useAccount, useBalance } from "wagmi";

const UserDetails = () => {
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
  });

  return (
    <List>
      <ListItem>
        <strong>Account:</strong> {account?.address.substring(1, 5)}...
        {account?.address.substring(account?.address.length - 4)}
      </ListItem>
      <ListItem>
        <strong>Balance:</strong> {balance?.formatted} {balance?.symbol}
      </ListItem>
    </List>
  );
};

export default UserDetails;
