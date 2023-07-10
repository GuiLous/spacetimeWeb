'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [previewVideo, setPreviewVideo] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const previewURL = URL.createObjectURL(files[0])

    if (files[0].type.includes('video')) {
      setPreviewImage(null)
      setPreviewVideo(previewURL)
      return
    }

    setPreviewVideo(null)
    setPreviewImage(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      {previewImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewImage}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      {previewVideo && (
        // eslint-disable-next-line @next/next/no-img-element
        <video
          src={previewVideo}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
