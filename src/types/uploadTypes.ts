export interface IReqFiles {
  [key: string]: Express.Multer.File[];
}

export interface ISavedRes {
  secure_url: string;
  public_id: string;
}
