import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';
import Cookies from "js-cookie";

const InitialForm = {
  amount : 0,
  description : "",
  date: new Date(),
};

export default function TransactionForm({fetchTransactions, editTransaction}) {
  const token = Cookies.get("token");
  const [form,setForm] = useState(InitialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction])
  
  function handleChange(e){
    setForm({...form, [e.target.name] : e.target.value});
  }

  function handleDate(newValue) {
    setForm({...form, date: newValue});
  }

  async function handleSubmit(e){
    e.preventDefault();
    editTransaction.amount === undefined ? create() : update();
  }  
  function reload(res){
    if(res.ok){
      setForm(InitialForm);
      fetchTransactions();
    }
  }
  async function create() {
      const res = await fetch(`http://localhost:4000/transaction` , {
      method : 'POST',
      body : JSON.stringify(form),
      headers : {
        "content-type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    reload(res);
  };

  async function update() {
      const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}` , {
      method : 'PATCH',
      body : JSON.stringify(form),
      headers : {
        'content-type' : "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    reload(res);
  };

  return (
    <Card variant='outlined' sx={{ minWidth: 275, marginTop : 10}}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              sx={{marginRight : 5}}
              id="outlined-basic" 
              size = "small"
              label="Amount"
              type="number" 
              name="amount"
              variant="outlined" 
              value = {form.amount}
              onChange = {handleChange}
              />
            <TextField 
              sx={{marginRight : 5}}
              id="outlined-basic" 
              size = "small"
              label="Enter the Transaction Description" 
              name="description"
              variant="outlined" 
              value = {form.description}
              onChange = {handleChange}
              />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction Date"
                inputFormat="DD/MM/YYYY"
                value = {form.date}
                onChange={handleDate}
                renderInput={(params) => (
                <TextField sx={{marginRight : 5}} size = "small" {...params} />)}
              />
            </LocalizationProvider>
            {editTransaction.amount !== undefined && (
                <Button type="submit" variant='contained'>Update</Button>
            )}
            {editTransaction.amount ===  undefined && (
              <Button variant="contained" type="submit">Submit</Button>
            )}
                    
          </form>
      </CardContent>
    </Card>
  );
}
