import { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import {
  Alert,
  Button,
  List,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Transactions = () => {
  const { data: account } = useAccount();
  const [loading, setLoading] = useState(false);
  const [txs, setTxs] = useState([]);

  const loadBalances = async () => {
    setLoading(true);

    const ETHERSCAN_API_URL = process.env.NEXT_PUBLIC_ETHERSCAN_API_URL;
    const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

    const apiURL = `${ETHERSCAN_API_URL}/api?module=account&action=txlist&address=${account?.address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

    // More info about this api:
    // https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
    await fetch(apiURL)
      .then((d) => d.json())
      .then((tx) => setTxs(tx.result))
      .catch(console.error);

    setLoading(false);
  };

  if (loading) return <p>Fetching transactions...</p>;

  return txs.length > 0 ? (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {txs.map(
            (t: {
              nonce: string;
              from: string;
              to: string;
              timeStamp: number;
              value: string;
            }) => (
              <Tr key={t.nonce}>
                <Td>{t.from}</Td>
                <Td>{t.to}</Td>
                <Td>{new Date(t.timeStamp * 1000).toLocaleDateString()}</Td>
                <Td>
                  <Alert status="success" variant="left-accent">
                    {ethers.utils.formatUnits(t.value)}
                  </Alert>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Button colorScheme="teal" onClick={loadBalances}>
      Load transactions
    </Button>
  );
};

export default Transactions;
