import React, { FC } from 'react'

type Props = {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ImageUploadForm: FC<Props> = ({
  handleImageChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button type="submit">検索</button>
    </form>
  )
}
