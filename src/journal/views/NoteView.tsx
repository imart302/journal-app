import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImageGalery } from '../components'

export const NoteView = () => {
  return (
    <Grid container direction="row" justifyContent='space-between' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={ 39 } fontWeight='light'>28 Agosto, 2023</Typography>
      </Grid>
      <Grid item>
        <Button>
          <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder='Ingrese un titulo'
          label="Titulo"
          sx={{ border: 'none', mb: 1}}
        >
        </TextField>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder='Que sucedio el día de hoy?'
          minRows={ 6 }
        ></TextField>
      </Grid>
      {/* Image galery */}
      <ImageGalery></ImageGalery>
    </Grid>
  )
}
