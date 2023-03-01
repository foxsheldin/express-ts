export interface ICreatePostModel {
  author: string;
  content: string;
  title: string;
}

export interface IURIParamsPostModel {
  id: string;
}

export interface IUpdatePostModel extends ICreatePostModel {
  _id: string;
  __v: number;
}

export interface IPostViewModel {
  author: string;
  content: string;
  title: string;
  _id: string;
  __v: number;
}
