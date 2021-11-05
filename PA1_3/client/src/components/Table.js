import React, {useState} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@material-ui/core'
import {getToken} from '../utils/useLocalStorage'

const TableComponent = ({rows, columns, isMovies, handleShowSnackbar}) => {
    const handleLike = async (row) => {
        try {
            const token = getToken();
            if (token !== "") {
                const rowID = row.id;
                const response = await fetch("/like-movie", {
                    method: "POST",
                    headers: {
                        'Authorization': token
                      },
                    body: new URLSearchParams({mpid: rowID})
                });
                if (response.ok) {
                    handleShowSnackbar(true, "Successfully liked " + row.name);
                }   
            }
            else {
                throw new Error("User is not logged in");
            }
        } catch (error) {
            console.log(error);
            handleShowSnackbar(true, error.message);
        }
    }

    const extractColumnNames = () => {
        return (<TableRow>
        {columns.map((col) => (
            <TableCell>{col}</TableCell>
            ))}
        {isMovies && <TableCell>Likes</TableCell>}
        </TableRow>)
    }
    const extractRowData = () => {
        return rows.map(row => {
            return (<TableRow>
                {columns.map((col) => (
                    <TableCell>{row[col]}</TableCell>
                ))}
                {isMovies && <TableCell><Checkbox onClick={() => handleLike(row)}></Checkbox></TableCell>}
            </TableRow>)
        })
    }
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {extractColumnNames()}
          </TableHead>
          <TableBody>
              {extractRowData()}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default TableComponent