import React from "react";
import Container from "@mui/material/Container";
import TransactionForm from "../TransactionForm.js";
import TransactionsList from "../TransactionsList.js";
import { useEffect, useState } from "react";



export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function fetchTransactions(){
        const res = await fetch("http://localhost:4000/transaction");
        const {data} = await res.json();
        setTransactions(data);
        
      } 
    return (
        <Container>
        <TransactionForm 
            fetchTransactions={fetchTransactions}
            editTransaction={editTransaction}
            setEditTransaction={setEditTransaction}
        />
        <TransactionsList 
            transactions={transactions}
            fetchTransactions={fetchTransactions}
            setEditTransaction={setEditTransaction}
        />
        </Container>
        );     
}