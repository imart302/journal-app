import {
  DeleteOutline,
  FourMpRounded,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks';
import {
  AppDispatch,
  INoteFiles,
  INoteFirebase,
  RootState,
  setActiveNote,
} from '../../store';
import { startDeleteNote } from '../../store/journal/thunks/startDeleteNote';
import { startSavingNote } from '../../store/journal/thunks/startSavingNote';
import { startUploadingFiles } from '../../store/journal/thunks/startUploadingFiles';
import { ImageGalery } from '../components';

export const NoteView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeNote = useSelector((state: RootState) => state.journal.active);
  const messageSaved = useSelector(
    (state: RootState) => state.journal.messageSaved
  );
  const isSaving = useSelector((state: RootState) => state.journal.isSaving);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const initalForm = {
    fields: [
      { name: 'title', value: activeNote?.title ?? '' },
      { name: 'body', value: activeNote?.body ?? '' },
    ],
  };
  const form = useForm(initalForm);

  //Only when writing on the form change the active note with the values of the form
  useEffect(() => {
    //console.log('FORM CHANGED Fields');
    const newNote: INoteFirebase = {
      id: activeNote?.id ?? '',
      date: activeNote?.date ?? 0,
      title: form.field('title')?.value ?? '',
      body: form.field('body')?.value ?? '',
      imageURLs: activeNote?.imageURLs,
    };
    dispatch(setActiveNote(newNote));
  }, [form.formFields]);

  //When active note id, change the form, unless it will be a infinite loop
  useEffect(() => {
    //console.log('Form change note');
    const initalForm = {
      fields: [
        { name: 'title', value: activeNote?.title ?? '' },
        { name: 'body', value: activeNote?.body ?? '' },
      ],
    };
    form.resetForm(initalForm);
  }, [activeNote?.id]);

  useEffect(() => {
    if (messageSaved != '') {
      Swal.fire('Note saved');
    }
  }, [messageSaved]);

  const stringDate = useMemo(() => {
    return new Date(activeNote?.date ?? Date.now()).toUTCString();
  }, [activeNote?.date]);

  const handleSaveNote = () => {
    if (activeNote) {
      dispatch(startSavingNote(activeNote));
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.length);
    console.log(event.target.files);
  
    //TODO
    // dispatch(startUploadingFiles);
    if(!activeNote || !event.target.files) return;

    const noteFiles : INoteFiles = {
      note: activeNote,
      files: event.target.files,
    }
    dispatch(startUploadingFiles(noteFiles));

  };

  const handleDeleteNote = () => {
    if(!activeNote) return;
    dispatch(startDeleteNote(activeNote));
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {stringDate}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          onChange={onFileChange}
          multiple
          ref={imageInputRef}
          style={{ display: 'none' }}
        ></input>

        <IconButton
          onClick={() => {
            imageInputRef.current?.click();
          }}
          disabled={isSaving}
          color='primary'
        >
          <UploadOutlined />
        </IconButton>

        <Button onClick={handleSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          name="title"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          value={form.field('title')?.value}
          onChange={form.onInputChange}
          sx={{ border: 'none', mb: 1 }}
        ></TextField>
        <TextField
          type="text"
          variant="filled"
          name="body"
          value={form.field('body')?.value}
          onChange={form.onInputChange}
          fullWidth
          multiline
          placeholder="Que sucedio el día de hoy?"
          minRows={6}
        ></TextField>
      </Grid>
      <Grid container justifyContent='end'>
          <Button color='error' onClick={handleDeleteNote}>
            <DeleteOutline />
          </Button>
      </Grid>
      {/* Image galery */}
      { activeNote?.imageURLs ? <ImageGalery images={activeNote?.imageURLs}></ImageGalery>:<></>} 
    </Grid>
  );
};
