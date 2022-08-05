import {Box, Text} from '@chakra-ui/react';
import React from 'react';

export default function Preview() {
  return (
    <Box position="relative" top={0} left={0} width="100px" height="200px" backgroundColor="#181818">
      <Text color="white">Hello world</Text>
    </Box>
  );
}
