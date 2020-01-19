import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Header.module.css';

const Header = ({ siteTitle }) => (
  <header>
    <h2 className={styles.header}>
      <Link to="/" className={styles.link}>
        {siteTitle}
      </Link>
    </h2>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
