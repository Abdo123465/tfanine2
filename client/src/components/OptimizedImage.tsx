import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = '/images/placeholder.jpg',
  ...props
}) => {
  const [error, setError] = useState(false);

  // تحويل مسار الصورة إلى المسار الصحيح مع دعم لمسارات attached_assets
  const normalizedSrc = (() => {
    try {
      // إذا كان المسار يحتوي على attached_assets، نستخدم مسار خدمة مباشر
      if (src.includes('attached_assets')) {
        return `/public/images/${src.split('/').pop()}`;
      }
      
      // معالجة المسارات النسبية وال절ية
      if (src.startsWith('/')) {
        return `/images/${src.split('/').pop()}`;
      } else if (src.startsWith('./assets/')) {
        return `/images/${src.split('/').pop()}`;
      }
      
      return src;
    } catch (err) {
      console.error('Error processing image path:', { originalSrc: src, error: err });
      return fallbackSrc;
    }
  })();

  return (
    <img
      src={error ? fallbackSrc : normalizedSrc}
      alt={alt}
      className={cn('transition-opacity duration-300', className)}
      onError={(e) => {
        if (!error) {
          console.error(`Error loading image: ${normalizedSrc}`);
          setError(true);
          // محاولة تحميل الصورة من المسار البديل
          const img = e.target as HTMLImageElement;
          if (img.src !== fallbackSrc) {
            img.src = fallbackSrc;
          }
        }
      }}
      loading="lazy"
      {...props}
    />
  );
};
