import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const currencies = [
  { value: 'USD', label: '$' },
  { value: 'EUR', label: 'm' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const columns = [
  { id: 'codeHexa', label: 'Code Hexa', minWidth: 120 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'modele', label: 'Modèle', minWidth: 100 },
  {
    id: 'fabriquant', label: 'Fabricant', minWidth: 100 
  },
  {
    id: 'certificat', label: 'Certificat', minWidth: 100
  },
  {
    id: 'statut', label: 'Statut', minWidth: 100
  },
  {
    id: 'enregistrement', label: 'Enregistrement', minWidth: 100
  },
  {
    id: 'action', label: 'Actions', minWidth: 100
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <Paper variant="elevation" sx={{ width: '100%',  minHeight: '650px',  padding: '16px' }}>
      
      {/* Header avec titre et icône */}
      <Box sx={{ border: '1px solid black', borderRadius: '4px', padding: '8px', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h2" align="center">
            Propriétaire de la Balise/Mes Balises
          </Typography>
          <AccountCircleIcon />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        {/* Champs d'Entrée */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-select-currency"
              select
              label="Select 1"
              defaultValue="EUR"
              helperText="Choisir la balise"
              sx={{ m: 1, width: '25ch' }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Select 2"
              defaultValue=""
              slotProps={{ select: { native: true } }}
              helperText="Choisir le type"
              sx={{ m: 1, width: '25ch' }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-select-currency-3"
              select
              label="Select 3"
              defaultValue="EUR"
              helperText="Choisir l'état"
              sx={{ m: 1, width: '25ch' }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency-4"
              select
              label="Select 4"
              defaultValue="EUR"
              slotProps={{ select: { native: true } }}
              helperText="Choisir le modèle"
              sx={{ m: 1, width: '25ch' }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Bouton Enregistrer et Barre de Recherche */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Button variant="contained" size="large" sx={{ mb: 1 }}>
            Enregistrer une balise
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <SearchTwoToneIcon sx={{ mr: 1, color: 'grey.500' }} />
              ),
            }}
          />
        </Box>
      </Box>

      {/* Tableau */}
      
      <Typography variant="h6" component="h2" align="left">
            Liste de mes Balises
          </Typography>

      <TableContainer sx={{ maxHeight: 400, height: 'auto', overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: 'flex', justifyContent: 'right' }} 
      />
    </Paper>
  );
}
