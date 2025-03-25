'use client';

import { useEffect, useState } from 'react';
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

const headers = [
  { key: 'name', header: 'Document Name' },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size' },
  { key: 'lastModified', header: 'Last Modified' },
];

const allDocuments = [
  {
    id: '1',
    name: 'Project Proposal',
    type: 'PDF',
    size: '2.5 MB',
    lastModified: '2024-03-20',
    category: 'Recent Documents',
  },
  {
    id: '2',
    name: 'Meeting Notes',
    type: 'DOC',
    size: '1.2 MB',
    lastModified: '2024-03-19',
    category: 'Shared Documents',
  },
  {
    id: '3',
    name: 'Budget Report',
    type: 'XLS',
    size: '3.8 MB',
    lastModified: '2024-03-18',
    category: 'Archived Documents',
  },
  {
    id: '4',
    name: 'Client Presentation',
    type: 'PPT',
    size: '5.1 MB',
    lastModified: '2024-03-17',
    category: 'Recent Documents',
  },
  {
    id: '5',
    name: 'Project Timeline',
    type: 'XLS',
    size: '1.8 MB',
    lastModified: '2024-03-16',
    category: 'Shared Documents',
  },
  {
    id: '6',
    name: 'Annual Report',
    type: 'PDF',
    size: '4.2 MB',
    lastModified: '2024-03-15',
    category: 'Archived Documents',
  },
];

interface DataTableProps {
  selectedCategory: string | null;
}

export default function DataTableDoc({ selectedCategory }: DataTableProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaveAsModalOpen, setIsSaveAsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedRowsForAction, setSelectedRowsForAction] = useState<any[]>([]);

  // Filter documents based on selected category
  const filteredDocuments = selectedCategory === 'All Documents' 
    ? allDocuments 
    : allDocuments.filter(doc => doc.category === selectedCategory);

  const [documentRows, setDocumentRows] = useState(filteredDocuments);

  // Update documents when category changes
  useEffect(() => {
    const newDocuments = selectedCategory === 'All Documents'
      ? allDocuments
      : allDocuments.filter(doc => doc.category === selectedCategory);
    setDocumentRows(newDocuments);
  }, [selectedCategory]);

  const batchActionClick = (selectedRows: any[], action: string) => () => {
    setSelectedRowsForAction(selectedRows);
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
    }
  };

  const handleBatchDelete = () => {
    setDocumentRows((prevRows) =>
      prevRows.filter((row) => !selectedRowsForAction.some((selected) => selected.id === row.id))
    );
    setIsDeleteModalOpen(false);
  };

  const handleBatchDownload = () => {
    console.log('Downloading documents:', selectedRowsForAction);
    setIsDownloadModalOpen(false);
  };

  return (
    <div>
      <DataTable rows={documentRows} headers={headers}>
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

              <Table {...getTableProps()} aria-label="documents table">
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header) => {
                      const { key, ...headerProps } = getHeaderProps({ header });
                      return (
                        <TableHeader key={key} {...headerProps}>
                          {header.header}
                        </TableHeader>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const { key, ...rowProps } = getRowProps({ row });
                    return (
                      <TableRow key={key} {...rowProps}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }}
      </DataTable>

      {/* Delete Modal */}
      <Modal
        open={isDeleteModalOpen}
        modalHeading="Delete Selected Documents"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onRequestSubmit={handleBatchDelete}
      >
        <p>Are you sure you want to delete the selected documents?</p>
      </Modal>

      {/* Download Modal */}
      <Modal
        open={isDownloadModalOpen}
        modalHeading="Download Selected Documents"
        primaryButtonText="Download"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsDownloadModalOpen(false)}
        onRequestSubmit={handleBatchDownload}
      >
        <p>Download the selected documents?</p>
      </Modal>

      {/* Save Modal */}
      <Modal
        open={isSaveModalOpen}
        modalHeading="Save Documents"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsSaveModalOpen(false)}
      >
        <p>Your documents have been saved successfully.</p>
      </Modal>

      {/* Save As Modal */}
      <Modal
        open={isSaveAsModalOpen}
        modalHeading="Save Documents As"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsSaveAsModalOpen(false)}
      >
        <p>Choose a format and location to save your documents.</p>
      </Modal>
    </div>
  );
}