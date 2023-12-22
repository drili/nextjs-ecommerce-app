"use client"

import Image, { StaticImageData } from "next/image";

interface HeaderBannerProps {
    imageUrl: string | StaticImageData
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({
    imageUrl
}) => {
    return (  
        <div id="component_HeaderBanner" className="relative w-full h-[500px] overflow-hidden mb-10 rounded-md">
            <Image 
                src={imageUrl}
                alt=""
                layout="fill"
                objectFit="cover"
            />
        </div>
    );
}
 
export default HeaderBanner;