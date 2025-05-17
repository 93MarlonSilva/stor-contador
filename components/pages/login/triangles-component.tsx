"use client";

export function LoginTriangles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Triângulo superior direito */}
      <div className="absolute top-0 right-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
        <div className="w-0 h-0 border-l-[80px] sm:border-l-[96px] md:border-l-[112px] border-l-transparent border-b-[160px] sm:border-b-[192px] md:border-b-[224px] border-b-primary border-r-[80px] sm:border-r-[96px] md:border-r-[112px] border-r-transparent opacity-80 rotate-45 translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Triângulo inferior esquerdo */}
      <div className="absolute bottom-5 left-14 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
        <div className="w-0 h-0 border-l-[80px] sm:border-l-[96px] md:border-l-[112px] border-l-transparent border-t-[160px] sm:border-t-[192px] md:border-t-[224px] border-t-primary border-r-[80px] sm:border-r-[96px] md:border-r-[112px] border-r-transparent opacity-80 -rotate-75 -translate-x-1/2 translate-y-1/2 origin-center" />
      </div>
    </div>
  );
} 