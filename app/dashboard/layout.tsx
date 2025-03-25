"use client";

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  Theme,
  Button,
} from "@carbon/react";
import {
  UserAvatar,
  Settings,
  Notification,
  Dashboard,
  Archive,
  Document,
  LightFilled,
  Moon,
} from "@carbon/icons-react";
import styles from "./dashboard.module.scss";
import { useTheme } from "../ThemeContext"; // Import Theme Hook
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme(); // Get theme state & toggle function

  return (
    <Theme theme={theme}> {/* Apply Theme to Dashboard */}
      <div className={styles.container}>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="IBM IntelliSphere® Optim™">
                <HeaderName prefix="IBM IntelliSphere®">Optim™ </HeaderName>
                <HeaderNavigation aria-label="IBM IntelliSphere® Optim™">
                  <HeaderMenuItem href="/dashboard">Dashboard</HeaderMenuItem>
                  <HeaderMenuItem href="/dashboard/archive">Archive</HeaderMenuItem>
                  <HeaderMenuItem href="/dashboard/products">Products</HeaderMenuItem>
                  <HeaderMenuItem href="/dashboard/documents">Documents</HeaderMenuItem>
                </HeaderNavigation>
                <HeaderGlobalBar>
                  {/* Theme Toggle Button */}
                  <HeaderGlobalAction aria-label="Switch Theme" onClick={toggleTheme}>
                    {theme === "white" ? <Moon size={20} /> : <LightFilled size={20} />}
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="Notifications">
                    <Notification size={20} />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="Settings">
                    <Settings size={20} />
                  </HeaderGlobalAction>
                  <HeaderGlobalAction aria-label="User">
                    <UserAvatar size={20} />
                  </HeaderGlobalAction>
                  
                </HeaderGlobalBar>
                {/* <SideNav
                  aria-label="Side navigation"
                  expanded={isSideNavExpanded}
                  isPersistent={false}
                >
                  <SideNavItems>
                    <SideNavLink renderIcon={Dashboard} href="/dashboard">
                      Dashboard
                    </SideNavLink>
                    <SideNavLink renderIcon={Archive} href="/dashboard/archive">
                      Archive
                    </SideNavLink>
                    <SideNavLink renderIcon={Document} href="/dashboard/documents">
                      Documents
                    </SideNavLink>
                  </SideNavItems>
                </SideNav> */}
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
