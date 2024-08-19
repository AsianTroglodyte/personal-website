import Tag from "./Tag.jsx";
import {useRef, useLayoutEffect, useEffect, useState} from 'react';

interface UserProps {
    carouselDatum: {
        id: number, 
        title: string, 
        description: string, 
        src: string, 
        alt: string, 
        tags: {id: number, tagName:string}[]
    }
}


const FeaturedArticleCard = ( {carouselDatum}: UserProps) => {
    const {id, title, description, src, alt, tags} = carouselDatum;
    // find the amount of lines to clamp.


    // NOTE THIS IS IMPORTANT CONTEXT FOR THE PAGE: the following commented out code 
    // is a dynamic attempt at height-based line-clamps it is not feasible likely because
    // getting size data of elements almost directly after mount when the browser determines 
    // the sizes instead of it being hardcoded is very unreliable and we don't get the end product 
    // of browser size calculations. A slight delay among other things would help, but it is a 
    // tremendous time sink to figure it out and it introduces much complexity
    // (IMPORTANT) global.css contains the css 
    // that takes care of the height-based clamps.
    // it is not elegant but there are no serious issues with it at all. 

    // Nice interface :D
    const descriptionTextRef = useRef<HTMLParagraphElement>(null);

    // typically useLayoutEffect may be used, but it is so subtle that I went for more performance with useEffect.
    useEffect (() => {
        // null checking to satisfy TypeScript
        // NOTE: size-containment must be set to size for some reason idk why tbh
        if (descriptionTextRef.current !== null && 
            descriptionTextRef.current.offsetHeight !== 0){

            const textHeight = descriptionTextRef.current.getBoundingClientRect().height;
            console.log("descriptionTextRef: ", descriptionTextRef.current.innerText);
            console.log("textHeight: ", textHeight);
            const lineNum = Math.floor(textHeight/(1.25 * 16));
            console.log("lineNum: ", lineNum)
            const newMaxHeight = lineNum * 1.25 * 16; 

            descriptionTextRef.current.style.webkitLineClamp = `${lineNum}`;
            descriptionTextRef.current.style.display =  "-webkit-box";
            descriptionTextRef.current.style.webkitBoxOrient = "vertical";
            descriptionTextRef.current.style.overflow= "hidden";

            descriptionTextRef.current.style.maxHeight =  `${newMaxHeight}px`;
        }
        // dependency as size changes as browser loads stuff
    }, [descriptionTextRef.current]);


    return (
    <>
    <div className="flex justify-center content-center flex-[_0_0_10%] h-[36rem]
        embla-slide-number">
        {/* Thumbnail. h & w need to be full as img is a container for the img. This makes object-cover work grid-cols-[minmax(_18rem,18rem)*/}
        {/* title description thingy. Max  */}
        <div className="grid grid-rows-[minmax(_0rem,_22rem)_minmax(_0rem,_16rem)] grid-cols-[minmax(_20rem,_20rem)] bg-white rounded-md shadow-md hover:shadow-lg font-notoSerif">
            <img className="object-cover h-full w-full rounded-t-md" alt={carouselDatum.alt} src={carouselDatum.src}></img>
            <div className="flex flex-col p-4 justify-between">
                <div className="flex flex-col grow gap-3 overflow-hidden">
                    {/* advanced-truncation is for truncating and putting ellipses on overflowing text content */}
                    <h6 className="title-text text-base font-bold max-h-[4.5rem] overflow-hidden advanced-trunction-3">
                        {carouselDatum.title}
                    </h6> 
                    <p className="description-text text-sm overflow-hidden grow" ref={descriptionTextRef}>
                        {carouselDatum.description}
                    </p>
                </div>
                <div className="flex flex-col gap-3 pt-3">
                    <div className="text-sm">Date: July 3, 2002</div>
                    <div className="flex flex-row gap-1">
                        {
                            carouselDatum.tags.map((tagData) => 
                                <Tag key={tagData.id} tagData={tagData}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        {/* <style>
        {css}
        </style> */}
    </div>
    </>
    )
}
// consider turning into custom tailwind class

export default FeaturedArticleCard;