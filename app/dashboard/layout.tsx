"use client";

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Theme,
} from "@carbon/react";
import {
  UserAvatar,
  Settings,
  Notification,
  LightFilled,
  Moon,
} from "@carbon/icons-react";
import styles from "./dashboard.module.scss";
import { useTheme } from "../ThemeContext";
import Footer from "@/components/Footer";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Theme theme={theme}>
      <div className={styles.container}>
        <HeaderContainer
          render={() => (
            <>
              <Header aria-label="IBM IntelliSphere® Optim™">
                <HeaderName prefix="IBM IntelliSphere®">Optim™</HeaderName>
                <HeaderNavigation aria-label="IBM IntelliSphere® Optim™">
                  <HeaderMenuItem href="/dashboard">{('Dashboard')}</HeaderMenuItem>
                  <HeaderMenuItem href="/dashboard/archive">{('Archive')}</HeaderMenuItem>
                  <HeaderMenuItem href="/dashboard/products">{('Products')}</HeaderMenuItem>
                  <HeaderMenuItem href="/dashboard/documents">{('Documents')}</HeaderMenuItem>
                  <HeaderMenuItem href="/dashboard/overview">{('Overview')}</HeaderMenuItem>
                </HeaderNavigation>
                <HeaderGlobalBar>
                  <HeaderGlobalAction aria-label={('switchTheme')} onClick={toggleTheme}>
                    {theme === "white" ? <Moon size={20} /> : <LightFilled size={20} />}
                  </HeaderGlobalAction>
                  
                  <HeaderGlobalAction aria-label={('notifications')}>
                    <Notification size={20} />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label={('settings')}>
                    <Settings size={20} />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label={('user')}>
                    <UserAvatar size={20} />
                  </HeaderGlobalAction>
                </HeaderGlobalBar>
              </Header>
              <Footer />
            </>
          )}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </Theme>
  );
}