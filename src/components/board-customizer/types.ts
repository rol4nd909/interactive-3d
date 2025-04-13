export interface BoardCustomizerTexture {
  texture: string;
  textureCrop?: string;
  uid: string;
}

export interface BoardCustomizerColor {
  color: string;
  uid: string;
}

export interface BoardCustomizerDocumentData {
  wheels: BoardCustomizerTexture[];
  decks: BoardCustomizerTexture[];
  metals: BoardCustomizerColor[];
}
