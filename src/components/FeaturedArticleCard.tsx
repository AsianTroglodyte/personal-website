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
    // const {id, title, description, src, alt, tags} = carouselDatum;
    // lots of different ways to pass in props. going the current way 
    // because its shorter and it makes it clearer what is a prop and derived property.
    // to be fair, it's not super useful here but I just think it's kinda neat
    return (
        <>
        <div className="grid grid-rows-[minmax(_22rem,_22rem)_minmax(_13rem,_13rem)] grid-cols-[minmax(_18rem,_25rem)] 
            bg-PWWhite rounded-md shadow-md 
            hover:shadow-lg aspect-[1/1]" 
            key={carouselDatum.id}>
            {/* Thumbnail. h & w need to be full as img is a container for the img. This makes object-cover work */}
            <img className="object-cover h-full w-full rounded-t-md" alt={carouselDatum.alt} src={carouselDatum.src}></img>
            {/* title description thingy. Max  */}
            <div className="flex flex-col justify-between bg-white h-full w-full p-4 font-notoSerif">
                <div className="flex flex-col gap-3 overflow-hidden">
                    {/* advanced-truncation is for truncating and putting ellipses on overflowing text content */}
                    <h6 className="text-base font-bold max-h-12 overflow-hidden advanced-truncation-4">
                        {carouselDatum.title}
                    </h6>
                    <p className="text-sm max-h-20 overflow-hidden advanced-truncation-4">
                        {carouselDatum.description}, {carouselDatum.id}
                    </p>
                </div>
                <div className="flex flex-row gap-1">
                    {
                        carouselDatum.tags.map((tagData) => 
                            <Tag key={tagData.id} tagData={tagData}/>
                        )
                    }
                </div>
            </div>
        </div>
        </>
    )
}

// consider turning into custom tailwind class

export default FeaturedArticleCard;