'use client' // Client por conta da table

import { Box, TextField, Grid, Accordion, AccordionSummary,AccordionDetails, } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options: MUIDataTableOptions = {
  filterType: 'checkbox',
};

export default function Home() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Accordion sx={{width: '100%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
              {/* <ListItemIcon>
                {r.icon}
              </ListItemIcon> */}
              Cadastrar produto
              {/* <ListItemText primary={r.name} /> */}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item md xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                  />
                </Grid>
                <Grid item md xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                  />
                </Grid>
                <Grid item md xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                  />
                </Grid>
              </Grid>
        </AccordionDetails>
      </Accordion>
     
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
}
