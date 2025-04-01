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
} from '@carbon/react';
import { TrashCan, Save, Download } from '@carbon/icons-react';
import styles from '../dashboard.module.scss';

interface TableRowData {
  id: string;
  name: string;
  email: string;
  status: string;
}

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const initialRows: TableRowData[] = [
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
  const [archiveRows, setArchiveRows] = useState<TableRowData[]>(initialRows);
  const [modalState, setModalState] = useState({
    delete: false,
    save: false,
    saveAs: false,
    download: false,
    archive: false,
  });

  const toggleModal = (type: keyof typeof modalState, isOpen: boolean) => {
    setModalState((prev) => ({ ...prev, [type]: isOpen }));
  };

  const handleBatchAction = (selectedRows: any[], action: keyof typeof modalState) => {
    if (selectedRows.length === 0) return;
    toggleModal(action, true);
  };

  const handleBatchDelete = (selectedRows: any[]) => {
    const rowIds = selectedRows.map(row => row.id);
    setArchiveRows((prevRows) => 
      prevRows.filter((row) => !rowIds.includes(row.id))
    );
    toggleModal('delete', false);
  };

  const handleBatchDownload = (selectedRows: any[]) => {
    console.log('Downloading rows:', selectedRows);
    toggleModal('download', false);
  };

  const handleBatchArchive = (selectedRows: any[]) => {
    const rowIds = selectedRows.map(row => row.id);
    setArchiveRows((prevRows) =>
      prevRows.map((row) =>
        rowIds.includes(row.id) ? { ...row, status: 'Archived' } : row
      )
    );
    toggleModal('archive', false);
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
                    onClick={() => handleBatchAction(selectedRows, 'delete')}
                  >
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={() => handleBatchAction(selectedRows, 'save')}
                  >
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Download}
                    onClick={() => handleBatchAction(selectedRows, 'download')}
                  >
                    Download
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={() => handleBatchAction(selectedRows, 'archive')}
                  >
                    Archive
                  </TableBatchAction>
                </TableBatchActions>

                <TableToolbarContent aria-hidden={batchActionProps.shouldShowBatchActions}>
                  <TableToolbarSearch tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0} />
                  <TableToolbarMenu tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                    <TableToolbarAction onClick={() => toggleModal('save', true)}>Save</TableToolbarAction>
                    <TableToolbarAction onClick={() => toggleModal('saveAs', true)}>Save as</TableToolbarAction>
                  </TableToolbarMenu>
                  <Button tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0} kind="primary">
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>

              <Table {...getTableProps()} aria-label="Archive Table">
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
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

      {/* Modals */}
      {(['delete', 'download', 'archive', 'save', 'saveAs'] as const).map((type) => (
        <Modal
          key={type}
          open={modalState[type]}
          modalHeading={`${type.charAt(0).toUpperCase() + type.slice(1)} Selected Records`}
          primaryButtonText={`Confirm ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          secondaryButtonText="Cancel"
          onRequestClose={() => toggleModal(type, false)}
          onRequestSubmit={() =>
            type === 'delete'
              ? handleBatchDelete(archiveRows)
              : type === 'download'
              ? handleBatchDownload(archiveRows)
              : type === 'archive'
              ? handleBatchArchive(archiveRows)
              : toggleModal(type, false)
          }
        >
          <p>Are you sure you want to {type} the selected records?</p>
        </Modal>
      ))}
    </div>
  );
}
