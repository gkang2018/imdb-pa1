import React, {useState} from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@material-ui/core'

const TableComponent = ({rows, columns, isMovies}) => {

    const handleLike = () => {

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
                {isMovies && <TableCell><Checkbox></Checkbox></TableCell>}
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