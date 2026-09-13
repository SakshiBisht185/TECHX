interface FundusImageProps {
  src: string;
  alt?: string;
  className?: string;
  rounded?: boolean;
}

export function FundusImage({ src, alt = 'Retinal fundus image', className = '', rounded = true }: FundusImageProps) {
  return (
    <div className={`relative overflow-hidden bg-slate-900 ${rounded ? 'rounded-2xl' : ''} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
    </div>
  );
}
