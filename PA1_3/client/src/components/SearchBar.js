import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({placeholder, keyName, handleSubmit, onChange}) {
  return (
      <div>
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e) => onChange(keyName, e)}
        />
        <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
            <SearchIcon />
        </IconButton>
        </Paper>
      </div>
  );
}