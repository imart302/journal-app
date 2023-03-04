
export interface INote {
  title: string,
  body: string,
  date: number,
}

export interface INoteFirebase extends INote {
  id: string;
  imageURLs?: string[];
}

export interface IJournalSte {
  isSaving: boolean,
  messageSaved: string,
  notes: INoteFirebase[],
  active: INoteFirebase | null,
};

export interface INoteFiles {
  note: INoteFirebase,
  files: FileList,
}
