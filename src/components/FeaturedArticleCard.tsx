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
    // find the amount of lines to clamp.

    // Nice interface :D
    const descriptionTextRef = useRef<HTMLParagraphElement>(null);

    const lineNum = -1;

    // typically useLayoutEffect may be used, but it is so subtle that I went for more performance with useEffect.
    // useEffect changes number of allowable lines using clamp based on size of container for description
    useEffect (() => {
        // null checking to satisfy TypeScript
        if (descriptionTextRef.current !== null && 
            descriptionTextRef.current.offsetHeight !== 0){            
            
            // when rerunning code by saving, the number of description lines decrease. the following declaration prevents that.
            // I suspect that it might have to do with height that is acquired by the code while the page is rendering.
            descriptionTextRef.current.style.maxHeight=  `120px`;

            const textHeight = descriptionTextRef.current.getBoundingClientRect().height;
            console.log("descriptionTextRef: ", descriptionTextRef.current.innerText);
            console.log("textHeight: ", textHeight);
            const lineNum = Math.floor(textHeight/(1.25 * 16));
            console.log("lineNum: ", lineNum)
            const newMaxHeight = lineNum * 1.25 * 16; 
            console.log("newMaxHeight", newMaxHeight);

            descriptionTextRef.current.style.webkitLineClamp = `${lineNum}`;
            descriptionTextRef.current.style.display =  "-webkit-box";
            descriptionTextRef.current.style.webkitBoxOrient = "vertical";
            descriptionTextRef.current.style.overflow= "hidden";

            descriptionTextRef.current.style.maxHeight=  `${newMaxHeight}px`;
        }
        // dependency as size changes as browser loads stuff
    }, [descriptionTextRef.current]);


    return (
    <>
    <article className="flex justify-center content-center flex-[_0_0_10%] h-[36rem]
        embla-slide-number">
        {/* Thumbnail. h & w need to be full as img is a container for the img. This makes object-cover work grid-cols-[minmax(_18rem,18rem)*/}
        {/* title description thingy. Max  */}
        <div className="grid grid-rows-[minmax(_0rem,_22rem)_minmax(_0rem,_16rem)] grid-cols-[minmax(_20rem,_20rem)] bg-white rounded-md shadow-md 
        font-notoSerif ">
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
    </article>
    </>
    )
}
// consider turning into custom tailwind class

export default FeaturedArticleCard;