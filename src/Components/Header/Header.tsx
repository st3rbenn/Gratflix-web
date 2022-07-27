import React, { ChangeEvent, useEffect, useState } from 'react';
import { Flex, Container, List, ListItem, Img, Input, Stack, Button } from '@chakra-ui/react';
import Logo from './Logo.png';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const Navigation = useNavigate();
  const pathNameUrl = window.location.pathname;

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleWritting = (ev: ChangeEvent) => {
    if (ev.target instanceof HTMLInputElement) {
      if (ev.target.value.length > 0) {
        Navigation(`/search?q=${ev.target.value}`);
      } else {
        window.history.replaceState(null, '/home');
        Navigation('/Browse');
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
      zIndex={1000}
      className={`${styles.headerContainer} ${scrollPosition > 0 ? styles.HeaderFade : styles.HeaderFadeOut}`}
      color='white'
    >
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
            _hover={pathNameUrl === '/browse' ? { color: '' } : { color: 'gray.300' }}
          >
            <Link to='/browse'>Accueil</Link>
          </ListItem>

          <ListItem
            fontSize={pathNameUrl === '/ma-liste' ? 'md' : ''}
            color={pathNameUrl === '/ma-liste' ? 'gray.100' : 'gray.300'}
            _hover={pathNameUrl === '/ma-liste' ? { color: '' } : { color: 'gray.300' }}
          >
            <Link to='/ma-liste'>Ma liste</Link>
          </ListItem>

          <ListItem
            fontSize={pathNameUrl === '/categorie' ? 'md' : ''}
            color={pathNameUrl === '/categorie' ? 'gray.100' : 'gray.300'}
            _hover={pathNameUrl === '/categorie' ? { color: '' } : { color: 'gray.300' }}
          >
            <Link to='/categorie'>Catégories</Link>
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
