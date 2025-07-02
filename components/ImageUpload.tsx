import React, { useState } from 'react'
import {useDropzone} from "react-dropzone";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (base64: string) => void
  label: string
  value?: string
  disabled?: boolean
}

const ImageUpload = ({ onChange, label, value, disabled }: ImageUploadProps) => {
  const [base64, setBase64] = useState<string | null>(value as string)

  const handleChange = (base64: string) => {
    onChange(base64)
  };

  const handleDrop = (files: File[]) => {
    const file = files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {  
      setBase64(event.target?.result as string)
      handleChange(event.target?.result as string)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": []
    }
  })

  return (
    <div {...getRootProps({
      className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer",
    })}>
      <input {...getInputProps()} />

      {
        base64 ? (
            <div className={"flex items-center justify-center"}>
              <Image src={base64} alt={"Uploaded image"} height={100} width={100} />
            </div>
        ) : (
            <p className={"white"}>{label}</p>
        )
      }
    </div>
  )
}

export default ImageUpload