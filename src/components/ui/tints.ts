/*
  Mappa chiave → classe Tailwind per le tinte di categoria.

  Serve per un motivo preciso: Tailwind compila il CSS leggendo il sorgente
  alla ricerca di nomi di classe COMPLETI. Scrivere `tinta-${item.tint}` non
  produce nulla, perché quella stringa non esiste mai per intero nel file.

  Questa mappa è il modo idiomatico di aggirare il problema: le cinque classi
  compaiono scritte per esteso, il compilatore le trova, e nel JSX si
  seleziona quella giusta con `tinte[item.tint]`.
*/
export const tinte = {
  blu: "tinta-blu",
  ambra: "tinta-ambra",
  verde: "tinta-verde",
  viola: "tinta-viola",
  corallo: "tinta-corallo",
} as const;

export type Tinta = keyof typeof tinte;
