import {Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react';
import {ChevronDownIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';

export default function MenuHeader() {
  const pathNameUrl = window.location.pathname;
  return (
    <Menu isLazy autoSelect={false}>
      <MenuButton
        fontWeight="semibold"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bgColor="transparent"
        borderColor="transparent"
        colorScheme="transparent">
        Parcourir
      </MenuButton>
      <MenuList bgColor="#181818" borderColor="#181818">
        <MenuItem
          fontSize={pathNameUrl === '/browse' ? 'md' : ''}
          color={pathNameUrl === '/browse' ? 'gray.100' : 'gray.300'}
          _hover={pathNameUrl === '/browse' ? {color: ''} : {color: 'gray.300'}}>
          <Link to="/browse">Accueil</Link>
        </MenuItem>
        {/* <MenuItem
          fontSize={pathNameUrl === '/ma-liste' ? 'md' : ''}
          color={pathNameUrl === '/ma-liste' ? 'gray.100' : 'gray.300'}
          _hover={pathNameUrl === '/ma-liste' ? {color: ''} : {color: 'gray.300'}}>
          <Link to="/categorie">Mes Favoris</Link>
        </MenuItem> */}
        <MenuItem
          fontSize={pathNameUrl === '/categorie' ? 'md' : ''}
          color={pathNameUrl === '/categorie' ? 'gray.100' : 'gray.300'}
          _hover={pathNameUrl === '/categorie' ? {color: ''} : {color: 'gray.300'}}>
          <Link to="/categorie">Catégories</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
