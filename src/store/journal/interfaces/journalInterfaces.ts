
export interface INote {
  title: string,
  body: string,
  date: number,
}

export interface INoteFirebase extends INote {
  id: string;
}

export interface IJournalSte {
  isSaving: boolean,
  messageSaved: string,
  notes: INoteFirebase[],
  active: INoteFirebase | null,
};
