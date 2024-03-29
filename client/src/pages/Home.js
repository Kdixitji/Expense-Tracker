import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import React from "react";
import TransactionForm from "../components/TransactionForm.js";
import TransactionsList from "../components/TransactionsList.js";
import { useEffect, useState } from "react";

export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function fetchTransactions() {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:4000/transaction`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await res.json();
      setTransactions(data);
      };

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
