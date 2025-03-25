'use client';

import { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableSelectAll,
  TableSelectRow,
  TableContainer,
  Modal,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from '@carbon/react';
import { TrashCan, Save, Download } from '@carbon/icons-react';
import styles from '../dashboard.module.scss';
import { useRouter } from 'next/router';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const initialRows = [
  { id: '1', name: 'Hemanth', email: 'hemanth@mail.com', status: 'Active' },
  { id: '2', name: 'Yash', email: 'yash@mail.com', status: 'Inactive' },
  { id: '3', name: 'Ayan', email: 'ayan@mail.com', status: 'Active' },
  { id: '4', name: 'Abhi', email: 'abhi@mail.com', status: 'Inactive' },
  { id: '5', name: 'Vaishnavi', email: 'vaishnavi@mail.com', status: 'Active' },
  { id: '6', name: 'Abdus', email: 'abdus@mail.com', status: 'Inactive' },
  { id: '7', name: 'Sneha', email: 'sneha@mail.com', status: 'Active' },
  { id: '8', name: 'Manoj', email: 'manoj@mail.com', status: 'Inactive' },
  { id: '9', name: 'Arun', email: 'arun@mail.com', status: 'Active' },
];

export default function ArchivePage() {
  const [archiveRows, setArchiveRows] = useState(initialRows);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaveAsModalOpen, setIsSaveAsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  
  


  const batchActionClick = (selectedRows: any[], action: string) => () => {
    if (selectedRows.length === 0) return;
    switch (action) {
      case 'delete':
        setIsDeleteModalOpen(true);
        break;
      case 'save':
        setIsSaveModalOpen(true);
        break;
      case 'download':
        setIsDownloadModalOpen(true);
        break;
      case 'archive':
        setIsArchiveModalOpen(true);
        break;
    }
  };

  const handleBatchDelete = (selectedRows: any[]) => {
    setArchiveRows((prevRows) =>
      prevRows.filter((row) => !selectedRows.some((selected) => selected.id === row.id))
    );
    setIsDeleteModalOpen(false);
  };

  const handleBatchDownload = (selectedRows: any[]) => {
    console.log('Downloading rows:', selectedRows);
    setIsDownloadModalOpen(false);
  };

  const handleBatchArchive = (selectedRows: any[]) => {
    setArchiveRows((prevRows) =>
      prevRows.map((row) =>
        selectedRows.some((selected) => selected.id === row.id) ? { ...row, status: 'Archived' } : row
      )
    );
    setIsArchiveModalOpen(false);
  };

  return (
    <div className={styles.tableContainer}>
      <h1 className="cds--type-productive-heading-05">Archive Records</h1>

      <DataTable rows={archiveRows} headers={headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          selectedRows,
          getTableProps,
          getTableContainerProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer {...getTableContainerProps()}>
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...batchActionProps}>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={TrashCan}
                    onClick={batchActionClick(selectedRows, 'delete')}
                  >
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={batchActionClick(selectedRows, 'save')}
                  >
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Download}
                    onClick={batchActionClick(selectedRows, 'download')}
                  >
                    Download
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={batchActionClick(selectedRows, 'archive')}
                  >
                    Archive
                  </TableBatchAction>
                </TableBatchActions>

                <TableToolbarContent aria-hidden={batchActionProps.shouldShowBatchActions}>
                  <TableToolbarSearch tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0} />
                  <TableToolbarMenu tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                    <TableToolbarAction onClick={() => setIsSaveModalOpen(true)}>Save</TableToolbarAction>
                    <TableToolbarAction onClick={() => setIsSaveAsModalOpen(true)}>Save as</TableToolbarAction>
                  </TableToolbarMenu>
                  <Button tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0} kind="primary">
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>

              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }}
      </DataTable>

      {/* Delete Modal */}
      <Modal
        open={isDeleteModalOpen}
        modalHeading="Delete Selected Records"
        primaryButtonText="Confirm Delete"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onRequestSubmit={() => handleBatchDelete(archiveRows)}
      >
        <p>Are you sure you want to delete the selected records?</p>
      </Modal>
      <Modal
        open={isDownloadModalOpen}
        modalHeading="Download Selected Records"
        primaryButtonText="Confirm Download"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsDownloadModalOpen(false)}
        onRequestSubmit={() => handleBatchDownload(archiveRows)}
      >
        <p>Are you sure you want to delete the selected records?</p>
      </Modal>

      {/* Archive Modal */}
      <Modal
        open={isArchiveModalOpen}
        modalHeading="Archive Selected Records"
        primaryButtonText="Confirm Archive"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsArchiveModalOpen(false)}
        onRequestSubmit={() => handleBatchArchive(archiveRows)}
      >
        <p>Are you sure you want to archive the selected records?</p>
      </Modal>

      {/* Save Modal */}
      <Modal
        open={isSaveModalOpen}
        modalHeading="Save Records"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsSaveModalOpen(false)}
      >
        <p>Your records have been saved successfully.</p>
      </Modal>

      {/* Save As Modal */}
      <Modal
        open={isSaveAsModalOpen}
        modalHeading="Save Records As"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsSaveAsModalOpen(false)}
      >
        <p>Choose a format and location to save your records.</p>
      </Modal>
    </div>
  );
}
