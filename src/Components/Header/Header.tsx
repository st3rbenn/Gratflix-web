import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Flex, Container, List, ListItem, Img, Input, Stack, Box} from '@chakra-ui/react';
import Logo from './Logo.png';
import {useNavigate, Link} from 'react-router-dom';
import styles from './Header.module.css';
import {debounce} from 'lodash';
import MenuHeader from '../menu/MenuHeader';

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [homeClicked, setHomeClicked] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState<string>();
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const Navigation = useNavigate();
  const pathNameUrl = window.location.pathname;

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleWritting = (ev: ChangeEvent) => {
    if (ev.target instanceof HTMLInputElement) {
      if (ev.target.value.length > 0) {
        setCurrentInputValue(ev.target.value);
        Navigation(`/search?q=${ev.target.value}`);
      } else {
        Navigation('/browse');
        setCurrentInputValue('');
      }
    }
  };

  const debounceChangeHandler = useCallback(debounce(handleWritting, 500), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);

  return (
    <Container
      as="header"
      maxW="container.xxl"
      pb={3}
      pt={4}
      position="fixed"
      zIndex={1000}
      className={`${styles.headerContainer} ${scrollPosition > 0 ? styles.HeaderFade : styles.HeaderFadeOut}`}
      flexShrink={0}
      color="white">
      <Flex
        as="nav"
        alignItems="center"
        mb="10px"
        mt="10px"
        ml={currentWidth > 768 ? '50px' : '0'}
        mr={currentWidth > 768 ? '50px' : '0'}
        justifyContent={currentWidth < 768 ? 'space-between' : 'initial'}>
        <Link to="/browse" onClick={() => setHomeClicked(!homeClicked)}>
          <Img src={Logo} maxWidth="100%" width="100px" />
        </Link>
        <Flex
          gap={5}
          alignItems="center"
          width={currentWidth > 768 ? '100%' : 'auto'}
          justifyContent="space-between"
          fontWeight="bold"
          fontSize="sm"
          ml={10}>
          {currentWidth < 768 ? (
            <>
              <MenuHeader />
            </>
          ) : (
            <>
              <List display="flex" justifyContent="center" alignItems="center" gap={5}>
                <ListItem
                  fontSize={pathNameUrl === '/browse' ? 'md' : ''}
                  color={pathNameUrl === '/browse' ? 'gray.100' : 'gray.300'}
                  _hover={pathNameUrl === '/browse' ? {color: ''} : {color: 'gray.300'}}>
                  <Link to="/browse">Accueil</Link>
                </ListItem>

                {/* <ListItem
                  fontSize={pathNameUrl === '/ma-liste' ? 'md' : ''}
                  color={pathNameUrl === '/ma-liste' ? 'gray.100' : 'gray.300'}
                  _hover={pathNameUrl === '/ma-liste' ? {color: ''} : {color: 'gray.300'}}>
                  <Link to="/ma-liste">Ma liste</Link>
                </ListItem> */}

                <ListItem
                  fontSize={pathNameUrl === '/categorie' ? 'md' : ''}
                  color={pathNameUrl === '/categorie' ? 'gray.100' : 'gray.300'}
                  _hover={pathNameUrl === '/categorie' ? {color: ''} : {color: 'gray.300'}}>
                  <Link to="/categorie">Catégories</Link>
                </ListItem>
              </List>
            </>
          )}
          {currentWidth > 768 && (
            <Input
              placeholder="Rechercher un film, acteur..."
              _placeholder={{opacity: 1, color: 'white', fontWeight: 600, fontSize: 'sm'}}
              onChange={debounceChangeHandler}
              width="20%"
            />
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
