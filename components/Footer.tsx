'use client';

import React from "react";
import { Grid, Column } from "@carbon/react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Grid fullWidth>
        <Column sm={4} md={8} lg={8}>
          <span>© 2025 IBM Corporation. All rights reserved.</span>
        </Column>
        <Column sm={4} md={8} lg={8} className={styles.links}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/support">Support</a>
        </Column>
      </Grid>
    </footer>
  );
};

export default Footer;
