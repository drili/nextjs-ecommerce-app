"use client"

import Image, { StaticImageData } from "next/image";

interface HeaderBannerProps {
    imageUrl: string | StaticImageData,
    imageSize?: "small" | "large"
}

const HeaderBanner: React.FC<HeaderBannerProps> = ({
    imageUrl,
    imageSize
}) => {
    const imageSizeHeight = imageSize === "small" ? "250px" : "500px"

    return (  
        <div 
            id="component_HeaderBanner" 
            className="relative w-full overflow-hidden mb-10 rounded-md"
            style={{height: imageSizeHeight }}
        >
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