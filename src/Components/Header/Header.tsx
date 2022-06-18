import React, { ChangeEvent, useEffect, useState } from 'react';
import { Flex, Container, List, ListItem, Img, Input, Stack, Button } from '@chakra-ui/react';
import Logo from '../../../src/assets/img/Logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { CSSObject } from '@emotion/react';

export function Header() {
  const Navigation = useNavigate();
  const pathNameUrl = window.location.pathname;

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleWritting = (ev: ChangeEvent) => {
    if (ev.target instanceof HTMLInputElement) {
      // eslint-disable-next-line no-constant-condition
      window.history.replaceState(null, typeof null == null ? '' : '', `/search?q=${ev.target.value}`);
      if (ev.target.value.length > 0) {
        Navigation(`/search?q=${ev.target.value}`);
      } else {
        // eslint-disable-next-line no-constant-condition
        window.history.replaceState(null, typeof null == null ? '' : '', '/home');
        Navigation('/');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }, []);

  return (
    <Container
      as='header'
      maxW='container.xxl'
      pb={3}
      pt={4}
      position='fixed'
      zIndex={100000}
      className={scrollPosition > 50 ? 'HeaderFade' : ''}
      color='white'>
      <Flex as='nav' alignItems='center' ml='50px' mr='55px' justifyContent='space-between'>
        <List display='flex' gap={5} alignItems='center' fontWeight={600} fontSize='sm'>
          <ListItem w='20%'>
            <Link to='/'>
              <Img src={Logo} />
            </Link>
          </ListItem>

          <ListItem
            ml={10}
            fontSize={pathNameUrl === '/browse' ? 'md' : ''}
            color={pathNameUrl === '/browse' ? 'gray.100' : 'gray.300'}
            _hover={pathNameUrl === '/browse' ? ({ color: '' } as CSSObject) : ({ color: 'gray.300' } as CSSObject)}>
            <Link to='/browse'>Accueil</Link>
          </ListItem>

          <ListItem color='gray.500' _hover={{ color: 'white' }}>
            <Link to='/search'>Films</Link>
          </ListItem>

          <ListItem color='gray.500' _hover={{ color: 'white' }}>
            <Link to='/test'>Ma liste</Link>
          </ListItem>

          <ListItem color='gray.500' _hover={{ color: 'white' }}>
            <Link to='/test2'>Catégories</Link>
          </ListItem>
        </List>

        <Stack flexDir='row' justifyContent='center' alignItems='center' gap={6}>
          <Input
            placeholder='Rechercher un film, par acteur...'
            _placeholder={{ opacity: 1, color: 'white', fontWeight: 600, fontSize: 'sm' }}
            htmlSize={20}
            onChange={(e) => handleWritting(e)}
          />
          <Button width='auto' mt='0 !important' bgColor='#e50914' pl={7} pr={7}>
            S'enregistrer
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
}
