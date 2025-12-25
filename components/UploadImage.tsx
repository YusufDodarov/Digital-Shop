'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { CircleX } from 'lucide-react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ProductsWithImages } from '@/app/types';
import { deleteImage, fetchImages, uploadImage } from '@/app/services/image';
import { toast } from 'sonner';

interface UploadImageProps {
  productId?: string; 
  onUploadTemp?: (files: File[]) => void; 
}

export const UploadImage: FC<UploadImageProps> = ({ productId, onUploadTemp }) => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<ProductsWithImages[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChangeFile = (ev: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = ev.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!productId && onUploadTemp) {
        onUploadTemp([selectedFile]); 
      }
    } else {
      setFile(null);
    }
  };

 const handleUpload = async () => {
  if (!file) {
    toast.error("Please select a valid file!");
    return;
  }

  if (!productId) {
    if (onUploadTemp) onUploadTemp([file]);
    toast.success("Image will be added after creating the product ✅");
    setFile(null);
    return;
  }

  try {
    setLoading(true);
    if (images && images.length > 0) {
      await Promise.all(images.map(img => deleteImage(img.id)));
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", productId);
    const data = await uploadImage(formData);
    setImages(data.data);
    setFile(null);
    toast.success("Image uploaded successfully ✅");
  } catch (err) {
    console.error(err);
    toast.error("Image upload failed ❌");
  } finally {
    setLoading(false);
  }
};

  const getImages = async () => {
    if (!productId) return;
    try {
      const data = await fetchImages(productId);
      setImages(data?.images);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (imageId?: string, file?: File) => {
  if (file && !productId) {
    if (onUploadTemp) onUploadTemp(
      temp => temp.filter(f => f !== file)
    );
    toast.success("Temporary image removed ✅");
    return;
  }

  if (!imageId || !productId) return;

  try {
    await deleteImage(imageId);
    setImages(prev => prev?.filter(img => img.id !== imageId) || null);
    toast.success("Image deleted ✅");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete image ❌");
  }
};

  useEffect(() => {
    if (productId) getImages();
  }, [productId]);

  return (
    <div className="w-full">
      <Label className="px-2 py-3">Do you want to insert a photo?</Label>
      <div className="flex gap-2 w-full justify-between flex-col md:flex-row">
        <Input type="file" accept="image/*" onChange={handleChangeFile} />
        <Button type="button" onClick={handleUpload} disabled={loading}>
      {productId ? 'Update Image' : 'Add Image'}
      </Button>
      </div>
      <div className="flex gap-2 mt-4 flex-wrap items-center justify-between">
        {images?.map(item => (
          <div className="relative group" key={item.id}>
            <CircleX onClick={() => handleDelete(item.id)} className="absolute top-1 right-1 text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"/>
            <Image width={100} height={100} alt="product image" src={item.image} className="mt-4 mx-auto rounded-md"/>
          </div>
        ))}
      </div>
    </div>
  );
};
