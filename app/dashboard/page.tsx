'use client';

import { useState } from 'react';
import {
  Tile,
  Grid,
  Column,
  Modal,
  ClickableTile,
  AspectRatio,
  Content,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from '@carbon/react';
import { useRouter } from 'next/navigation';
import {
  Dashboard,
  Archive,
  Document,
  ChartColumn,
} from '@carbon/icons-react';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const router = useRouter();

  const tiles = [
    {
      title: 'Archive Data',
      description: 'View and manage archived records',
      icon: Archive,
      action: () => router.push('/dashboard/archive'),
    },
    {
      title: 'Products',
      description: 'View available products',
      icon: ChartColumn,
      action: () => router.push('dashboard/products'),
    },
    {
      title: 'Documents',
      description: 'Manage your documents',
      icon: Document,
      action: () => router.push('/dashboard/documents'),
    },
    {
      title: 'Overview',
      description: 'System overview and status',
      icon: Dashboard,
      action: () => router.push('/dashboard/overview'),
    },
  ];

  return (
    <Content className={styles.dashboardContainer}>
      <Grid narrow>
        <Column lg={16} md={8} sm={4}>
          <h1 className="cds--type-productive-heading-05 mb-8">Dashboard Overview</h1>
        </Column>

        {tiles.map((tile, index) => (
          <Column sm={4} md={4} lg={4} key={index}>
            <ClickableTile
              className={styles.tile}
              onClick={tile.action}
            >
              <AspectRatio ratio="1x1">
                <div className={styles.tileContent}>
                  <tile.icon size={32} />
                  <h3 className="cds--type-productive-heading-02">{tile.title}</h3>
                  <p className="cds--type-body-long-01">{tile.description}</p>
                </div>
              </AspectRatio>
            </ClickableTile>
          </Column>
        ))}

        <Column lg={16} md={8} sm={4}>
          <Tile>
            <StructuredListWrapper>
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head>Recent Activity</StructuredListCell>
                  <StructuredListCell head>Status</StructuredListCell>
                  <StructuredListCell head>Date</StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                <StructuredListRow>
                  <StructuredListCell>Document Updated</StructuredListCell>
                  <StructuredListCell>Completed</StructuredListCell>
                  <StructuredListCell>Today</StructuredListCell>
                </StructuredListRow>
                <StructuredListRow>
                  <StructuredListCell>New Archive Entry</StructuredListCell>
                  <StructuredListCell>Pending</StructuredListCell>
                  <StructuredListCell>Yesterday</StructuredListCell>
                </StructuredListRow>
              </StructuredListBody>
            </StructuredListWrapper>
          </Tile>
        </Column>
      </Grid>
    </Content>
  );
}