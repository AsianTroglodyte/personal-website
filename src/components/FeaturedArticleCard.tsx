import Tag from "./Tag.jsx";

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

    return (
    <>
    <article className="flex justify-center content-center h-[36rem]
        embla-slide-number featured">
        {/* Thumbnail. h & w need to be full as img is a container for the img. This makes object-cover work grid-cols-[minmax(_18rem,18rem)*/}
        {/* title description thingy. Max  */}
        <div className="card grid grid-rows-[minmax(_0rem,_22rem)_minmax(_0rem,_16rem)] grid-cols-[minmax(_20rem,_20rem)] bg-white rounded-md 
        font-notoSerif ">
            <img className="object-cover h-full w-full rounded-t-md" alt={carouselDatum.alt} src={carouselDatum.src}></img>
            <div className="flex flex-col p-4 justify-between">
                <div className="flex flex-col grow gap-3 overflow-hidden">
                    {/* advanced-truncation is for truncating and putting ellipses on overflowing text content. ELLIPSES HANDLED ON global.css
                    interesting stuff for following elements to allow growing and growing and shrinking: https://codepen.io/Karan-Swansi-No/pen/RwzyrMv*/}
                    <h6 className="title-text text-base font-bold max-h-[4.5rem] overflow-hidden advanced-trunction-3 shrink-0">
                        <a className="font-notoSerif after:absolute after:inset-0 focus:outline-none" href="/AboutMe">
                            {carouselDatum.title}
                        </a>
                    </h6> 
                    {/* within div because we are using container queries to apply truncation */}
                    <div className="description_container flex-col grow shrink">
                        <p className="description_text text-base overflow-hidden grow-0 shrink">
                            {carouselDatum.description}
                        </p>
                    </div>
                </div>
                {/* consider adding datetime attribute for SEO*/}
                <time className="font-notoSerif mb-3">Date: July 3, 2002</time>
                <div className="flex flex-row gap-1">
                    {
                        carouselDatum.tags.map((tagData) => 
                            <Tag key={tagData.id} tagData={tagData}/>
                        )
                    }
                </div>
            </div>
        </div>
    </article>
    </>
    )
}


// consider turning into custom tailwind class

export default FeaturedArticleCard;