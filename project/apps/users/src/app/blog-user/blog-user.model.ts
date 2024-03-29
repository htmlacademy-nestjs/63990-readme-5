import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/shared/types';;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatarPath: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public fullname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  public id?: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);

BlogUserSchema.virtual('id').get(function() {
  return this._id.toString();
});