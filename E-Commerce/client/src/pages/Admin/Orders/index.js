import React from 'react'
import { useQuery } from 'react-query';
import { fetchOrders } from '../../../globals/Network';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from '@chakra-ui/react'

function Orders() {

  // 'admin:orders' cashlenirken kullanacağı key
  const { isLoading, isError, data, error } = useQuery('admin:orders', fetchOrders);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }


  const orders = data.data;
  return (
    <div>
      <Text fontSize='2xl' p={5}>
        Orders
      </Text>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>USER</Th>
              <Th>ADRESS</Th>
              <Th isNumeric>ITEMS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td>{order.user.email}</Td>
                <Td>{order.address}</Td>
                <Td isNumeric>{order.items.length}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Orders