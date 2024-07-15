import {Flex, Text} from '@chakra-ui/react';
import React from 'react';
import {Genre, Role, Writer} from 'src/plexAPI/type';

import styles from './modal.module.css';
import {Link} from 'react-router-dom';

type Props = {
  categories: Genre[] | undefined;
  actors: Role[] | undefined;
  realisators: Writer[] | undefined;
};

const SideContainer = (props: Props) => {
  const {categories, actors, realisators} = props;
  return (
    <Flex className={styles.sideContainer}>
      <Flex className={styles.sideItemsContainer} mb="15px">
        <Text color="gray.400" fontSize="14px">
          genre:
        </Text>
        {categories?.map((category: Genre) => (
          <Text className={styles.listItems} fontWeight="semibold" key={category?.tag}>
            <Link to={`?categorie=${category?.tag}`}>{category?.tag}</Link>
          </Text>
        ))}
      </Flex>
      <Flex className={styles.sideItemsContainer} mb="15px">
        <Text color="gray.400" fontSize="14px">
          acteurs:
        </Text>
        {actors?.map((actor: Role) => (
          <Text className={styles.listItems} fontWeight="semibold" key={actor?.tag}>
            <Link to={`?acteur=${actor?.tag}`}>{actor?.tag}</Link>
          </Text>
        ))}
      </Flex>
      <Flex className={styles.sideItemsContainer}>
        <Text color="gray.400" fontSize="14px">
          realisateur:
        </Text>
        {realisators?.map((realisator: Writer) => (
          <Text className={styles.listItems} fontWeight="semibold" key={realisator?.tag}>
            <Link to={`/?realisateur=${realisator?.tag}`}>{realisator?.tag}</Link>
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default SideContainer;
