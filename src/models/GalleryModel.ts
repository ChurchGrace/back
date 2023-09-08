import { InferSchemaType, Model, Schema, model } from 'mongoose';

const gallerySchema = new Schema({
  imgMain: {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

export type TGallery = InferSchemaType<typeof gallerySchema>;
export type TGalleryModel = Model<TGallery>;

const Gallery = model<TGallery, TGalleryModel>('Gallery', gallerySchema);

export default Gallery;
